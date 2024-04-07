
function saveAvatarUrl(url) {
  // 5. 存储到本地
  wx.setStorageSync('avatarUrl', url)
  console.log("save avatar url: " + url)
}


function getAvatarUrl() {
  url = wx.getStorageSync('avatarUrl')
  console.log("get avatar url: " + url)
  return url
}


function saveUserName(name) {
    
    wx.setStorageSync('username', name)
    console.log("save username: " + name)
  }
  
  
function getUserName() {
  name = wx.getStorageSync('username')
  console.log("get username: " + name)
  return name
}

module.exports = {
    getUserName: getUserName,
    saveUserName: saveUserName,
    getAvatarUrl: getAvatarUrl,
    saveAvatarUrl: saveAvatarUrl
  }
