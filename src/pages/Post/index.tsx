import React, { useEffect, useState } from 'react';
import { useParams } from '@@/exports';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Empty, Grid, message, Row, Typography } from 'antd';
import { MdViewer, PostAvatarCard, TableOfContents } from '@/components';
import { getPostVoByIdUsingGet } from '@/services/trajectory-backend/postController';
import { RecommendUserCard } from '@/pages/Welcome/components';

const { useBreakpoint } = Grid;

/**
 * 帖子详情页
 * @constructor
 */
const PostDetailsPage: React.FC = () => {
  const { id } = useParams();
  // 帖子信息
  const [post, setPost] = useState<API.PostVO>({});
  // 加载中
  const [loading, setLoading] = useState<boolean>(false);
  const [scrollElement] = useState(document.documentElement);

  const scene = useBreakpoint();
  const isMobile = !scene.md;
  const editorId = `md-editor-${post?.id}`;

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
    <PageContainer
      header={{ title: '' }}
      token={{
        paddingBlockPageContainerContent: 24,
        paddingInlinePageContainerContent: isMobile? 4 : 60,
      }}
    >
      <Row gutter={[16, 16]} align={'top'}>
        <Col span={isMobile ? 24 : 18}>
          <ProCard title={<PostAvatarCard post={post} />} gutter={[16, 16]}>
            <Typography.Title level={5}>{post?.title}</Typography.Title>
            <Typography.Paragraph>
              <MdViewer key={post?.id} value={post.content} id={editorId as string} />
            </Typography.Paragraph>
          </ProCard>
        </Col>
        <Col span={isMobile ? 0 : 6}>
          <ProCard ghost={true}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <ProCard
                  title={'目录'}
                  bordered={false}
                  loading={loading}
                  headerBordered
                >
                  <TableOfContents
                    key={post.id}
                    editorId={editorId as string}
                    scrollElement={scrollElement}
                  />
                </ProCard>
              </Col>
              <Col span={24}>
                <RecommendUserCard />
              </Col>
            </Row>
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default PostDetailsPage;
