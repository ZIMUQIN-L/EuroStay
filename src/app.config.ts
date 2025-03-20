export default {
  lazyCodeLoading: 'requiredComponents',
  pages: [
    'pages/login/index',
    'pages/messages/index',
    'pages/user/index',
    'pages/orders/index',
    'pages/home-world/index',
    'pages/house-publish/index',
    'pages/activity-publish/index',
    'pages/common-setting/index',
    'pages/user-setting/index',
  ],
  subPackages: [
    {
      root: 'packageUser/',
      pages: [
        'user-editing/index',
        'user-vip/index',
        'about-es/index',
        'user-contact/index',
        'edit-nickname/index',
        'edit-location/index',
        'edit-about/index',
        'edit-tags/index',
        'edit-email/index',
        'edit-phone/index',
      ],
    },
    {
      root: 'packageHouse/',
      pages: [
        'housing-apply/index',
        'housing-detail/index',
      ],
    },
    {
      root: 'packageOrder/',
      pages: [
        'order-detail/index',
        'order-review/index',
      ],
    }
    // {
    //   root: 'packageHouse/',
    //   pages: [],
    // },
    // {
    //   root: 'packageActivity/',
    //   pages: [],
    // },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarTitleText: '小程序',
    navigationBarBackgroundColor: '#f5f5f5',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true,
    onReachBottomDistance: 50,
  },
  style: 'v2',
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/home-world/index',
        text: '主页',
      },
      {
        pagePath: 'pages/orders/index',
        text: 'orders',
      },
      {
        pagePath: 'pages/messages/index',
        text: 'messages',
      },
      {
        pagePath: 'pages/user-setting/index',
        text: 'user',
      },
    ],
  },
};
