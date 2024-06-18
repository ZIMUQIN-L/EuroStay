import { View, Image, Text } from '@tarojs/components';
import './index.scss';

interface HouseInfoCardProps {
  imageUrl: string;
  title: string;
  userInfo: string;
  dateInfo: string;
}

const HouseInfoCard: React.FC<HouseInfoCardProps> = ({
  imageUrl,
  title,
  userInfo,
  dateInfo
}) => {
  return (
    <View className='house-info-card'>
      <Image className='house-image' src={imageUrl} mode="aspectFill" />
      <View className='house-details'>
        <Text className='house-title'>{title}</Text>
        <Text className='house-owner'>房东: {userInfo}</Text>
        <Text className='house-dates'>{dateInfo}</Text>
      </View>
    </View>
  );
};

export default HouseInfoCard;
