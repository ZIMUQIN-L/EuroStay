import { View, Text, Textarea, Input } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './index.scss';
import { useEffect, useState } from 'react';

const ReviewDes = ({ onUserDescriptionEdit, onUserContactEdit }) => {
  const [des, setDes] = useState('');
  const [contact, setContact] = useState('');

  // 用户修改房源描述
  const handleUserDescriptionEdit = e => {
    const inputDescription = e.detail.value;
    setDes(inputDescription);
    onUserDescriptionEdit(inputDescription);
  };

  const handleUserContactEdit = e => {
    setContact(e.detail.value);
    onUserContactEdit(e.detail.value);
  };

  return (
    <View className='activity-app-comment'>
      <View className='des-part'>
        <View className='des-container'>
          <Text className='des-title'>请填写自己的联系方式吧</Text>
          <View className='des-text-container'>
            <View className='des-text'>
              <Input
                value={contact}
                style={{ color: '#979797' }}
                onInput={handleUserContactEdit}
                placeholder='填写自己的联系方式吧！'
              />
            </View>
          </View>
        </View>
      </View>

      <View className='des-part'>
        <View className='des-container'>
          <Text className='des-title'>有话对主办方说？</Text>
          <View className='des-text-container' style={{ minHeight: '80px' }}>
            <View className='des-text'>
              <Textarea
                value={des}
                style={{ color: '#979797' }}
                onInput={handleUserDescriptionEdit}
                placeholder='向主办方介绍一下自己吧！'
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ReviewDes;
