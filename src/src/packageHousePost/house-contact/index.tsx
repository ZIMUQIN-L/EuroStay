import { View, Text, Input } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';

const HouseContact = ({ onUserContactEdit }) => {
  const [contact, setContact] = useState('');

  // 用户修改房源描述
  const handleUserContactEdit = e => {
    const inputContact = e.detail.value;
    setContact(inputContact);
    onUserContactEdit(inputContact);
  };

  return (
    <View className='des-part'>
      <View className='des-container'>
        <Text className='des-title'>请填写自己的微信联系方式～</Text>
        <View className='des-text-container' style={{ minHeight: '30px' }}>
          <View className='des-text'>
            <Input
              value={contact}
              onInput={handleUserContactEdit}
              placeholder='请填写自己的微信号，让租客更好地联系你～'
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default HouseContact;
