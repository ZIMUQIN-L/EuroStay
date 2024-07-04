import { View, Text, Textarea, Icon } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './index.scss';
import { useEffect, useState } from 'react';

const ReviewDes = ({ onUserDescriptionEdit }) => {
  const [des, setDes] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  // 用户修改房源描述
  const handleUserDescriptionEdit = e => {
    const inputDescription = e.detail.value;
    setDes(inputDescription);
    onUserDescriptionEdit(inputDescription);
  };

  const handleToggleClick = () => {
    setIsPublic(!isPublic);
  };

  return (
    <View className='des-part'>
      <View className='des-container'>
        <Text className='des-title'>
          有话对主办方说？
        </Text>
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
  );
};
export default ReviewDes;
