import { PageContainer, ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { ACCOUNT_TITLE } from '@/constants';
import { BaseView, BindingView, SecurityView } from '@/pages/Account/Settings/components';
import { Grid } from 'antd';
import { useModel } from '@@/exports';

const { useBreakpoint } = Grid;

/**
 * 个人设置
 * @constructor
 */
const Settings: React.FC = () => {
  const { initialState } = useModel("@@initialState");
  const currentUser = initialState?.currentUser || {};
  const [activeKeyTab, setActiveKeyTab] = useState<string>(() => {
    return localStorage.getItem('activeKeyTab') || 'base';
  });

  useEffect(() => {
    localStorage.setItem('activeKeyTab', activeKeyTab);
  }, [activeKeyTab]);

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <PageContainer
      token={{
        paddingBlockPageContainerContent: 24,
        paddingInlinePageContainerContent: isMobile? 4 : 60,
      }}
      title={ACCOUNT_TITLE}
      breadcrumb={undefined}
      extra={new Date().toLocaleDateString()}
    >
      <ProCard
        tabs={{
          tabPosition: isMobile ? 'top' : 'left',
          activeKey: activeKeyTab,
          items: [
            {
              label: `基本设置`,
              key: 'base',
              children: <BaseView user={currentUser} />,
            },
            {
              label: `账号绑定`,
              key: 'binding',
              children: <BindingView />,
            },
            {
              label: `安全设置`,
              key: 'security',
              children: <SecurityView />,
            },
          ],
          onChange: (activeKey) => {
            setActiveKeyTab(activeKey);
          },
        }}
      />
    </PageContainer>
  );
};

export default Settings;
