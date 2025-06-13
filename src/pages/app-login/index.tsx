import { View, Text, Image, Button } from '@tarojs/components';
import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';
import { logoIp, LoginLoadingIcon } from '@utils/cloudIcons';
import GlobalStore from '@store/GlobalStore';
import { API } from '@utils/apiService';

const Loading = () => {
  return (
    <View className='loading'>
      <View className='loading-container'>
        <View className='loading-spinner'>
          <View className='loading-circle'></View>
          <Image src={LoginLoadingIcon} className='loading-logo' />
        </View>
      </View>
      <Text className='loading-text'>正在加载你的冒险~</Text>
    </View>
  );
};

const AppLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    // 自动执行微信登录
    performWxLogin();
  }, []);

  const performWxLogin = () => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          API.user.wxLogin(res.code)
            .then(result => {
              const { userInfo, token } = result;
              GlobalStore.setAllInfo(userInfo);
              GlobalStore.setToken(token || '');
              setToken(token || '');
              setLoginSuccess(true);
              setIsLoading(false);
            })
            .catch(error => {
              console.error('Login failed:', error);
              Taro.showToast({
                title: '登录失败',
                icon: 'none',
                duration: 2000,
              });
              setIsLoading(false);
            });
        } else {
          console.error('Login failed:', res.errMsg);
          Taro.showToast({
            title: '获取用户信息失败',
            icon: 'none',
            duration: 2000,
          });
          setIsLoading(false);
        }
      },
      fail: function (err) {
        console.error('WeChat login failed:', err);
        Taro.showToast({
          title: '微信登录失败',
          icon: 'none',
          duration: 2000,
        });
        setIsLoading(false);
      },
    });
  };

  const handleLaunchAppError = (e) => {
    console.error('返回APP失败:', e.detail.errMsg);
    Taro.showToast({
      title: '返回APP失败',
      icon: 'none',
      duration: 2000,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className='login-container'>
      <View className='logo-section'>
        <Image className='logo-image' src={logoIp} mode='aspectFit' />
      </View>

      <View className='login-section'>
        {loginSuccess ? (
          <View>
            <View className='status-message'>
              <Text>登录成功</Text>
            </View>
            <Button 
              className='wechat-login-btn' 
              openType='launchApp' 
              appParameter={`token=${token}`}
              onError={handleLaunchAppError}
            >
              返回APP
            </Button>
          </View>
        ) : (
          <View>
            <View className='status-message'>
              <Text>登录失败，请重试</Text>
            </View>
            <Button className='wechat-login-btn' onClick={performWxLogin}>
              重新登录
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default AppLogin;
