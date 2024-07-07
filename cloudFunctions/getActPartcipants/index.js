// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  try {
    return await db
      .collection(event.collection)
      .aggregate()
      .lookup({
        from: event.from,
        localField: event.localField,
        foreignField: event.foreignField,
        as: event.as,
      })
      .lookup({
        from: event.from2,
        localField: event.localField2,
        foreignField: event.foreignField2,
        as: event.as2,
      })
      .match(event.match)
      .end();
  } catch (e) {
    console.error(e);
  }
};
