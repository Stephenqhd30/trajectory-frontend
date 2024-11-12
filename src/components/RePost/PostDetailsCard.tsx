import { ProCard } from '@ant-design/pro-components';
import UserAvatarCard from '@/components/ReUser/UserAvatarCard';
import dayjs from 'dayjs';
import { Grid, Typography } from 'antd';
import { MdViewer } from '@/components';
import React from 'react';

interface Props {
  post: API.PostVO;
}

const {useBreakpoint} = Grid;

/**
 * 帖子详情卡片
 * @param props
 * @constructor
 */
const PostDetailsCard: React.FC<Props> = (props) => {
  const { post } = props;
  const scene = useBreakpoint();
  const isMobile = !scene.md;
  return (
    <ProCard
      wrap
      title={<UserAvatarCard user={post.userVO ?? {}} />}
      gutter={[16, 16]}
      extra={isMobile ? '' : dayjs(post.createTime).format('YYYY-MM-DD HH:mm:ss')}
    >
      <Typography.Title level={3}>{post.title}</Typography.Title>
      <MdViewer value={post.content} />
    </ProCard>
  );
};

export default PostDetailsCard;
