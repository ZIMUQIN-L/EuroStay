import { View, Text, Textarea } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';

const RequestDes = ({ onRequestDes }) => {
  const [des, setDes] = useState('');

  // 用户修改房源描述
  const handleUserDescriptionEdit = e => {
    const inputDescription = e.detail.value;
    setDes(inputDescription);
    onRequestDes(inputDescription);
  };

  return (
    <View className='des-part'>
      <View className='des-container'>
        <Text className='des-title'>再写点什么向房主推荐你自己吧～</Text>
        <View className='des-text-container' style={{ minHeight: '5px' }}>
          <View className='des-text'>
            <Textarea
              style={{ height: '80px' }}
              value={des}
              onInput={handleUserDescriptionEdit}
              placeholder='请向房东简单的介绍一下你吧～以及你愿意用技能/房源/💰等等什么来交换住宿呢～'
              placeholderClass='des-text-placeholder'
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default RequestDes;
