import React, { useState, useEffect } from 'react';
import { observer } from '@store/utils';
import { Button, Image, Toast } from '@taroify/core';
import Taro from '@tarojs/taro';
import './index.scss';
import GlobalStore from '@store/GlobalStore';
import { View, Text } from '@tarojs/components';
// import UserInfo from '../user-profile/user-info';
import { UserItemProps } from '@utils/interfaces';
import { userInfoSearch, userInfoAdd } from '../../common/database/user/user'

import EuroStay from '@assets/images/EuroStay.png';

const Index = () => {
  const [loginState, setLoginState] = useState(false);
  const [loginStateText, setLoginStateText] = useState('错误提示');
  const [userInfo, setUserInfo] = useState({});
  const [userOpenidInfo, setUserOpenidInfo] = useState('');

  // 如已经登录过则不再登录

  const [dbUserData, setDbUserData] = useState<UserItemProps[]>([]);
  useEffect(() => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          Taro.cloud
            .callFunction({
              name: 'getUserOpenid',
              data: {},
            })
            .then(callbackResult => {
              console.log(callbackResult.result);
              // 这里不太确定需不需要synchronize一下
              // todo?
              if (typeof callbackResult.result === 'string') {
                setUserOpenidInfo(callbackResult.result);
              }
              userInfoSearch(callbackResult.result).then(
                (dbUserInfo: UserItemProps[]) => {
                console.log(dbUserInfo);
                  setDbUserData(dbUserInfo);
                  GlobalStore.userInfo = dbUserInfo[0];
                  if (dbUserInfo.length >= 1) {
                    Taro.switchTab({
                        url: `/pages/home/index`,
                      });
                  }
                },
              );
            })
            .catch(err => {
              errorDialog('登录失败' + err.errMsg, 'fail');
            });
        } else {
          errorDialog('登录失败' + res.errMsg, 'fail');
        }
      },
    });
  }, []);

  // 处理用户登录请求
  const handleUserLogin = () => {
    Taro.getUserProfile({
      desc: '用户登录',
      success: res => {
        setUserInfo(res.userInfo);
        userInfoAdd(userOpenidInfo, res.userInfo["nickName"], res.userInfo['avatarUrl']).then(errMsg => {
            if (errMsg == "collection.add:ok") {
              userInfoSearch(userOpenidInfo).then(
                (dbUserInfo: UserItemProps[]) => {
                  GlobalStore.userInfo = dbUserInfo[0];
                  if (dbUserInfo.length >= 1) {
                    Taro.switchTab({
                        url: `/pages/home/index`,
                      });
                  }
                },
              );
            }
            else {
                errorDialog('登录失败' + errMsg, 'fail');
            }
        })
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

  // 错误处理
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
    <View className='login-container'>
      <Toast className='login-toast' open={loginState}>
        {loginStateText}
      </Toast>
      <View className='login-logo-container'>
        <Image className='login-logo-image' src={logo} />
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
