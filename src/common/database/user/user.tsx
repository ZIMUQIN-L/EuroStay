export const userInfoSearch = async (
  nickName = '',
  avatarUrl = '',
  openId = '',
  skip = 0
) => {
  const db = wx.cloud.database();
  const _ = db.command;
  return new Promise((resolve, reject) => {
    db.collection('UserInfo')
      .where({
        location: db.RegExp({
          regexp: '^.*' + location + '.*',
        }),
        nickName: nickName,
        avatarUrl: avatarUrl,
        openId: openId,
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

// 用户界面详情
export const UserInfoSearch = async openId => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('UserInfo')
      .where({
        _id: openId,
      })
      .get({
        success: function (res) {
          resolve(res.data[0]);
        },
      });
  });
};
