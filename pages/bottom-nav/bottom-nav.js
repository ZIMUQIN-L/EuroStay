Page({
  data: {
    active: 0,
  },
  onLoad() {
    this.setData({
      active: 0,
    });
  },
  onGoHome() {
    wx.navigateTo({
      url: '/pages/home/home',
      success: () => {},
      error: () => {
        wx.showToast({
          icon: 'none',
          title: 'Fail to Open Home',
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
          title: 'Fail to open Profile',
        });
      },
    });
  },
  onGoPost() {
    wx.navigateTo({
      url: '/pages/repost/repost',
      success: () => {},
      error: () => {
        wx.showToast({
          icon: 'none',
          title: 'Fail to OpenHost',
        });
      },
    });
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },
});