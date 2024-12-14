import { Input, theme } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { SearchResource } from '@/enums/SearchResourceEnum';
import { history } from '@umijs/max';

const initialSearchParams: API.SearchRequest = {
  searchText: '',
  type: SearchResource.POST,
};

/**
 * 通用搜索栏
 * @constructor
 */
const SearchInput = () => {
  const { token } = theme.useToken();
  const [searchParams, setSearchParams] = useState<API.SearchRequest>(initialSearchParams);
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
        onPressEnter={() => {
          history.push(`/search?type=${searchParams.type}&searchText=${searchParams.searchText}`);
        }}
      />
    </div>
  );
};

export default SearchInput;
