import React from 'react';
import { useModel } from '@@/exports';
import { ProList } from '@ant-design/pro-components';
import { RecommendUserCard } from '@/components';

/**
 * 推荐用户列表
 * @constructor
 */
const RecommendUserList: React.FC = () => {
  const { recommendUserList } = useModel('recommend');

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
