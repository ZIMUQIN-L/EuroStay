import { View, Text, Input } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import './index.scss';

const AddTag = () => {
  const [newTag, setNewTag] = useState('');

  const handleConfirm = () => {
    if (!newTag.trim()) {
      Taro.showToast({
        title: '标签不能为空',
        icon: 'none'
      });
      return;
    }

    const pages = Taro.getCurrentPages();
    const prevPage = pages[pages.length - 2];
    
    // 发送新标签回上一页
    prevPage.getOpenerEventChannel().emit('addNewTag', {
      tag: newTag.trim()
    });

    Taro.navigateBack();
  };

  const handleCancel = () => {
    Taro.navigateBack();
  };

  return (
    <View className='add-tag-page'>
      <View className='content-container'>
        <Text className='title'>添加标签</Text>
        <Input
          className='input'
          value={newTag}
          onInput={e => setNewTag(e.detail.value)}
          placeholder='请输入标签名称'
          maxlength={10}
        />
        <View className='button-group'>
          <View className='confirm-button' onClick={handleConfirm}>
            确认添加
          </View>
          <View className='cancel-button' onClick={handleCancel}>
            取消添加
          </View>
        </View>
      </View>
    </View>
  );
};

export default observer(AddTag); 