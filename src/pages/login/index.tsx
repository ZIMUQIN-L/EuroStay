import { View, Text, Image, Button } from '@tarojs/components';
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
      <Text className='loading-text'>正在加载你的冒险~</Text>
    </View>
  );
};

const Login = () => {
  const [hasUserAgreed, setHasUserAgreed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [socket, setSocket] = useState<Taro.SocketTask | null>(null);

  useEffect(() => {
    checkLoginStatus();
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
                  GlobalStore.currentTab = 'world';
                  Taro.reLaunch({
                    url: '/pages/home-world/index',
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

  const connectWebSocket = async token => {
    if (!token) {
      console.error('缺少 token，无法连接 WebSocket');
      return;
    }

    const wsUrl = `wss://api.eurostay.co/app/essocket/${token}`;
    console.log('正在连接 WebSocket:', wsUrl);

    try {
      const ws = await Taro.connectSocket({
        url: wsUrl,
        header: { 'content-type': 'application/json' },
      });

      // WebSocket 监听事件
      ws.onOpen(() => {
        console.log('WebSocket 已连接');
      });

      ws.onMessage(res => {
        console.log('收到 WebSocket 消息:', res.data);
      });

      ws.onClose(() => {
        console.log('WebSocket 连接关闭');
        setTimeout(() => connectWebSocket(token), 3000); // 3秒后自动重连
      });

      ws.onError(err => {
        console.error('WebSocket 发生错误:', err);
      });

      setSocket(ws); // 存储 WebSocket 实例
    } catch (error) {
      console.error('WebSocket 连接失败:', error);
    }
  };

  const handleCheckboxChange = () => {
    setHasUserAgreed(!hasUserAgreed);
  };

  const handleGetPhoneNumber = async (e) => {
    if (!hasUserAgreed) {
        Taro.showToast({
          title: '请先阅读并同意用户服务协议和隐私政策',
          icon: 'none',
          duration: 2000,
        });
        return;
      }

    const { errMsg, encryptedData, iv } = e.detail;
    setIsChecking(true);
    
    if (errMsg === 'getPhoneNumber:ok') {
      try {
        // 获取登录凭证
        const loginRes = await Taro.login();
        if (loginRes.code) {
          // 调用绑定手机号接口
          const res = await Taro.request({
            url: 'https://api.eurostay.co/app/esuser/bindWxPhone',
            method: 'POST',
            header: {
              'Content-Type': 'application/json',
              'token': GlobalStore._userInfo.token
            },
            data: {
              encryptedData: encryptedData,
              iv: iv,
              sessionKey: loginRes.code, // 使用登录凭证作为sessionKey
              code: loginRes.code
            }
          });
          console.log(res);

          if (res.statusCode === 200 && res.data.code === 0) {
            GlobalStore.setAllInfo(res.data.userInfo);
            GlobalStore.setToken(res.data.token);
            GlobalStore.currentTab = 'world';
            setIsChecking(false);
            Taro.reLaunch({
              url: '/pages/home-world/index',
              success: function () {
                // Taro.showToast({
                //   title: '登录成功',
                //   icon: 'success',
                //   duration: 2000,
                // });
                Taro.showModal({
                    title: '前往补充个人信息',
                    content: '请前往补充个人信息，方便Guest/Host更好地了解你哦~',
                    success: function (res) {
                      if (res.confirm) {
                        Taro.navigateTo({
                          url: `/packageUser/user-editing/index`,
                        });
                      }
                    },
                  });
              },
            });
          }
          else {
            setIsChecking(false);
            Taro.showToast({
                title: res.data.msg || '登录失败',
                icon: 'none',
                duration: 2000,
              });
          }
        }
      } catch (error) {
        setIsChecking(false);
        console.error('绑定手机号失败', error);
        Taro.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 2000,
        });
      }
    } else {
        setIsChecking(false);
        Taro.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000,
          });
    }
  };

  const handleAgreement = () => {
    if (!hasUserAgreed) {
        Taro.showToast({
          title: '请先阅读并同意用户服务协议和隐私政策',
          icon: 'none',
          duration: 2000,
        });
        return;
      }
  }

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
                GlobalStore.currentTab = 'world';
                Taro.reLaunch({
                  url: '/pages/home-world/index',
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
        {/* <View className='wechat-login-btn' onClick={handleWechatLogin}>
          <Text>微信登录</Text>
        </View> */}
        {!hasUserAgreed?(<View className='wechat-login-btn' onClick={handleAgreement}>
          <Text>手机号快捷登录</Text>
        </View>):
        (<Button 
            className='wechat-login-btn'
            openType='getPhoneNumber'
            disabled={!hasUserAgreed}
            onGetPhoneNumber={handleGetPhoneNumber}
          >
            手机号快捷登录
          </Button>)}

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
                Taro.navigateTo({ url: '/pages/common-setting/index?type=service' });
              }}
            >
              《用户服务协议》
            </Text>
            及
            <Text
              className='link'
              onClick={() => {
                Taro.navigateTo({ url: '/pages/common-setting/index?type=vip' });
              }}
            >
              《隐私政策》
            </Text>
          </Text>
        </View>
        <View className='direct-entry-btn' onClick={() => {
          GlobalStore.currentTab = 'world';
          Taro.reLaunch({
            url: '/pages/home-world/index'
          });
        }}>
          <Text>直接进入</Text>
        </View>

      </View>
    </View>
  );
};

export default Login;
