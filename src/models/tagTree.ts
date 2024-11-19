import { useEffect, useState } from 'react';
import { listTagByTreeUsingGet } from '@/services/trajectory-backend/tagController';
import { message } from 'antd';

/**
 * 标签树
 * @constructor
 */
const TagTree =  () => {
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
  /**
   * 记载推荐用户列表
   */
  useEffect(() => {
    loadData();
  }, []);

  return {
    tagTreeList,
    loadData,
  };
};

export default TagTree;
