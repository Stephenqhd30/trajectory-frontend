export default [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: '主页', icon: 'smile', component: './Welcome' },
  { path: '/post/:id', name: '帖子', hideInMenu: true, component: './Post' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { name: '用户管理', path: '/admin/user', component: './Admin/UserList' },
      { name: '帖子管理', path: '/admin/post', component: './Admin/PostList' },
      { name: '标签管理', path: '/admin/tag', component: './Admin/TagList' },
      { name: '图表管理', path: '/admin/chart', component: './Admin/ChartList' },
    ],
  },
  {
    path: '/create',
    name: '创建页',
    icon: 'AppstoreAddOutlined',
    access: 'canAdmin',
    routes: [
      { path: '/create', redirect: '/create/post' },
      { name: '创建帖子', path: '/create/post', component: './Create/Post' },
    ],
  },
  {
    path: '/generate',
    name: '智能分析',
    icon: 'PieChartOutlined',
    routes: [
      { path: '/generate', redirect: '/generate/analysis' },
      { name: '智能分析', path: '/generate/analysis', component: './Generate/Analysis' },
      { name: '生成图表', path: '/generate/chart', component: './Generate/Chart' },
    ]
  },
  {
    path: '/my/chart',
    name: '我的图表',
    icon: 'BarChartOutlined',
    component: './MyChart',
  },
  {
    path: '/account',
    name: '个人页',
    icon: 'user',
    routes: [
      { path: '/account', redirect: '/account/center' },
      { name: '个人中心', path: '/account/center', component: './Account/Center' },
      { name: '个人设置', path: '/account/settings', component: './Account/Settings' },
    ],
  },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '用户登录', path: '/user/login', component: './User/Login' },
      { name: '用户注册', path: '/user/register', component: './User/Register' },
    ],
  },
  {
    name: 'exception',
    path: '/exception',
    layout: false,
    routes: [
      {
        path: '/exception',
        redirect: '/exception/403',
      },
      {
        name: '403',
        icon: 'smile',
        path: '/exception/403',
        component: './Exception/403',
      },
      {
        name: '404',
        icon: 'smile',
        path: '/exception/404',
        component: './Exception/404',
      },
      {
        name: '500',
        icon: 'smile',
        path: '/exception/500',
        component: './Exception/500',
      },
    ],
  },
  { path: '*', layout: false, component: './Exception/404' },
];
