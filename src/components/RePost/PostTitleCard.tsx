import React from 'react';
import { StatisticCard } from '@ant-design/pro-components';
import {Avatar, Divider, Space, Typography} from 'antd';
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
        padding: 0,
      }}
      statistic={{
        title: <Typography.Title level={3}>{post?.title}</Typography.Title>,
        valueRender: () => (
          <Space>
            <Typography.Text>{post?.userVO?.userName}</Typography.Text>
            <Divider type={'vertical'} />
            <Typography.Text
              style={{
                color: 'rgba(0, 0, 0, 0.45)',
              }}
            >
              {dayjs(post.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </Typography.Text>
          </Space>
        ),
        valueStyle: {
          fontSize: 14,
        },
      }}
    />
  );
};

export default PostAvatarCard;
