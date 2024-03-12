Page({
  data: {
    //data for display
    active: 1,
    num: 1, 
    contact: {},
    transformIdx: 0,
    position: 'center',
    duration: 300,
    show: false,
    overlay: false,
    isShowWhere: false,
    isShowInfo: false,
    isShowOwner: false,
    isShowImage: false,
    dateShowed: false,
    houseType: [
      {
        name: "studio",
        selected: false
      },
      {
        name: "shared",
        selected: false
      },
      {
        name: "ensuite",
        selected: false
      },
      {
        name: "apartment",
        selected: false
      }
    ],
    settings: [
      {
        name: 'WIFI',
        selected: false
      },
      {
        name: '独立卫浴',
        selected: false
      },
      {
        name: '洗衣机',
        selected: false
      },
      {
        name: '独立厨房',
        selected: false
      },
      {
        name: '冰箱',
        selected: false
      },
      {
        name: '空调',
        selected: false
      },
      {
        name: '沙发',
        selected: false
      },
      {
        name: '暖气',
        selected: false
      },
    ],
    surroundings: [
      {
        name: '近地铁',
        selected: false
      },
      {
        name: '近中超',
        selected: false
      },
      {
        name: '近景点',
        selected: false
      }
    ],
    preference: [
      {
        name: "宠物友好",
        selected:false
      },
      {
        name: "换宿",
        selected:false
      },
      {
        name: "短租",
        selected:false
      },
      {
        name: "限男生",
        selected:false
      },
      {
        name: "限女生",
        selected:false
      },
      {
        name: "不限",
        selected:false
      },
      {
        name: "可吸烟",
        selected:false
      },
      {
        name: "换洗床具",
        selected:false
      },

    ],
    chooseImgs: [],
    hideAdd: false, 
    // data for upload
    location: '',
    onshow: '',
    start_time: '',
    end_time: '',
    userHouseType: 'studio',
    capacity: 0,
    userHouseSetting: {
      WIFI: false, 
      独立卫浴: false,
      洗衣机: false,
      独立厨房: false,
      冰箱: false,
      空调: false, 
      沙发: false, 
      暖气: false,
    },
    userSurroundings: {
      近地铁: false,
      近中超: false,
      近景点: false
    },
    description: '',
    userPreference: {
      宠物友好: false,
      换宿: false,
      短租: false,
      限男生: false,
      限女生: false,
      不限: false,
      可吸烟: false,
      换洗床具: false
    },
    target: '',
    upload: [], 
    contact: '',
  },
  onLoad() {
    this.setData({
      active: 1,
      show: false,
      isShowInfo: false,
      isShowWhere: false,
      isShowOwner: false,
      isShowImage: false
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
  inputTypingWhere:function(e) {
    var that = this;
    if (e.detail.value=="") {
      return;
    }
    // listShowed=true;
    console.log(e)
    that.setData({
      location: e.detail,
    });
  },
  toConfirmWhere:function(e) {
    var that = this;
    that.setData({
      inputVal: e.detail,
    });
  },
  showWherePage(e) {
    this.setData({
      show: true,
      onshow: "where",
      isShowWhere: true,
    })
    console.log(this.data.isShowWhere);
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
    var start_month, end_month;
    var start_date, end_date;
    if (start.month < 10) {
      start_month = '0' + start.month;
    }
    else {
      start_month = start_month.month;
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
  onDesChange: function(e) {
    // console.log(e.detail);
    this.setData({
      description: e.detail,
    })
  },
  showInfoPage(e) {
    console.log(this.data.isShowWhere)
    this.setData({
      show: true,
      onshow: "where",
      isShowInfo: true,
    })
  },
  showOwnerPage(e) {
    this.setData({
      show: true,
      onshow: "where",
      isShowOwner: true,
    })
  },
  showPrev() {
    this.setData({
      show: false,
      isShowInfo: false,
      isShowWhere: false,
      isShowOwner: false,
      isShowImage: false
    })
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
  onClickHouseType:function(e) {
    console.log(e);
    var index = e.currentTarget.dataset.bindex;
    let housetype = this.data.houseType;
    if (housetype[index].selected == true) {
      housetype[index].selected = false;
    } else {
      housetype[index].selected = true;
    }
    console.log(this.data.houseType)
    this.setData({
      houseType: housetype,
      userHouseType: housetype[index].name
    })
  },
  onChangeCapacity(e) {
    // console.log(e.detail)
    this.setData({
      capacity: e.detail.value
    })
  },
  onClickHouseSetting(e) {
    var index = e.currentTarget.dataset.bindex;
    let housesetting = this.data.settings;
    let userSetting = this.data.userHouseSetting;
    if (housesetting[index].selected == true) {
      housesetting[index].selected = false;
      userSetting[housesetting[index].name] = false;
    } else {
      housesetting[index].selected = true;
      userSetting[housesetting[index].name] = true;
    }
    console.log(this.data.settings)
    this.setData({
      settings: housesetting,
      userHouseSetting: userSetting
    })
    console.log(this.data.userHouseSetting)
    console.log(this.data.settings)
  },
  onClickHouseSurroundings(e) {
    var index = e.currentTarget.dataset.bindex;
    let housesurro = this.data.surroundings;
    let userSurro = this.data.userSurroundings;
    if (housesurro[index].selected == true) {
      housesurro[index].selected = false;
      userSurro[housesurro[index].name] = false;
    } else {
      housesurro[index].selected = true;
      userSurro[housesurro[index].name] = true;
    }
    this.setData({
      surroundings: housesurro,
      userSurroundings: userSurro
    })
    console.log(this.data.surroundings)
    console.log(this.data.userSurroundings)
  },
  onClickHousePreference(e) {
    var index = e.currentTarget.dataset.bindex;
    let housepre = this.data.preference;
    let userPre = this.data.userPreference;
    if (housepre[index].selected == true) {
      housepre[index].selected = false;
      userPre[housepre[index].name] = false;
    } else {
      housepre[index].selected = true;
      userPre[housepre[index].name] = true;
    }
    this.setData({
      preference: housepre,
      userPreference: userPre
    })
    console.log(this.data.userPreference)
  },
  onTargetChange(e) {
    this.setData({
      target: e.detail,
    })
  },
  onContactChange(e) {
    this.setData({
      contact: e.detail,
    })
  },
  showImagePage(e) {
    this.setData({
      show: true,
      onshow: "where",
      isShowImage: true,
    })
  },
  previewImg: function (e) {
    const contentImg = e.currentTarget.dataset.item;
    // console.log("点击图片放大预览", contentImg);
    wx.previewImage({
        current: contentImg, //当前图片地址
        urls: [contentImg], //所有要预览的图片的地址集合 数组形式
        success: function (res) {
        },
        fail: function (res) {
        },
        complete: function (res) {
        },
    })
  },
/* ================== 点击图片删除 ================== */
  deleteImg: function (e) {
    const index = e.currentTarget.dataset.index;
    const {upload, chooseImgs} = this.data;
    upload.splice(index, 1);
    chooseImgs.splice(index, 1);
    // console.log("点击图片删除", index);
    this.setData({
        upload: upload,
        chooseImgs,
        hideAdd: chooseImgs.length === 9, // 是否隐藏添加图片的图标
    })
    console.log(upload)
  },
  uploadImgs: function () {
    const that = this;
    const chooseImgs = this.data.chooseImgs;
    wx.chooseImage({
        count: 9 - chooseImgs.length, 
        sizeType: ['original', 'compressed'], 
        sourceType: ['album', 'camera'], 
        success: function (res) {
            const newChooseImgs = res.tempFilePaths;
            const imgInfo = res.tempFiles;
            for (let i = 0; i < imgInfo.length; i++) {
                console.log("尺寸", imgInfo[i].size);
                if (imgInfo[i].size / 1024 / 1024 >= 10) {
                    wx.showModal({
                        title: '提示', 
                        content: "图片超过10MB啦~",
                        showCancel: false, 
                        confirmText: '确定', 
                    });
                    return
                }
                const imgSplit = imgInfo[i].path.split(".");
                const imgSLen = imgSplit.length;
                // console.log("格式", imgSplit, imgSLen, imgSLen - 1);
                if (["jpg", "jpeg", "png"].includes(imgSplit[imgSLen - 1])) {
                    console.log("格式正确");
                } else {
                    console.log("格式错误");
                    utils.showModalInfo({
                        content: "请选择正确的图片格式上传",
                    });
                    return
                }
            }

            console.log("选择图片之前", res, chooseImgs, newChooseImgs);
            newChooseImgs.forEach(item => {
                chooseImgs.push(item);
            });
            if (chooseImgs.length > 9) {
              wx.showModal({
                title: '提示',
                content: "请选择正确的图片格式上传",
                showCancel: false,
                confirmText: '确定',
              });
            }
            console.log("显示添加图片", chooseImgs.length);
            if (chooseImgs.length > 0) {
              if (chooseImgs.length >= 9) {
                  that.setData({
                      hideAdd: true
                  })
              } else {
                  that.setData({
                      hideAdd: false
                  })
                }
                that.setData({
                    chooseImgs
                });
                wx.showLoading({
                  title: '上传中...',
                  mask: true // 显示透明蒙层防止触摸穿透
                });
                //  网络请求 上传图片
                const requestMsg = [];
                let uploadedCount = 0;
                newChooseImgs.forEach(item => {
                  wx.cloud.uploadFile({
                      cloudPath: "userPhoto/" + Date.now() + ".jpg", 
                      filePath: item, 
                      success: res => {
                        console.log('上传成功', res);
                        const upload = that.data.upload;
                        upload.push(res.fileID)
                        that.setData({
                          upload: upload,
                          imageShowed: false
                        })
                      },
                      fail: e => {
                        console.error('上传失败', e);
                        wx.showToast({
                          title: '上传失败',
                          icon: 'none',
                        });
                      },
                      complete: () => {
                          wx.hideLoading();
                        
                      }
                    })
                    
                });
            }
        }
    })
  },
  onSubmitInfo() {
    var that = this;
    const db = wx.cloud.database()
    const _ = db.command
    console.log(that.data.number)
    db.collection('HouseInfo').add({
      data: {
        location: that.data.location,
        start_date: that.data.start_time,
        end_date: that.data.end_time,
        houseType: this.data.userHouseType,
        capacity: this.data.capacity,
        houseSetting: this.data.userHouseSetting,
        houseSurrounding: this.data.userSurroundings,
        description: this.data.description,
        preference: this.data.userPreference,
        ownerTarget: this.data.target,
        contact: this.data.contact,
        images: this.data.upload,
      }
    })
    .then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    });
    console.log("here")
    wx.navigateTo({
      url: '/pages/home/home',
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