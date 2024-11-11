import { observer } from 'mobx-react';
import { DefaultHouse } from '@utils/cloudIcons';
import { View, Text, Image } from '@tarojs/components';
import StarIcon from '../icons/star.svg';
import { useEffect, useState } from 'react';
import GlobalStore from '@store/GlobalStore';
import { HouseItemProps, UserItemProps } from '@utils/interfaces';
import './index.scss';
import Taro from '@tarojs/taro';
import { userHouseInfoSearch } from '@common/database/user/user';
import NotificationCard from './NotificationCard';

const buttons = [
  { title: '求宿', value: 'house-request' },
  { title: '供宿', value: 'house-post' },
  { title: '活动', value: 'activity' },
  { title: '系统', value: 'system' },
];
const Index = () => {
  const [curButton, setCurButton] = useState<string>('house-request');
  console.log('inside');
  return (
    <>
      <View className='page-notification'>
        <View className='notification-buttons'>
          {buttons.map(button => {
            return (
              <View
                className={`button ${button.value == curButton ? 'active' : ''}`}
                onClick={() => {
                  setCurButton(button.value);
                }}
              >
                {button.title}
              </View>
            );
          })}
        </View>
        <View className='notification-cards-wrap'>
          <NotificationCard />
        </View>
      </View>
    </>
  );
};

export default observer(Index);
