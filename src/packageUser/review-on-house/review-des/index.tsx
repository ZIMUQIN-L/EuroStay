import { View, Text, Textarea, Icon } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './index.scss';
import { useEffect, useState } from 'react';

const ReviewDes = ({ onUserDescriptionEdit, onIsPublicEdit }) => {
  const [des, setDes] = useState("");
  const [isPublic, setIsPublic] = useState(true); 

  // 用户修改房源描述
  const handleUserDescriptionEdit = e => {
    const inputDescription = e.detail.value;
    setDes(inputDescription);
    onUserDescriptionEdit(inputDescription);
  };

  const handleToggleClick = () => {
    setIsPublic(!isPublic);
    onIsPublicEdit(!isPublic);
  };

  return (
    <View className='des-part'>
      <View className='des-container'>
        <Text className='des-title'>说说你的换宿体验吧，给其他朋友一些帮助～</Text>
        <View className='des-text-container' style={{ minHeight: '80px' }}>
          <View className='des-text'>
            <Textarea
              value={des}
              onInput={handleUserDescriptionEdit}
              placeholder='请输入评语（多多填写评语有助于提升你在本平台的等级哦～）'
            />
          </View>
        </View>
        <View className='toggle-container'>
          <View className='toggle-button-container'>
              <View className={`toggle-button ${isPublic ? 'public' : 'private'}`} onClick={handleToggleClick}>
                <AtIcon value='check' size='20' color='#fff' />
              </View>
              <Text className='toggle-status'>{isPublic ? '公开' : '私密'}</Text>
          </View>
          <Text className='toggle-explanation'>
            {isPublic ? '公开头像昵称，大家可以看到你的主页' : '私密设置，只有你自己可以看到评语'}
          </Text>
        </View>

      </View>
    </View>
  );
};
export default ReviewDes;
