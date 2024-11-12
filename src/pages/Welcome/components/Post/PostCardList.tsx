import {ActionType, ProList} from '@ant-design/pro-components';
import React, {useRef} from 'react';
import {listPostVoByPageUsingPost} from '@/services/stephen-backend/postController';
import {PostCard} from '@/components';

/**
 * 帖子列表
 * @constructor
 */
const PostCardList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProList<API.PostVO>
      onChange={() => {
        actionRef.current?.reload();
      }}
      pagination={{
        pageSize: 10,
        showQuickJumper: true,
      }}
      actionRef={actionRef}
      itemLayout="vertical"
      rowKey="id"
      request={async (params, sort, filter) => {
        const sortField = 'createTime';
        const sortOrder = sort?.[sortField] ?? 'desc';
        const { data, code } = await listPostVoByPageUsingPost({
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
export default PostCardList;
