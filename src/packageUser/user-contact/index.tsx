import { View, Text, Image } from '@tarojs/components';
import { useCallback } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';
import {eswx} from '@utils/cloudIcons';

const UserContact = () => {
  const handleCopy = useCallback((text: string) => {
    Taro.setClipboardData({
      data: text,
      success: () => {
        Taro.showToast({
          title: '复制成功',
          icon: 'success'
        });
      }
    });
  }, []);

  return (
    <View className='user-contact'>
      <View className='contact-header'>
        <Text className='title'>如何联系我们~</Text>
      </View>

      <View className='contact-content'>
        <Text className='description'>
          Hii大家好呀，我们是EuroStay~谢谢你使用我们的平台，如果有任何订单相关的问题，欢迎大家通过以下方式联系我们～
        </Text>

        <View className='contact-item'>
          <View className='item-label'>
            <View className='label-bar' />
            <Text className='label-text'>邮箱</Text>
          </View>
          <Text 
            className='item-value'
            onClick={() => handleCopy('Eurostay@163.com')}
          >
            Eurostay@163.com
          </Text>
        </View>

        <View className='contact-item'>
          <View className='item-label'>
            <View className='label-bar' />
            <Text className='label-text'>微信</Text>
          </View>
          <Text 
            className='item-value'
            onClick={() => handleCopy('Eurostay')}
          >
            微信号：Eurostay
          </Text>
          <Image 
            className='qr-code'
            src={eswx}
            mode='aspectFit'
          />
        </View>

        <View className='contact-item'>
          <View className='item-label'>
            <View className='label-bar' />
            <Text className='label-text'>社交账号</Text>
          </View>
          <Image 
            className='social-icon'
            src='小红书图标地址'
            mode='aspectFit'
          />
        </View>
      </View>
    </View>
  );
};

export default UserContact;
