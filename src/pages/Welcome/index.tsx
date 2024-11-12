import { Col, Grid, Row } from 'antd';
import React from 'react';
import { PageContainer, ProCard, } from '@ant-design/pro-components';
import { WELCOME_TITLE } from '@/constants';
import { PostCardList } from '@/pages/Welcome/components';
import RecommendUserList from '@/pages/Welcome/components/user/RecommendUserList';


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

  return (
    <PageContainer title={WELCOME_TITLE} extra={isMobile ? '' : new Date().toLocaleDateString()}>
      <Row gutter={16} wrap={true}>
        <Col span={isMobile ? 24 : 18}>
          <ProCard bordered bodyStyle={{ padding: isMobile ? '0' : '16px' }}>
            <PostCardList />
          </ProCard>
        </Col>
        <Col span={isMobile ? 0 : 6}>
          <ProCard
            title={'推荐用户'}
            headerBordered
            bordered
            bodyStyle={{ padding: '4px' }}
            style={{ width: 300 }}
          >
            <RecommendUserList />
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Welcome;
