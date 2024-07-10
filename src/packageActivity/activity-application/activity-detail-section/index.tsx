import { View, Image, Text } from '@tarojs/components';
import { LocationOutlined, CalendarOutlined } from '@taroify/icons'; // Adjust the import path as necessary
import './index.scss';
import Taro from '@tarojs/taro';

const ActivityDetailSection = ({
  title,
  imageUrls,
  dateInfo,
  timeInfo,
  organizer,
  location,
  hostOpenid,
}) => {
  const handleClickHostAvatar = () => {
    Taro.navigateTo({
      url: `/packageUser/user-detail/index?id=${hostOpenid}`,
    });
  };
  return (
    <View className='activity-app-detail-card'>
      <Image
        className='activity-image'
        src={imageUrls && imageUrls.length != 0 ? imageUrls[0] : ''}
        mode='aspectFill'
        onClick={handleClickHostAvatar}
      />
      <View className='application-details'>
        <Text className='application-title'>{title}</Text>
        <Text className='application-owner'>由 {organizer} 主办</Text>
        <View className='details'>
          <View className='detail-item'>
            <LocationOutlined className='icon' />
            <Text className='text'>{location}</Text>
          </View>
          <View className='detail-item'>
            <CalendarOutlined className='icon' />
            <Text className='text'>
              {dateInfo} - {timeInfo}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActivityDetailSection;
