import { View, Text, Textarea } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro, { useRouter } from '@tarojs/taro';
import { useState } from 'react';
import './index.scss';

const EditAbout = () => {
  const router = useRouter();
  const currentValue = decodeURIComponent(router.params.currentValue || '');
  const [about, setAbout] = useState(currentValue);
  const maxLength = 100;

  const handleConfirm = () => {
    if (!about.trim()) {
      Taro.showToast({
        title: '自我介绍一下嘛~',
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
      aboutMe: about.trim()
    });

    // 返回上一页
    Taro.navigateBack();
  };

  const handleCancel = () => {
    Taro.navigateBack();
  };

  return (
    <View className='edit-about'>
      <View className='content-container'>
        <View className='input-section'>
          <Text className='hint'>请介绍一下你自己吧～目前是什么职业身份，目前在哪里做啥呢？近5年过往独特的生活经历有什么呢？</Text>
          <View className='textarea-container'>
            <Textarea
              className='textarea'
              value={about}
              onInput={e => setAbout(e.detail.value)}
              placeholder='介绍一下你自己，可以是兴趣、经历、或者任何你想分享的~'
              maxlength={maxLength}
              autoHeight
            />
            <Text className='counter'>{about.length}/{maxLength}</Text>
          </View>
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

export default observer(EditAbout);
