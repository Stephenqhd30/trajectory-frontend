import React, { useEffect, useState } from 'react';
import { useParams } from '@@/exports';
import { getPostVoByIdUsingGet } from '@/services/trajectory-backend/postController';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Grid, message, Row, Typography } from 'antd';
import { MdViewer, TableOfContents } from '@/components';
import UserAvatarCard from '../../components/ReUser/UserAvatarCard';
import dayjs from 'dayjs';

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
  const editorId = `md-editor-${post?.id}`

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
      <Row gutter={[16, 16]} align={'top'}>
        <Col span={isMobile ? 24 : 18}>
          <ProCard
            wrap
            title={<UserAvatarCard user={post.userVO ?? {}} />}
            gutter={16}
            extra={isMobile ? '' : dayjs(post.createTime).format('YYYY-MM-DD HH:mm:ss')}
          >
            <Typography.Title level={3}>{post.title}</Typography.Title>
            <MdViewer key={post?.id} value={post.content} id={editorId as string} />
          </ProCard>
        </Col>
        <Col span={isMobile ? 24 : 6}>
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
      </Row>
    </PageContainer>
  );
};

export default PostDetailsPage;
