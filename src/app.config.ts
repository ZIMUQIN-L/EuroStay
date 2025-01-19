export default {
  lazyCodeLoading: 'requiredComponents',
  pages: [
    'pages/login/index',
    'pages/home/index',
    'pages/user-profile/index',
    'pages/activity/index',
    'pages/travel/index',
    'pages/messages/index',
    'pages/notification/index',
    'pages/emergency/index',
  ],
  subPackages: [
    {
      root: 'packageUser/',
      pages: [
        'user-edit/index',
        'user-detail/index',
        'my-accommodation/index',
        'my-houses/index',
        'my-offering/index',
        'review-on-house/index',
        'my-points/index',
        'point-details/index',
        'my-activities/index',
        'travel-coins/index',
        'traveler-system/index',
        'travel-detail/index',
        'message-detail/index',
        'host-view-more/index',
        'guest-view-more/index',
      ],
    },
    {
      root: 'packageHouse/',
      pages: [
        'house-detail/index',
        'house-post/index',
        'house-edit/index',
        'house-review/index',
        'seek-post/index',
        'house-application-submission/index',
      ],
    },
    {
      root: 'packageActivity/',
      pages: [
        'activity-detail/index',
        'activity-post/index',
        'activity-application/index',
        'activity-apply-eurostay/index',
        'activity-submission-detail/index',
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    enablePullDownRefresh: false,
    onReachBottomDistance: 50,
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
        pagePath: 'pages/user-profile/index',
        text: '用户profile',
      },
      {
        pagePath: 'pages/travel/index',
        text: '旅迹',
      },
      {
        pagePath: 'pages/messages/index',
        text: '消息',
      }
    ],
  },
};
