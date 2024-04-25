export default {
  pages: [
    'pages/login/index',
    'pages/home/index',
    'pages/house-detail/index',
    'pages/house-post/index',
    'pages/user-profile/index',
    'pages/user-edit/index',
  ],
  window: {
    backgroundTextStyle: 'light',
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
