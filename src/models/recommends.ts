import { useState } from 'react';
import { message } from 'antd';
import { listMatchUserVoUsingPost } from '@/services/trajectory-backend/userController';

/**
 * 推荐用户
 * @constructor
 */
export default () => {
  // 推荐用户列表
  const [recommends, setRecommends] = useState<API.UserVO[]>([]);

  /**
   * 加载推荐用户列表数据
   */
  const loadData = async () => {
    if (recommends.length === 0) {
      try {
        const res = await listMatchUserVoUsingPost({
          number: 10,
        });
        if (res.code === 0 && res.data) {
          setRecommends(res.data);
        }
      } catch (error: any) {
        message.error(`获取匹配用户数据失败${error.message}`);
      }
    }
  };

  return { recommends, loadData };
};
