import { View, Text, Image } from '@tarojs/components';
import {
  HouseDetailItemProps,
  UserDetailInfoItemProps,
} from '@utils/interfaces';
import { DefaultAvatar } from '@utils/cloudIcons';
import './index.scss';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { userInfoSearch } from '@common/database/user/user';

const HouseOwner: React.FC<HouseDetailItemProps> = house => {
  const [houseOwnerDetail, setHouseOwnerDetail] =
    useState<UserDetailInfoItemProps | null>(null);

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
          <Text className='title'>房主信息</Text>
        </View>
        <View className='parent-container'>
          <View className='profile-card'>
            <View className='profile-info'>
              <Image
                src={
                  houseOwnerDetail ? houseOwnerDetail?.avatarUrl : DefaultAvatar
                }
                className='profile-image'
              />
              <Text className='profile-name'>
                {houseOwnerDetail ? houseOwnerDetail.nickName : '未知用户'}
              </Text>
            </View>
            <Text className='host-homepage-button' onClick={toHostDetail}>
              房主主页
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HouseOwner;
