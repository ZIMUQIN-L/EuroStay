export default {
  lazyCodeLoading: 'requiredComponents',
  pages: [
        'pages/login/index',
        'pages/home/index'
        ],
  subPackages: [
    {
      root: 'packageUser/',
      pages: [
        'user-setting/index',
        'user-editing/index',
        'user-vip/index',
        'edit-nickname/index',
        'edit-location/index',
        'edit-about/index',
        'edit-tags/index',
        'edit-email/index'
      ],
    },
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
    enablePullDownRefresh: false,
    onReachBottomDistance: 50,
  },
  style: 'v2',
};
