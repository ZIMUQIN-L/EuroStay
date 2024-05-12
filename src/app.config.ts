export default {
  lazyCodeLoading: 'requiredComponents',
  pages: [
    'pages/login/index',
    'pages/home/index',
    'pages/user-profile/index',
    'pages/house-edit/index',
  ],
  subPackages: [
    {
      root: 'packageUser/',
      pages: ['user-edit/index'],
    },
    {
      root: 'packageHome/',
      pages: ['house-detail/index'],
    },
    {
      root: 'packageHousePost/',
      pages: ['index'],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    enablePullDownRefresh: true,
    onReachBottomDistance: 50,
  },
  style: 'v2',
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/home/index',
        text: '主页',
      },
      {
        pagePath: 'pages/user-profile/index',
        text: '用户profile',
      },
    ],
  },
};
