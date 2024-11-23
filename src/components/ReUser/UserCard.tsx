import '@umijs/max';
import { Avatar, Button, Tag, Typography } from 'antd';
import React from 'react';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { EditOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';

interface Props {
  title?: string;
  user: API.LoginUserVO;
}

/**
 * 用户卡片
 * @param props
 * @constructor
 */
const UserCard: React.FC<Props> = (props) => {
  const { title = '个人信息', user } = props;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  return (
    <ProCard
      title={title}
      extra={
        currentUser?.id === user?.id && (
          <Button
            type={'text'}
            onClick={() => {
              history.push('/account/settings');
            }}
            icon={<EditOutlined />}
          />
        )
      }
      headerBordered
    >
      <StatisticCard.Group direction={'column'} bodyStyle={{ padding: 0 }}>
        <StatisticCard
          layout={'center'}
          chart={<Avatar size={100} src={user?.userAvatar} />}
          chartPlacement={'left'}
        />
        <StatisticCard
          bodyStyle={{ padding: 0 }}
          headStyle={{ padding: 0 }}
          title={
            <Typography.Text
              style={{
                fontSize: 20,
                fontWeight: 700,
              }}
              ellipsis={{
                tooltip: user?.userName,
                symbol: '...',
              }}
            >
              {user?.userName}
            </Typography.Text>
          }
          statistic={{
            valueRender: () => {
              return (
                <Typography.Text
                  style={{
                    fontWeight: 500,
                    color: 'rgba(0, 0, 0, 0.45)',
                  }}
                  ellipsis={{
                    tooltip: user?.userProfile,
                    symbol: '...',
                  }}
                >
                  {user?.userProfile}
                </Typography.Text>
              );
            },
          }}
        />
        <StatisticCard
          bodyStyle={{ padding: 0 }}
          headStyle={{ padding: 0 }}
          statistic={{
            valueRender: () => {
              return user.tags?.map((tag) => {
                return (
                  <Tag
                    style={{
                      fontSize: 14,
                    }}
                    color={'magenta'}
                    bordered={false}
                    key={tag}
                  >
                    {tag}
                  </Tag>
                );
              });
            },
          }}
        />
      </StatisticCard.Group>
    </ProCard>
  );
};
export default UserCard;
