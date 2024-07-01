import { View, Text, Image } from '@tarojs/components';
import {
  HouseDetailItemProps,
  UserDetailInfoItemProps,
} from '@utils/interfaces';
import './index.scss';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { userInfoSearch } from '@common/database/user/user';

const HouseOwner: React.FC<HouseDetailItemProps> = house => {
  const [houseOwnerDetail, setHouseOwnerDetail] =
    useState<UserDetailInfoItemProps>();

  const toHostDetail = () => {
    Taro.navigateTo({
      url: `/packageUser/user-detail/index?id=${house._openid}`,
    });
  };

  useEffect(() => {
    userInfoSearch(house._openid).then(
      (ownerInfo: UserDetailInfoItemProps[]) => {
        setHouseOwnerDetail(ownerInfo[0]);
      },
    );
  }, []);

  return (
    <View className='lists'>
      <View className='container'>
        <View className='text-container'>
          <Text className='title'>房东信息</Text>
        </View>
        <View className='contact-button' onClick={toHostDetail}>
          <Text className='contact-text'>房东信息</Text>
        </View>
      </View>
    </View>
  );
};

export default HouseOwner;
