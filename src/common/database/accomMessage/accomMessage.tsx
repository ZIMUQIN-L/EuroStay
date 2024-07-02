import { DefaultHouse } from '@utils/cloudIcons';

// 添加 userAccomMesage 信息至数据库
export const accomMessageAdd = async (
  end_date,
  start_date,
  capacity,
  gender,
  location,
  sourceUserOpenid,
  sourceUserNickName,
  sourceUserAvatarUrl,
  description,
  type,
  status,
  // optional
  contact = '',
  answerToOwner = '',
  houseId = '',
  images = [DefaultHouse],
  targetUserNickName = '',
  targetUserOpenid = '',
  targetUserAvatarUrl = '',
) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserAccomMessage')
      .add({
        data: {
          end_date: end_date,
          start_date: start_date,
          capacity: capacity,
          gender: gender,
          location: location,
          sourceUserOpenid: sourceUserOpenid,
          sourceUserNickName: sourceUserNickName,
          sourceUserAvatarUrl: sourceUserAvatarUrl,
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
          targetUserAvatarUrl: targetUserAvatarUrl,
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
      //   .limit(10)
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};

// 搜索我的
export const houseMessageSearch = async (targetUserOpenid, skip = 0) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserAccomMessage')
      .orderBy('start_date', 'desc')
      .where({
        targetUserOpenid: targetUserOpenid,
      })
      .skip(skip)
      //   .limit(10)
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};

// 更新accom info的状态
export const accomMessageUpdate = async (_id, status) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserAccomMessage')
      .doc(_id)
      .update({
        data: {
          status: status,
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

// 搜索求宿信息
export const accomPageMessageSearch = async (
  location,
  startDate,
  endDate,
  number = 1,
  skip = 0,
) => {
  const db = wx.cloud.database();
  const _ = db.command;
  if (startDate == undefined || startDate == '') {
    startDate = '2999-12-31';
  }
  if (endDate == undefined || endDate == '') {
    endDate = '1999-01-01';
  }
  return new Promise((resolve, reject) => {
    db.collection('UserAccomMessage')
      .orderBy('start_date', 'desc')
      .where({
        location: db.RegExp({
          regexp: '^.*' + location + '.*',
        }),
        type: _.or(['withoutTargetHouse', 'both']),
        capacity: _.gte(Number(number)),
        start_date: _.lte(startDate),
        end_date: _.gte(endDate),
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

// 根据id搜索求宿信息
export const accomMessageSearchWithId = async _id => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserAccomMessage')
      .where({
        _id: _id,
      })
      //   .limit(10)
      .get({
        success: function (res) {
          resolve(res.data[0]);
        },
      });
  });
};

// 删除求宿信息
export const accomMessageDelete = async _id => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserAccomMessage')
      .doc(_id)
      .remove({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};
