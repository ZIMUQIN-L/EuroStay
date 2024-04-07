function globalShareMessage() {
  return {
    title: '快来看看EuroStay换宿吧～',
    path: '/pages/userlogin/userlogin',
    imageUrl: '', // 可选的分享图标
  };
}

function globalShareTimeline() {
  return {
    title: '快来看看EuroStay换宿吧～',
    query: 'key=value', 
    imageUrl: '',
  };
}

module.exports = {
  globalShareMessage: globalShareMessage,
};