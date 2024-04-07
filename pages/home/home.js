const common = require('../../utils/common_func.js');
Page({
    onShareAppMessage: function () {
      return common.globalShareMessage();
    },
    onShareTimeline: function () {
      return common.globalShareTimeline();
    },
    data: {
        active: 0,
        position: 'center',
        duration: 300,
        show: false,
        overlay: false,
        searchRes: {},
        filtering1: [
            {
                name: 'WIFI',
                selected: false,
                iconPath: '/icons/tag-icons/wifi.png'
            },
            {
                name: '独立卫浴',
                selected: false,
                iconPath: '/icons/tag-icons/独立卫浴.png'
            },
            {
                name: '洗衣机',
                selected: false,
                iconPath: '/icons/tag-icons/洗衣机.png'
            },
            {
                name: '独立厨房',
                selected: false,
                iconPath: '/icons/tag-icons/独立厨房.png'
            },
            {
                name: '冰箱',
                selected: false,
                iconPath: '/icons/tag-icons/冰箱.png'
            },
            {
                name: '空调',
                selected: false,
                iconPath: '/icons/tag-icons/空调.png'
            },
            {
                name: '沙发',
                selected: false,
                iconPath: '/icons/tag-icons/沙发.png'
            },
            {
                name: '暖气',
                selected: false,
                iconPath: '/icons/tag-icons/暖气.png'
            }
        ],
        filtering2: [
            {
                name: '近地铁',
                selected: false,
                iconPath: '/icons/tag-icons/近地铁.png'
            },
            {
                name: '近中超',
                selected: false,
                iconPath: '/icons/tag-icons/近中超.png'
            },
            {
                name: '近景点',
                selected: false,
                iconPath: '/icons/tag-icons/近景点.png'
            }
        ],
        filtering3: [
            {
                name: "宠物友好",
                selected: false,
                iconPath: '/icons/tag-icons/宠物友好.png'
            },
            {
                name: "换宿",
                selected: false,
                iconPath: '/icons/tag-icons/换宿.png'
            },
            {
                name: "短租",
                selected: false,
                iconPath: '/icons/tag-icons/短租.png'
            },
            {
                name: "限男生",
                selected: false,
                iconPath: '/icons/tag-icons/限男生.png'
            },
            {
                name: "限女生",
                selected: false,
                iconPath: '/icons/tag-icons/限女生.png'
            },
            {
                name: "不限性别",
                selected: false,
                iconPath: '/icons/tag-icons/男女不限.png'
            },
            {
                name: "可吸烟",
                selected: false,
                iconPath: '/icons/tag-icons/可吸烟.png'
            },
            {
                name: "换洗床具",
                selected: false,
                iconPath: '/icons/tag-icons/换洗床具.png'
            },
        ],
        list: new Array(10).fill("https://img.yzcdn.cn/vant/cat.jpeg"),
        userfilter1: {
            WIFI: false,
            独立卫浴: false,
            洗衣机: false,
            独立厨房: false,
            冰箱: false,
            空调: false,
            沙发: false,
            暖气: false,
        },
        userfilter2: {
            近地铁: false,
            近中超: false,
            近景点: false,
        },
        userfilter3: {
            宠物友好: false,
            换宿: false,
            短租: false,
            限男生: false,
            限女生: false,
            不限性别: false,
            可吸烟: false,
            换洗床具: false
        },
        filterConsult1: {},
        filterConsult2: {},
        filterConsult3: {}
    },
    onShow() {
        this.setData({
            active: 0,
        });
    },
    onLoad() {
        console.log("load home")
        var that = this;
        var location = wx.getStorageSync('location');
        var number = wx.getStorageSync('number');
        var startDate = wx.getStorageSync('startDate');
        var endDate = wx.getStorageSync('endDate');
        console.log(location, number, startDate, endDate)
        console.log(number)
        this.setData({
            active: 0,
        });
        if (number == "") {
            number = '0';
        }
        ;
        if (startDate == "") {
            startDate = "9999-99-99";
        }
        ;
        if (endDate == "") {
            endDate = "2000-01-01"
        }
        ;
        const db = wx.cloud.database()
        const _ = db.command
        console.log(location, number, startDate, endDate)
        db.collection('HouseInfo').where({
            location: db.RegExp({
                regexp: '^.*' + location + '.*',
            }),
            capacity: _.gte(Number(number)),
            start_date: _.lte(startDate),
            end_date: _.gte(endDate),
        })
            .get({
                success: function (res) {
                    console.log(res);
                    that.setData({
                        searchRes: res.data
                    })
                    console.log(that.data.searchRes)
                }
            })
    },
    onClickSearch() {
        wx.navigateTo({
            url: '/pages/search/search',
            success: () => {
            },
            error: () => {
                wx.showToast({
                    icon: 'none',
                    title: '打开搜索失败',
                });
            },
        });
    },
    onClickFilters1(e) {
        var index = e.currentTarget.dataset.bindex;
        let ftr = this.data.filtering1;
        let userftr = this.data.userfilter1;
        let consult = this.data.filterConsult1;
        if (ftr[index].selected == true) {
            ftr[index].selected = false;
            userftr[ftr[index].name] = false;
            delete consult[ftr[index].name];
        } else {
            ftr[index].selected = true;
            userftr[ftr[index].name] = true;
            consult[ftr[index].name] = true;
        }
        this.setData({
            filtering1: ftr,
            userfilter1: userftr,
            filterConsult1: consult,
        })
        console.log(this.data.filterConsult1)
    },
    onClickFilters2(e) {
        var index = e.currentTarget.dataset.bindex;
        let ftr = this.data.filtering2;
        let userftr = this.data.userfilter2;
        let consult = this.data.filterConsult2;
        if (ftr[index].selected == true) {
            ftr[index].selected = false;
            userftr[ftr[index].name] = false;
            delete consult[ftr[index].name];
        } else {
            ftr[index].selected = true;
            userftr[ftr[index].name] = true;
            consult[ftr[index].name] = true;
        }
        this.setData({
            filtering2: ftr,
            userfilter2: userftr,
            filterConsult2: consult,
        })
        console.log(this.data.filterConsult2)
    },
    onClickFilters3(e) {
        var index = e.currentTarget.dataset.bindex;
        let ftr = this.data.filtering3;
        let userftr = this.data.userfilter3;
        let consult = this.data.filterConsult3;
        if (ftr[index].selected == true) {
            ftr[index].selected = false;
            userftr[ftr[index].name] = false;
            delete consult[ftr[index].name];
        } else {
            ftr[index].selected = true;
            userftr[ftr[index].name] = true;
            consult[ftr[index].name] = true;
        }
        this.setData({
            filtering3: ftr,
            userfilter3: userftr,
            filterConsult3: consult,
        })
        console.log(this.data.filterConsult3)
    },
    onClickUser() {
        wx.navigateTo({
            url: '/pages/user/index',
            success: () => {
            },
            error: () => {
                wx.showToast({
                    icon: 'none',
                    title: '打开个人中心失败',
                });
            },
        });
    },
    onClickHouse: function (e) {
        // console.log(e)
        // console.log(this.data.searchRes)
        // console.log(e.currentTarget.dataset.bindex)
        var index = e.currentTarget.dataset.bindex;
        console.log(this.data.searchRes[index]._id)
        wx.setStorageSync('DetailId', this.data.searchRes[index]._id);
        wx.navigateTo({
            url: '/pages/details/details',
            success: () => {
            },
            error: () => {
                wx.showToast({
                    icon: 'none',
                    title: '打开个人中心失败',
                });
            },
        })
    },
    onClickFilter() {
        this.setData({
            show: true,
        })
    },
    showPrev() {
        this.setData({
            show: false,
        })
        var that = this;
        var location = wx.getStorageSync('location');
        var number = wx.getStorageSync('number');
        var startDate = wx.getStorageSync('startDate');
        var endDate = wx.getStorageSync('endDate');
        if (number == "") {
            number = '0';
        }
        ;
        if (startDate == "") {
            startDate = "9999-99-99";
        }
        ;
        if (endDate == "") {
            endDate = "2000-01-01"
        }
        ;
        const db = wx.cloud.database()
        const _ = db.command
        console.log(location, number, startDate, endDate)
        db.collection('HouseInfo').where({
            location: db.RegExp({
                regexp: '^.*' + location + '.*',
            }),
            capacity: _.gte(Number(number)),
            start_date: _.lte(startDate),
            end_date: _.gte(endDate),
            houseSetting: that.data.filterConsult1,
            houseSurrounding: that.data.filterConsult2,
            preference: that.data.filterConsult3
        })
            .get({
                success: function (res) {
                    console.log(res);
                    that.setData({
                        searchRes: res.data
                    })
                    console.log(that.data.searchRes)
                }
            })
    },
    onClickButton() {
        wx.showToast({
            title: '暂无后续逻辑~',
            icon: 'none',
        });
    },
    onGoHome() {
        wx.navigateTo({
            url: '/pages/home/home',
            success: () => {
            },
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
            success: () => {
            },
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
            success: () => {
            },
            error: () => {
                wx.showToast({
                    icon: 'none',
                    title: '打开个人中心失败',
                });
            },
        });
    },
    onChange(event) {
        // event.detail 的值为当前选中项的索引
        this.setData({active: event.detail});
    },
    sorry() {
        wx.showToast({
            title: '暂无后续逻辑~',
            icon: 'none',
        });
    },
});