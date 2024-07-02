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
import { HouseItemProps, UserItemProps } from '@utils/interfaces';
import './index.scss';
import Taro from '@tarojs/taro';
import { userHouseInfoSearch } from '@common/database/user/user';

const UserAccomContent: React.FC<UserDetailInfoItemProps> = userDetailInfo => {
  const [aboutMeEntries, setAboutMeEntries] = useState<{
    [key: string]: string;
  }>({});
  const [userReceivedRatings, setUserReceivedRatings] = useState<
    UserRatingInfoItemProps[]
  >([]);

  if (!userDetailInfo) {
    return <View>Loading...</View>;
  }



    const houseList = [
      {
        id: '1',
        image: DefaultHouse,
        title: '宽敞大床房',
        destination: '意大利罗马',
        capacity: 2,
        gender: '仅限女生',
        likes: 20,
      },
      {
        id: '2',
        image: DefaultHouse,
        destination: '意大利米兰',
        title: '现代风格套房',
        capacity: 3,
        gender: '性别不限',
        likes: 40,
      },
    ];

  return (
    <View className='content'>
      <View className='section'>
        <Text className='section-title'>'{userDetailInfo.nickName}'的供宿</Text>
        <View className='house-grid'>
        {houseList.map(house => (
          <View
            key={house.id}
            className='house-card'
            // onClick={() => handleHouseClick(house._id)}
          >
            <Image
              // src={house.images.length > 0 ? house.images[0] : DefaultHouse}
              // for mock data
              src={house.image}
              mode='aspectFill'
            />
            <Text className='house-title'>{house.destination}</Text>
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