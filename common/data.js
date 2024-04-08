// 该类里的方法涉及到本地数据存取，
// 但不涉及到云数据库数据的存储（相关方法应存放到database.js文件中）

function saveAvatarUrl(url) {
  // 5. 存储到本地
  wx.setStorageSync('avatarUrl', url)
  console.log("save avatar url: " + url)
}

function getAvatarUrl() {
  var url = wx.getStorageSync('avatarUrl')
  console.log("get avatar url: " + url)
  return url
}

function saveUserName(name) {
    wx.setStorageSync('username', name)
    console.log("save username: " + name)
  }
  
  
function getUserName() {
  var name = wx.getStorageSync('username')
  console.log("get username: " + name)
  return name
}

function setUserOpenId(realid) {
  console.log("set useropenid :" + realid)
  wx.setStorageSync('userOpenid', realid)
}

function getUserOpenId() {
  var id = wx.getStorageSync('userOpenid')
  console.log("get userOpenid :" + id)
  return id
}

module.exports = {
    getUserName: getUserName,
    saveUserName: saveUserName,
    getAvatarUrl: getAvatarUrl,
    saveAvatarUrl: saveAvatarUrl,
    setUserOpenId: setUserOpenId,
    getUserOpenId: getUserOpenId,
  }
