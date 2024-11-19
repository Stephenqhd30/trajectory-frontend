import React from 'react';
import { StatisticCard } from '@ant-design/pro-components';
import { Avatar, Typography } from 'antd';
import dayjs from 'dayjs';

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
            {dayjs(chart.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </Typography.Text>
        ),
        valueStyle: {
          fontSize: 14,
        },
      }}
      chart={<Avatar size={48} src={chart?.userVO?.userAvatar} alt={chart?.userVO?.userName} />}
      chartPlacement="left"
    />
  );
};

export default PostAvatarCard;
