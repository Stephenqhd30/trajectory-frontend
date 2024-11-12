import React, { useState } from 'react';
import { doPostFavourUsingPost } from '@/services/stephen-backend/postFavourController';
import { Button, message, Space } from 'antd';
import { doThumbUsingPost } from '@/services/stephen-backend/postThumbController';
import { LikeOutlined, LikeTwoTone, StarOutlined, StarTwoTone } from '@ant-design/icons';

interface Props {
  post: API.PostVO;
}

const ActionTabbar: React.FC<Props> = ({ post }) => {
  // 点赞状态
  const [hasThumb, setHasThumb] = useState<boolean>(post.hasThumb ?? false);
  // 点赞数量
  const [thumbNum, setThumbNum] = useState<number>(post.thumbNum ?? 0);
  // 收藏状态
  const [hasFavour, setHasFavour] = useState<boolean>(post.hasFavour ?? false);
  // 收藏数量
  const [favourNum, setFavourNum] = useState<number>(post.favourNum ?? 0);
  /**
   * 帖子收藏
   */
  const handleFavour = async () => {
    try {
      const res = await doPostFavourUsingPost({
        postId: post.id,
      });
      if (res.code === 0 && res.data) {
        setHasFavour(!hasFavour);
        setFavourNum(!hasFavour ? favourNum + 1 : favourNum - 1);
        message.success(hasFavour ? '取消成功' : '收藏成功');
      } else {
        message.error(`收藏失败${res.message}`);
      }
    } catch (error: any) {
      message.error('收藏失败' + error.message);
    }
  };

  /**
   * 帖子收藏
   */
  const handleThumb = async () => {
    try {
      const res = await doThumbUsingPost({
        postId: post.id,
      });
      if (res.code === 0 && res.data) {
        setHasThumb(!hasThumb);
        setThumbNum(!hasThumb ? thumbNum + 1 : thumbNum - 1);
        message.success(hasThumb ? '取消成功' : '点赞成功');
      } else {
        message.error(`点赞失败${res.message}`);
      }
    } catch (error: any) {
      message.error('点赞失败' + error.message);
    }
  };
  return (
    <>
      <Button
        key={'thumb'}
        icon={hasThumb ? <LikeTwoTone /> : <LikeOutlined />}
        type={'text'}
        onClick={handleThumb}
      >
        {thumbNum}
      </Button>
      <Button
        icon={hasFavour ? <StarTwoTone /> : <StarOutlined />}
        key={'favour'}
        type={'text'}
        onClick={handleFavour}
      >
        {favourNum}
      </Button>
    </>
  );
};

export default ActionTabbar;
