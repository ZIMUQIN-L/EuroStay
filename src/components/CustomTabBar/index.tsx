import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';
import HomeIcon from '@assets/images/home.png';
import ActivityIcon from '@assets/images/repost.png';
import UserIcon from '@assets/images/user.png';
import HomeSelectedIcon from '@assets/images/home-selected.png';
import ActivitySelectedIcon from '@assets/images/repost-selected.png';
import UserSelectedIcon from '@assets/images/user-selected.png';
import { useMemo } from 'react';
import GlobalStore from '@store/GlobalStore';
import { observer } from 'mobx-react-lite';
interface CustomTabBarProps {
  onHomeSelected?: () => void;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ onHomeSelected }) => {
  const currentTab = GlobalStore.currentTab;

  const isIphone = useMemo(() => {
    const systemInfo = Taro.getSystemInfoSync();
    const { model } = systemInfo;
    const iphoneXModels = [
      'iPhone X',
      'iPhone XR',
      'iPhone XS',
      'iPhone 11',
      'iPhone 12',
      'iPhone 13',
      'iPhone 14',
      'iPhone 15',
    ];
    return iphoneXModels.some(iphoneModel => model.includes(iphoneModel));
  }, []);

  const tabBarHeight = isIphone ? '60px' : '40px';

  const handleTabClick = page => {
    if (GlobalStore.currentTab === 'home' && page === 'home') {
      if (onHomeSelected) {
        onHomeSelected(); // Call onHomeSelected if it exists
      }
    } else {
      GlobalStore.currentTab = page;
      Taro.switchTab({
        url: `/pages/${page}/index`,
        success: () => {},
        fail: err => {
          // 后面可以上报服务器
        },
      });
    }
  };

  return (
    <>
      <View className='custom-tab-bar' style={{ height: tabBarHeight }}>
        <View className='tab-item' onClick={() => handleTabClick('home')}>
          <View className='tab-icon'>
            <Image src={currentTab === 'home' ? HomeSelectedIcon : HomeIcon} />
          </View>
          <Text className={`tab-text ${currentTab === 'home' ? 'active' : ''}`}>
            主页
          </Text>
        </View>

        <View className='tab-item' onClick={() => handleTabClick('activity')}>
          <View className='tab-icon'>
            <Image
              src={
                currentTab === 'activity' ? ActivitySelectedIcon : ActivityIcon
              }
            />
          </View>
          <Text
            className={`tab-text ${currentTab === 'activity' ? 'active' : ''}`}
          >
            活动
          </Text>
        </View>

        <View
          className='tab-item'
          onClick={() => handleTabClick('user-profile')}
        >
          <View className='tab-icon'>
            <Image
              src={currentTab === 'user-profile' ? UserSelectedIcon : UserIcon}
            />
          </View>
          <Text
            className={`tab-text ${currentTab === 'user-profile' ? 'active' : ''}`}
          >
            我
          </Text>
        </View>
      </View>
    </>
  );
};

export default observer(CustomTabBar);
