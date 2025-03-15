import { View, Text, Input } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro, { useRouter } from '@tarojs/taro';
import { useState } from 'react';
import './index.scss';

const EditNickname = () => {
  const router = useRouter();
  const currentValue = decodeURIComponent(router.params.currentValue || '');
  const [nickname, setNickname] = useState(currentValue);

  const handleConfirm = () => {
    if (!nickname.trim()) {
      Taro.showToast({
        title: '昵称不能为空',
        icon: 'none'
      });
      return;
    }

    if (nickname.length > 14) {
      Taro.showToast({
        title: '昵称不能超过14个字',
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
      username: nickname.trim()
    });

    // 返回上一页
    Taro.navigateBack();
  };

  const handleCancel = () => {
    Taro.navigateBack();
  };

  return (
    <View className='edit-nickname'>
      <View className='content-container'>
        <View className='input-section'>
          <Text className='label'>昵称</Text>
          <Input
            className='input'
            value={nickname}
            onInput={e => setNickname(e.detail.value)}
            placeholder='请输入昵称'
            maxlength={14}
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

export default observer(EditNickname);
