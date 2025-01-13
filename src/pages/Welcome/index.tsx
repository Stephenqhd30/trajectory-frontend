import { Col, Grid, Row } from 'antd';
import React, { useRef, useState } from 'react';
import { ActionType, PageContainer, ProCard, ProList } from '@ant-design/pro-components';
import { WELCOME_TITLE } from '@/constants';
import { ChartCard, HeaderItem, PostCard, SearchInput, SearchUserCard } from '@/components';
import { RecommendUserList } from '@/pages/Welcome/components';
import { doSearchAllUsingPost } from '@/services/trajectory-backend/searchController';
import { SearchResource } from '@/enums/SearchResourceEnum';
import { history } from '@umijs/max';


// 响应式组件
const { useBreakpoint } = Grid;

/**
 * 主页
 * @constructor
 */
const Welcome: React.FC = () => {
  // 响应式
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const actionRef = useRef<ActionType>();
  // 搜索参数状态
  const [searchParams, setSearchParams] = useState<API.SearchRequest>({
    type: SearchResource.POST,
    current: 1,
    pageSize: 10,
  });

  // 更新搜索参数的函数
  const handleSearchParamsChange = (newParams: Partial<API.SearchRequest>) => {
    setSearchParams((prev) => ({ ...prev, ...newParams }));
    actionRef.current?.reload();
  };
  return (
    <PageContainer title={WELCOME_TITLE}>
      <Row gutter={16} wrap={true}>
        <Col span={isMobile ? 24 : 18}>
          <ProCard
            title={
              <HeaderItem
                selectedKeys={[searchParams.type as string]}
                onChange={(key) => handleSearchParamsChange({ type: key, current: 1 })}
              />
            }
            bodyStyle={{ padding: isMobile ? 4 : 16 }}
            extra={
              <SearchInput
                onSearch={(value) => {
                  // 更新状态并跳转到新 URL
                  setSearchParams((prev) => {
                    const updatedParams = { ...prev, searchText: value };
                    const queryString = new URLSearchParams({
                      type: updatedParams.type as string,
                      searchText: updatedParams.searchText || '',
                    }).toString();
                    history.push(`/search?${queryString}`);
                    return updatedParams;
                  });
                }}
              />
            }
          >
            <ProList
              onChange={() => {
                actionRef.current?.reload();
              }}
              pagination={{
                pageSize: 10,
                responsive: true,
                current: searchParams.current,
                onChange: (page) => setSearchParams((prev) => ({ ...prev, current: page })),
              }}
              actionRef={actionRef}
              itemLayout="vertical"
              rowKey={'id'}
              request={async (params, sort, filter) => {
                const sortField = 'updateTime';
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
                  return (
                    <Row gutter={[16, 16]} wrap>
                      <SearchUserCard key={item?.id} user={item} />
                    </Row>
                  );
                }
              }}
            />
          </ProCard>
        </Col>
        <Col span={isMobile ? 0 : 6}>
          <ProCard bordered bodyStyle={{ padding: 0 }}>
            <RecommendUserList />
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Welcome;
