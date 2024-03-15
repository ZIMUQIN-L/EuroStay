Page({
  data: {
    detailInfo: {},
    active: 0,
    goods: {
      title: 'House ID',
      location: 'Tiny home in Madrid, Spain',
      guests: '2 guests | 1 bedroom | 1 bath',
      onwer: 'WX: 123456',
      price: 2680,
      formatPrice: '',
      express: '免运费',
      remain: 19,
      thumb:
        'https://img.yzcdn.cn/vant/cat.jpeg',
    },
  },
  onLoad() {
    this.setData({
      active: 0
    })
    var that  = this;
    var detailId = wx.getStorageSync('DetailId');
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('HouseInfo').where({
      _id: detailId
    })
    .get({
      success: function(res) {
        console.log(res);
        that.setData({
          detailInfo: res.data[0]
        })
      }
    })
  },

  onClickCart() {
    wx.navigateTo({
      url: '/pages/cart/index',
      success: () => {},
      error: () => {
        wx.showToast({
          icon: 'none',
          title: '打开购物车失败',
        });
      },
    });
  },

  onClickUser() {
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

  onClickButton() {
    wx.showToast({
      title: '暂无后续逻辑~',
      icon: 'none',
    });
  },

  sorry() {
    wx.showToast({
      title: '暂无后续逻辑~',
      icon: 'none',
    });
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
      url: '/pages/user/user',
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
      url: '/pages/repost/repost',
      success: () => {},
      error: () => {
        wx.showToast({
          icon: 'none',
          title: '打开个人中心失败',
        });
      },
    });
  },
});