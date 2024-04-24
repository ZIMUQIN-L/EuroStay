// 查找房源信息
// 示例使用：
// import { houseInfoSearch } from '../../common/database/house/house'
// houseInfoSearch("巴黎", 1, "2024-03-24", "2024-03-24", {}, {}, {}, 0) .then(testData => {
//     console.log(testData);
//   });
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
  return new Promise((resolve, reject) => {
    db.collection('HouseInfo')
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
    db.collection('HouseInfo')
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
