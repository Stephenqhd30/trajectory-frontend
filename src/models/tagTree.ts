import { useState } from 'react';
import { listTagByTreeUsingGet } from '@/services/trajectory-backend/tagController';
import { message } from 'antd';

/**
 * 标签树
 * @constructor
 */
export default () => {
  const [tagTreeList, setTagTreeList] = useState<API.TagDTO[]>([]);

  const loadData = async () => {
    try {
      const res = await listTagByTreeUsingGet();
      if (res.code === 0 && res.data) {
        setTagTreeList(res.data);
      } else {
        setTagTreeList([]);
      }
    } catch (error: any) {
      message.error('获取树形组件失败');
    }
  };

  return {
    tagTreeList,
    loadData,
  };
};
