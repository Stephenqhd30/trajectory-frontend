import '@umijs/max';
import { Avatar, Tag, Typography } from 'antd';
import React from 'react';
import { ProCard, StatisticCard } from '@ant-design/pro-components';

interface Props {
  user: API.LoginUserVO;
}

/**
 * 搜索用户卡片
 * @param props
 * @constructor
 */
const SearchUserCard: React.FC<Props> = (props) => {
  const { user } = props;

  return (
    <ProCard>
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
export default SearchUserCard;
