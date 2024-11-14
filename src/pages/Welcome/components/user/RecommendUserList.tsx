import React, { useEffect } from 'react';
import { useModel } from '@@/exports';
import { ProList } from '@ant-design/pro-components';
import { RecommendUserCard } from '@/components';

/**
 * 推荐用户列表
 * @constructor
 */
const RecommendUserList: React.FC = () => {
  const { loadData, recommendUserList } = useModel('recommend');

  /**
   * 如果推荐用户数据为空获取数据
   */
  useEffect(() => {
    if (recommendUserList.length === 0) {
      loadData();
    }
  }, []);

  return (
    <ProList<API.UserVO>
      dataSource={recommendUserList}
      rowKey={'id'}
      itemLayout="vertical"
      renderItem={(item) => <RecommendUserCard key={item.id} user={item} />}
    />
  );
};
export default RecommendUserList;
