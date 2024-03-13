Page({
  data: {
    userOpenid: '',
    userInfo: '',
  },
  onLoad() {
    var that = this;
    var userId = wx.getStorageSync('userOpenid');
    var userInfo = wx.getStorageSync('userInfo');
    if (userId != "" && userInfo != "") {
      that.setData({
        userOpenid: userId
      })
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
    }
  },
  onLoginWechat() {
    wx.getUserInfo({
      success: function(res) {
        console.log(res);
        wx.setStorageSync('userOpenid', res.userInfo)
      }
    });
    wx.getUserProfile({
      desc: 'desc',
      success: function(res) {
        console.log(res.userInfo)
        wx.setStorageSync('userInfo', res.userInfo)
      }
    })
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
  onDirectUse() {
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
  onAfterLeave() {
    this.setData({
      active: 1,
      show: false,
      isShowInfo: false,
      isShowWhere: false,
      isShowOwner: false,
      isShowImage: false
    });
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },
});