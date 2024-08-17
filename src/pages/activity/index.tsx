import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { useState, useEffect } from 'react';
import {
  PostButton,
  PurpleClose,
  HouseRequest,
  PostActivity,
  PostHouse,
} from '@utils/cloudIcons';
import GlobalStore from '@store/GlobalStore';
import { ActivityInfoItemProps } from '@utils/interfaces';
import Taro, { showTabBar } from '@tarojs/taro';
import CustomTabBar from '@components/CustomTabBar';
import ActivityCard from '@components/ActivityCard';
import Banner from '@components/Banner';
import TagBar from '@components/TagBar';
import App from './posts'
import './index.scss';
import { activityInfoSearch } from '@common/database/activityInfo/activityInfo';

const Index = () => {
  const [activeTab, setActiveTab] = useState('recommend');
  const [isShowPost, setIsShowPost] = useState(false);
  const [showTagBar, setShowTagBar] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  // for 活动
  const [showEvents, setShowEvents] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    if (tab === 'posts') {
      setShowTagBar(true);
      setShowBanner(false);
      setShowEvents(false);
    } else if (tab === 'events') {
      setShowTagBar(true);
      setShowBanner(true);
      setShowEvents(true);
    } else if (tab === 'recommend') {
      setShowTagBar(false);
      setShowBanner(true);
      setShowEvents(false);
    }
  };

  useEffect(() => {
    activityInfoSearch().then((res: ActivityInfoItemProps[]) => {
      setActivities(res);
    });
  }, []);

  const [activities, setActivities] = useState<ActivityInfoItemProps[]>([]);

  const onClickPostSeek = () => {
    Taro.navigateTo({
      url: `../../packageHouse/seek-post/index?id=none`,
    });
  };

  const onClickPostActivity = () => {
    Taro.navigateTo({
      url: `../../packageActivity/activity-post/index?id=none`,
    });
  };

  const onClickPostHouse = () => {
    Taro.navigateTo({
      url: '../../packageHouse/house-post/index',
    });
  };

  const navigateToDetail = activity => {
    // you can get the activity data here.
    Taro.navigateTo({
      url: `/packageActivity/activity-detail/index?id=${activity._id}`,
    });
  };

  const handleClickAddBtn = () => {
    if (GlobalStore.userInfo._id == '') {
      Taro.showModal({
        title: '转至登录页面',
        content: '请登录后发布信息~',
        success: function (res) {
          if (res.confirm) {
            Taro.reLaunch({
              url: `/pages/login/index`,
            });
          }
        },
      });
    } else {
      setIsShowPost(true);
    }
  };

  Taro.useShareAppMessage(res => {
    return {
      title: 'EuroStay欧洲换宿',
      path: '/pages/login/index',
    };
  });

  return (
    <View className='activity-index'>

      <View className='tab-bar'>
        <View
          className={`tab-item ${activeTab === 'recommend' ? 'active' : ''}`}
          onClick={() => handleTabChange('recommend')}
          style={{ marginRight: '40px' }}
        >
          <Text>推荐</Text>
        </View>

        <View
          className={`tab-item ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => handleTabChange('posts')}
          style={{ marginRight: '40px' }}
        >
          <Text>帖子</Text>
        </View>

        <View
          className={`tab-item ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => handleTabChange('events')}
          style={{ marginRight: '40px' }}
        >
          <Text>活动</Text>
        </View>
      </View>

      <View style={{ height: '40px' }} />

      {showBanner && <Banner />}
      {showTagBar && <TagBar />}
      <App />

      {showEvents && (
        <View className='cards'>
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity}
              onClick={() => navigateToDetail(activity)}
            />
          ))}
        </View>
      )}

      <View
        className='add-button'
        onClick={() => {
          handleClickAddBtn();
        }}
      >
        <Image src={PostButton}></Image>
      </View>
      <CustomTabBar />
      {/* 蒙层 */}
      {isShowPost && (
        <View
          className='page-post-modal'
          onClick={() => {
            setIsShowPost(false);
          }}
        >
          <Image
            src={PurpleClose}
            className='post-close'
            onClick={() => {
              setIsShowPost(false);
            }}
          />
          <Image
            src={PostActivity}
            className='post-activity'
            onClick={onClickPostActivity}
          />
          <Image
            src={PostHouse}
            className='post-house'
            onClick={onClickPostHouse}
          />
          <Image
            src={HouseRequest}
            className='house-request'
            onClick={onClickPostSeek}
          />
        </View>
      )}
    </View>
  );
};

export default Index;
