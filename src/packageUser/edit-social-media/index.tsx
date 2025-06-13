import { useState, useEffect } from 'react';
import { View, Input, Text } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import './index.scss';

const EditSocialMedia = () => {
  const [socialMedia, setSocialMedia] = useState('');
  const [originalValue, setOriginalValue] = useState('');

  useEffect(() => {
    const params = getCurrentInstance().router?.params;
    const currentValue = params?.currentValue || '';
    setSocialMedia(decodeURIComponent(currentValue));
    setOriginalValue(decodeURIComponent(currentValue));
  }, []);

  const handleSave = () => {
    // 获取页面实例，用于传递数据回上一页
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];

    // 直接使用 getOpenerEventChannel 获取事件通道
    const eventChannel = currentPage.getOpenerEventChannel();
    
    // 使用EventChannel将数据传回上一页
    eventChannel.emit('updateData', {
      socialMedia: socialMedia.trim()
    });
    
    Taro.navigateBack();
  };

  const handleCancel = () => {
    Taro.navigateBack();
  };

  // 检查是否有变化
  const hasChanges = socialMedia !== originalValue;

  return (
    <View className='edit-social-media'>
      <View className='content-container'>
        <View className='input-section'>
          <Text className='label'>社交媒体</Text>
          <Input
            className='input'
            type='text'
            placeholder='填写你的社交媒体账号主页链接'
            value={socialMedia}
            onInput={e => setSocialMedia(e.detail.value)}
          />
          <Text className='helper-text'>你可以添加小红书等账号主页链接</Text>
        </View>

        <View className='button-group'>
          <View 
            className='confirm-button'
            onClick={hasChanges ? handleSave : undefined}
          >
            确定
          </View>
          <View 
            className='cancel-button'
            onClick={handleCancel}
          >
            取消
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditSocialMedia; 