import React from 'react';
import {
  View,
  Text,
  Image,
  Swiper,
  SwiperItem,
  Button,
} from '@tarojs/components';
import './index.scss';
import {
  StarOutlined,
  LocationOutlined,
  NotesOutlined,
  GoldCoinOutlined,
  FriendsOutlined,
} from '@taroify/icons';
import { PreferenceIcon } from '@utils/cloudIcons';
import Taro from '@tarojs/taro';

const DetailPage = () => {
  // Hardcoded demo data
  const activity = {
    title: '活动标题线下艺术疗愈workshop',
    location: 'Paris, 2nd ARR',
    price: '€25/人',
    date: '2024年6月31日',
    time: '14:00-15:30',
    duration: '1h30min',
    organizer: 'Username',
    description: '由主持人填写 简要说明线下活动内容或者亮点',
    participants: 15,
    images: [
      'https://via.placeholder.com/300x150',
      'https://via.placeholder.com/300x150',
      'https://via.placeholder.com/300x150',
    ],
  };

  const host = {
    name: 'Username',
    info: '设计师，艺术疗愈，手工爱好者',
    avatar: 'https://via.placeholder.com/50x50',
  };

  const handleSignUpClick = () => {
    Taro.navigateTo({
      url: `/packageActivity/activity-application/index?id=anyid`,
    });
  };

  return (
    <View className='detail-page'>
      <Swiper
        className='swiper'
        indicatorDots
        autoplay
        interval={5000}
        duration={500}
      >
        {activity.images.map((image, index) => (
          <SwiperItem key={index}>
            <Image src={image} className='slide-image' />
          </SwiperItem>
        ))}
      </Swiper>
      <View className='activity-info'>
        <Text className='title'>{activity.title}</Text>
        <View className='details'>
          <View className='location-container'>
            <LocationOutlined className='icon' />
            <Text className='location'>{activity.location}</Text>
          </View>
          <View className='location-container'>
            <Text className='location'>报名获得详细地址</Text>
          </View>
        </View>
        <View className='details'>
          <View className='date-container'>
            <NotesOutlined className='icon' />
            <Text>
              {activity.date},{activity.time}
            </Text>
          </View>
          <View className='date-container'>
            <Text>{activity.duration}</Text>
          </View>
        </View>
        <View className='organizer'>
          <Image src={host.avatar} className='organizer-image' />
          <View className='organizer-info'>
            <Text className='organizer-name'>发起人 {host.name}</Text>
            <Text className='organizer-description'>{host.info}</Text>
          </View>
        </View>
        <View className='description'>
          <Image src={PreferenceIcon} className='description-image' />
          <View className='description-info'>
            <Text className='description-title'>活动亮点介绍</Text>
            <Text className='description-content'>{activity.description}</Text>
          </View>
        </View>
      </View>
      <View className='contact-container'>
        <View className='price-info'>
          <Text className='price'>{activity.price}</Text>
          <Text className='participants'>
            预估人数 {activity.participants}人
          </Text>
        </View>
        <View className='right-section'>
          <View className='icon-container'>
            <StarOutlined className='icon' />
          </View>
          <Button className='contact-button' onClick={handleSignUpClick}>
            报名活动
          </Button>
        </View>
      </View>
    </View>
  );
};

export default DetailPage;
