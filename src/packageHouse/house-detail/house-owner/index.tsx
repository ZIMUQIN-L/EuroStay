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

  // mock data owner
  const onwer: UserDetailInfoItemProps = {
    _id: 'user-001',
    _openid: 'openid-001',
    userOpenid: 'user-openid-001',
    nickName: '偷心小白菜',
    userDes: '欢迎和我进行换宿体验～',
    avatarUrl: 'https://via.placeholder.com/80',
    userLocation: 'Milan, Italy',
    guestRating: 4.8,
    guestRatingNumber: 25,
    hostRating: 4.7,
    hostRatingNumber: 18,
    gender: 'female',
    tags: ['INTP', '意大利米兰', '米兰理工大学'],
    verified: {
      student: true,
      gov: true,
    },
    aboutMe: {
      interests: 'Swimming, Movies, Skiing',
      major: 'Computer Science',
      languages: 'English, Italian, Chinese',
      skills: 'Coding, Cooking, Photography',
      funFact: 'I have visited 30 countries and counting!',
      visitedCountries: 'Italy, France, Germany, USA, China, Japan',
      serviceProvided:
        'I can offer a cozy place to stay and a local tour around Milan.',
    },
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
        {/* <View className='contact-button' onClick={toHostDetail}>
          <Text className='contact-text'>房东信息</Text>
        </View> */}
        <View className="parent-container">
          <View className="profile-card">
            <View className="profile-info">
              <Image src={onwer.avatarUrl} className="profile-image" />
              <Text className="profile-name">{onwer.nickName}</Text>
            </View>
            <Text className="host-homepage-button" onClick={toHostDetail}>房主主页</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HouseOwner;
