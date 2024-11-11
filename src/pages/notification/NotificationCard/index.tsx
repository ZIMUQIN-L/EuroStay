import { observer } from 'mobx-react';
import { View, Text, Image } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.scss';
import Taro from '@tarojs/taro';

const Index = () => {
  return (
    <>
      <View className='notification-card-wrap'>
        <View className='card-top'>
          <View className='card-top-left'>
            <View className='sender'>
              <Image className='avatar-pic' src=''></Image>
              <View className='sender-text'>
                素食主义同意了您对那不勒斯房的求宿申请！快来确认预定开启你的新旅程吧~
              </View>
            </View>
            <View className='buttons'>
              <View className='confirm'>确认预定</View>
              <View className='reject'>放弃预定</View>
            </View>
          </View>
          <View className='card-top-right'>
            <Image className='notification-pic' src=''></Image>
          </View>
        </View>
        <View className='card-bottom'>2024-10-19 12:05 </View>
      </View>
    </>
  );
};

export default observer(Index);
