import { View, Text, Button, Image } from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import { phoneLogo } from '@utils/cloudIcons';  // 假设你的logo存在这里
import './index.scss';

const EditPhone = () => {
  const [agreed, setAgreed] = useState(false);

  const handleGetPhoneNumber = async (e) => {
    if (!agreed) {
      Taro.showToast({
        title: '请先同意服务协议和隐私政策',
        icon: 'none'
      });
      return;
    }

    const { errMsg, code } = e.detail;
    if (errMsg === 'getPhoneNumber:ok') {
      try {
        // 调用后端API
        console.log('获取手机号成功', code);
      } catch (error) {
        console.error('获取手机号失败', error);
      }
    }
  };

  const handleCancel = () => {
    Taro.navigateBack();
  };

  return (
    <View className='edit-phone'>
      <View className='content'>
        <Image className='logo' src={phoneLogo} />

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
