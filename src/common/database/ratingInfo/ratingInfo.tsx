// 数据表项信息
// {
//     _id: ,
//     _openid: ,
//     accomInfoId: //用户发出的求宿信息id ,
//     sourceUserOpenid: //发送评价的用户 ,
//     targetUserOpenid: //接受评价的用户 ,
//     houseId: //房源的id,
//     evaluation: {
//     // tohost
//         "desMatch": //number,
//         "locationEval": //number,
//         "cleanEval": //number,
//         "serviceEval": //number
//         "pricePerformance": //number
//     // toseeker
//         "rating": //number
//     }// number, overall评价等级,
//     comment: // 评价信息,
//     type: // tohost, toseeker
// }

export const ratingInfoAdd = async (
  accomInfoId,
  sourceUserOpenid,
  targetUserOpenid,
  houseId,
  evaluation, // a dictionary,
  comment, // string, the comment of this rating
  type, // string, type of this comment
) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserRatingInfo')
      .add({
        data: {
          accomInfoId: accomInfoId,
          sourceUserOpenid: sourceUserOpenid,
          targetUserOpenid: targetUserOpenid,
          houseId: houseId,
          evaluation: evaluation,
          comment: comment,
          type: type,
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
export const userReceivedRatingSearch = async houseId => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserRatingInfo')
      .where({
        houseId: houseId,
      })
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};

// 搜索该房源相关的rating信息
export const houseReceivedRatingSearch = async targetUserOpenid => {
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
