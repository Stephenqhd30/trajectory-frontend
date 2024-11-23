import { ProFormTreeSelect } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';

interface Props {
  name: string;
  initialValue?: string[];
  label?: string;
}

/**
 * 标签树选择器
 * @param props
 * @constructor
 */
const TagTreeSelect: React.FC<Props> = (props) => {
  const { name, label = '', initialValue = [] } = props;
  const { loadData, tags } = useModel('tags');
  const [value, setValue] = useState<string[]>(initialValue);

  useEffect(() => {
    loadData();
  }, []);
  return (
    <ProFormTreeSelect
      name={name}
      label={label}
      allowClear
      key={'id'}
      request={async () => {
        return tags?.map((tag) => ({
          title: tag.tagName,
          value: tag.tagName,
          children: tag.children?.map((child) => ({
            title: child.tagName,
            value: child.tagName,
          })),
        }));
      }}
      fieldProps={{
        filterTreeNode: true,
        showSearch: true,
        autoClearSearchValue: true,
        multiple: true,
        treeNodeFilterProp: 'title',
        treeCheckable: false,
        fieldNames: {
          label: 'title',
          value: 'value',
          children: 'children',
        },
        onChange: (newValue) => {
          setValue(newValue);
        },
        value: value,
      }}
    />
  );
};

export default TagTreeSelect;
