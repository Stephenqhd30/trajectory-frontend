import {ProLayoutProps} from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'top',
  contentWidth: 'Fixed',
  fixedHeader: true,
  fixSiderbar: true,
  splitMenus: true,
  siderMenuType: 'sub',
  title: '轨迹',
  pwa: true,
  logo: 'https://butterfly-1318299170.cos.ap-shanghai.myqcloud.com/logo/trajectory/logo.svg',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
    pageContainer: {
      paddingInlinePageContainerContent: 0,
      paddingBlockPageContainerContent: 0,
    }
  },
};

export default Settings;
