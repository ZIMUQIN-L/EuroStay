import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import './index.scss';

const ContactInfoBoard = ({ onClose, onRetriveData }) => {
  const [ownerContact, setOwnerContact] = useState('test');

  return (
    <CustomFullScreenDialog
      title='房东联系方式'
      onClose={onClose}
      onSubmit={onClose}
    >
      <Text className='des-title'>微信号</Text>
      <View className='caution-text'>
        <Text>{ownerContact}</Text>
      </View>
      <Text className='des-title'>房主打招呼信息</Text>
      <View className='caution-text'>
        <Text>{ownerContact}</Text>
      </View>
    </CustomFullScreenDialog>
  );
};
export default ContactInfoBoard;
