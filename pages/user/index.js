Page({
  data: {
    userInfo: '',
    userOpenid: '',
    userProfileInfo: '',
    active: 2,
  },
  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    const userProfileInfo = wx.getStorageSync('userProfileInfo');
    const userOpenid = wx.getStorageSync('userOpenid');
    this.setData({
      userInfo: userInfo,
      userProfileInfo: userProfileInfo,
      userOpenid: userOpenid,
      active: 2
    })
    console.log(userProfileInfo)
  },
  onGoHome() {
    wx.navigateTo({
      url: '/pages/home/home',
      success: () => {},
      error: () => {
        wx.showToast({
          icon: 'none',
          title: '打开个人中心失败',
        });
      },
    });
  },
  onGoProfile() {
    wx.navigateTo({
      url: '/pages/user/index',
      success: () => {},
      error: () => {
        wx.showToast({
          icon: 'none',
          title: '打开个人中心失败',
        });
      },
    });
  },
  onGoPost() {
    wx.navigateTo({
      url: '/pages/post/post',
      success: () => {},
      error: () => {
        wx.showToast({
          icon: 'none',
          title: '打开个人中心失败',
        });
      },
    });
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },
});
