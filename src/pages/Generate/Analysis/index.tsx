import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { message, Typography } from 'antd';
import { CreateChartForm } from '@/components';
import { GENERATE_TITLE } from '@/constants';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';
import { genChartByAiAsyncUsingPost } from '@/services/trajectory-backend/chartController';

/**
 * 智能分析图表页面
 * @constructor
 */
const CreateAnalysis: React.FC = () => {
  /**
   * 图表分析
   * @param values
   */
  const onFinish = async (values: any) => {
    const params = {
      ...values,
      file: undefined,
    };
    const hide = message.loading('正在生成中...');
    try {
      const res = await genChartByAiAsyncUsingPost(
        {
          ...params,
          biz: FileUploadBiz.GENERATE_EXCEL,
        },
        {},
        values.file[0].originFileObj,
      );
      if (res.code === 0 && res.data) {
        message.success('正在分析中,请稍后查看我的图表');
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
    <PageContainer breadcrumb={undefined} title={GENERATE_TITLE}>
      <ProCard
        title={<Typography.Title level={4}>图表分析页面</Typography.Title>}
        split={'vertical'}
        bordered={false}
        headerBordered
      >
        <ProCard>
          <CreateChartForm onFinish={onFinish} />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};
export default CreateAnalysis;
