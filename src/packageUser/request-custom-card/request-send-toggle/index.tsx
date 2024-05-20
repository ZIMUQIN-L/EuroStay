import { View, Text, Switch } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';

const RequestSendToggle = ({ onChangeToggle }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggleChange = e => {
    const toggled = e.detail.value;
    setIsToggled(toggled);
    onChangeToggle(toggled);
  };

  return (
    <View className='toggle-container'>
      <Text className='toggle-text'>是否将以上求宿信息发布到求宿广场</Text>
      <Switch checked={isToggled} onChange={handleToggleChange} />
    </View>
  );
};

export default RequestSendToggle;