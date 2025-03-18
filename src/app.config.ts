export default {
  lazyCodeLoading: 'requiredComponents',
  pages: [
    'pages/login/index',
    'pages/home/index',
  ],
  subPackages: [
    {
      root: 'packageUser/',
      pages: [
        'user-setting/index',
        'user-editing/index',
        'user-vip/index',
        'about-es/index',
        'user-contact/index',
        'edit-nickname/index',
        'edit-location/index',
        'edit-about/index',
        'edit-tags/index',
        'edit-email/index',
        'edit-phone/index'
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
    enablePullDownRefresh: false,
    onReachBottomDistance: 50,
  },
  style: 'v2',
};
