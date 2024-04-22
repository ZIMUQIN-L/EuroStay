export default {
  pages: [
    'pages/home/index',
    'pages/house-detail/index',
    'pages/house-post/index',
    'pages/house-search/index',
    'pages/login/index',
    'pages/user-profile/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom',
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
        pagePath: 'pages/house-post/index',
        text: '房源post',
      },
      {
        pagePath: 'pages/user-profile/index',
        text: '用户profile',
      },
    ],
  },
};
