import { View, Image } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.scss';
import {
  homeUserProps,
  homeActivityProps,
  homePropertyProps,
} from '@utils/interfaces';

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

  return (
    <View className={`${getCardClass()} ${props.id}`}>
      {activeTab == '友友' && (
        <>
          <Image src={props.user.backgroundPic} className='user-pic'></Image>
          {props.user.location && (
            <View className='user-location'>{props.user.location}</View>
          )}
          <View className='button-wrapper'>
            <Image
              src={''}
              className='user'
              onClick={() => setActiveTab('友友')}
            />
            {props.activity && (
              <Image
                src={''}
                className='activity'
                onClick={() => setActiveTab('活动')}
              />
            )}

            {props.property && (
              <Image
                src={''}
                className='house'
                onClick={() => setActiveTab('房源')}
              />
            )}
          </View>
          <View className='homepage-card-bottom'>
            <Image src='' className='user-avatar' />
            <View className='user-details'>
              <View className='user-name'>{props.user.username}</View>
              <View className='user-tags'>
                {props.user.tags.map(item => {
                  return <View className='tag-item'>{item}</View>;
                })}
              </View>
            </View>
            <View></View>
          </View>
        </>
      )}

      {activeTab == '活动' && props.activity && (
        <>
          <Image src={props.activity.images?.[0]} className='user-pic'></Image>
          {props.activity.location && (
            <View className='user-location'>{props.activity.location}</View>
          )}
          <View className='button-wrapper'>
            {props.user && (
              <Image
                src={''}
                className='user'
                onClick={() => setActiveTab('友友')}
              />
            )}
            {props.activity && (
              <Image
                src={''}
                className='activity'
                onClick={() => setActiveTab('活动')}
              />
            )}

            {props.property && (
              <Image
                src={''}
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
          <Image src={props.property.images?.[0]} className='user-pic'></Image>
          {props.property.location && (
            <View className='user-location'>{props.property?.location}</View>
          )}
          <View className='button-wrapper'>
            {props.user && (
              <Image
                src={''}
                className='user'
                onClick={() => setActiveTab('友友')}
              />
            )}
            {props.activity && (
              <Image
                src={''}
                className='activity'
                onClick={() => setActiveTab('活动')}
              />
            )}

            {props.property && (
              <Image
                src={''}
                className='house'
                onClick={() => setActiveTab('房源')}
              />
            )}
          </View>
          <View className='homepage-card-bottom activity'>
            <View className='bottom-left'>
              <View className='title'>{props.property?.title}</View>
              <View className='startTime'>{props.property?.startTime}</View>
            </View>
            <View className='bottom-right'>€{props.property?.price}/晚</View>
          </View>
        </>
      )}
    </View>
  );
};

export default HomepageCard;
