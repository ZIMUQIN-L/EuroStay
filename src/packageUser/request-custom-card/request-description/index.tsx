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
              value={des}
              onInput={handleUserDescriptionEdit}
              placeholder='详情介绍: 更详细的求宿信息或者个人介绍, 帮助房主更好的理解你的求宿诉求～'
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default RequestDes;