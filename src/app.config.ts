export default {
  lazyCodeLoading: 'requiredComponents',
  pages: ['pages/login/index', 'pages/home/index', 'pages/user-profile/index'],
  subPackages: [
    {
      root: 'packageUser/',
      pages: [
        'user-edit/index',
        'user-detail/index',
        'my-accommodation/index',
        'my-houses/index',
        'my-offering/index',
        'review-on-house/index'
      ],
    },
    {
      root: 'packageHouse/',
      pages: [
        'house-detail/index',
        'house-post/index',
        'house-edit/index',
        'house-review/index',
      ],
    },
    {
      root: 'packageActivity/',
      pages: [
        'my-activities/index',
      ],
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
