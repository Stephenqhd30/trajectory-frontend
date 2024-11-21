import React, { useState } from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Empty, Grid, message, Row, Typography } from 'antd';
import ReactECharts from 'echarts-for-react';
import { CreateChartForm } from './components';
import { MdViewer } from '@/components';
import { GENERATE_TITLE } from '@/constants';
import { genChartByAiUsingPost } from '@/services/trajectory-backend/chartController';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';

const { useBreakpoint } = Grid;
/**
 * 智能分析图表页面
 * @constructor
 */
const CreateChart: React.FC = () => {
  const [chartItem, setChartItem] = useState<API.BIResponse>({});
  const [option, setOption] = useState<any>();
  const scene = useBreakpoint();
  const isMobile = !scene.md;

  /**
   * 图表分析
   * @param values
   */
  const onFinish = async (values: any) => {
    // 将数据还原
    setChartItem({});
    setOption('');
    const params = {
      ...values,
      file: undefined,
    };
    const hide = message.loading('正在生成中...');
    try {
      const res = await genChartByAiUsingPost({
        ...params,
        biz: FileUploadBiz.GENERATE_EXCEL,
      }, {}, values.file[0].originFileObj);
      if (res.code === 0 && res.data) {
        const chartOption = res.data.genChart ? JSON.parse(res.data.genChart) : {};
        setChartItem(res.data);
        setOption(chartOption);
        message.success('分析成功');
      } else {
        message.error(`分析失败${res.message}`);
        setChartItem({});
        setOption('');
      }
    } catch (error: any) {
      message.error(`分析失败${error.message}`);
    } finally {
      hide();
    }
  };

  return (
    <PageContainer title={GENERATE_TITLE}>
      <Row gutter={[16, 16]}>
        <Col span={isMobile ? 24 : 12}>
          <ProCard
            title={<Typography.Title level={4}>图表分析页面</Typography.Title>}
            extra={new Date().toLocaleDateString()}
            split={'vertical'}
            bordered={false}
            headerBordered
          >
            <ProCard>
              <CreateChartForm onFinish={onFinish} />
            </ProCard>
          </ProCard>
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <ProCard
                headerBordered
                title={<Typography.Title level={4}>分析结论</Typography.Title>}
              >
                {chartItem.genResult ? (
                  <MdViewer value={chartItem.genResult} id={`my-chart}`} />
                ) : (
                  <Empty description="暂无分析结论" />
                )}
              </ProCard>
            </Col>
            <Col span={24}>
              <ProCard
                headerBordered
                title={<Typography.Title level={4}>数据展示</Typography.Title>}
              >
                {option ? (
                  <ReactECharts option={option} notMerge={true} lazyUpdate={true} />
                ) : (
                  <Empty description="暂无数据展示" />
                )}
              </ProCard>
            </Col>
          </Row>
        </Col>
      </Row>
    </PageContainer>
  );
};
export default CreateChart;
