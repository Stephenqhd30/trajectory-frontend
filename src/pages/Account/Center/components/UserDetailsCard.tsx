import '@umijs/max';
import React from 'react';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Typography } from 'antd';
import UserAvatarCard from '@/components/ReUser/UserAvatarCard';

interface UserProps {
  user: API.UserVO;
}

const UserDetailsCard: React.FC<UserProps> = (props) => {
  const { user } = props;

  return (
    <>
      <ProCard>
        <ProDescriptions<API.UserVO>
          column={1}
          title={
            <Typography.Title level={3}>
              <UserAvatarCard user={user} />
            </Typography.Title>
          }
          dataSource={user}
          emptyText={'该用户比较懒 还没有设置'}
          columns={[
            {
              title: 'id',
              key: 'id',
              dataIndex: 'id',
            },
            {
              title: '角色',
              key: 'userRole',
              dataIndex: 'userRole',
              valueType: 'text',
              valueEnum: {
                admin: {
                  text: '管理员',
                },
                user: {
                  text: '普通用户',
                },
              },
            },
            {
              title: '用户名',
              key: 'userName',
              dataIndex: 'userName',
              valueType: 'text',
            },
            {
              title: '简介',
              key: 'userProfile',
              dataIndex: 'userProfile',
              valueType: 'text',
            },
            {
              title: '邮箱',
              key: 'userEmail',
              dataIndex: 'userEmail',
              valueType: 'text',
            },
            {
              title: '电话',
              key: 'userPhone',
              dataIndex: 'userPhone',
              valueType: 'text',
            },
          ]}
        />
      </ProCard>
    </>
  );
};
export default UserDetailsCard;
