export default {
  lazyCodeLoading: 'requiredComponents',
  pages: [
    'pages/home/index',
    'pages/date-select/index',
    'pages/city-select/index',
    'pages/house-publish/index',
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
  ],
  window: {
    backgroundTextStyle: 'light',
    enablePullDownRefresh: false,
    onReachBottomDistance: 50,
  },
  style: 'v2',
};
