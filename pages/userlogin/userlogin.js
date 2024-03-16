Page({
    data: {
        userProfileInfo: '',
        userInfo: '',
        userOpenid: '',
    },
    onLoad() {
        var that = this;
        var userProfileInfo = wx.getStorageSync('userProfileInfo');
        var userInfo = wx.getStorageSync('userInfo');
        var userOpenid = wx.getStorageSync('userOpenid');
        if (userProfileInfo != "" && userInfo != "" && userOpenid != "") {
            that.setData({
                userOpenid: userOpenid,
                userProfileInfo: userProfileInfo,
                userInfo: userInfo,
            })
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
        }
    },
    onLoginWechat() {
        wx.getUserInfo({
            success: function (res) {
                console.log(res);
                wx.setStorageSync('userInfo', res.userInfo)
            }
        });
        wx.login({
            success: (res) => {
                console.log(res);
                let code = res.code;
                wx.request({
                    url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx24e83617ca9cdc41&secret=b278e397a8142c5f551141245bbddb23&js_code=${code}&grant_type=authorization_code`,
                    success: (res) => {
                        console.log(res.data.openid)
                        wx.setStorageSync('userOpenid', res.data.openid)
                    }
                })
            },
        })
        wx.getUserProfile({
            desc: 'desc'
        }).then(res => {
            console.log(res.userInfo),
                wx.setStorageSync('userProfileInfo', res.userInfo)
        })
        var userProfile = wx.getStorageSync('userProfileInfo');
        var userInfo = wx.getStorageSync('userInfo');
        var userOpenid = wx.getStorageSync('userOpenid');
        var that = this;
        var data_lenth = 0;
        const db = wx.cloud.database()
        const _ = db.command
        db.collection('UserInfo').where({
            userOpenid: userOpenid
        }).get({
            success: function (res) {
                console.log(res.data.length);
                if (res.data.length == 0) {
                    db.collection('UserInfo').add({
                        data: {
                            userOpenid: userOpenid,
                            nickName: userProfile['nickName'],
                            avatarUrl: userProfile['avatarUrl'],
                            userDes: '',
                        }
                    }).then(res => {
                        console.log(res)
                    })
                }
            }
        })
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
    onDirectUse() {
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
    onAfterLeave() {
        this.setData({
            active: 0,
        });
    }
});