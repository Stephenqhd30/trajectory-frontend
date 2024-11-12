import React, { useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Col, Grid, message, Row, Typography } from 'antd';
import ReactECharts from 'echarts-for-react';
import { generateChartByAiUsingPost } from '@/services/trajectory-backend/chartController';
import { CreateChartForm } from './components';
import { MdViewer } from '@/components';

const { useBreakpoint } = Grid;
/**
 * 添加图表页面
 * @constructor
 */
const CreateChart: React.FC = () => {
  const [chartItem, setChartItem] = useState<API.BIResponse>({});
  const [option, setOption] = useState<any>();
  const scene = useBreakpoint();
  const isMobile = !scene.md;
  const onFinish = async (values: any) => {
    // 避免重复提交;
    const params = {
      ...values,
      file: undefined,
      chartType: values.chartType.value,
    };
    const hide = message.loading('正在生成中...');
    try {
      const res = await generateChartByAiUsingPost(params, {}, values.file[0].originFileObj);
      if (res.code === 0 && res.data) {
        const chartOption = JSON.parse(res.data.genChart ?? '');
        setChartItem(res.data);
        setOption(chartOption);
        message.success('分析成功');
      } else {
        message.error(`分析失败${res.message}`);
      }
    } catch (error: any) {
      message.error(`分析失败${error.message}`);
    } finally {
      hide();
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={isMobile ? 24 : 12}>
        <ProCard
          title="图表分析页面"
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
            <ProCard title={<Typography.Title level={3}>分析结论</Typography.Title>}>
              <MdViewer value={chartItem.genResult ?? '请现在左侧进行数据提交'} />
            </ProCard>
          </Col>
          <Col span={24}>
            <ProCard title={<Typography.Title level={3}>数据展示</Typography.Title>}>
              {option ? (
                <ReactECharts option={option} />
              ) : (
                <Typography.Text>请现在左侧进行数据提交</Typography.Text>
              )}
            </ProCard>
          </Col>
        </Row>

      </Col>
    </Row>
  );
};
export default CreateChart;
