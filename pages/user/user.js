Page({
    data: {
        userInfo: '',
        userOpenid: '',
        userProfileInfo: '',
        userHouseInfo: {},
        active: 2,
    },
    onLoad() {
        var that = this;
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
        const db = wx.cloud.database()
        const _ = db.command
        db.collection('HouseInfo').where({
            userOpenid: this.data.userOpenid
        })
            .get({
                success: function (res) {
                    console.log(res);
                    that.setData({
                        userHouseInfo: res.data
                    });
                    console.log(that.data.userHouseInfo);
                }
            })
    },
    onShow() {
        var that = this;
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
        const db = wx.cloud.database()
        const _ = db.command
        db.collection('HouseInfo').where({
            userOpenid: this.data.userOpenid
        })
            .get({
                success: function (res) {
                    console.log(res);
                    that.setData({
                        userHouseInfo: res.data
                    });
                    console.log(that.data.userHouseInfo);
                }
            })
    },
    onDelHouseInfo(e) {
        var that = this;
        wx.showModal({
            title: '房源修改提示',
            content: '确认要删除您的房源嘛~',
            success (res) {
              if (res.confirm) {
                var index = e.currentTarget.dataset.bindex;
                var houseInfo = that.data.userHouseInfo[index];
                console.log(houseInfo)
                const db = wx.cloud.database()
                const _ = db.command
                db.collection('HouseInfo').where({
                    _id: houseInfo._id,
                }).remove({
                    success: function(res) {
                      console.log(res.data)
                    }
                  })
                  wx.navigateTo({
                    url: '/pages/home/home'})

              } else if (res.cancel) {
                console.log('cancel')
              }
            }
          })
    },
    onGoHome() {
        wx.navigateTo({
            url: '/pages/home/home',
            success: () => { },
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
            success: () => { },
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
            success: () => { },
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
