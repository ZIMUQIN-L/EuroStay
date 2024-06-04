// 向云数据库上传用户avatar图片
export const cloudAvatarUpload = async tempImagePath => {
  let cloudPath = 'userAvatar/' + Date.now() + '.jpg';
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: tempImagePath,
      success: res => {
        resolve(res.fileID);
      },
    });
  });
};

export const cloudImageUpload = async tempImagePath => {
  let cloudPath = 'HouseImage/' + Date.now() + '.jpg';
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: tempImagePath,
      success: res => {
        resolve(res.fileID);
      },
    });
  });
};
