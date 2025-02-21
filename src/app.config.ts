export default {
  lazyCodeLoading: 'requiredComponents',
  pages: ['pages/home/index'],
  subPackages: [
    {
      root: 'packageUser/',
      pages: [],
    },
    {
      root: 'packageHouse/',
      pages: [],
    },
    {
      root: 'packageActivity/',
      pages: [],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    enablePullDownRefresh: false,
    onReachBottomDistance: 50,
  },
  style: 'v2',
};
