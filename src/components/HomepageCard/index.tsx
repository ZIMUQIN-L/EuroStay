import { View, Image } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';
import {
  homeUserProps,
  homeActivityProps,
  homePropertyProps,
} from '@utils/interfaces';
import { parseLocation } from '@utils/addressUtil';
import {
  uuIcon,
  uuSelectedIcon,
  propertyIcon,
  propertySelectedIcon,
  activityIcon,
  activitySelectedIcon,
} from '@utils/cloudIcons';
import GlobalStore from '@store/GlobalStore';
const HomepageCard = (props: {
  user: homeUserProps;
  activity: homeActivityProps;
  property: homePropertyProps;
  activeTab: '友友' | '房源' | '活动';
  id: string;
}) => {
  const [activeTab, setActiveTab] = useState(props.activeTab);

  const getCardClass = () => {
    let baseClass = 'homepage-card';
    switch (props.activeTab) {
      case '友友':
        return `${baseClass}`;
      case '房源':
        return `${baseClass} flip`;
      case '活动':
        return `${baseClass} flip`;
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

  return (
    <View className={`${getCardClass()} ${props.id}`}>
      {activeTab == '友友' && (
        <>
          {props.user.location && (
            <View className='user-location'>{props.user.location}</View>
          )}
          <View className='button-wrapper'>
            <Image
              src={uuSelectedIcon}
              className='user'
              onClick={() => setActiveTab('友友')}
            />
            {props.activity && (
              <Image
                src={activityIcon}
                className='activity'
                onClick={() => setActiveTab('活动')}
              />
            )}

            {props.property && (
              <Image
                src={propertyIcon}
                className='house'
                onClick={() => setActiveTab('房源')}
              />
            )}
          </View>
          <Image
            src={props.user.backgroundPic}
            className='user-pic'
            onClick={() => {
              console.log(props.user);
              if (GlobalStore.userInfo?.uid === 0) {
                Taro.showModal({
                  title: '转至登录页面',
                  content: '请登录后查看~',
                  success: function (res) {
                    if (res.confirm) {
                      Taro.reLaunch({
                        url: `/pages/login/index`,
                      });
                    }
                  },
                });
              } else {
                Taro.navigateTo({
                  url: `/pages/user/index?uid=${props.user.uid}`,
                });
              }
            }}
          ></Image>
          <View className='homepage-card-bottom'>
            <Image src={props.user.avatar} className='user-avatar' />
            <View className='user-details'>
              <View className='user-name'>{props.user.username}</View>
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
            <View></View>
          </View>
        </>
      )}

      {activeTab == '活动' && props.activity && (
        <>
          <Image
            src={props.activity.images?.[0]}
            className='user-pic'
            onClick={() => {
              if (GlobalStore.userInfo?.uid === 0) {
                Taro.showModal({
                  title: '转至登录页面',
                  content: '请登录后查看~',
                  success: function (res) {
                    if (res.confirm) {
                      Taro.reLaunch({
                        url: `/pages/login/index`,
                      });
                    }
                  },
                });
              } else {
                Taro.navigateTo({
                  url: `/packageHouse/housing-detail/index?id=${props.activity.id}&type=1`,
                });
              }
            }}
          ></Image>
          {props.activity.location && (
            <View className='user-location'>
              {parseLocation(props.activity.location)}
            </View>
          )}
          <View className='button-wrapper'>
            {props.user && (
              <Image
                src={uuIcon}
                className='user'
                onClick={() => setActiveTab('友友')}
              />
            )}
            {props.activity && (
              <Image
                src={activitySelectedIcon}
                className='activity'
                onClick={() => setActiveTab('活动')}
              />
            )}

            {props.property && (
              <Image
                src={propertyIcon}
                className='house'
                onClick={() => setActiveTab('房源')}
              />
            )}
          </View>
          <View className='homepage-card-bottom activity'>
            <View className='bottom-left'>
              <View className='title'>{props.activity?.title}</View>
              <View className='startTime'>{props.activity?.startTime}</View>
            </View>
            <View className='bottom-right'>€{props.activity?.price}/次</View>
          </View>
        </>
      )}
      {activeTab == '房源' && props.property && (
        <>
          <Image
            src={props.property.images?.[0]}
            className='user-pic'
            onClick={() => {
              if (GlobalStore.userInfo?.uid === 0) {
                Taro.showModal({
                  title: '转至登录页面',
                  content: '请登录后查看~',
                  success: function (res) {
                    if (res.confirm) {
                      Taro.reLaunch({
                        url: `/pages/login/index`,
                      });
                    }
                  },
                });
              } else {
                Taro.navigateTo({
                  url: `/packageHouse/housing-detail/index?id=${props.property.id}&type=0`,
                });
              }
            }}
          ></Image>
          {props.property.location && (
            <View className='user-location'>
              {parseLocation(props.property?.location)}
            </View>
          )}
          <View className='button-wrapper'>
            {props.user && (
              <Image
                src={uuIcon}
                className='user'
                onClick={() => setActiveTab('友友')}
              />
            )}
            {props.activity && (
              <Image
                src={activityIcon}
                className='activity'
                onClick={() => setActiveTab('活动')}
              />
            )}

            {props.property && (
              <Image
                src={propertySelectedIcon}
                className='house'
                onClick={() => setActiveTab('房源')}
              />
            )}
          </View>
          <View className='homepage-card-bottom activity'>
            <View className='bottom-left'>
              <View className='title'>{props.property?.title}</View>
              <View className='startTime'>
                {parseStartDate(props.property?.startDate)}
              </View>
            </View>
            <View className='bottom-right'>€{props.property?.price}/晚</View>
          </View>
        </>
      )}
    </View>
  );
};

export default HomepageCard;
