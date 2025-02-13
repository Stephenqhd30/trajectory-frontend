import React from 'react';
import { StatisticCard } from '@ant-design/pro-components';
import { Avatar, Typography } from 'antd';
import dayjs from 'dayjs';

interface Props {
  post: API.PostVO;
}

/**
 * 帖子头像卡片
 * @param props
 * @constructor
 */
const PostAvatarCard: React.FC<Props> = (props) => {
  const { post } = props;
  return (
    <StatisticCard
      bodyStyle={{
        padding: 4,
      }}
      statistic={{
        title: post?.userVO?.userName,
        valueRender: () => (
          <Typography.Text
            style={{
              fontWeight: 500,
              color: 'rgba(0, 0, 0, 0.45)',
            }}
          >
            {dayjs(post.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </Typography.Text>
        ),
        valueStyle: {
          fontSize: 13,
        },
      }}
      chart={<Avatar size={40} src={post?.userVO?.userAvatar} alt={post?.userVO?.userName} />}
      chartPlacement="left"
    />
  );
};

export default PostAvatarCard;
