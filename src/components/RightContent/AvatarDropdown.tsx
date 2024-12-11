import { BarChartOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { history, Link, useModel } from '@umijs/max';
import { Avatar, Button, message, Space } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import { userLogoutUsingPost } from '@/services/trajectory-backend/userController';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.userName}</span>;
};

/**
 * 头像下拉框
 * @constructor
 */
export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  // 获取当前登录用户的信息
  const { currentUser } = initialState || {};
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    try {
      const res = await userLogoutUsingPost();
      const { search, pathname } = window.location;
      const urlParams = new URL(window.location.href).searchParams;
      /** 此方法会跳转到 redirect 参数所在的位置 */
      const redirect = urlParams.get('redirect');
      if (res.code === 0 && res.data) {
        if (window.location.pathname !== '/user/login' && !redirect) {
          history.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: pathname + search,
            }),
          });
        }
      } else {
        message.error(`用户退出登录失败${res.message}`);
      }
    } catch (error: any) {
      message.error(`用户退出登录失败${error.message}`);
    }
  };

  /**
   * 点击菜单栏
   */
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        return;
      }else if (key === 'chart') {
        history.push(`/my/${key}`);
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  // 如果用户没有登录展示一个登录框
  if (!currentUser) {
    return (
      <Link to={'/user/login'}>
        <Button type="primary">登录</Button>
      </Link>
    );
  }

  const menuItems = [
    {
      key: 'center',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '个人设置',
    },
    {
      key: 'chart',
      icon: <BarChartOutlined />,
      label: '我的图表',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      <Space>
        {currentUser?.userAvatar ? (
          <Space>
            <Avatar src={currentUser?.userAvatar} />
            <span>{currentUser?.userName}</span>
          </Space>
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
      </Space>
    </HeaderDropdown>
  );
};
