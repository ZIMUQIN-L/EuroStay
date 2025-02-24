import { View, Text, Image, Button } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import HomepageCard from '@components/HomepageCard';
import './index.scss';
const Index = () => {
  const mockData = {
    location: '德国柏林',
    userName: '我是一条想飞的鱼',
    userPic: '',
    tags: ['infj', '画画', '摄影'],
  };
  return (
    <>
      <View className='home-search'>
        <View className='home-user-wrapper'>
          <HomepageCard {...mockData} />
          <HomepageCard {...mockData} />
        </View>
      </View>
    </>
  );
};

export default observer(Index);
