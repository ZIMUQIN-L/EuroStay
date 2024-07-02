import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { UserCircleOutlined, LocationOutlined, GoldCoinOutlined, FriendsOutlined } from '@taroify/icons';
import './index.scss';

interface ActivityCardProps {
  activity: {
    title: string;
    location: string;
    price: string;
    tags: string[];
    participants: number;
    username: string;
    images: string[];
  };
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const [imageSrc, setImageSrc] = React.useState(
    activity.images.length > 0 ? activity.images[0] : ''
  );

  const handleImageError = () => {
    setImageSrc('');
  };

  return (
    <View className='activity-card'>
      <Image
        src={imageSrc}
        className='activity-image'
        onError={handleImageError}
      />
     <View className='activity-content'>
        <Text className='title'>{activity.title}</Text>
        <View className='organizer'>
            <UserCircleOutlined className='icon' />
          <Text>由 {activity.username} 发起</Text>
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
              <Text key={index} className='tag'>{tag}</Text>
            ))}
          </View>
          <View className='right-detail-item' style='margin-right: 4px;'>
            <FriendsOutlined className='icon' />
            <Text>参与人数: {activity.participants}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActivityCard;
