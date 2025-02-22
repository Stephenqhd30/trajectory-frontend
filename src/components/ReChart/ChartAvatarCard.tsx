import React from 'react';
import { StatisticCard } from '@ant-design/pro-components';
import { Avatar, Typography } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// 使用 relativeTime 插件
dayjs.extend(relativeTime);

interface Props {
  chart: API.ChartVO;
}

/**
 * 帖子头像卡片
 * @param props
 * @constructor
 */
const PostAvatarCard: React.FC<Props> = (props) => {
  const { chart } = props;
  return (
    <StatisticCard
      bodyStyle={{
        padding: 0,
      }}
      statistic={{
        title: chart?.userVO?.userName,
        valueRender: () => (
          <Typography.Text
            style={{
              fontWeight: 500,
              color: 'rgba(0, 0, 0, 0.45)',
            }}
          >
            <Typography.Text type="secondary">
              {dayjs(chart?.updateTime).fromNow()}
            </Typography.Text>
          </Typography.Text>
        ),
        valueStyle: {
          fontSize: 12,
        },
      }}
      chart={<Avatar size={40} src={chart?.userVO?.userAvatar} alt={chart?.userVO?.userName} />}
      chartPlacement="left"
    />
  );
};

export default PostAvatarCard;
