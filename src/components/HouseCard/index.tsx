import { View, Image, Text } from '@tarojs/components';
import { Swiper } from '@taroify/core';
import './index.scss';
import Taro from '@tarojs/taro';
import { settingIcon, favoriteIcon } from '@utils/cloudIcons';
import { parseLocation } from '@utils/addressUtil';
import GlobalStore from '@store/GlobalStore';

interface HouseCardProps {
  type: number,
  id: number,
  uid: number,
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

const HouseCard: React.FC<HouseCardProps> = ({
  type,
  id,
  uid,
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
  const isCurrentUser = uid === GlobalStore.userInfo?.uid;

  const handleTouchStart = (e) => {
    // 记录触摸开始的位置
    const touch = e.touches[0];
    e.currentTarget.dataset.startY = touch.clientY;
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const startY = e.currentTarget.dataset.startY;
    const moveY = touch.clientY;
    const deltaY = moveY - startY;

    // 如果垂直滑动距离大于水平滑动距离，则允许事件冒泡
    if (Math.abs(deltaY) > 10) {
      e.stopPropagation();
    }
  };

  return (
    <View className="house-card" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      <View className="image-container">
        <Swiper className="swiper" stopPropagation={false}>
          {images.map((image, index) => (
            <Swiper.Item key={index}>
              <Image 
                className="house-image" 
                src={image} 
                mode="aspectFill" 
                onClick={() => {
                  Taro.navigateTo({ url: `/packageHouse/housing-detail/index?id=${id}&type=${type}` });
                }}
              />
            </Swiper.Item>
          ))}
        </Swiper>
        {mode === 'posted' && isCurrentUser ? (
          <View className="settings-button" onClick={onSettingClick}>
            <Image className="settings-icon" src={settingIcon} />
          </View>
        ) : (
          isCurrentUser ? <View/> :
          <View className="settings-button" onClick={onFavoriteClick}>
            <Image className="settings-icon" src={favoriteIcon} />
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
          <Text className="location">{parseLocation(location)}</Text>
        </View>
      </View>
    </View>
  );
};

export default HouseCard; 