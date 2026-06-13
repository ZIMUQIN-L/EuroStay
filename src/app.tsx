import { useEffect } from 'react';
import { Provider } from 'mobx-react';
import Taro from '@tarojs/taro';
import { storesContext } from './store';
import './app.scss';
import GlobalStore from './store/GlobalStore'; 

const store = {
  storesContext,
};

const App = props => {
  useEffect(() => {

    const storedUserInfo = Taro.getStorageSync('userInfo');
    if (storedUserInfo) {
      GlobalStore.userInfo = storedUserInfo;
    }

    // Deeplink auth guard: if launched to a non-home page without login, save path and redirect to login
    const launchOptions = Taro.getLaunchOptionsSync();
    const { path, query } = launchOptions;
    const isLoginPage = path === 'pages/login/index';
    const isHomePage = path === 'pages/home-world/index';

    if (path && !isLoginPage && !isHomePage) {
      const queryStr = Object.entries(query || {}).map(([k, v]) => `${k}=${v}`).join('&');
      const redirectUrl = `/${path}${queryStr ? '?' + queryStr : ''}`;
      GlobalStore.pendingRedirect = redirectUrl;

      const uid = storedUserInfo?.uid ?? 0;
      if (uid === 0) {
        Taro.reLaunch({ url: '/pages/login/index' });
        return;
      }
    }

    // 检测新版本
    wx.cloud.init({
      env: 'cloud1-9gjlum193d0ee3c3',
      traceUser: true,
    });
    if (Taro.getUpdateManager) {
      const updateManager = Taro.getUpdateManager();
      updateManager.onCheckForUpdate(res => {
        // 请求完新版本信息的回调.
        res.hasUpdate && console.warn('新版本提示');
      });
      updateManager.onUpdateReady(() => {
        Taro.showModal({
          title: '更新提示',
          confirmColor: '#A6A0E0',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              updateManager.applyUpdate(); // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            }
          },
        });
      });
      updateManager.onUpdateFailed(() => {
        // 新的版本下载失败
        Taro.showModal({
          title: '已经有新版本了哟~',
          confirmColor: '#A6A0E0',
          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
        });
      });
    } else {
      Taro.showModal({
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        title: '提示',
        confirmColor: '#A6A0E0',
        content:
          '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
      });
    }
  }, []);

  return <Provider store={store}>{props.children}</Provider>;
};

export default App;
