import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { LocationOutlined, CalendarOutlined, Close } from '@taroify/icons'; // Adjust the import path as necessary
import './index.scss';
import { YellowPoint } from '@utils/cloudIcons';
interface IProps {
  title: string;
  location: string;
  date: string;
  time: string;
  username: string;
  wechatId: string;
  avatar: string;
  point: number;
  helloMessage: string;
  onClose: () => void;
  onSubmit: () => void;
  className?: string;
  buttonName?: string;
}

const CopyInfoModal = (props: IProps) => {
  const {
    title,
    location,
    date,
    time,
    username,
    wechatId,
    avatar,
    point,
    helloMessage,
    onClose,
    onSubmit,
    buttonName,
  } = props;

  const handleOuterClick = () => {
    onClose();
  };

  return (
    <View className='modal-overlay' onClick={handleOuterClick}>
      <View
        className={`dialog-container ${props.className ? props.className : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <View className='modal-header'>
          <Text className='dialog-container-title'>报名成功</Text>
          <Close className='close-icon' onClick={onClose} />
        </View>
        <View className='modal-content'>
          <Text className='activity-title'>{title}</Text>
          <View className='location-date-container'>
            <View className='location-container'>
              <LocationOutlined className='icon' />
              <Text className='location'>{location}</Text>
            </View>
            <View className='date-container'>
              <CalendarOutlined className='icon' />
              <Text className='date'>
                {date} - {time}
              </Text>
            </View>
          </View>
          <View className='point-container-container'>
            成功报名活动 {' -'}
            {point}
            <Image src={YellowPoint} className='point-container-icon'></Image>
          </View>
          <View className='organizer-info'>
            <Image src={avatar} className='organizer-image' />
            <View className='organizer-details'>
              <Text className='organizer-name'>发起人 {username}</Text>
              <Text className='organizer-contact'>微信号: {wechatId}</Text>
            </View>
          </View>
          <View className='organizer-message'>{helloMessage}</View>
        </View>
        <View className='dialog-save-button' onClick={onSubmit}>
          <Text style={{ color: 'white' }}>
            {buttonName ? buttonName : '确认'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CopyInfoModal;
