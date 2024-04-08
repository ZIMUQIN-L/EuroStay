// 登录页面
// 强制用户设置头像和昵称后，会调用该函数往云数据库存
function saveUserDataWhenLogin(userOpenid, username, avatarUrl) {
  console.log(userOpenid)
  const db = wx.cloud.database()
  const _ = db.command
  db.collection('UserInfo').where({
    userOpenid: userOpenid
  }).get({
    success: function (res) {
      console.log(res.data.length);
      if (res.data.length == 0) {
        db.collection('UserInfo').add({
          data: {
            userOpenid: userOpenid,
            nickName: username,
            avatarUrl: avatarUrl,
            userDes: '',
          }
        }).then(res => {
          console.log(res)
        })
      }
    }
  })
}

function getAvatarUrlByOpenId(openUserId, callback) {
  const db = wx.cloud.database()
  const _ = db.command
  db.collection('UserInfo').where({
    userOpenid: userOpenid
  }).get({
    success: function (res) {
      callback(res)
    },
    fail: console.log
  })
}

function getAvatarUrl(openUserId, callback) {
  getAvatarUrlByOpenId(openUserId, () => {
    wx.cloud.getTempFileURL({
        // 使用云函数获取图片的临时链接
      fileList: [{
        fileID: res.data.avatarUrl, // 文件ID
        maxAge: 60 * 60, // 这里设置最长缓存时间，单位是秒
      }],
      success: res => {
        console.log(res.fileList)
        if (res.fileList.length > 0 && res.fileList[0].tempFileURL) {
          callback(res.fileList[0].tempFileURL)
        }
      },
      fail: console.error
    })
  })
}

function isUserRegistered(openUserId) {
  return new Promise((resolve, reject) => {
    const db = wx.cloud.database();
    db.collection('UserInfo').where({
      userOpenid: openUserId,
      nickName: db.command.neq(''), // 检查nickName不为空
      avatarUrl: db.command.neq('') // 检查avatarUrl不为空
    }).get().then(res => {
      if (res.data.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).catch(err => {
      reject(err);
    });
  });
}


function getUserDbInfo(db, userOpenid, func) {
  db.collection('UserInfo').where({
      userOpenid: userOpenid
    })
    .get({
      success: function (res) {
        console.log(res);
        func(res);
      }
    })
}

// 在数据库中设置头像url 用户名 个人描述 
function saveUserBasicInfo(db, id, url, name, desc) {
  db.collection('UserInfo').doc(id).update({
    data: {
      avatarUrl: url,
      userDes: desc,
      nickName: name
    },
    success: function (res) {
      console.log(res)
    }
  })
}

// 1. 储存头像图片，获得对应的fileId
// 2. 将1中获得的fileId 和 username，desc，一起存储到数据库中
function saveUserInfo(db, id, avatarUrl, username, desc, callback) {
  saveUserAvatar(avatarUrl, (res) => {
    saveUserBasicInfo(db, id, res.fileID, username, desc)
    callback();
  })
}

// 在数据库中设置头像url 用户名 个人描述 
function saveUserBasicInfoByOpenId(db, openUserId, url, name, desc) {
  db.collection('UserInfo').where({
    userOpenid: openUserId
  }).update({
    data: {
      avatarUrl: url,
      userDes: desc,
      nickName: name
    },
    success: function (res) {
      console.log("save fileid successfully ------------------")
      console.log(res)
    }
  })
}

function saveUserInfoByOpenId(db, id, avatarUrl, username, desc, callback) {
  saveUserAvatar(avatarUrl, (res) => {
    saveUserBasicInfoByOpenId(db, id, res.fileID, username, desc)
    callback();
  })
}


function saveUserAvatar(avatarUrl, func) {
  let cloudPath = "userAvatar/" + Date.now() + ".jpg";
  wx.cloud.uploadFile({
    cloudPath: cloudPath,
    filePath: avatarUrl,
    success: res => {
      console.log("save avatar successfully --------------------")
      console.log(res);
      func(res);
    }
  })
}


module.exports = {
  saveUserDataWhenLogin: saveUserDataWhenLogin,
  getUserDbInfo: getUserDbInfo,
  saveUserInfo: saveUserInfo,
  isUserRegistered: isUserRegistered,
  saveUserBasicInfoByOpenId: saveUserBasicInfoByOpenId,
  saveUserInfoByOpenId:saveUserInfoByOpenId,
}