import { observer } from 'mobx-react';
import { View, Text } from '@tarojs/components';
import ActivityCard from './activity-card';
import RegisterActivityCard from './registered-activity';
import GlobalStore from '@store/GlobalStore';
import './index.scss';
import { useState, useEffect } from 'react';
import {
  ActivityInfoItemProps,
  UserItemProps,
  ActivityParticipantCombinedItemProps,
} from '@utils/interfaces';
import Taro from '@tarojs/taro';
import { activityMineInitiatedSearch, getEurostayActApplications } from '@common/database/activityInfo/activityInfo';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('initiated');
  const [currentUser, setCurrentUser] = useState<UserItemProps>(
    GlobalStore.userInfo,
  );

  Taro.useShareAppMessage(res => {
    return {
      title: 'EuroStay欧洲换宿',
      path: '/pages/login/index',
    };
  });

  // 获取数据
  // const [favoriteActivities, setFavoriteActivities] = useState();
  const [initiatedProcessingActivity, setInitiatedProcessingActivity] =
    useState<ActivityInfoItemProps[]>([]);
  const [initiatedFinishedActivity, setInitiatedFinishedActivity] = useState<
    ActivityInfoItemProps[]
  >([]);
  const [registeredProcessingActivity, setRegisteredProcessingActivity] =
    useState<ActivityParticipantCombinedItemProps[]>([]);
  const [registeredFinishedActivity, setRegisteredFinishedActivity] = useState<
    ActivityParticipantCombinedItemProps[]
  >([]);

  useEffect(() => {
    setCurrentUser(GlobalStore.userInfo);
    activityMineInitiatedSearch(GlobalStore.userInfo._openid).then(
      (mineIni: ActivityInfoItemProps[]) => {
        setInitiatedProcessingActivity(
          mineIni.filter(activity => activity.active),
        );
        setInitiatedFinishedActivity(
          mineIni.filter(activity => !activity.active),
        );
      },
    );
    wx.cloud.callFunction({
      name: 'getActPartcipants',
      data: {
        collection: 'ActivityApplication',

        from: 'ActivityInfo',
        localField: 'activityId',
        foreignField: '_id',
        as: 'actInfo',

        //   from:'ActivityInfo',
        //   localField:'ActivityInfo._id',
        //   foreignField:'activityId',
        //   as:'actInfo',

        from2: 'UserInfo',
        localField2: 'hostOpenid',
        foreignField2: '_openid',
        as2: 'userInfo',

        match: { _openid: GlobalStore.userInfo._openid },
      },
      success: appResInfo => {
        const actUserInfo =
          appResInfo?.result?.list ??
          ([] as ActivityParticipantCombinedItemProps[]);
        setRegisteredProcessingActivity(
          actUserInfo.filter(activity => activity.actInfo[0].active),
        );
        setRegisteredFinishedActivity(
          actUserInfo.filter(activity => !activity.actInfo[0].active),
        );
      },
    });
  }, []);

  const isActive = tabName => {
    return currentTab === tabName ? 'active' : '';
  };

  const handleActivityClick = activity => {
    Taro.navigateTo({
      url: `/packageActivity/activity-detail/index?activityId=${activity._id}`,
    });
  };

  const renderActivityCards = (activities, type, status, title) =>
    activities.length > 0 && (
      <View className='cards'>
        <Text className='part-title'>{title}</Text>
        {activities.map((activity, index) =>
          type === 1 ? (
            <ActivityCard
              key={index}
              activity={activity}
              type={type}
              status={status}
            />
          ) : (
            <RegisterActivityCard
              key={index}
              activity={activity}
              type={type}
              status={status}
            />
          ),
        )}
      </View>
    );

  const renderTabContent = () => {
    switch (currentTab) {
      case 'initiated':
        return (
          <>
            {renderActivityCards(initiatedProcessingActivity, 1, 1, '待进行')}
            {renderActivityCards(initiatedFinishedActivity, 1, 2, '已结束')}
          </>
        );
      case 'registered':
        return (
          <>
            {renderActivityCards(registeredProcessingActivity, 2, 1, '待参加')}
            {renderActivityCards(registeredFinishedActivity, 2, 2, '已结束')}
          </>
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
