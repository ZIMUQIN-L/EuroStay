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

  return (
    <View className="house-card">
      <View className="image-container">
        <Swiper className="swiper">
          {images.map((image, index) => (
            <Swiper.Item key={index}>
              <Image className="house-image" src={image} mode="aspectFill" 
              onClick={ () => {
                Taro.navigateTo({ url: `/packageHouse/housing-detail/index?id=${id}&type=${type}` });
              }}/>
            </Swiper.Item>
          ))}
        </Swiper>
        {mode === 'posted' && isCurrentUser ? (
          <View className="settings-button" onClick={onSettingClick}>
            <Image className="settings-icon" src={settingIcon} />
          </View>
        ) : (
            isCurrentUser?<View/>:
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