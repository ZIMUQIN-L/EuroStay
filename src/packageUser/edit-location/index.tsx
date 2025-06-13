import { View, Text, Input } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro, { useRouter } from '@tarojs/taro';
import { useState } from 'react';
import './index.scss';

const EditLocation = () => {
  const router = useRouter();
  const currentValue = decodeURIComponent(router.params.currentValue || '');
  const [location, setLocation] = useState(currentValue);

  const handleConfirm = () => {
    if (!location.trim()) {
      Taro.showToast({
        title: '地区不能为空',
        icon: 'none'
      });
      return;
    }

    // 获取当前页面实例
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];
    
    // 直接使用 getOpenerEventChannel 获取事件通道
    const eventChannel = currentPage.getOpenerEventChannel();
    
    // 发送数据到上一页
    eventChannel.emit('updateData', {
      location: location.trim()
    });

    // 返回上一页
    Taro.navigateBack();
  };

  const handleCancel = () => {
    Taro.navigateBack();
  };

  return (
    <View className='edit-location'>
      <View className='content-container'>
        <View className='input-section'>
          <Text className='label'>地区</Text>
          <Input
            className='input'
            value={location}
            onInput={e => setLocation(e.detail.value)}
            placeholder='输入你的地区'
          />
        </View>

        <View className='button-group'>
          <View className='confirm-button' onClick={handleConfirm}>
            确认修改
          </View>
          <View className='cancel-button' onClick={handleCancel}>
            取消
          </View>
        </View>
      </View>
    </View>
  );
};

export default observer(EditLocation);
