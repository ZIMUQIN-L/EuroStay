export const activityInfoPost = async (
  title,
  images,
  description,
  tags,
  location,
  startTime,
  endTime,
  capacity,
  contact,
  price,
  point,
  helloMessage,
) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('ActivityInfo')
      .add({
        data: {
          // 用户必填
          title: title,
          images: images,
          description: description,
          tags: tags,
          location: location,
          startTime: startTime,
          endTime: endTime,
          capacity: capacity,
          contact: contact,
          price: price,
          point: point,
          helloMessage: helloMessage,

          // 用户可修改
          active: true,

          // 管理者修改
          banner: false,
          official: false,
          applyPage: '',
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

// 查询活动详细信息
export const activityDetailSearch = async activityId => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('ActivityInfo')
      .where({
        _id: activityId,
      })
      .get({
        success: function (res) {
          resolve(res.data[0]);
        },
      });
  });
};

// 查询活动详细信息
export const activityInfoSearch = async () => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('ActivityInfo')
      .where({})
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};
