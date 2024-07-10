export const bannerInfoSearch = async () => {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db.collection('BannerInfo')
      .where({
        active: true,
      })
      .get({
        success: function (res) {
          resolve(res.data);
        },
      });
  });
};
