import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { useState, useEffect } from 'react';
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
import { userHouseInfoSearch } from '@common/database/user/user';

interface ActivityCardProps {
  activity: ActivityInfoItemProps;
  onClick: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onClick }) => {
  const [imageSrc, setImageSrc] = React.useState(
    activity.images.length > 0 ? activity.images[0] : '',
  );

  const [sourceUser, constSourceUser] = useState<UserDetailInfoItemProps>();

  useEffect(() => {
    userHouseInfoSearch(activity._openid).then(
      (res: UserDetailInfoItemProps[]) => {
        constSourceUser(res[0]);
      },
    );
  }, []);

  const handleImageError = () => {
    setImageSrc('');
  };

  return (
    <View className='activity-card' onClick={onClick}>
      <Image
        src={imageSrc}
        className='activity-image'
        onError={handleImageError}
      />
      <View className='activity-content'>
        <Text className='title'>{activity.title}</Text>
        <View className='organizer'>
          <UserCircleOutlined className='icon' />
          <Text>由 {sourceUser?.nickName} 发起</Text>
        </View>
        <View className='details'>
          <View className='detail-item'>
            <LocationOutlined className='icon' />
            <Text>{activity.location}</Text>
          </View>
          <View className='detail-item'>
            <GoldCoinOutlined className='icon' />
            <Text>人均约 {activity.price}</Text>
          </View>
          <View className='tags'>
            {activity.tags.map((tag, index) => (
              <Text key={index} className='tag'>
                {tag}
              </Text>
            ))}
          </View>
          <View className='right-detail-item' style='margin-right: 4px;'>
            <FriendsOutlined className='icon' />
            <Text>参与人数: {activity.capacity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActivityCard;
