import { View, Text, Textarea } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';

const SeekDescription = ({ seekPrevDes, onChangeDes }) => {
  const [des, setDes] = useState('');

  // 用户修改房源描述
  const handleUserDescriptionEdit = e => {
    const inputDescription = e.detail.value;
    setDes(inputDescription);
    onChangeDes(inputDescription);
  };

  return (
    <View className='des-part'>
      <View className='des-container'>
        <Text className='des-title'>求宿说明</Text>
        <View className='des-text-container' style={{ minHeight: '5px' }}>
          <View className='des-text'>
            <Textarea
              style={{ height: '80px' }}
              value={des}
              onInput={handleUserDescriptionEdit}
              placeholder='详情介绍：更详细的介绍，如房屋类型、独居合租、交通便利、区域安全、租金押金等，帮助房东更好的了解你的需求～记得也介绍一下自己哦~'
              placeholderClass='des-text-placeholder'
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default SeekDescription;
