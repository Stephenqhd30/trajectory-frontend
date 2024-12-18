import { Input, theme } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { SearchResource } from '@/enums/SearchResourceEnum';
import { history } from '@umijs/max';

interface Props {
  onSearch?: (searchText: string) => void;
}

// 初始化搜索参数
const initialSearchParams: API.SearchRequest = {
  searchText: undefined,
  type: SearchResource.POST,
};

/**
 * 通用搜索栏
 * @constructor
 */
const SearchInput: React.FC<Props> = (props) => {
  const { onSearch } = props;
  const { token } = theme.useToken();
  const [searchParams, setSearchParams] = useState<API.SearchRequest>(initialSearchParams);

  /**
   * 处理搜索
   */
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchParams.searchText || '');
    } else {
      // 否则直接跳转到搜索页面
      history.push(`/search?type=${initialSearchParams.type}&searchText=${encodeURIComponent(initialSearchParams.searchText || '')}`);
    }
  };
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索"
        variant="borderless"
        onChange={(e) => setSearchParams({ ...searchParams, searchText: e.target.value })}
        onPressEnter={handleSearch}
      />
    </div>
  );
};

export default SearchInput;
