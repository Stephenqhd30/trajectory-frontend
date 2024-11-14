import React, { useRef } from 'react';
import { ActionType, PageContainer, ProList } from '@ant-design/pro-components';
import { listMyChartVoByPageUsingPost } from '@/services/trajectory-backend/chartController';
import { MY_CHART_TITLE } from '@/constants';
import { ChartCard } from '@/pages/MyChart/components';
import { message } from 'antd';

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {

  const actionRef = useRef<ActionType>();

  return (
    <PageContainer title={MY_CHART_TITLE}>
      <ProList<API.ChartVO>
        actionRef={actionRef}
        grid={{
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        pagination={{
          pageSize: 4,
          responsive: true,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['4', '8', '12', '16'],
          onChange: () => {
            actionRef.current?.reload();
          },
        }}
        request={async (params, sort, filter) => {
          try {
            const sortField = Object.keys(sort)?.[0];
            const sortOrder = sort?.[sortField] ?? undefined;
            const { data, code } = await listMyChartVoByPageUsingPost({
              ...params,
              ...filter,
              sortField,
              sortOrder,
            });
            return {
              success: code === 0,
              data: data?.records || [],
              total: data?.total || 0,
              current: data?.current || 1,
            };
          } catch (error: any) {
            message.error(`加载失败，请重试${error.message}`);
            return {
              success: false,
              data: [],
              total: 0,
              current: 1,
            };
          }
        }}
        rowKey={'id'}
        renderItem={(record) => <ChartCard chart={record} />}
      />
    </PageContainer>
  );
};

export default MyChartPage;
