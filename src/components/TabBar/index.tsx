import React, { useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';
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
import { useMemo } from 'react';
import GlobalStore from '@store/GlobalStore';
import { observer } from 'mobx-react-lite';

interface TabBarProps {
  onWorldSelected?: () => void;
  setIsShowPostModal: (show: boolean) => void;
  isShowPostModal: boolean;
}

const TabBar: React.FC<TabBarProps> = ({ onWorldSelected, setIsShowPostModal, isShowPostModal }) => {
  const currentTab = GlobalStore.currentTab;

  useEffect(() => {
    if (!currentTab || currentTab === '') {
      GlobalStore.currentTab = 'world';
    }
  }, []);

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

  const handleTabClick = (page) => {
    if (page === 'post') {
      setIsShowPostModal(true);
      return;
    }

    if (GlobalStore.currentTab === 'world' && page === 'world') {
      if (onWorldSelected) {
        onWorldSelected();
      }
    } else if (page === 'user' && GlobalStore.userInfo?.uid === 0) {
      Taro.showModal({
        title: '转至登陆页面',
        content: '请登录后查看个人主页~',
        success: function (res) {
          if (res.confirm) {
            Taro.reLaunch({
              url: `/pages/login/index`,
            });
          } else if (res.cancel) {
            Taro.switchTab({
              url: `/pages/home-world/index`,
            });
          }
        },
      });
    } else {
      GlobalStore.currentTab = page;
      if (page === "world") {
        Taro.switchTab({
            url: `/pages/home-world/index`,
          });
      }
      else if (page === 'user') {
        Taro.switchTab({
            url: `/pages/user-setting/index`,
          });
      }
      else {
        Taro.switchTab({
            url: `/pages/${page}/index`,
          });
      }
    }
  };

  return (
    <>
      {isShowPostModal && (
        <View
          className='post-modal'
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            setIsShowPostModal(false);
          }}
        >
          <View
            className='post-house'
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              setIsShowPostModal(false);
              Taro.navigateTo({
                url: '/pages/house-publish/index',
              });
            }}
          >
            <Image className='icon' src={postHouse} />
            上传房源
          </View>
          <View
            className='post-activity'
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              setIsShowPostModal(false);
              Taro.navigateTo({
                url: '/pages/activity-publish/index',
              });
            }}
          >
            <Image className='icon' src={postActivity} />
            上传活动
          </View>
        </View>
      )}
      <View className='custom-tab-bar'>
        <View className='item' onClick={() => handleTabClick('world')}>
          <View className='tab-icon'>
            <Image src={currentTab === 'world' ? worldSelectedIcon : worldIcon} />
          </View>
          <Text className={`tab-text ${currentTab === 'world' ? 'active' : ''}`}>
            世界
          </Text>
        </View>

        <View className='item' onClick={() => handleTabClick('orders')}>
          <View className='tab-icon'>
            <Image src={currentTab === 'orders' ? orderSelectedIcon : orderIcon} />
          </View>
          <Text className={`tab-text ${currentTab === 'orders' ? 'active' : ''}`}>
            订单
          </Text>
        </View>

        <View className='item center-tab' onClick={() => handleTabClick('post')}>
          <View className='plus-icon' />
          <Text className='tab-text'>发布</Text>
        </View>

        <View className='item' onClick={() => handleTabClick('messages')}>
          <View className='tab-icon'>
            <Image src={currentTab === 'messages' ? messageSelectedIcon : messageIcon} />
          </View>
          <Text className={`tab-text ${currentTab === 'messages' ? 'active' : ''}`}>
            消息
          </Text>
        </View>

        <View className='item' onClick={() => handleTabClick('user')}>
          <View className='tab-icon'>
            <Image src={currentTab === 'user' ? userSelectedIcon : userIcon} />
          </View>
          <Text className={`tab-text ${currentTab === 'user' ? 'active' : ''}`}>
            我的
          </Text>
        </View>
      </View>
    </>
  );
};

export default observer(TabBar); 