export default {
  lazyCodeLoading: 'requiredComponents',
  pages: [
    'pages/home/index',
  ],
  subPackages: [
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
