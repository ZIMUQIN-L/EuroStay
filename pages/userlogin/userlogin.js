const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const userAgreementContent =  `在使用留学生换宿信息平台EuroStay（以下简称“平台”）之前，请您仔细阅读并充分理解本协议各条款。您需要选择接受或不接受本协议。除非您接受本协议所有条款，否则您无权注册、登录或使用本服务所提供的相关功能。您的登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。
 
1.服务说明：本平台致力于为留学生提供一个交流和分享换宿信息的平台，用户可以发布和查询换宿或租赁信息。本平台上的所有信息均来自用户或其他资源方，并需要用户进一步自行核实，本平台不提供任何形式的担保。
            
2.用户责任：用户必须为自己注册账户下的一切行为负责，包括您所发布的任何内容以及由此产生的任何后果。用户应确保发布信息的真实性、合法性，并承担因使用本服务而引起的所有风险和责任。
            
3.内容规范：用户不得发布任何违法国家法律法规和社会公序良俗的信息，包括但不限于以下内容：涉及国家安全、损害国家荣誉和利益、煽动民族仇恨和歧视、破坏宗教政策和民族团结的信息；传播淫秽、色情、赌博、暴力、恐怖或教唆犯罪的内容；侵犯他人名誉权、肖像权、知识产权等合法权益的信息。
            
4.免责声明：鉴于网络环境的特殊性，本平台无法预见和控制各种风险，包括但不限于信息真实性、合法性的风险，用户间交易的风险，以及网络安全的风险。因此，用户应自行承担以上风险，本平台不承担任何法律责任。
            
5.服务变更、中断或终止：鉴于网络服务的特殊性，用户同意本平台有权随时变更、中断或终止部分或全部的服务。本平台不担保服务不中断，不担保服务的及时性和安全性。
            
6.法律适用与争议解决：本协议的订立、执行和解释及争议的解决均应适用中国法律。如发生本协议相关的争议，应通过友好协商解决；协商不成时，任一方有权将争议提交至本平台注册地的人民法院管辖。
            
7.协议修改：本平台有权随时修改本协议的任何条款，一旦条款内容发生变动，本平台将会在相关的服务页面公告修改内容。如果不同意本平台对条款内容所做的修改，用户有权停止使用网络服务。如果用户继续使用网络服务，则视为接受本平台对条款内容的修改。
            
8.其他：本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为解释本协议条款的依据。本协议条款无论因何种原因部分无效或不可执行，其他条款仍然有效，并对双方具有约束力。
            
9.最终解释权归本平台所有。`

var dataUtil = require('../../common/data.js');

const common = require('../../utils/common_func.js');
Page({
    onShareAppMessage: function () {
      return common.globalShareMessage();
    },
    onShareTimeline: function () {
      return common.globalShareTimeline();
    },
    data: {
        userProfileInfo: '',
        userInfo: '',
        userOpenid: '',
        avatarUrl: defaultAvatarUrl,
        username:"",
    },

    isUserFilledInfo() {
      return this.data.avatarUrl != defaultAvatarUrl && this.data.username != "";
    },

    onLoad() {
        var that = this;
        var userProfileInfo = wx.getStorageSync('userProfileInfo');
        var userInfo = wx.getStorageSync('userInfo');
        var userOpenid = wx.getStorageSync('userOpenid');
        wx.showModal({
            title: 'EuroStay平台使用声明',
            content: userAgreementContent,
            success: function (res) {
              if (res.confirm) {
                if (userProfileInfo != "" && userInfo != "" && userOpenid != "") {
                    that.setData({
                        userOpenid: userOpenid,
                        userProfileInfo: userProfileInfo,
                        userInfo: userInfo,
                    })
                    //注释掉这个是因为：点击确认会通过确认跳过上传昵称和图片阶段
                    // wx.navigateTo({
                    //     url: '/pages/home/home',
                    //     success: () => { },
                    //     error: () => {
                    //         wx.showToast({
                    //             icon: 'none',
                    //             title: '打开个人中心失败',
                    //         });
                    //     },
                    // });
                }
              } else {
                console.log('用户点击取消')
              }
            }
          })
    },

    onUserNameInput(e) {
        this.setData({
          username:e.detail.value
        })
        dataUtil.saveUserName(this.data.username)
    },

    onChooseAvatar(e) {
      const { avatarUrl } = e.detail 
      this.setData({
        avatarUrl,
      })
      dataUtil.saveAvatarUrl(e.detail )
    },

    onLoginWechat() {
        if (!this.isUserFilledInfo()) {
          wx.showToast({
            icon: 'none',
            title: '请先填写头像和昵称',
          })
          return;
        };
        wx.login({
            success: (res) => {
              console.log("--------------printed by xiaoli 2222-------------")
                console.log(res);
                let code = res.code;
                wx.request({
                    url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx24e83617ca9cdc41&secret=b278e397a8142c5f551141245bbddb23&js_code=${code}&grant_type=authorization_code`,
                    success: (res) => {
                      console.log("--------------printed by xiaoli 3333-------------")
                        console.log(res.data.openid)
                        wx.setStorageSync('userOpenid', res.data.openid)
                    }
                })
            },
        })
      
        var userProfile = wx.getStorageSync('userProfileInfo');
        var userInfo = wx.getStorageSync('userInfo');
        var userOpenid = wx.getStorageSync('userOpenid');
        console.log("--------------printed by xiaoli-------------")
        console.log(userOpenid)
        console.log(userInfo)
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
                            nickName: this.data.username,
                            avatarUrl: this.data.avatarUrl,
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