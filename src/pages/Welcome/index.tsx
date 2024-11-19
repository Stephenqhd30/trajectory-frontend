import { Col, Grid, Row } from 'antd';
import React, { useRef } from 'react';
import { ActionType, PageContainer, ProCard, ProList } from '@ant-design/pro-components';
import { WELCOME_TITLE } from '@/constants';
import { listPostVoByPageUsingPost } from '@/services/trajectory-backend/postController';
import { PostCard } from '@/components';
import { RecommendUserCard } from '@/pages/Welcome/components';


// 响应式组件
const { useBreakpoint } = Grid;

/**
 * 主页
 * @constructor
 */
const Welcome: React.FC = () => {
  // 响应式
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer title={WELCOME_TITLE}>
      <Row gutter={16} wrap={true}>
        <Col span={isMobile ? 24 : 18}>
          <ProCard bordered bodyStyle={{ padding: isMobile ? 4 : 16 }}>
            <ProList<API.PostVO>
              onChange={() => {
                actionRef.current?.reload();
              }}
              pagination={{
                pageSize: 10,
                showQuickJumper: true,
                responsive: true,
              }}
              actionRef={actionRef}
              itemLayout="vertical"
              rowKey="id"
              request={async (params, sort, filter) => {
                const sortField = 'createTime';
                const sortOrder = sort?.[sortField] ?? 'desc';
                const { data, code } = await listPostVoByPageUsingPost({
                  ...params,
                  ...filter,
                  sortField,
                  sortOrder,
                } as API.PostQueryRequest);

                return {
                  success: code === 0,
                  data: data?.records || [],
                  total: data?.total || 0,
                };
              }}
              renderItem={(item) => <PostCard key={item?.id} post={item} />}
            />
          </ProCard>
        </Col>
        <Col span={isMobile ? 0 : 6}>
          <RecommendUserCard />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Welcome;
