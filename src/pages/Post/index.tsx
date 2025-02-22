import React, { useEffect, useState } from 'react';
import { useParams } from '@@/exports';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Grid, message } from 'antd';
import { MdViewer, PostTitleCard } from '@/components';
import { searchPostVoByPageUsingPost } from '@/services/trajectory-backend/searchController';

const { useBreakpoint } = Grid;

/**
 * 帖子详情页
 * @constructor
 */
const PostDetailsPage: React.FC = () => {
  const { id } = useParams();
  // 帖子信息
  const [post, setPost] = useState<API.PostVO>({});
  const scene = useBreakpoint();
  const isMobile = !scene.md;

  const loadData = async () => {
    try {
      const res = await searchPostVoByPageUsingPost({
        id: id as any,
      });
      if (res.code === 0 && res?.data?.records) {
        setPost(res?.data?.records[0] || {});
      } else {
        setPost({});
      }
    } catch (error: any) {
      message.error(error.message || '加载失败');
      setPost({});
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <PageContainer header={{ title: '' }}>
      <ProCard title={<PostTitleCard post={post} />}>
        <MdViewer key={post?.id} value={post?.content} isMobile={isMobile} />
      </ProCard>
    </PageContainer>
  );
};

export default PostDetailsPage;
