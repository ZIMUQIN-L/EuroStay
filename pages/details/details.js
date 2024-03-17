Page({
    data: {
        detailInfo: {},
        active: 0,
        userOpenid: '',
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
        const userOpenid = wx.getStorageSync('userOpenid');
        this.setData({
            active: 0,
            userOpenid: userOpenid
        })
        var that = this;
        var detailId = wx.getStorageSync('DetailId');
        const db = wx.cloud.database()
        const _ = db.command
        db.collection('HouseInfo').where({
            _id: detailId
        })
            .get({
                success: function (res) {
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
            success: () => { },
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
            success: () => { },
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
    onClickConnect() {
        const db = wx.cloud.database()
        const _ = db.command
        var that = this
        if ("contact" in this.data.detailInfo && this.data.detailInfo["contact"] != '') {
            wx.setClipboardData({
                data: this.data.detailInfo["contact"],
                success: function (res) {
                    wx.getClipboardData({
                        success: function (res) {
                            console.log(res.data)
                        }
                    })
                }
            })
            wx.showModal({
                title: "房主微信已经赋值到您的剪贴板啦，可以给我们一些建议嘛~",
                editable: true,
                placeholderText: '可以给我们提出一些建议嘛（比如您觉得我们下一阶段需要实名嘛',
                success: res => {
                    if (res.confirm) {
                        console.log(res.content)
                        db.collection('UserAdvice').add({
                            data: {
                                userAdvice: res.content,
                                userOpenid: that.data.userOpenid
                            }
                        }).then(res => {
                            console.log(res)
                        })
                    } else {
                        console.log('用户点击了取消')
                    }
                }
            })
        }
        else {
            wx.setClipboardData({
                data: this.data.detailInfo["xhscontact"],
                success: function (res) {
                    wx.getClipboardData({
                        success: function (res) {
                            console.log(res.data)
                        }
                    })
                }
            })
            wx.showModal({
                title: "房主小红书已经赋值到您的剪贴板啦，可以给我们一些建议嘛~",
                editable: true,
                placeholderText: '可以给我们提出一些建议嘛（比如您觉得我们下一阶段需要实名嘛',
                success: res => {
                    if (res.confirm) {
                        console.log(res.content)
                        db.collection('UserAdvice').add({
                            data: {
                                userAdvice: res.content,
                                userOpenid: that.data.userOpenid
                            }
                        }).then(res => {
                            console.log(res)
                        })
                    } else {
                        console.log('用户点击了取消')
                    }
                }
            })
        }


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
});