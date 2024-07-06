import { observer } from 'mobx-react';
import { View, Text } from '@tarojs/components';
import ActivityCard from './activity-card';

import './index.scss';
import { useState } from 'react';

import { ActivityInfoItemProps } from '@utils/interfaces';
import Taro from '@tarojs/taro';

const mockActivities = [
  {
    title: '活动标题剧本杀密室逃脱手工workshop之类的',
    date: '2021-09-01',
    time: '19:00-21:00',
    location: 'Rotterdam Blaak',
    price: '€45',
    tags: ['#全女局', '#剧本杀', '#KTV'],
    participants: 9,
    maxParticipants: 10,
    username: 'username',
    images: [''], // Add image URLs here
  },
  {
    title: 'activity title 2',
    date: '2021-09-01',
    time: '19:00-21:00',
    location: 'location 2',
    price: '€45',
    tags: ['#全女局', '#剧本杀'],
    participants: 9,
    maxParticipants: 10,
    username: 'username',
    images: [''],
  },
  {
    title: 'activity title 2',
    date: '2021-09-01',
    time: '19:00-21:00',
    location: 'location 2',
    price: '€45',
    tags: ['#全女局', '#剧本杀'],
    participants: 9,
    maxParticipants: 10,
    username: 'username',
    images: [''],
  },
  {
    title: 'activity title 2',
    date: '2021-09-01',
    time: '19:00-21:00',
    location: 'location 2',
    price: '€45',
    tags: ['#全女局', '#剧本杀'],
    participants: 9,
    maxParticipants: 10,
    username: 'username',
    images: [''],
  },
];

const Index = () => {
  const [currentTab, setCurrentTab] = useState('initiated');

  // 获取数据
  // const [favoriteActivities, setFavoriteActivities] = useState();
  const [initiatedActivities, setInitiatedActivities] =
    useState(mockActivities);
  const [registeredActivities, setRegisteredActivities] =
    useState(mockActivities);

  // const [favoriteActivities, setFavoriteActivities] = useState<
  //   ActivityInfoItemProps[]
  // >([]);
  // const [initiatedActivities, setInitiatedActivities] = useState<
  //   ActivityInfoItemProps[]
  // >([]);
  // const [registeredActivities, setRegisteredActivities] = useState<
  //   ActivityInfoItemProps[]
  // >([]);

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
                  activity={activity}
                  type={1}
                  status={1}
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
                  activity={activity}
                  type={2}
                  status={1}
                />
              ))
            ) : (
              <View>暂无报名的活动</View>
            )}
          </View>
        );
      case 'favorited':
      // return (
      //   favoriteActivities.length > 0 ? () => {
      //     return favoriteActivities.map((activity, index) => (
      //       <ActivityCard
      //         key={index}
      //         activity={activity}
      //         onClick={() => handleActivityClick(activity)}
      //       />
      //     ));
      //   } : <View>暂无收藏</View>
      // );
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
