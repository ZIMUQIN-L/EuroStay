import { View, Text, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro from '@tarojs/taro';
import worldIcon from '@assets/icons/world.png';
import worldSelectedIcon from '@assets/icons/world-active.png';
import orderIcon from '@assets/icons/order.png';
import orderSelectedIcon from '@assets/icons/order-active.png';
import userIcon from '@assets/icons/user.png';
import userSelectedIcon from '@assets/icons/user-active.png';
import messageIcon from '@assets/icons/message.png';
import messageSelectedIcon from '@assets/icons/message-active.png';
import postHouse from '@assets/icons/post-house.svg';
import postActivity from '@assets/icons/post-activity.svg';
import { useEffect, useState } from 'react';
import './index.scss';
import HomeSearch from '../home-world';
import Orders from '../orders';
import Messages from '../messages';
import User from '../user';
import '../../app.scss';

const Index = () => {
  const [activeTab, setActiveTab] = useState<
    'world' | 'orders' | 'post' | 'messages' | 'user'
  >('world');

  const [isShowPostModal, setIsShowPostModal] = useState<boolean>(false);

  Taro.useShareAppMessage(res => {
    return {
      title: 'EuroStay欧洲换宿',
      path: '/pages/login/index',
    };
  });

  const bottomBar = [
    {
      icon: worldIcon,
      activeIcon: worldSelectedIcon,
      text: '世界',
      value: 'world',
    },
    {
      icon: orderIcon,
      activeIcon: orderSelectedIcon,
      text: '订单',
      value: 'orders',
    },
    {
      text: '发布',
      value: 'post',
    },
    {
      icon: messageIcon,
      activeIcon: messageSelectedIcon,
      text: '消息',
      value: 'messages',
    },
    {
      icon: userIcon,
      activeIcon: userSelectedIcon,
      text: '我的',
      value: 'user',
    },
  ];

  return (
    <View className={`homepage ${isShowPostModal ? 'modal' : ''}`}>
      {isShowPostModal && (
        <View
          className='post-modal'
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <View
            className='post-house'
            onClick={() => {
              Taro.redirectTo({
                url: '/pages/house-publish/index',
              });
            }}
          >
            <Image className='icon' src={postHouse} />
            上传房源
          </View>
          <View
            className='post-activity'
            onClick={() => {
              Taro.redirectTo({
                url: '/pages/activity-publish/index',
              });
            }}
          >
            <Image className='icon' src={postActivity} />
            上传活动
          </View>
        </View>
      )}
      {activeTab === 'world' && <HomeSearch />}
      {activeTab === 'orders' && <Orders />}
      {activeTab === 'messages' && <Messages />}
      {activeTab === 'user' && <User />}
      <View className='homepage-bottom-bar'>
        {bottomBar.map(item => {
          const isActive = activeTab === item.value;
          return (
            <View
              key={item.value}
              className={`tab-item ${item.value == 'post' ? 'center-tab' : ''}`}
              onClick={() => {
                if (item.value === 'post') {
                  setIsShowPostModal(true);
                } else {
                  setActiveTab(item.value as any);
                }
              }}
            >
              {item.value == 'post' ? (
                <View className='plus-icon' />
              ) : (
                <Image
                  className='tab-icon'
                  src={isActive ? item.activeIcon : item.icon}
                />
              )}
              <Text className={`tab-text ${isActive ? 'active-text' : ''}`}>
                {item.text}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default observer(Index);
