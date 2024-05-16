// 添加 userAccomMesage 信息至数据库
export const accomMessageAdd = async (
  _id,
  _openid,
  end_date,
  start_date,
  capacity,
  gender,
  location,
  sourceUserOpenid,
  description,
  type,
  status,
  // optional
  contact = '',
  answerToOwner = '',
  houseId = '',
  images = [],
  targetUserNickName = '',
  targetUserOpenid = '',
) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserAccomMessage')
      .add({
        data: {
          _id: _id,
          _openid: _openid,
          end_date: end_date,
          start_date: start_date,
          capacity: capacity,
          gender: gender,
          location: location,
          sourceUserOpenid: sourceUserOpenid,
          description: description,
          type: type,
          status: status,
          // optional
          contact: contact,
          answerToOwner: answerToOwner,
          houseId: houseId,
          images: images,
          targetUserNickName: targetUserNickName,
          targetUserOpenid: targetUserOpenid,
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

export const accomMessageSearch = async (sourceUserOpenid, skip = 0) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserAccomMessage')
      .orderBy('start_date', 'desc')
      .where({
        sourceUserOpenid: sourceUserOpenid,
      })
      .skip(skip)
      .limit(10)
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};
