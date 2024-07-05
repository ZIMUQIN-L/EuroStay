import { observer } from 'mobx-react';
import { View, Text } from '@tarojs/components';
import ActivityCard from './activity-card';

import './index.scss';
import { useState } from 'react';

import { ActivityInfoItemProps } from '@utils/interfaces';
import Taro from '@tarojs/taro';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('initiated');

  // 获取数据
  const [favoriteActivities, setFavoriteActivities] = useState<
    ActivityInfoItemProps[]
  >([]);
  const [initiatedActivities, setInitiatedActivities] = useState<
    ActivityInfoItemProps[]
  >([]);
  const [registeredActivities, setRegisteredActivities] = useState<
    ActivityInfoItemProps[]
  >([]);

  const isActive = tabName => {
    return currentTab === tabName ? 'active' : '';
  };

  const handleActivityClick = activity => {
    Taro.navigateTo({
      url: `/packageActivity/activity-detail/index?activityId=${activity._id}`,
    });
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'initiated':
        return (
          <View>
            {initiatedActivities.length > 0 ? (
              initiatedActivities.map((activity, index) => (
                <ActivityCard
                  key={index}
                  title={activity.title}
                  date={activity.date}
                  location={activity.location}
                  time={activity.time}
                  participants={activity.participants}
                  maxParticipants={activity.maxParticipants}
                  status={activity.status}
                  type='initiated'
                  imageUrl={activity.imageUrl}
                  userIcon={activity.userIcon}
                  username={activity.username}
                  onClick={() => handleActivityClick(activity)}
                />
              ))
            ) : (
              <View>暂无发起的活动</View>
            )}
          </View>
        );
      case 'registered':
        return (
          <View>
            {registeredActivities.length > 0 ? (
              registeredActivities.map((activity, index) => (
                <ActivityCard
                  key={index}
                  title={activity.title}
                  date={activity.date}
                  location={activity.location}
                  time={activity.time}
                  participants={activity.participants}
                  maxParticipants={activity.maxParticipants}
                  status={activity.status}
                  type='registered'
                  imageUrl={activity.imageUrl}
                  userIcon={activity.userIcon}
                  username={activity.username}
                  onClick={() => handleActivityClick(activity)}
                />
              ))
            ) : (
              <View>暂无报名的活动</View>
            )}
          </View>
        );
      case 'favorited':
        return favoriteActivities.length > 0 ? (
          () => {
            return favoriteActivities.map((activity, index) => (
              <ActivityCard
                key={index}
                activity={activity}
                onClick={() => handleActivityClick(activity)}
              />
            ));
          }
        ) : (
          <View>暂无收藏</View>
        );
    }
  };

  return (
    <>
      <View className='tab-bar'>
        <View
          className={isActive('initiated')}
          onClick={() => setCurrentTab('initiated')}
        >
          <Text className={`text ${isActive('initiated')}`}>我发起的</Text>
        </View>
        <View
          className={isActive('registered')}
          onClick={() => setCurrentTab('registered')}
        >
          <Text className={`text ${isActive('registered')}`}>我报名的</Text>
        </View>
        {/* <View
        className={isActive('favorited')}
        onClick={() => setCurrentTab('favorited')}
      >
        <Text className={`text ${isActive('favorited')}`}>我收藏的</Text>
      </View> */}
      </View>
      <View className='tab-content'>{renderTabContent()}</View>
    </>
  );
};

export default observer(Index);
