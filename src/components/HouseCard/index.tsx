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
  currency: '€' | '$' | '¥' | '';
  location: string;
  maleCount?: number;
  femaleCount?: number;
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
  maleCount,
  femaleCount,
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

  const handleCardClick = () => {
    if (type === 1) {
      Taro.showModal({
        title: '出行详情',
        content: '请前往APP查看出行详情',
        showCancel: false,
        success: function (res) {}
      });
    } else {
      Taro.navigateTo({ url: `/packageHouse/housing-detail/index?id=${id}&type=${type}` });
    }
  };

  const renderPriceOrCount = () => {
    if (type === 1 && maleCount !== undefined && femaleCount !== undefined) {
      let countText = '同行';
      if (maleCount > 0) {
        countText += `${maleCount}男`;
      }
      if (femaleCount > 0) {
        countText += `${femaleCount}女`;
      }
      if (countText === '同行') {
        countText += '0人';
      }
      return <Text className="price">{countText}</Text>;
    }
    
    return price > 0 ? <Text className="price">{currency}{price}/晚</Text> : null;
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
                onClick={handleCardClick}
              />
            </Swiper.Item>
          ))}
        </Swiper>
        {isCurrentUser && onSettingClick ? (
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
      <View className="info-container" onClick={handleCardClick}>
        <View className="title-row">
          <Text className="title">{title}</Text>
          {renderPriceOrCount()}
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