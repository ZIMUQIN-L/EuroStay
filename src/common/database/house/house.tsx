// 查找房源信息
// 示例使用：
// import { houseInfoSearch } from '../../common/database/house/house'
// const reddate = houseInfoSearch("巴黎", 1, "2024-03-24", "2024-03-24");
// console.log(reddate);
export const houseInfoSearch = (location, number, startDate, endDate) => {
  const db = wx.cloud.database();
  const _ = db.command;
  db.collection('HouseInfo')
    .where({
      location: db.RegExp({
        regexp: '^.*' + location + '.*',
      }),
      capacity: _.gte(Number(number)),
      start_date: _.lte(startDate),
      end_date: _.gte(endDate),
    })
    .get({
      success: function (res) {
        console.log(res);
        return res.data;
      },
    });
};
