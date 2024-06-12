import { View, Text, Textarea } from '@tarojs/components';
import './index.scss';
import { useEffect, useState } from 'react';

const ReviewDes = ({ description="as", onUserDescriptionEdit }) => {
  const [des, setDes] = useState(description);

  useEffect(() => {
    setDes(description);
  }, [description]);

  // 用户修改房源描述
  const handleUserDescriptionEdit = e => {
    const inputDescription = e.detail.value;
    setDes(inputDescription);
    onUserDescriptionEdit(inputDescription);
  };

  return (
    <View className='des-part'>
      <View className='des-container'>
        <Text className='des-title'>填写标题，简明扼要介绍你的房源吧～</Text>
        <View className='caution-text'>
          <Text>
            描述注意事项，表明你的要求或者提醒，如只租女生、不允许开派对等
          </Text>
        </View>
        <View className='des-text-container' style={{ minHeight: '80px' }}>
          <View className='des-text'>
            <Textarea
              value={des}
              onInput={handleUserDescriptionEdit}
              placeholder='详情介绍：更详细的介绍，如房屋类型、独居合租、交通便利、区域安全、租金押金等，帮助租客更好的了解你的房源～'
            />
          </View>
        </View>
        {/* <View className='des-text-container'>
          <View className='des-text'>
            <Text>
              注意事项：描述你的要求或者提醒，如只租女生、不允许开派对等
            </Text>
          </View>
        </View> */}
      </View>
    </View>
  );
};
export default ReviewDes;
