// 查找房源信息
// 示例使用：
// import { houseInfoSearch } from '@common/database/house/house'
// houseInfoSearch("巴黎", 1, "2024-03-24", "2024-03-24", {}, {}, {}, 0) .then(testData => {
//     console.log(testData);
//   });
import { formatToday } from '@utils/dateUtil';
export const houseInfoSearch = async (
  location,
  startDate,
  endDate,
  number = 1,
  houseSetting = {},
  houseSurrounding = {},
  preference = {},
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
    db.collection('CleanHouseInfo')
      .orderBy('start_date', 'desc')
      .where({
        location: db.RegExp({
          regexp: '^.*' + location + '.*',
        }),
        capacity: _.gte(Number(number)),
        start_date: _.lte(startDate),
        end_date: _.gte(endDate),
        houseSetting: houseSetting,
        houseSurrounding: houseSurrounding,
        preference: preference,
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

// 查找房源详细信息
export const houseDetailSearch = async houseId => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('CleanHouseInfo')
      .where({
        _id: houseId,
      })
      .get({
        success: function (res) {
          resolve(res.data[0]);
        },
      });
  });
};

// 上传房源信息接口
export const houseInfoPost = async (
  location,
  startDate,
  endDate,
  contact,
  capacity,
  houseSetting,
  houseSurrounding,
  description,
  userPreference,
  images,
  userOpenid,
) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('CleanHouseInfo')
      .add({
        data: {
          location: location,
          start_date: startDate,
          end_date: endDate,
          contact: contact,
          capacity: Number(capacity),
          houseSetting: houseSetting,
          houseSurrounding: houseSurrounding,
          description: description,
          preference: userPreference,
          images: images,
          userOpenid: userOpenid,
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

// 修改房源信息接口
export const houseInfoUpdate = async (
  _id,
  location,
  startDate,
  endDate,
  contact,
  capacity,
  houseSetting,
  houseSurrounding,
  description,
  userPreference,
  images,
) => {
  const db = wx.cloud.database();
  const _ = db.command;
  return new Promise((resolve, reject) => {
    db.collection('CleanHouseInfo')
      .doc(_id)
      .update({
        data: {
          location: location,
          start_date: startDate,
          end_date: endDate,
          contact: contact,
          capacity: capacity,
          houseSetting: _.set(houseSetting),
          houseSurrounding: _.set(houseSurrounding),
          description: description,
          preference: _.set(userPreference),
          images: images,
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
