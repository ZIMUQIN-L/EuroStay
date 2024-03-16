Page({
  data: {
    detailInfo: {},
    active: 0,
    settings: {
        WIFI: '/icons/tag-icons/wifi.png',
        独立卫浴: '/icons/tag-icons/独立卫浴.png',
        洗衣机: '/icons/tag-icons/洗衣机.png',
        独立厨房: '/icons/tag-icons/独立厨房.png',
        冰箱: '/icons/tag-icons/冰箱.png',
        空调: '/icons/tag-icons/空调.png',
        沙发: '/icons/tag-icons/沙发.png',
        暖气: '/icons/tag-icons/暖气.png',
    },
    surroundings: {
        近地铁: '/icons/tag-icons/近地铁.png',
        近中超: '/icons/tag-icons/近中超.png',
        近景点: '/icons/tag-icons/近景点.png',
    },
    preference: {
        宠物友好: '/icons/tag-icons/宠物友好.png',
        换宿: '/icons/tag-icons/换宿.png',
        短租: '/icons/tag-icons/短租.png',
        限男生: '/icons/tag-icons/限男生.png',
        限女生: '/icons/tag-icons/限女生.png',
        不限性别: '/icons/tag-icons/男女不限.png',
        可吸烟: '/icons/tag-icons/可吸烟.png',
        换洗床具: '/icons/tag-icons/换洗床具.png'
  
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