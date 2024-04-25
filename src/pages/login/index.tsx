import React, { useState } from 'react';
import { observer } from '@store/utils';
import { Button, Image, Toast } from '@taroify/core';
import Taro from '@tarojs/taro';
import './index.scss';
import { View, Text } from '@tarojs/components';
import UserInfo from '../user-profile/user-info';

import EuroStay from '@assets/images/EuroStay.png';

const Index = () => {
  const [loginState, setLoginState] = useState(false);
  const [loginStateText, setLoginStateText] = useState('错误提示');
  // const [dialogType, setDialogType] = useState("fail");
  const [userInfo, setUserInfo] = useState({});
  const handleUserLogin = () => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          Taro.cloud
            .callFunction({
              name: 'getCloudOpenid',
              data: {},
            })
            .then(callbackResult => {
              console.log(callbackResult.result);
            })
            .catch(err => {
              errorDialog('登录失败' + err.errMsg, 'fail');
            });
        } else {
          errorDialog('登录失败' + res.errMsg, 'fail');
        }
      },
    });
    Taro.getUserProfile({
      desc: '用户登录',
      success: res => {
        console.log(res);
        setUserInfo(res.userInfo);
        console.log(userInfo);
        Taro.switchTab({
          url: `/pages/home/index`,
        });
      },
      fail: err => {
        errorDialog('登录失败' + err.errMsg, 'fail');
      },
    });
  };

  // 用户获取用户手机号，可以在小程序企业认证后使用
  const getPhoneNumber = e => {
    console.log(e);
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      const result = wx.cloud.callFunction({
        name: 'getUserInfo',
        data: {
          type: 'login',
          id: wx.cloud.CloudID(e.detail.cloudID),
        },
      });
      console.log(result);
    } else {
      wx.hideLoading({
        complete: res => {
          wx.showToast({
            title: '用户拒绝，获取失败',
            icon: 'none',
          });
        },
      });
    }
  };
  const errorDialog = (text, type) => {
    setLoginState(true);
    setLoginStateText(text);
    // dialogTypeState(type);
    setTimeout(() => {
      setLoginState(false);
    }, 1000);
  };
  const logo = EuroStay;
  return (
    <View className='container'>
      <Toast className='login-toast' open={loginState}>
        {loginStateText}
      </Toast>
      <View className='content'>
        <Image className='logo' src={logo} />
      </View>
      <Button
        className='login-button'
        color='primary'
        onClick={handleUserLogin}
      >
        微信登陆
      </Button>
    </View>
  );
};
export default observer(Index);
