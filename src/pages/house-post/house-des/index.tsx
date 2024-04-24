import { View, Text, Input, Textarea } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';

const HouseDes = () => {
  const [des, setDes] = useState('');

  return (
    <View className='des-part'>
      <View className='des-container'>
        <Text className='des-title'>填写标题，简明扼要介绍你的房源吧～</Text>
        <View className='des-text-container' style={{ minHeight: '80px' }}>
          <View className='des-text'>
            <Textarea
              value={des}
              placeholder='详情介绍：更详细的介绍，如房屋类型、独居合租、交通便利、区域安全、租金押金等，帮助租客更好的了解你的房源～'
            />
          </View>
        </View>
        <View className='des-text-container'>
          <View className='des-text'>
            <Text>
              注意事项：描述你的要求或者提醒，如只租女生、不允许开派对等
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default HouseDes;
