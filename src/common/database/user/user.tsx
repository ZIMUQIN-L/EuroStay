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
export const userInfoAdd = async (
  userOpenid,
  userNickName,
  userAvatarUrl,
  userLocation,
) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserInfo')
      .add({
        data: {
          userOpenid: userOpenid,
          nickName: userNickName,
          avatarUrl: userAvatarUrl,
          userDes: '',
          userLocation: userLocation,
        },
      })
      .then(res => {
        resolve(res.errMsg);
      });
  });
};

// 更新用户信息
export const userInfoUpdate = async (
  userInfoid,
  avatarUrl,
  userDes,
  nickName,
  location,
) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserInfo')
      .doc(userInfoid)
      .update({
        data: {
          avatarUrl: avatarUrl,
          userDes: userDes,
          nickName: nickName,
          userLocation: location,
        },
        success: function (res) {
          resolve(res.errMsg);
        },
      });
  });
};

// 查询用户房源信息
export const userHouseInfoSearch = async userOpenid => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('CleanHouseInfo')
      .orderBy('start_date', 'desc')
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

// 添加用户个性化信息
export const userDetailAdd = async (
  userOpenid,
  nickName,
  userDes,
  avatarUrl,
  userLocation,
  guestRating,
  guestRatingNumber,
  hostRating,
  hostRatingNumber,
  gender,
  tags,
  verified,
  aboutMe,
) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserInfo')
      .add({
        data: {
          userOpenid: userOpenid,
          nickName: nickName,
          avatarUrl: avatarUrl,
          userDes: userDes,
          userLocation: userLocation,
          guestRating: guestRating,
          guestRatingNumber: guestRatingNumber,
          hostRating: hostRating,
          hostRatingNumber: hostRatingNumber,
          gender: gender,
          tags: tags,
          verified: verified,
          aboutMe: aboutMe,
        },
      })
      .then(res => {
        resolve(res.errMsg);
      });
  });
};

// 更新用户作为房东的评论信息
export const userHostRatingInfoUpdate = async (
  userInfoid,
  hostRating,
  hostRatingNumber,
) => {
  const db = wx.cloud.database();
  const _ = db.command;
  return new Promise((resolve, reject) => {
    db.collection('UserInfo')
      .doc(userInfoid)
      .update({
        data: {
          hostRating: _.set(hostRating),
          hostRatingNumber: _.set(hostRatingNumber),
        },
        success: function (res) {
          resolve(res.errMsg);
        },
      });
  });
};

// 更新用户作为房客的评论信息
export const userGuestRatingInfoUpdate = async (
  userInfoid,
  guestRating,
  guestRatingNumber,
) => {
  const db = wx.cloud.database();
  const _ = db.command;
  return new Promise((resolve, reject) => {
    db.collection('UserInfo')
      .doc(userInfoid)
      .update({
        data: {
          guestRating: _.set(guestRating),
          guestRatingNumber: _.set(guestRatingNumber),
        },
        success: function (res) {
          resolve(res.errMsg);
        },
      });
  });
};

// 更新用户详情
export const userDetailUpdate = async (
  userInfoid,
  avatarUrl,
  userDes,
  nickName,
  location,
  gender,
  birthday,
  tags,
  aboutMe,
) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserInfo')
      .doc(userInfoid)
      .update({
        data: {
          avatarUrl: avatarUrl,
          userDes: userDes,
          nickName: nickName,
          userLocation: location,
          gender: gender,
          tags: tags,
          birthday: birthday,
          aboutMe: aboutMe,
        },
        success: function (res) {
          resolve(res.errMsg);
        },
      });
  });
};
