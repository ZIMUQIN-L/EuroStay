import { View, Image, Text } from '@tarojs/components';
import { Swiper } from '@taroify/core';
import './index.scss';

interface HouseCardProps {
  images: string[];
  title: string;
  availableDate: string;
  price: number;
  currency: '€' | '$' | '¥';
  location: string;
  mode?: 'posted' | 'participated';
  onSettingClick?: () => void;
  onFavoriteClick?: () => void;
}

// 模拟数据
export const mockHouseData = [
  {
    id: 1,
    images: [
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800&auto=format&fit=crop&q=60',
    ],
    title: '白色恋人独栋别墅',
    availableDate: '12月1日起可入住',
    price: 30,
    currency: '€',
    location: '法国巴黎',
  },
  {
    id: 2,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60'
    ],
    title: '白色恋人独栋别墅',
    availableDate: '12月1日起可入住',
    price: 30,
    currency: '€',
    location: '法国巴黎'
  }
];

// 活动模拟数据
export const mockActivityData = [
  {
    id: 2,
    images: [
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60'
    ],
    title: '二人做一道菜',
    availableDate: '2月5日',
    price: 20,
    currency: '€',
    unit: '/次',
    location: '德国慕尼黑'
  }
];

const HouseCard: React.FC<HouseCardProps> = ({
  images,
  title,
  availableDate,
  price,
  currency,
  location,
  mode = 'posted',
  onSettingClick,
  onFavoriteClick,
}) => {
  return (
    <View className="house-card">
      <View className="image-container">
        <Swiper className="swiper">
          {images.map((image, index) => (
            <Swiper.Item key={index}>
              <Image className="house-image" src={image} mode="aspectFill" />
            </Swiper.Item>
          ))}
        </Swiper>
        {mode === 'posted' ? (
          <View className="settings-button" onClick={onSettingClick}>
            <Text className="settings-icon">⚙️</Text>
          </View>
        ) : (
          <View className="settings-button" onClick={onFavoriteClick}>
            <Text className="settings-icon">❤️</Text>
          </View>
        )}
      </View>
      <View className="info-container">
        <View className="title-row">
          <Text className="title">{title}</Text>
          <Text className="price">{currency}{price}/晚</Text>
        </View>
        <View className="info-row">
          <Text className="date">{availableDate}</Text>
          <Text className="location">{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default HouseCard; 