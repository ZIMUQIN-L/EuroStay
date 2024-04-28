// 向云数据库上传图片
export const cloudImageUpload = async tempImagePath => {
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
