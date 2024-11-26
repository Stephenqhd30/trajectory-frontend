import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Col, Divider, Grid, Image, Row, Typography } from 'antd';

import { history } from '@umijs/max';
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
      bodyStyle={{ padding: isMobile ? 4 : 16, paddingTop: 0 }}
    >
      <Row>
        <Col span={isMobile ? 24 : post?.cover ? 18 : 24}>
          <ProCard bodyStyle={{ padding: 4 }}>
            <div
              onClick={() => {
                history.push(`/post/${post.id}`);
              }}
            >
              <Typography.Paragraph
                ellipsis={{
                  rows: 3,
                  expandable: false,
                  symbol: '...',
                }}
              >
                {post.content}
              </Typography.Paragraph>
            </div>
            <ActionTabbar post={post} />
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
      </Row>
      <Divider key={post?.id} />
    </ProCard>
  );
};

export default PostCard;
