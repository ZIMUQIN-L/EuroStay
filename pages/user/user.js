const common = require('../../utils/common_func.js');
Page({
    onShareAppMessage: function () {
      return common.globalShareMessage();
    },
    onShareTimeline: function () {
      return common.globalShareTimeline();
    },
    data: {
        userInfo: '',
        userDbInfo: '',
        userOpenid: '',
        userProfileInfo: '',
        userHouseInfo: {},
        active: 2,
        position: 'center',
        duration: 300,
        show: false,
        overlay: false,
        avatarUrl: '',
        userDescription: '',
        userNickName: '',
        imageURL: '',
        isGoNavigation: false,
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
        console.log(userOpenid)
        db.collection('UserInfo').where({
            userOpenid: userOpenid
        })
            .get({
                success: function (res) {
                    console.log(res);
                    that.setData({
                        userDbInfo: res.data[0],
                    });
                    console.log(that.data.userDbInfo);
                }
            })
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
            active: 2,
            isGoNavigation: true
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
    onClickModify() {
        this.setData({
            show: true,
        })
    },
    showPrev() {
        var that = this;
        this.setData({
            show: false,
        })
        console.log(this.data.imageURL)
        const db = wx.cloud.database()
        const _ = db.command
        db.collection('UserInfo').doc(this.data.userDbInfo._id).update({
            data: {
                avatarUrl: this.data.imageURL,
                userDes: this.data.userDescription,
                nickName: this.data.userNickName
            },
            success: function (res) {
                console.log(res)
            }
        })
        
        this.onLoad();
    },
    onChooseAvatar(e) {
        const { avatarUrl } = e.detail
        console.log(e)
        this.setData({
            avatarUrl: avatarUrl,
        })
        let cloudPath = "userAvatar/" + Date.now() + ".jpg";
        wx.cloud.uploadFile({
            cloudPath: cloudPath,
            filePath: this.data.avatarUrl,
            success: res => {
                console.log(res);
                this.setData({
                    imageURL: res.fileID
                })
            }
        })
    },
    onDelHouseInfo(e) {
        var that = this;
        wx.showModal({
            title: '房源修改提示',
            content: '确认要删除您的房源嘛~',
            success(res) {
                if (res.confirm) {
                    var index = e.currentTarget.dataset.bindex;
                    var houseInfo = that.data.userHouseInfo[index];
                    console.log(houseInfo)
                    const db = wx.cloud.database()
                    const _ = db.command
                    db.collection('HouseInfo').where({
                        _id: houseInfo._id,
                    }).remove({
                        success: function (res) {
                            console.log(res.data)
                        }
                    })
                    wx.navigateTo({
                        url: '/pages/home/home'
                    })

                } else if (res.cancel) {
                    console.log('cancel')
                }
            }
        })
    },
    onChangeNickname(e) {
        console.log(e.detail.value)
        this.setData({
            userNickName: e.detail.value
        })
    },
    onChangeDes(e) {
        console.log(e.detail.value)
        this.setData({
            userDescription: e.detail.value
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
        if(!this.data.isGoNavigation) {
            wx.navigateTo({
                url: '/pages/user/user',
                success: () => {
                },
                error: () => {
                    wx.showToast({
                        icon: 'none',
                        title: '打开个人中心失败',
                    });
                },
            });
        }
    },
    onGoPost() {
        wx.redirectTo({
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
