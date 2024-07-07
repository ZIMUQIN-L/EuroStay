export const pointIncrease = async (userInfoid, addNum) => {
    const db = wx.cloud.database();
    const _ = db.command;
    return new Promise((resolve, reject) => {
      db.collection('UserInfo')
        .doc(userInfoid)
        .update({
          data: {
            point: _.inc(addNum)
          },
          success: function (res) {
            resolve(res.errMsg);
          },
        });
    });
  };

  export const pointDecrease = async (userInfoid, deNum) => {
    const db = wx.cloud.database();
    const _ = db.command;
    return new Promise((resolve, reject) => {
      db.collection('UserInfo')
        .doc(userInfoid)
        .update({
          data: {
            point: _.inc(-deNum)
          },
          success: function (res) {
            resolve(res.errMsg);
          },
        });
    });
  };



// point 信息detail
export const pointDetailInfoAdd = async (
    userOpenid,
    timestamp,
    eventId,
    eventInfo,
    pointChange,
    pointStatus
  ) => {
    const db = wx.cloud.database();
    return new Promise((resolve, reject) => {
      db.collection('PointDetailInfo')
        .add({
          data: {
            userOpenid: userOpenid,
            timestamp: timestamp,
            eventId: eventId,
            eventInfo: eventInfo,
            pointChange: pointChange,
            pointStatus: pointStatus,
          },
        })
        .then(res => {
          resolve(res.errMsg);
        });
    });
  };
  