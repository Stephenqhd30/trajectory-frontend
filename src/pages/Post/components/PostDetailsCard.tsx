import { ProCard } from '@ant-design/pro-components';
import UserAvatarCard from '@/components/ReUser/UserAvatarCard';
import dayjs from 'dayjs';
import { Typography } from 'antd';
import { MdViewer } from '@/components';
import React from 'react';

interface Props {
  post: API.PostVO;
  isMobile?: boolean;
}

const PostDetailsCard: React.FC<Props> = (props) => {
  const { post, isMobile = false } = props;
  return (
    <ProCard
      wrap
      title={<UserAvatarCard user={post.userVO ?? {}} />}
      gutter={[16, 16]}
      extra={isMobile ? '' : dayjs(post.createTime).format('YYYY-MM-DD HH:mm:ss')}
    >
      <div className="content">
        <Typography.Title level={3}>{post.title}</Typography.Title>
        <MdViewer value={post.content} />
      </div>
    </ProCard>
  );
};

export default PostDetailsCard;
