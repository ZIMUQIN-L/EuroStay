// 数据表项信息
// _id: string; // 微信自动生成的_id，无法修改其名称
// _openid: string;
// accomInfoId: string; // 用户发出的求宿信息id
// sourceUserOpenid: string; // 发送评价的用户
// sourceUserNickname: string; //发送评价用户的nickname
// sourceUserAvatarUrl: string; //发送评价用户的avatarUrl
// sourceUserLocation: string; // 发送评价用户的位置
// targetUserOpenid: string; // 接收评价的用户
// targetUserNickname: string; //接收评价用户的nickname
// targetUserAvatarUrl: string; //接收评价用户的avatarUrl
// houseId: string; // 房源的id
// start_date: string; // 房源开始时间
// end_date: string; // 房源结束时间

// // evaluation info
// // tohost
// //     "desMatch": //number,
// //     "locationEval": //number,
// //     "cleanEval": //number,
// //     "serviceEval": //number
// //     "pricePerformance": //number
// // toseeker
// //     "rating": //number
// evaluation: { [key: string]: any };
// comment: string; // 评价信息
// type: string; // 评价类别 tohost, toseeker
// toPublic: boolean; //是否公开展示

export const ratingInfoAdd = async (
  accomInfoId,
  sourceUserOpenid,
  sourceUserNickname,
  sourceUserAvatarUrl,
  sourceUserLocation,
  targetUserOpenid,
  targetUserNickname,
  targetUserAvatarUrl,
  houseId,
  start_date,
  end_date,
  evaluation, // a dictionary,
  comment, // string, the comment of this rating
  type, // string, type of this comment
  toPublic, // bool, 是否公开展示名称信息
) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserRatingInfo')
      .add({
        data: {
          accomInfoId: accomInfoId,
          sourceUserOpenid: sourceUserOpenid,
          sourceUserNickname: sourceUserNickname,
          sourceUserAvatarUrl: sourceUserAvatarUrl,
          sourceUserLocation: sourceUserLocation,
          targetUserOpenid: targetUserOpenid,
          targetUserNickname: targetUserNickname,
          targetUserAvatarUrl: targetUserAvatarUrl,
          houseId: houseId,
          start_date: start_date,
          end_date: end_date,
          evaluation: evaluation,
          comment: comment,
          type: type,
          toPublic: toPublic,
        },
      })
      .then(res => {
        resolve(res.errMsg);
      })
      .catch(err => {
        reject(err.errMsg);
      });
  });
};

// 根据infoid搜索相应的rating信息
export const ratingInfoSearch = async ratingInfoId => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserRatingInfo')
      .where({
        _id: ratingInfoId,
      })
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};

// 搜索用户给出的rating信息
export const userSentRatingSearch = async sourceUserOpenid => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserRatingInfo')
      .where({
        sourceUserOpenid: sourceUserOpenid,
      })
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};

// 搜索用户收到的rating信息
export const userReceivedRatingSearch = async targetUserOpenid => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserRatingInfo')
      .where({
        targetUserOpenid: targetUserOpenid,
      })
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};

// 搜索该房源相关的rating信息
export const houseReceivedRatingSearch = async (houseId, skip = 0) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserRatingInfo')
      .where({
        houseId: houseId,
        type: 'tohost',
      })
      .skip(skip)
      .limit(5)
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};
