import React from 'react';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { Col, Divider, Grid, Image, Row, Typography } from 'antd';
import { ActionTabbar, PostAvatarCard } from '@/components';

interface Props {
  post: API.PostVO;
}

const { useBreakpoint } = Grid;

/**
 * 帖子卡片
 * @param props
 * @constructor
 */
const PostCard: React.FC<Props> = ({post}) => {
  const scene = useBreakpoint();
  const isMobile = !scene.md;

  return (
    <ProCard
      title={<PostAvatarCard key={post.id} post={post} />}
      headStyle={{ padding: 4 }}
      bodyStyle={{ paddingTop: 0 }}
    >
      <Row>
        <Col span={isMobile ? 24 : post?.cover ? 18 : 24}>
          <ProCard bodyStyle={{ padding: 4 }}>
            <StatisticCard
              onClick={() => {
                window.open(`/post/${post?.id}`, '_blank');
              }}
              bodyStyle={{
                padding: 0,
              }}
              headStyle={{
                padding: 0,
              }}
              statistic={{
                title: <Typography.Title level={4}>{post?.title}</Typography.Title>,
                valueRender: () => (
                  <Typography.Paragraph
                    ellipsis={{
                      rows: 3,
                      expandable: false,
                    }}
                  >
                    {post.content}
                  </Typography.Paragraph>
                ),
              }}
            />
          </ProCard>
        </Col>
        <Col span={isMobile ? 24 : 6}>
          {post?.cover && (
            <ProCard bodyStyle={{ padding: 0 }}>
              <Image
                src={post?.cover}
                style={{
                  objectFit: 'cover',
                  width: '213px',
                  height: '128px',
                }}
                alt={post?.title}
              />
            </ProCard>
          )}
        </Col>
        <Col span={24}>
          <ActionTabbar post={post} />
          <Divider key={post?.id} />
        </Col>
      </Row>
    </ProCard>
  );
};

export default PostCard;
