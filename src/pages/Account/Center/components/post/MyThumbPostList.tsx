import React, { useRef } from 'react';
import { PostCard } from '@/components';
import { ActionType, ProList } from '@ant-design/pro-components';
import { listMyThumbPostByPageUsingPost } from '@/services/trajectory-backend/postThumbController';

/**
 * 我的帖子
 * @constructor
 */
const MyThumbPostList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProList<API.PostVO>
      onChange={() => {
        actionRef.current?.reload();
      }}
      pagination={{
        pageSize: 5,
        showQuickJumper: true,
        responsive: true,
      }}
      actionRef={actionRef}
      itemLayout="vertical"
      rowKey="id"
      request={async (params, sort, filter) => {
        const sortField = 'createTime';
        const sortOrder = sort?.[sortField] ?? 'desc';
        const { data, code } = await listMyThumbPostByPageUsingPost({
          ...params,
          ...filter,
          sortField,
          sortOrder,
        } as API.PostQueryRequest);

        return {
          success: code === 0,
          data: data?.records || [],
          total: data?.total || 0,
        };
      }}
      renderItem={(item) => <PostCard key={item?.id} post={item} />}
    />
  );
};

export default MyThumbPostList;
