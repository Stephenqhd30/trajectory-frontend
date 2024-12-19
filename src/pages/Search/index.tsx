import { ActionType, PageContainer, ProCard, ProList } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { history, useLocation } from '@umijs/max';
import { doSearchAllUsingPost } from '@/services/trajectory-backend/searchController';
import { Grid } from 'antd';
import { SearchResource } from '@/enums/SearchResourceEnum';
import { ChartCard, HeaderItem, PostCard, SearchUserCard } from '@/components';
import Search from 'antd/es/input/Search';
import { SEARCH_TITLE } from '@/constants';

const { useBreakpoint } = Grid;
/**
 * 搜索结果页
 * @constructor
 */
const SearchPage: React.FC = () => {
  const scene = useBreakpoint();
  const isMobile = !scene.md;
  const actionRef = useRef<ActionType>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [searchParams, setSearchParams] = useState<API.SearchRequest>({
    searchText: params.get('searchText') || '',
    type: params.get('type') || SearchResource.POST,
    current: 1,
    pageSize: 10,
  });

  // 通用更新搜索参数的函数，同时同步到 URL
  const handleSearchParamsChange = (newParams: Partial<API.SearchRequest>) => {
    // 更新状态
    const updatedParams = { ...searchParams, ...newParams };
    setSearchParams(updatedParams);
    // 构建完整的查询参数字符串
    const queryString = new URLSearchParams({
      type: updatedParams.type as string,
      searchText: updatedParams.searchText || '',
      current: updatedParams.current?.toString() || '1',
      pageSize: updatedParams.pageSize?.toString() || '10',
    }).toString();
    // 更新 URL
    history.push(`/search?${queryString}`);
    // 触发列表刷新
    actionRef.current?.reload();
  };
  // 当 URL 参数变化时，刷新状态
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchParams({
      searchText: params.get('searchText') || '',
      type: params.get('type') || SearchResource.POST,
      current: Number(params.get('current')) || 1,
      pageSize: Number(params.get('pageSize')) || 10,
    });
  }, [location.search]);

  return (
    <PageContainer breadcrumb={undefined} title={SEARCH_TITLE}>
      <Search
        size={'large'}
        defaultValue={searchParams.searchText}
        style={{ marginBottom: 16 }}
        placeholder="请输入关键词"
        onSearch={(searchText) => handleSearchParamsChange({ searchText, current: 1 })}
        enterButton
      />
      <ProCard
        title={
          <HeaderItem
            selectedKeys={[searchParams.type as string]}
            onChange={(key) => handleSearchParamsChange({ type: key, current: 1 })}
          />
        }
        bodyStyle={{ padding: isMobile ? 4 : 16 }}
      >
        <ProList
          onChange={() => {
            actionRef.current?.reload();
          }}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
            responsive: true,
            current: searchParams.current,
            onChange: (page) => setSearchParams((prev) => ({ ...prev, current: page })),
          }}
          actionRef={actionRef}
          itemLayout="vertical"
          rowKey={'id'}
          request={async (params, sort, filter) => {
            const sortField = 'createTime';
            const sortOrder = sort?.[sortField] ?? 'descend';
            const { data, code } = await doSearchAllUsingPost({
              ...params,
              ...filter,
              sortField,
              sortOrder,
              ...searchParams,
            } as API.SearchRequest);

            return {
              success: code === 0,
              data: data?.dataList || [],
              total: data?.total || 0,
            };
          }}
          renderItem={(item) => {
            // 根据 type 渲染不同的组件
            if (searchParams.type === SearchResource.POST) {
              return <PostCard key={item?.id} post={item} />;
            }
            // 可以在这里添加其他类型的组件渲染逻辑
            if (searchParams.type === SearchResource.CHART) {
              return <ChartCard key={item?.id} chart={item} />;
            }
            if (searchParams.type === SearchResource.CONSUMER) {
              return <SearchUserCard key={item?.id} user={item} />;
            }
          }}
        />
      </ProCard>
    </PageContainer>
  );
};

export default SearchPage;
