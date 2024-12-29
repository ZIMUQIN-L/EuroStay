import React, { useState, useEffect } from 'react';
import {
  UserDetailInfoItemProps,
  UserRatingInfoItemProps,
} from '@utils/interfaces';
import './index.scss';
import { userReceivedRatingSearch } from '@common/database/ratingInfo/ratingInfo';
import { DefaultHouse } from '@utils/cloudIcons';
import { View, Text, Image } from '@tarojs/components';
import StarIcon from '../icons/star.svg';
import GlobalStore from '@store/GlobalStore';
import { HouseDetailItemProps, UserItemProps } from '@utils/interfaces';
import './index.scss';
import Taro from '@tarojs/taro';
import { userHouseInfoSearch } from '@common/database/user/user';

const UserAccomContent: React.FC<UserDetailInfoItemProps> = userDetailInfo => {
  if (!userDetailInfo) {
    return <View>Loading...</View>;
  }

  const [houseList, setHouseList] = useState<HouseDetailItemProps[]>([]);
  useEffect(() => {
    userHouseInfoSearch(userDetailInfo._openid).then(
      (houseData: HouseDetailItemProps[]) => {
        setHouseList(houseData); // Update demoData state with the fetched data
      },
    );
  }, []);

  const handleHouseClick = houseId => {
    Taro.navigateTo({
      url: `/packageHouse/house-detail/index?id=${houseId}`,
    });
  };

  return (
    <View className='content'>
      <View className='section'>
        <Text className='section-title'>'{userDetailInfo.nickName}'的房源test</Text>
        <View className='house-grid'>
          {houseList.map(house => (
            <View
              key={house._id}
              className='house-card'
              onClick={() => handleHouseClick(house._id)}
            >
              <Image
                src={house.images.length > 0 ? house.images[0] : DefaultHouse}
                mode='aspectFill'
              />
              <Text className='house-title'>{house.location}</Text>
              <View className='house-info'>
                <Text>{house.capacity}人</Text>
                <View className='house-likes'>
                  {/* <Image src={StarIcon} /> */}
                  {/* <Text>{house.likes}</Text> */}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default UserAccomContent;
