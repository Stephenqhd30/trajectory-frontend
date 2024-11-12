import React, { useEffect, useState } from 'react';
import { useParams } from '@@/exports';
import { getPostVoByIdUsingGet } from '@/services/stephen-backend/postController';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Grid, message, Row } from 'antd';
import { TableOfContents } from '@/components';
import { PostDetailsCard } from '@/pages/Post/components';

const { useBreakpoint } = Grid;

/**
 * 帖子详情页
 * @constructor
 */
const PostPage: React.FC = () => {
  const { id } = useParams();
  // 帖子信息
  const [post, setPost] = useState<API.PostVO>({});
  // 加载中
  const [loading, setLoading] = useState<boolean>(false);
  const scene = useBreakpoint();
  const isMobile = !scene.md;

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getPostVoByIdUsingGet({
        // @ts-ignore
        id: id,
      });
      if (res.code === 0 && res.data) {
        setPost(res.data);
      }
    } catch (error: any) {
      message.error(error.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <PageContainer header={{ title: '' }}>
      <Row gutter={16} align={'top'}>
        <Col span={isMobile ? 24 : 18}>
          <PostDetailsCard post={post} isMobile={isMobile} />
        </Col>
        <Col span={isMobile ? 24 : 6}>
          <ProCard
            title={'目录'}
            bordered={false}
            collapsible
            defaultCollapsed={false}
            loading={loading}
            headerBordered
            style={{ width: 300 }}
          >
            <TableOfContents markdownContent={post.content as string} />
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default PostPage;
