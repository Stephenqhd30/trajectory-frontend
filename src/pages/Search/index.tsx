import { ActionType, PageContainer, ProCard, ProList } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { useLocation } from '@umijs/max';
import { doSearchAllUsingPost } from '@/services/trajectory-backend/searchController';
import { Grid } from 'antd';
import { SearchResource, searchResourceEnum } from '@/enums/SearchResourceEnum';
import { PostCard } from '@/components';

const { useBreakpoint } = Grid;
/**
 * 搜索结果页
 * @constructor
 */
const SearchPage: React.FC = () => {
  const location = useLocation();
  const scene = useBreakpoint();
  const isMobile = !scene.md;
  const actionRef = useRef<ActionType>();
  const params = new URLSearchParams(location.search);
  const [searchParams, setSearchParams] = useState<API.SearchRequest>({
    searchText: params.get('searchText') || '',
    type: params.get('type') || SearchResource.POST,
    current: 1,
    pageSize: 10,
  });

  return (
    <PageContainer breadcrumb={undefined} title={null}>
      <ProCard
        tabs={{
          tabPosition: 'top',
          activeKey: searchParams.type,
          items: [
            {
              label: searchResourceEnum[SearchResource.POST].label,
              key: SearchResource.POST,
            },
            {
              label: searchResourceEnum[SearchResource.CONSUMER].label,
              key: SearchResource.CONSUMER,
            },
            {
              label: searchResourceEnum[SearchResource.CHART].label,
              key: SearchResource.CHART,
            },
          ],
          onChange: (key) => {
            setSearchParams({
              type: key,
            });
          },
        }}
      />
      <ProCard bordered bodyStyle={{ padding: isMobile ? 4 : 16 }}>
        <ProList<API.PostVO>
          onChange={() => {
            actionRef.current?.reload();
          }}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
            responsive: true,
          }}
          actionRef={actionRef}
          itemLayout="vertical"
          rowKey="id"
          request={async (params, sort, filter) => {
            const sortField = 'createTime';
            const sortOrder = sort?.[sortField] ?? 'desc';
            const { data, code } = await doSearchAllUsingPost({
              ...params,
              ...filter,
              sortField,
              sortOrder,
              ...searchParams,
            } as API.PostQueryRequest);

            return {
              success: code === 0,
              data: data?.dataList || [],
            };
          }}
          renderItem={(item) => <PostCard key={item?.id} post={item} />}
        />
      </ProCard>
    </PageContainer>
  );
};

export default SearchPage;
