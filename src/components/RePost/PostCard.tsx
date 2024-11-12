import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import UserAvatarCard from '@/components/ReUser/UserAvatarCard';
import { Col, Grid, Image, Row, Typography } from 'antd';

import { history } from '@umijs/max';
import { ActionTabbar } from '@/components';

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
      headerBordered={true}
      gutter={[{ xs: 8, sm: 16, md: 24 }, 16]}
      bodyStyle={{ padding: 0 }}
    >
      <Row align={'middle'}>
        <Col span={isMobile ? 24 : 16}>
          <ProCard
            colSpan={isMobile ? '100%' : '70'}
            title={<UserAvatarCard user={post.userVO ?? {}} />}
          >
            <ProCard
              layout={'default'}
              headStyle={{ padding: 4 }}
              bodyStyle={{ padding: 4 }}
            >
              <div
                onClick={() => {
                  history.push(`/post/${post.id}`);
                }}
              >
                <Typography.Title level={5}>{post?.title}</Typography.Title>
                <Typography.Paragraph
                  ellipsis={{
                    rows: 3,
                    expandable: false,
                    symbol: 'more',
                  }}
                >
                  {post.content}
                </Typography.Paragraph>
              </div>
              <ActionTabbar post={post} />
            </ProCard>
          </ProCard>
        </Col>
        <Col span={isMobile ? 24 : 8}>
          <ProCard colSpan={isMobile ? '100%' : '30'} layout={'center'}>
            <Image
              src={post?.cover}
              style={{ width: isMobile ? '100%' : 'auto', maxHeight: '120px' }}
            />
          </ProCard>
        </Col>
      </Row>
    </ProCard>
  );
};

export default PostCard;
