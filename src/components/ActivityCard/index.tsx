import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import Like from '@assets/images/like.svg';
import Liked from '@assets/images/liked.svg';
import GlobalStore from '@store/GlobalStore';
import {
  UserCircleOutlined,
  LocationOutlined,
  GoldCoinOutlined,
  FriendsOutlined,
} from '@taroify/icons';
import {
  ActivityInfoItemProps,
  UserDetailInfoItemProps,
} from '@utils/interfaces';
import './index.scss';
import { userInfoSearch } from '@common/database/user/user';
import { ActivityCardProps } from '@utils/interfaces';

const ActivityCard: React.FC<ActivityCardProps> = activity => {
  const [isCollection, setIsCollection] = useState(activity.isCollection);
  if (!activity) return null;
  const [imageSrc, setImageSrc] = React.useState(
    activity.images.length > 0 ? activity.images[0] : '',
  );

  const [sourceUser, constSourceUser] = useState<UserDetailInfoItemProps>();

  useEffect(() => {
    // userInfoSearch(activity._openid).then((res: UserDetailInfoItemProps[]) => {
    //   constSourceUser(res[0]);
    // });
  }, []);

  const handleClickHostAvatar = () => {
    Taro.navigateTo({
      url: `/packageUser/user-detail/index?id=${sourceUser?._openid}`,
    });
  };

  const handleImageError = () => {
    setImageSrc('');
  };

  return (
    <View
      className='activity-card'
      onClick={() => {
        Taro.navigateTo({
          url: `/packageActivity/activity-detail/index?id=${activity.id}`,
        });
      }}
    >
      {true && <View className='corner-label'>ES独家策划</View>}
      <Image
        className='activity-like'
        src={isCollection ? Liked : Like}
        onClick={e => {
          e.stopPropagation();
          if (!isCollection) {
            Taro.request({
              url: 'https://api.eurostay.co/app/activity/addActivityCollection',
              method: 'POST',
              data: {
                activityId: activity.id,
                uid: GlobalStore.userInfo._id, //todo
              },
              header: {
                'Content-Type': 'application/json',
                token: GlobalStore.userInfo.token,
              },
            }).then(res => {
              if (res.statusCode == 200) {
                console.log('successfully like activity:', activity.id);
                setIsCollection(true);
              }
            });
          } else {
            Taro.request({
              url: 'https://api.eurostay.co/app/activity/cancelActivityCollection',
              method: 'POST',
              data: {
                activityId: activity.id,
                uid: activity.uid, //todo
              },
              header: {
                'Content-Type': 'application/json',
                token: GlobalStore.userInfo.token,
              },
            }).then(res => {
              if (res.statusCode == 200) {
                setIsCollection(false);
              }
            });
          }
        }}
      />
      <Image
        src={activity.userShortInfoResponse.avatar}
        className='host-avatar'
      />
      <Image
        src={activity.images?.[0]}
        className='activity-image'
        mode='aspectFit'
        onError={handleImageError}
      />
      <View className='activity-content'>
        <Text className='activity-price'>{activity.coin}旅行币/人</Text>
        <Text className='title'>{activity.title}</Text>
        {/* <View className='organizer'>
          <UserCircleOutlined className='icon' />
          <Image
            src={sourceUser ? sourceUser?.avatarUrl : ''}
            className='icon'
            mode='aspectFit'
            onClick={handleClickHostAvatar}
          />
          <Text>由 {sourceUser?.nickName} 发起</Text>
        </View> */}
        <View className='activity-time'>{activity.startTime}</View>
        <View className='details'>
          <View className='detail-item'>
            <LocationOutlined className='icon' />
            <Text>{activity.city}</Text>
          </View>
          {/* <View className='detail-item'>
            <GoldCoinOutlined className='icon' />
            <Text>人均约{activity.price}欧</Text>
          </View> */}

          {activity.tags.map((tag, index) => (
            <View className='detail-item'>
              <Text key={index}># {tag}</Text>
            </View>
          ))}

          {/* <View className='right-detail-item' style='margin-right: 4px;'>
            <FriendsOutlined className='icon' />
            <Text>参与人数: {activity.capacity}</Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default ActivityCard;
