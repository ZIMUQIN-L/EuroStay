//inputVal: 地点，city
//date: 入住日期
//number: 入住人数
const common = require('../../utils/common_func.js');
Page({
    onShareAppMessage: function () {
      return common.globalShareMessage();
    },
    onShareTimeline: function () {
      return common.globalShareTimeline();
    },
  data: {
    date: '',
    active: 0,
    inputVal: '',
    start_time: '',
    end_time: '',
    number: '',
    listShowed: false,
    dateShowed: false,
    list: [
    ],
  },
  onLoad() {
    this.setData({
      inputVal: '',
    });
  },
  inputTyping:function(e) {
    // var that = this;
    // if (e.detail.value=="") {
    //   return;
    // }
    // // listShowed=true;
    // console.log(e)
    // that.setData({
    //   inputVal: e.detail,
    //   listShowed: true
    // });
    // console.log(this.data.inputVal);

    // new
    var that = this;
    if (e.detail.value=="") {
      return;
    }
    const db = wx.cloud.database()
    const $ = db.command.aggregate
    db.collection('HouseInfo').aggregate()
      .match({       
        location: db.RegExp({
          regexp: '.*' + e.detail + '.*',
          options: 'i',
        })      
      })
      .project({    
        location:true,
      })
      .group({
        _id: null,
        cityList: $.addToSet('$location')
      }).end()
      .then(res => {
        if (res.list.length != 0) {
          that.setData({
            list: res.list[0].cityList,
          })
        }
        else {
          that.setData({
            list: [],
          })
        }
      })
    // db.collection('HouseInfo').field({
    //   location:true,
    // }).where({
    //   location: db.RegExp({
    //     regexp: '.*' + e.detail + '.*',
    //     options: 'i',
    //   })
    // })
    // .get({
    //   success: function(res) {
    //     console.log(res.data);
    //     // console.log(res.data[0]['name']);
    //     var names = []
    //     for (var i = 0; i < res.data.length; i ++) {
    //       names.push(res.data[i].location)
    //     };
    //     that.setData({
    //       list: names
    //     })

    //     console.log(list)
    //   }
    // })
    that.setData({
      inputVal: e.detail,
      listShowed: true
    });
  },
  toConfirm:function(e) {
    var that = this;
    that.setData({
      inputVal: e.detail,
      listShowed: false
    });
  },
  dateDisplay() {
    console.log("clickinput");
    this.setData({ dateShowed: true });
  },
  onDateClose() {
    this.setData({ dateShowed: false });
  },
  onDateConfirm(event) {
    let {
      end,
      start
    } = event.detail;
    console.log(event.detail)
    var start_month, end_month;
    var start_date, end_date;
    if (start.month < 10) {
      start_month = '0' + start.month;
    }
    else {
      start_month = start.month;
    }
    if (end.month < 10) {
      end_month = '0' + end.month;
    }
    else {
      end_month = end.month;
    }
    if (start.date < 10) {
      start_date = '0' + start.date;
    }
    else {
      start_date = start.date;
    }
    if (end.date < 10) {
      end_date = '0' + end.date;
    }
    else {
      end_date = end.date;
    }
    this.setData({
      dateShowed: false,
      start_time: start.year + "-" + start_month + "-" + start_date,
      end_time: end.year + "-" + end_month + "-" + end_date,
      date: start.year + "-" + start_month + "-" + start_date + " to " + end.year + "-" + end_month + "-" + end_date
    });
  },
  onClickList: function(e) {
    console.log("click")
    console.log(e.detail)
    console.log(e)
    this.setData({  
      inputVal: e._relatedInfo.anchorTargetText,
      listShowed: false
    });

  },
  onNumberChange: function(e) {
    console.log(e.detail);
    this.setData({  
      number: e.detail,
    });
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
  onClickSearch() {
    // console.log("search")
    wx.setStorageSync('location', this.data.inputVal);
    wx.setStorageSync('number', this.data.number);
    wx.setStorageSync('startDate', this.data.start_time);
    wx.setStorageSync('endDate', this.data.end_time);
    wx.navigateTo({
      url: '/pages/home/home'
    });
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
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  sorry() {
    wx.showToast({
      title: '暂无后续逻辑~',
      icon: 'none',
    });
  },
});