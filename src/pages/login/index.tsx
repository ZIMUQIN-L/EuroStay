import { View, Text, Image } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';
import GlobalStore from '@store/GlobalStore';

// Mock 图片，后续替换为真实图片
const MOCK_IMAGES = {
  intro: 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/login_page1.png',
  rules: 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/login_page2.png',
  signup: 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/login_page3.png',
  guide: 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/login_page4.png'
};

const LoginPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // 检查登录状态
  const checkLoginStatus = async () => {
    try {
      const token = Taro.getStorageSync('token');
      if (token) {
        // 调用后端 API 验证 token
        // const response = await Taro.request({
        //   url: 'your_api_endpoint/check-login',
        //   method: 'POST',
        //   header: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        
        // if (response.data.isRegistered) {
        //   // 已注册，直接跳转到首页
        //   Taro.redirectTo({ url: '/pages/home/index' });
        //   return;
        // }
      }
      // 未注册或 token 无效，显示引导页
    } catch (error) {
      console.error('Login check failed:', error);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleLogin = () => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          // 调用后端登录接口
          Taro.request({
            url: `https://api.eurostay.co/app/esuser/wxLogin?code=${res.code}`,
            method: 'POST',
            success: function (response) {
              if (response.statusCode === 200 && response.data.code === 0) {
                // 保存 token 和 uid
                GlobalStore.setToken(response.data.token);
                GlobalStore.setUid(response.data.uid);
                setCurrentStep(currentStep + 1);
                console.log(GlobalStore._userInfo.token);
                console.log(GlobalStore._userInfo.uid);
                // Taro.switchTab({ 
                //   url: '/pages/home/index',
                //   success: function () {
                //     Taro.showToast({
                //       title: '登录成功',
                //       icon: 'success',
                //       duration: 2000
                //     });
                //   }
                // });
              } else {
                Taro.showToast({
                  title: response.data.msg || '登录失败',
                  icon: 'none',
                  duration: 2000
                });
              }
            },
            fail: function (err) {
              console.error('Request failed:', err);
              Taro.showToast({
                title: '登录失败，请重试',
                icon: 'none',
                duration: 2000
              });
            }
          });
        } else {
          console.error('Login failed:', res.errMsg);
          Taro.showToast({
            title: '获取用户信息失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function (err) {
        console.error('WeChat login failed:', err);
        Taro.showToast({
          title: '微信登录失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <View className='step-container'>
            <Image className='step-image' src={MOCK_IMAGES.intro} />
            <Text className='step-title'>我们是谁？</Text>
            <Text className='step-desc'>欢迎来到EuroStay，一个专属于欧洲华人与旅欧留学生的互助住宿社区！EuroStay让旅行不仅是探索世界，更是连接彼此的故事。</Text>
            <View className='next-button' onClick={handleNext}>下一步</View>
          </View>
        );
      case 1:
        return (
          <View className='step-container'>
            <Image className='step-image' src={MOCK_IMAGES.rules} />
            <Text className='step-title'>社区公约与平台规则</Text>
            <View className='rules-section'>
              <Text className='rule-title'>自由协商</Text>
              <Text className='rule-desc'>在EuroStay，每个人都有机会展示自己，并通过协商建立信任，分享你的故事，互相获取信任，建立连接吧。</Text>
              <Text className='rule-title'>尊重互信</Text>
              <Text className='rule-desc'>在交流中保持真诚和礼貌，尊重他人，展示自己的独特性，以真诚的交流建立信任。</Text>
            </View>
            <View className='next-button' onClick={handleNext}>我同意并注册</View>
          </View>
        );
      case 2:
        return (
          <View className='step-container'>
            <Image className='step-image' src={MOCK_IMAGES.signup} />
            <Text className='step-title'>注册</Text>
            <View className='login-button' onClick={handleLogin}>
              微信号快捷登录
            </View>
          </View>
        );
      case 3:
        return (
          <View className='step-container'>
            <Image className='step-image' src={MOCK_IMAGES.guide} />
            <Text className='step-title'>如何在EuroStay借宿？</Text>
            <View className='guide-content'>
              <Text className='guide-item'>旅行币</Text>
              <Text className='guide-desc'>所有房源的获取需要用host提交申请，在host同意之后支付对应的旅行币。更多详情查看《获取须知》哦。</Text>
              <Text className='guide-item'>想要借宿</Text>
              <Text className='guide-desc'>完善个人资料有助于让Host更好地了解你。</Text>
              <Text className='guide-item'>想提供住宿</Text>
              <Text className='guide-desc'>完善个人资料和设置房源规则，有助于吸引合适的Guest。</Text>
            </View>
            <View className='button-group'>
              <View 
                className='secondary-button' 
                onClick={() => {
                  Taro.navigateTo({ url: '/packageUser/user-profile/index' });
                }}
              >
                完善个人资料
              </View>
              <View 
                className='primary-button'
                onClick={() => {
                  Taro.switchTab({ url: '/pages/home/index' });
                }}
              >
                探索房源
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className='login-page'>
      {renderStep()}
    </View>
  );
};

export default LoginPage;
