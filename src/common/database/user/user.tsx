import { useDidHide } from '@tarojs/taro';

// 检查用户是否存在并获取用户信息
export const userInfoSearch = async userOpenid => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserInfo')
      .where({
        userOpenid: userOpenid,
      })
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};

// 添加用户信息
export const userInfoAdd = async (userOpenid, userNickName, userAvatarUrl) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserInfo')
      .add({
        data: {
          userOpenid: userOpenid,
          nickName: userNickName,
          avatarUrl: userAvatarUrl,
          userDes: '',
        },
      })
      .then(res => {
        resolve(res.errMsg);
      });
  });
};

// 更新用户信息
export const userInfoUpdate = async (
  userOpenid,
  avatarUrl,
  userDes,
  nickName,
) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserInfo')
      .doc(userOpenid)
      .update({
        data: {
          avatarUrl: avatarUrl,
          userDes: userDes,
          nickName: nickName,
        },
        success: function (res) {
          resolve(res.errMsg);
        },
      });
  });
};
