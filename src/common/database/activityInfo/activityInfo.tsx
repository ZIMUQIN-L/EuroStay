import {
  EurostayApplicationDetailProps
} from '@utils/interfaces';

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


export const activityActiveUpdate = async (_id, activeStatus) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('ActivityInfo')
      .doc(_id)
      .update({
        data: {
          active: activeStatus,
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
        resolve(res._id);
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


export const activityApplicationSearchById = async activityApplicationId => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('ActivityApplication')
      .where({
        _id: activityApplicationId
      })
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};

export const activityAppApproveUpdate = async _id => {
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

// eurostay相关活动信息
export const eurostayActApply = async (title, activityId, applicantInfo, activityApplicationId) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('EuroStayActApplication')
      .add({
        data: {
          // 用户必填
          title: title,
          activityId: activityId,
          applicantInfo: applicantInfo,
          activityApplicationId: activityApplicationId
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

// 查询EuroStay活动所相关的所有申请
export const getEurostayActApplications = async (activityId) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('EuroStayActApplication')
      .where({
        activityId: activityId, // Query based on activityId
      })
      .get()
      .then(res => {
        resolve(res.data); // Return the query results
      })
      .catch(err => {
        reject(err.errMsg); // Handle any errors
      });
  });
};

// 查询EuroStay活动所相关的，一个用户的，所有申请
// export const getEurostayActApplication = async (activityApplicationId) => {
//   const db = wx.cloud.database();
//   return new Promise((resolve, reject) => {
//     db.collection('EuroStayActApplication')
//       .where({
//         activityApplicationId: activityApplicationId, // Add activityApplicationId to ensure unique record
//       })
//       .get()
//       .then(res => {
//         if (res.data && res.data.length === 1) {
//           resolve(res.data[0]); // Return the unique query result
//         } else {
//           reject('No unique application found or multiple records match the criteria.');
//         }
//       })
//       .catch(err => {
//         reject(err.errMsg); // Handle any errors
//       });
//   });
// };

export const getEurostayActApplication = async (activityId: string): Promise<EurostayApplicationDetailProps> => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('EuroStayActApplication')
      .where({
        activityApplicationId: activityId,
      })
      .get()
      .then((res) => {
        console.log('Eurostay application data:', res.data);
        if (res.data && res.data.length > 0) {
          resolve(res.data[0] as EurostayApplicationDetailProps); // Explicitly cast the data
        } else {
          reject(new Error('No data found'));
        }
      })
      .catch((err) => {
        reject(err); // Handle errors
      });
  });
};



