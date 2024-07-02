import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import CustomTabBar from '@components/CustomTabBar';
import ActivityCard from '@components/ActivityCard';
import Banner from '@components/Banner';
import TagBar from '@components/TagBar';
import './index.scss';

const Index = () => {
  const activities = [
    {
      title: '活动标题剧本杀密室逃脱手工workshop之类的',
      location: 'Rotterdam Blaak',
      price: '€45',
      tags: ['#全女局', '#剧本杀', '#KTV'],
      participants: 9,
      username: 'username',
      images: [''], // Add image URLs here
    },
    {
      title: 'activity title 2',
      location: 'location 2',
      price: '€45',
      tags: ['#全女局', '#剧本杀'],
      participants: 9,
      username: 'username',
      images: [''], // Add image URLs here
    },
    {
      title: 'activity title 2',
      location: 'location 2',
      price: '€45',
      tags: ['#全女局', '#剧本杀'],
      participants: 9,
      username: 'username',
      images: [''], // Add image URLs here
    },
    {
      title: 'activity title 2',
      location: 'location 2',
      price: '€45',
      tags: ['#全女局', '#剧本杀'],
      participants: 9,
      username: 'username',
      images: [''], // Add image URLs here
    },
    
    // Add more activity data as needed
  ];

  const navigateToPage = (page) => {
    Taro.switchTab({
      url: `/pages/${page}/index`,
      success: () => {},
      fail: (err) => {
        // Handle error
      },
    });
  };

  return (
    <View className='index'>
      <Banner />
      <TagBar />
      <View className='cards'>
        {activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </View>
      <View className='add-button' onClick={() => navigateToPage('add')}>
        <Text>+</Text>
      </View>
      <CustomTabBar />
    </View>
  );
};

export default Index;
