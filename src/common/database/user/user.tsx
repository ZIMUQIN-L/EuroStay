// 检查用户是否存在并获取用户信息
export const userInfoSearch = async ( userOpenid
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

// 添加用户信息
export const userInfoAdd = async (userOpenid, userNickName, userAvatarUrl) => {
    const db = wx.cloud.database();
    console.log(userOpenid, userNickName, userAvatarUrl);
    return new Promise((resolve, reject) => {
    db.collection('UserInfo').add({
        data: {
            userOpenid: userOpenid,
            nickName: userNickName,
            avatarUrl: userAvatarUrl,
            userDes: '',
        }
    }).then(res => {
        resolve(res.errMsg);
        console.log(res);
    })
});
}

