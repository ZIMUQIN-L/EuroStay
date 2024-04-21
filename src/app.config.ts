export default {
  pages: [
    "pages/temp-index/index",
    "pages/home/index",
    "pages/house-detail/index",
    "pages/house-post/index",
    "pages/house-search/index",
    "pages/login/index",
    "pages/user-profile/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
  },
  style: "v2",
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: "pages/temp-index/index",
        text: "测试页面",
      },
      {
        pagePath: "pages/home/index",
        text: "主页",
      },
      {
        pagePath: "pages/house-detail/index",
        text: "房源详情",
      },
      {
        pagePath: "pages/house-post/index",
        text: "房源post",
      },
      {
        pagePath: "pages/house-search/index",
        text: "房源搜索",
      },
      {
        pagePath: "pages/login/index",
        text: "登录",
      },
      {
        pagePath: "pages/user-profile/index",
        text: "用户profile",
      },
    ],
  },
};
