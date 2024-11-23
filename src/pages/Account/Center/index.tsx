import React, { useState } from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { ACCOUNT_TITLE } from '@/constants';
import {Col, Grid, Row} from 'antd';
import { useModel } from '@@/exports';
import { MyFavourPostList, MyPostList, MyThumbPostList } from '@/pages/Account/Center/components';
import {UserCard} from '@/components';

const { useBreakpoint } = Grid;


/**
 * 个人中心
 * @constructor
 */
const AccountCenter: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const scene = useBreakpoint();
  const isMobile = !scene.md;
  const [tab, setTab] = useState('my-post');

  return (
    <PageContainer title={ACCOUNT_TITLE} breadcrumb={undefined}>
      <Row gutter={[16, 16]}>
        <Col span={isMobile ? 24 : 6}>
          <UserCard user={currentUser ?? {}} />
        </Col>
        <Col span={isMobile ? 24 : 18}>
          <ProCard
            bodyStyle={{ padding: 4 }}
            tabs={{
              tabPosition: 'top',
              activeKey: tab,
              items: [
                {
                  label: `我的帖子`,
                  key: 'my-post',
                  children: <MyPostList />,
                },
                {
                  label: `我的收藏`,
                  key: 'my-favour',
                  children: <MyFavourPostList />,
                },
                {
                  label: `我的点赞`,
                  key: 'my-thumb',
                  children: <MyThumbPostList />,
                },
              ],
              onChange: (key) => {
                setTab(key);
              },
            }}
            bordered
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default AccountCenter;
