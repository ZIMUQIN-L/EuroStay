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
import { ActivityInfoItemProps } from '@utils/interfaces';
import Taro from '@tarojs/taro';
import CustomTabBar from '@components/CustomTabBar';
import ActivityCard from '@components/ActivityCard';
import Banner from '@components/Banner';
import TagBar from '@components/TagBar';
import './index.scss';
import { activityInfoSearch } from '@common/database/activityInfo/activityInfo';

const Index = () => {
  const [isShowPost, setIsShowPost] = useState(false);

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
    console.log(activity);
    Taro.navigateTo({
      url: `/packageActivity/activity-detail/index?id=${activity._id}`,
    });
  };

  return (
    <View className='activity-index'>
      <Banner />
      {/* <TagBar /> */}
      <View className='cards'>
        {activities.map((activity, index) => (
          <ActivityCard
            key={index}
            activity={activity}
            onClick={() => navigateToDetail(activity)}
          />
        ))}
      </View>
      <View
        className='add-button'
        onClick={() => {
          setIsShowPost(true);
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
