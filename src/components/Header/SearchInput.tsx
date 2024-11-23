import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, theme } from 'antd';

/**
 * 搜索框
 * @constructor
 */
const SearchInput: React.FC = () => {
  const { token } = theme.useToken();
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
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索方案"
        variant="borderless"
      />
    </div>
  );
};

export default SearchInput;
