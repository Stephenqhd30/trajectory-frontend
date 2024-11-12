import { useEffect, useState } from 'react';
import { message } from 'antd';
import { listMatchUserVoUsingPost } from '@/services/stephen-backend/userController';

export default () => {
  // 推荐用户列表
  const [recommendUserList, setRecommendUserList] = useState<API.UserVO[]>([]);

  /**
   * 加载推荐用户列表数据
   */
  const loadData = async () => {
    if (recommendUserList.length === 0) {
      try {
        const res = await listMatchUserVoUsingPost({
          number: 10,
        });
        if (res.code === 0 && res.data) {
          setRecommendUserList(res.data);
        }
      } catch (error: any) {
        message.error(`获取匹配用户数据失败${error.message}`);
      }
    }
  };

  /**
   * 记载推荐用户列表
   */
  useEffect(() => {
    if (recommendUserList.length === 0) {
      loadData();
    }
  }, []);

  return { recommendUserList, loadData };
};
