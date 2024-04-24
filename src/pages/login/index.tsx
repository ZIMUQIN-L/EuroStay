import React, { useState } from "react";
import { observer } from '@store/utils';
import { Button, Image, Toast } from "@taroify/core";
import Taro from "@tarojs/taro";
import './index.scss';
import { View, Text } from '@tarojs/components';
import UserInfo from "../user-profile/user-info";

const Index = () => {
    const [loginState, setLoginState] = useState(false);
    const [loginStateText, setLoginStateText] = useState("错误提示");
    // const [dialogType, setDialogType] = useState("fail");
    const [userInfo, setUserInfo] = useState({});

    const style = {
        width: "100%",
        height: "100%",
    };
    const handleUserLogin = () => {
        Taro.login({
            success: function (res) {
              if (res.code) {
                //发起网络请求
                Taro.cloud.callFunction({
                    name: 'getCloudOpenid', 
                    data: {},
                }).then(callbackResult => {
                    console.log(callbackResult.result);
                }).catch(err => {
                    errorDialog("登录失败" + err.errMsg, "fail");
                })
              } else {
                errorDialog("登录失败" + res.errMsg, "fail");
              }
            }
          })
        Taro.getUserProfile({
            desc: '用户登录',
            success: (res) => {
                console.log(res);
                setUserInfo(res.userInfo);
                console.log(userInfo);
            },
            fail: (err) => {
                errorDialog("登录失败" + err.errMsg, "fail");
            }
        });
    };


    // 用户获取用户手机号，可以在小程序企业认证后使用
    const getPhoneNumber = (e) => {
        console.log(e);
        if (e.detail.errMsg == "getPhoneNumber:ok") {
            const result = wx.cloud.callFunction({
                name: 'getUserInfo',
                data: {
                    type: 'login',
                    id: wx.cloud.CloudID(e.detail.cloudID)
                }
            })
            console.log(result)
        } else {
            wx.hideLoading({
                complete: (res) => {
                    wx.showToast({
                        title: '用户拒绝，获取失败',
                        icon: 'none'
                    })
                }
            })
        }
    };
    const errorDialog = (text, type) => {
        setLoginState(true);
        setLoginStateText(text);
        // dialogTypeState(type);
        setTimeout(() => {
            setLoginState(false);
        }, 1000);
    }
    const avatarUrl = "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
    const nickName = "heltest";
    return (
        <View>
            <Toast className='login-toast' open={loginState}>{loginStateText}</Toast>
            <Image style={{ width: "100px", height: "100px" }} src={avatarUrl} />
            <p>昵称：{nickName}</p>
            <Button color='primary' shape='round' style={style} onClick={handleUserLogin}>
                一键获取信息
      </Button>

        </View>
    );
};
export default observer(Index);