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

// 查询本人活动信息
export const activityMineInitiatedSearch = async (
  userOpenid,
  activityStatus = true,
) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('ActivityInfo')
      .where({
        _openid: userOpenid,
        //   active: activityStatus
      })
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};

export const activityInfoSearch = async () => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('ActivityInfo')
      .where({
        active: true,
      })
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};

export const activityApplicationAdd = async (
  activityId,
  hostOpenid,
  userDescription,
  userContact,
  userAvatarUrl,
  userNickName,
) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('ActivityApplication')
      .add({
        data: {
          activityId: activityId,
          hostOpenid: hostOpenid,
          userDescription: userDescription,
          userContact: userContact,
          userAvatarUrl: userAvatarUrl,
          userNickName: userNickName,
          approval: true,
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

export const activityContainUser = async (activityId, userOpenid) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('ActivityApplication')
      .where({
        _openid: userOpenid,
        activityId: activityId,
      })
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};

export const activityUsersSearch = async activityId => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('ActivityApplication')
      .where({
        activityId: activityId,
        approval: true,
      })
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};


export const activityAppApproveUpdate = async (_id) => {
    const db = wx.cloud.database();
    return new Promise((resolve, reject) => {
      db.collection('ActivityApplication')
        .doc(_id)
        .update({
          data: {
            approval: false,
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