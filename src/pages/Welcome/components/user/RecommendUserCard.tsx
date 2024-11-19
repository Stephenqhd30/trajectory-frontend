import React from 'react';
import { ProCard, ProList } from '@ant-design/pro-components';
import { ReloadOutlined } from '@ant-design/icons';
import { RecommendUser } from '@/components';
import { useModel } from '@@/exports';

/**
 * 推荐用户列表
 * @constructor
 */
const RecommendUserCard: React.FC = () => {
  const { recommendUserList } = useModel('recommend');

  return (
    <ProCard extra={<ReloadOutlined />} title={'推荐用户'}>
      <ProList<API.UserVO>
        dataSource={recommendUserList}
        rowKey={'id'}
        itemLayout="vertical"
        renderItem={(item) => <RecommendUser key={item.id} user={item} />}
      />
    </ProCard>
  );
};
export default RecommendUserCard;
