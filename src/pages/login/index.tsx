import { View, Text, Image } from '@tarojs/components';
import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';
import { loginIp, logoIp, LoginLoadingIcon } from '@utils/cloudIcons';
import GlobalStore from '@store/GlobalStore';

const Loading = () => {
  return (
    <View className='loading'>
      <View className='loading-container'>
        <View className='loading-spinner'>
          <View className='loading-circle'></View>
          <Image src={LoginLoadingIcon} className='loading-logo' />
        </View>
      </View>
      <Text className='loading-text'>EuroStay</Text>
    </View>
  );
};

const Login = () => {
  const [hasUserAgreed, setHasUserAgreed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkLoginStatus();
    console.log(GlobalStore.userInfo.token);
  }, []);

  const checkLoginStatus = () => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          Taro.request({
            url: `https://api.eurostay.co/app/esuser/loginCheck?code=${res.code}`,
            method: 'POST',
            success: function (response) {
              if (response.statusCode === 200 && response.data.code === 0) {
                const { exist, userInfo } = response.data;
                if (exist) {
                  GlobalStore.setUid(userInfo.uid);
                  GlobalStore.setAllInfo(userInfo);
                  GlobalStore.setToken(response.data.token);
                  Taro.reLaunch({
                    url: '/pages/home/index',
                  });
                } else {
                  setIsChecking(false);
                }
              } else {
                setIsChecking(false);
                Taro.showToast({
                  title: response.data.msg || '网络请求失败',
                  icon: 'none',
                  duration: 2000,
                });
              }
            },
            fail: function (err) {
              console.error('Request failed:', err);
              setIsChecking(false);
              Taro.showToast({
                title: '网络请求失败，请重试',
                icon: 'none',
                duration: 2000,
              });
            },
          });
        } else {
          setIsChecking(false);
          console.error('Login check failed:', res.errMsg);
          Taro.showToast({
            title: '获取用户信息失败',
            icon: 'none',
            duration: 2000,
          });
        }
      },
      fail: function (err) {
        setIsChecking(false);
        console.error('WeChat login check failed:', err);
        Taro.showToast({
          title: '微信登录检查失败',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  };

  const handleCheckboxChange = () => {
    setHasUserAgreed(!hasUserAgreed);
  };

  const handleWechatLogin = () => {
    if (!hasUserAgreed) {
      Taro.showToast({
        title: '请先阅读并同意用户服务协议和隐私政策',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    Taro.login({
      success: function (res) {
        if (res.code) {
          Taro.request({
            url: `https://api.eurostay.co/app/esuser/wxLogin?code=${res.code}`,
            method: 'POST',
            success: function (response) {
              if (response.statusCode === 200 && response.data.code === 0) {
                // 保存 token 和 uid
                GlobalStore.setAllInfo(response.data.userInfo);
                GlobalStore.setToken(response.data.token);
                Taro.reLaunch({
                  url: '/pages/home/index',
                  success: function () {
                    Taro.showToast({
                      title: '登录成功',
                      icon: 'success',
                      duration: 2000,
                    });
                  },
                });
              } else {
                Taro.showToast({
                  title: response.data.msg || '登录失败',
                  icon: 'none',
                  duration: 2000,
                });
              }
            },
            fail: function (err) {
              console.error('Request failed:', err);
              Taro.showToast({
                title: '登录失败，请重试',
                icon: 'none',
                duration: 2000,
              });
            },
          });
        } else {
          console.error('Login failed:', res.errMsg);
          Taro.showToast({
            title: '获取用户信息失败',
            icon: 'none',
            duration: 2000,
          });
        }
      },
      fail: function (err) {
        console.error('WeChat login failed:', err);
        Taro.showToast({
          title: '微信登录失败',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  };

  if (isChecking) {
    return <Loading />;
  }

  return (
    <View className='login-container'>
      <View className='logo-section'>
        <Image className='logo-image' src={logoIp} mode='aspectFit' />
      </View>

      <View className='illustration-section'>
        <Image className='beach-illustration' src={loginIp} mode='aspectFit' />
      </View>

      <View className='login-section'>
        <View className='wechat-login-btn' onClick={handleWechatLogin}>
          <Text>微信登录</Text>
        </View>

        <View className='agreement-section'>
          <View
            className={`checkbox ${hasUserAgreed ? 'checked' : ''}`}
            onClick={handleCheckboxChange}
          />
          <Text className='agreement-text'>
            我已阅读并同意Eurostay
            <Text
              className='link'
              onClick={() => {
                Taro.navigateTo({
                  url: '/pages/common-setting/index?type=service', // 修改为common-setting
                });
              }}
            >
              《用户服务协议》
            </Text>
            及
            <Text
              className='link'
              onClick={() => {
                Taro.navigateTo({
                  url: '/pages/common-setting/index?type=privacy', // 修改为common-setting
                });
              }}
            >
              《隐私政策》
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
