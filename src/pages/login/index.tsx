import { useState, useEffect } from 'react';
import { observer } from '@store/utils';
import { Button, Image, Toast } from '@taroify/core';
import Taro from '@tarojs/taro';
import './index.scss';
import GlobalStore from '@store/GlobalStore';
import { View } from '@tarojs/components';
import { UserItemProps } from '@utils/interfaces';
import { userInfoSearch, userInfoAdd } from '@common/database/user/user';
import Loading from "./loading";

import { EuroStay } from '@utils/cloudIcons';
import { set } from 'mobx';

const Index = () => {
  const [loginState, setLoginState] = useState(false);
  const [loginStateText, setLoginStateText] = useState<String>('错误提示');
  const [userInfo, setUserInfo] = useState({});
  const [userOpenidInfo, setUserOpenidInfo] = useState<String>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  // 如已经登录过则不再登录
  const userAgreementContent = `在使用留学生换宿信息平台EuroStay（以下简称“平台”）之前，请您仔细阅读并充分理解本协议各条款。您需要选择接受或不接受本协议。除非您接受本协议所有条款，否则您无权注册、登录或使用本服务所提供的相关功能。您的登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。1.服务说明：本平台致力于为留学生提供一个交流和分享换宿信息的平台，用户可以发布和查询换宿或租赁信息。本平台上的所有信息均来自用户或其他资源方，并需要用户进一步自行核实，本平台不提供任何形式的担保。2.用户责任：用户必须为自己注册账户下的一切行为负责，包括您所发布的任何内容以及由此产生的任何后果。用户应确保发布信息的真实性、合法性，并承担因使用本服务而引起的所有风险和责任。3.内容规范：用户不得发布任何违法国家法律法规和社会公序良俗的信息，包括但不限于以下内容：涉及国家安全、损害国家荣誉和利益、煽动民族仇恨和歧视、破坏宗教政策和民族团结的信息；传播淫秽、色情、赌博、暴力、恐怖或教唆犯罪的内容；侵犯他人名誉权、肖像权、知识产权等合法权益的信息。4.免责声明：鉴于网络环境的特殊性，本平台无法预见和控制各种风险，包括但不限于信息真实性、合法性的风险，用户间交易的风险，以及网络安全的风险。因此，用户应自行承担以上风险，本平台不承担任何法律责任。5.服务变更、中断或终止：鉴于网络服务的特殊性，用户同意本平台有权随时变更、中断或终止部分或全部的服务。本平台不担保服务不中断，不担保服务的及时性和安全性。6.法律适用与争议解决：本协议的订立、执行和解释及争议的解决均应适用中国法律。如发生本协议相关的争议，应通过友好协商解决；协商不成时，任一方有权将争议提交至本平台注册地的人民法院管辖。7.协议修改：本平台有权随时修改本协议的任何条款，一旦条款内容发生变动，本平台将会在相关的服务页面公告修改内容。如果不同意本平台对条款内容所做的修改，用户有权停止使用网络服务。如果用户继续使用网络服务，则视为接受本平台对条款内容的修改。8.其他：本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为解释本协议条款的依据。本协议条款无论因何种原因部分无效或不可执行，其他条款仍然有效，并对双方具有约束力。9.最终解释权归本平台所有。`;

  const [dbUserData, setDbUserData] = useState<UserItemProps[]>([]);

  const handleUserEnter = () => {
    Taro.showModal({
      title: '用户协议',
      content: userAgreementContent,
      success: function (res) {
        if (res.confirm) {
          setIsLoading(true);
          Taro.login({
            success: function (res) {
              if (res.code) {

                Taro.cloud
                  .callFunction({
                    name: 'getUserOpenid',
                    data: {},
                  })
                  .then(callbackResult => {
                    // 这里不太确定需不需要synchronize一下
                    // todo?
                    if (typeof callbackResult.result === 'string') {
                      setUserOpenidInfo(callbackResult.result);
                    }
                    userInfoSearch(callbackResult.result).then(
                      (dbUserInfo: UserItemProps[]) => {
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
                    Taro.hideLoading();
                    errorDialog('登录失败' + err.errMsg, 'fail');
                  });
              } else {
                errorDialog('登录失败' + res.errMsg, 'fail');
              }
            },
          });
        } else if (res.cancel) {
          Taro.showToast({
            title: '请同意用户协议',
            icon: 'error',
          });
          handleUserEnter();
        }
      },
    });
  };

  useEffect(() => {
    handleUserEnter();
  }, []);

  // 处理用户登录请求
  const handleUserLogin = () => {
    Taro.getUserProfile({
      desc: '用户登录',
      success: res => {
        setUserInfo(res.userInfo);
        userInfoAdd(
          userOpenidInfo,
          res.userInfo['nickName'],
          res.userInfo['avatarUrl'],
          res.userInfo['userLocation'],
        ).then(errMsg => {
          if (errMsg == 'collection.add:ok') {
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
          } else {
            errorDialog('登录失败' + errMsg, 'fail');
          }
        });
      },
      fail: err => {
        errorDialog('登录失败' + err.errMsg, 'fail');
      },
    });
  };

  // 用户获取用户手机号，可以在小程序企业认证后使用
  const getPhoneNumber = e => {
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      const result = Taro.cloud.callFunction({
        name: 'getUserInfo',
        data: {
          type: 'login',
          id: Taro.cloud.CloudID(e.detail.cloudID),
        },
      });
    } else {
      Taro.hideLoading({
        complete: res => {
          Taro.showToast({
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
    }, 100);
  };
  const logo = EuroStay;
  return (
    <>
    { !isLoading ? 
    (<View className='login-container'>
      <Toast className='login-toast' open={loginState}>
        {loginStateText}
      </Toast>
      <View className='login-logo-container'>
        <Image className='login-logo-image' src={logo} />
      </View>
      <Button
        className='login-button'
        color='primary'
        onClick={() => handleUserLogin}
      >
        微信登陆
      </Button>
    </View>) : (
    <Loading />)}
    </>
  );
};
export default observer(Index);
