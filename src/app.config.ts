export default {
  lazyCodeLoading: 'requiredComponents',
  pages: [
    'pages/home/index',
  ],
  subPackages: [
    // {
    //   root: 'packageUser/',
    //   pages: [],
    // },
    // {
    //   root: 'packageHouse/',
    //   pages: [],
    // },
    // {
    //   root: 'packageActivity/',
    //   pages: [],
    // },
    {
      root: 'packageMessage',
      pages: [
        'message-detail/index',
      ],
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    enablePullDownRefresh: false,
    onReachBottomDistance: 50,
  },
  style: 'v2',
};
