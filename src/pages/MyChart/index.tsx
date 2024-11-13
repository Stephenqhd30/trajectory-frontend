import React from 'react';
import { PageContainer, ProCard, ProList } from '@ant-design/pro-components';
import { listMyChartVoByPageUsingPost } from '@/services/trajectory-backend/chartController';
import { MY_CHART_TITLE } from '@/constants';
import { ChartCard } from '@/pages/MyChart/components';

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
  return (
    <PageContainer title={MY_CHART_TITLE}>
      <ProCard gutter={[16, 16]} bodyStyle={{ padding: 0 }}>
        <ProList<API.ChartVO>
          grid={{
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          style={{
            marginBottom: 8,
          }}
          pagination={{
            pageSize: 8,
            showQuickJumper: true,
            showSizeChanger: true,
            responsive: true,
          }}
          request={async (params, sort, filter) => {
            const sortField = Object.keys(sort)?.[0];
            const sortOrder = sort?.[sortField] ?? undefined;
            const { data, code } = await listMyChartVoByPageUsingPost({
              ...params,
              ...filter,
              sortField,
              sortOrder,
            } as API.ChartQueryRequest);

            return {
              success: code === 0,
              data: data?.records || [],
              total: data?.total || 0,
            };
          }}
          rowKey="id"
          itemLayout="vertical"
          renderItem={(record) => <ChartCard chart={record} />}
        />
      </ProCard>
    </PageContainer>
  );
};

export default MyChartPage;
