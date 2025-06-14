import { View, Image, Text } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';
import {
  homeUserProps,
  homePropertyProps,
  TravelData
} from '@utils/interfaces';
import { parseLocation } from '@utils/addressUtil';
import {
  uuIcon,
  uuSelectedIcon,
  propertyIcon,
  propertySelectedIcon,
} from '@utils/cloudIcons';

const HomepageCard = (props: {
  user: homeUserProps;
  property: homePropertyProps;
  travel?: TravelData;
  activeTab: '旅行者' | '房源';
  id: string;
}) => {
  const [activeTab, setActiveTab] = useState(props.activeTab);

  const getCardClass = () => {
    let baseClass = 'homepage-card';
    switch (props.activeTab) {
      case '旅行者':
        return `${baseClass} user`;
      case '房源':
        return `${baseClass} flip property`;
      default:
        return baseClass;
    }
  };
  useEffect(() => {
    setActiveTab(activeTab);
  }, [props.activeTab]);

  const parseStartDate = startDate => {
    if (startDate == null) {
      return null;
    }
    const date = new Date(startDate.replace(/-/g, '/'));
    return `${date.getMonth() + 1}月${date.getDate()}日起可入住`;
  };

  const formatTravelDateRange = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return '';
    
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    const startMonth = startDateObj.getMonth() + 1;
    const startDay = startDateObj.getDate();
    const endMonth = endDateObj.getMonth() + 1;
    const endDay = endDateObj.getDate();
    
    return `${startMonth}.${startDay}-${endMonth}.${endDay}`;
  };

  // Format reception time (e.g., "周末")
  const formatReceptionTime = (receptionTime: string[]) => {
    if (!receptionTime || receptionTime.length === 0) return [];
    return receptionTime;
  };

  return (
    <View className={`${getCardClass()} ${props.id}`}>
      {activeTab == '旅行者' && (
        <>
          {props.travel ? (
            <View className='user-location travel-location'>
              {formatTravelDateRange(props.travel.startDate, props.travel.endDate)}
              {props.travel.country}求宿
            </View>
          ) : props.user.location && (
            <View className='user-location'>{props.user.location}</View>
          )}
          <View className='button-wrapper'>
            <Image
              src={uuSelectedIcon}
              className='user'
              onClick={() => setActiveTab('旅行者')}
              mode="aspectFit"
            />
            {props.property && (
              <Image
                src={propertyIcon}
                className='house'
                onClick={() => setActiveTab('房源')}
                mode="aspectFit"
              />
            )}
          </View>
          <Image
            src={props.user.backgroundPic}
            className='user-pic'
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/user/index?uid=${props.user.uid}`,
              });
            }}
            mode="aspectFill"
            lazyLoad
          ></Image>
          <View className={`homepage-card-bottom user ${props.travel ? 'travel' : ''}`}>
          {props.travel && (
              <View className='travel-title'>{props.travel.title}</View>
            )}
            <View className='user-info-container'>
              <Image
                src={props.user.avatar}
                className='user-avatar'
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/user/index?uid=${props.user.uid}`,
                  });
                }}
                mode="aspectFill"
                lazyLoad
              />
              <View className='user-details'>
                <View className='user-name-container'>
                  <View className='user-name'>{props.user.username}</View>
                  {props.travel && (
                    <View className='gender-count'>
                      {props.travel.maleNumber > 0 && <Text>{props.travel.maleNumber}男</Text>}
                      {props.travel.femaleNumber > 0 && <Text>{props.travel.femaleNumber}女</Text>}
                    </View>
                  )}
                </View>
                <View className='user-tags'>
                  {props.user.tags.map((item, index) => {
                    const truncatedTag =
                      item.length > 5 ? item.slice(0, 5) + '...' : item;
                    return (
                      <View key={index} className='tag-item'>
                        {truncatedTag}
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </>
      )}

      {activeTab == '房源' && props.property && (
        <>
          <Image
            src={props.property.images?.[0]}
            className='user-pic'
            onClick={() => {
              Taro.navigateTo({
                url: `/packageHouse/housing-detail/index?id=${props.property.id}&type=0`,
              });
            }}
            mode="aspectFill"
            lazyLoad
          ></Image>
          <View className='badge-container'>
            <View className='location-badge'>{props.property.country}{props.property.city}</View>
          </View>
          <View className='button-wrapper'>
            {props.user && (
              <Image
                src={uuIcon}
                className='user'
                onClick={() => setActiveTab('旅行者')}
                mode="aspectFit"
              />
            )}
            {props.property && (
              <Image
                src={propertySelectedIcon}
                className='house'
                onClick={() => setActiveTab('房源')}
                mode="aspectFit"
              />
            )}
          </View>
          <View className='homepage-card-bottom property'>
            <View className='property-title'>{props.property?.title}</View>

            <View className='property-info-container'>
              <View className='property-details'>
                <View className='reception-time-tags'>
                  {formatReceptionTime(props.property?.receptionTime).map((time, index) => (
                    <View key={index} className='time-tag'>{time}</View>
                  ))}
                </View>
              </View>
              <View className='capacity'>可住{props.property?.capacity}人</View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default HomepageCard;
