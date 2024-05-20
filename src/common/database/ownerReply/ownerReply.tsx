// 根据用户求宿信息id搜索房主回复信息
export const replyMessageSearch = async accomMessageId => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('HouseOwnerReplyMessage')
      .where({
        accomMessageId: accomMessageId,
      })
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};

// 上传房主回复信息
export const replyMessageAdd = async (
  sourceUserOpenid,
  sourceUserNickName,
  sourceUserAvatarUrl,
  contact,
  helloMessage,
  accomMessageId,
) => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('HouseOwnerReplyMessage')
      .add({
        data: {
          sourceUserOpenid: sourceUserOpenid,
          sourceUserNickName: sourceUserNickName,
          sourceUserAvatarUrl: sourceUserAvatarUrl,
          contact: contact,
          helloMessage: helloMessage,
          accomMessageId: accomMessageId,
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
