// 检查用户是否存在并获取用户信息
export const userOpenidSearch = async ( userOpenid
  ) => {
    const db = wx.cloud.database();
    return new Promise((resolve, reject) => {
      db.collection('UserInfo')
        .where({
         userOpenid: userOpenid
        })
        .get({
          success: function (res) {
            resolve(res.data);
          },
        });
    });
  };

