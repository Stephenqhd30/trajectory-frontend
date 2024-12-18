import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { SearchResource, searchResourceEnum } from '@/enums/SearchResourceEnum';

type MenuItem = Required<MenuProps>['items'][number];

interface Props {
  selectedKeys?: string[];
  onChange: (key: string) => void;
}

const items: MenuItem[] = [
  {
    key: SearchResource.POST,
    label: searchResourceEnum[SearchResource.POST].label,
  },
  {
    key: SearchResource.CHART,
    label: searchResourceEnum[SearchResource.CHART].label,
  },
  {
    key: SearchResource.CONSUMER,
    label: searchResourceEnum[SearchResource.CONSUMER].label,
  },
];

/**
 * 搜索类型选择栏
 * @constructor
 */
const HeaderItem: React.FC<Props> = (props) => {
  const { onChange, selectedKeys = [SearchResource.POST] } = props;

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    onChange(key);
  };

  return (
    <Menu onClick={handleMenuClick} selectedKeys={selectedKeys} mode="horizontal" items={items} />
  );
};

export default HeaderItem;
