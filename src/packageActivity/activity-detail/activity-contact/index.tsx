import { View, Text, Image } from '@tarojs/components';
import {
  HouseDetailItemProps,
  UserDetailInfoItemProps,
} from '@utils/interfaces';
import Taro from '@tarojs/taro';
import './index.scss';
import { UserItemProps } from '@utils/interfaces';
import { useState, useEffect } from 'react';
import { accomMessageAdd } from '@common/database/accomMessage/accomMessage';
import GlobalStore from '@store/GlobalStore';
import RequestCustomCard from '../../../packageUser/request-custom-card';
import { userInfoSearch } from '@common/database/user/user';

const ActivityContact = () => {
  return (
    <View>
      <View className='contact-container'>
        <View className='contact-container-left'>
          <View className='price-container'>旅行币/晚</View>
          <View className='date-container'>价格</View>
        </View>

        <View className='contact-button' onClick={() => {}}>
          联系房主
        </View>
      </View>
    </View>
  );
};

export default ActivityContact;
