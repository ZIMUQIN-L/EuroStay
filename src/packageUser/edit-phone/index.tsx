import { View, Text, Button, Image } from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';
import { phoneLogo } from '@utils/cloudIcons';  // 假设你的logo存在这里
import './index.scss';

const EditPhone = () => {
  const [agreed, setAgreed] = useState(false);

  // 处理手机号显示格式
  const formatPhoneNumber = (phone: string | null | undefined) => {
    if (!phone) return '';
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  };

  const handleGetPhoneNumber = async (e) => {
    if (!agreed) {
      Taro.showToast({
        title: '请先同意服务协议和隐私政策',
        icon: 'none'
      });
      return;
    }

    const { errMsg, encryptedData, iv } = e.detail;
    
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

          if (res.data.code === 0) {
            Taro.showToast({
              title: '绑定成功',
              icon: 'success'
            });
            setTimeout(() => {
              Taro.navigateBack();
            }, 1500);
          } else {
            Taro.showToast({
              title: res.data.msg || '绑定失败',
              icon: 'none'
            });
          }
        }
      } catch (error) {
        console.error('绑定手机号失败', error);
        Taro.showToast({
          title: '绑定失败',
          icon: 'none'
        });
      }
    } else {
      Taro.showToast({
        title: '获取手机号失败',
        icon: 'none'
      });
    }
  };

  const handleCancel = () => {
    Taro.navigateBack();
  };

  return (
    <View className='edit-phone'>
      <View className='content'>
        <Image className='logo' src={phoneLogo} />
        
        {/* <Text className='phone-number'>
          {formatPhoneNumber(GlobalStore._userInfo?.mobile)}
        </Text>
        <Text className='phone-label'>本机号码</Text> */}

        <View className='agreement'>
          <View 
            className={`checkbox ${agreed ? 'checked' : ''}`}
            onClick={() => setAgreed(!agreed)}
          />
          <Text className='agreement-text'>
            我已阅读并同意Eurostay
            <Text className='link'>《用户服务协议》</Text>
            及
            <Text className='link'>《隐私政策》</Text>
          </Text>
        </View>

        <View className='button-group'>
          <Button 
            className='confirm-button'
            openType='getPhoneNumber'
            onGetPhoneNumber={handleGetPhoneNumber}
          >
            绑定手机号
          </Button>

          <View className='cancel-button' onClick={handleCancel}>
            取消
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditPhone;
