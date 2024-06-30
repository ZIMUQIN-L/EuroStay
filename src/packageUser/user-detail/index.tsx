import React, { useState, useEffect } from 'react';
import { UserItemProps, UserDetailInfoItemProps } from '@utils/interfaces';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import { RightBottomArrow } from '@utils/cloudIcons';
import GlobalStore from '@store/GlobalStore';

const userData: UserDetailInfoItemProps = {
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
    gov: true
  },
  aboutMe: {
    interests: 'Swimming, Movies, Skiing',
    major: 'Computer Science',
    languages: 'English, Italian, Chinese',
    skills: 'Coding, Cooking, Photography',
    funFact: 'I have visited 30 countries and counting!',
    visitedCountries: 'Italy, France, Germany, USA, China, Japan',
    serviceProvided: 'I can offer a cozy place to stay and a local tour around Milan.'
  }
};

  const UserDetail: React.FC= () => {
    const [userInfo, setUserInfo] = useState<UserDetailInfoItemProps | null>(null);
    useEffect(() => {
      const userData: UserDetailInfoItemProps = Taro.getStorageSync('userDetail');
      if (userData) {
        setUserInfo(userData);
      }
      console.log('User attributes:', userData);
    }, []);
    if (!userInfo) {
      return <View>Loading...</View>;
    }

  return (
    <View>
      <View className="profile-container">
        <View className="profile-background" />
        <View className="profile-header">
          <Image src={userData.avatarUrl} className="profile-image" />
          <View className="info">
            <Text className="profile-name">
            {userData.nickName}<Text className="badge" >实名认证</Text>
            </Text>
            <View className="badges">
              {userData.tags.map((tag, index) => (
                <Text key={index} className="badge-item">{tag}</Text>
              ))}
            </View>
            <Text className="description">我的简介：{userData.userDes}</Text>
            <View className="stats">
              <Text>房东评分: 4.5 颗星</Text>
              <Text>房客评分: 4.6 颗星</Text>
              <Text>获赞与收藏: 100 次</Text>
            </View>
          </View>
          
          </View>
        </View>

      
      <View className="tabs">
        <View className="tab active">概况</View>
        <View className="tab">供宿</View>
        <View className="tab">发帖</View>
      </View>
      <View className='content'>
        <View className='section'>
          <Text className='section-title'>关于她</Text>
          <View className='section-content'>
            <Text>
              <strong>兴趣爱好:</strong>
            </Text>
            <Text>游泳, 电影, 滑雪</Text>
          </View>
          <View className='section-content'>
            <Text>
              <strong>专业领域:</strong>
            </Text>
            <Text>迭佛鹃即佛卟卟卟卟啊啊; 卟佛; 卟佛了的; jf</Text>
          </View>
          <View className='section-content'>
            <Text>
              <strong>fun facts about me:</strong>
            </Text>
            <Text>迭佛鹃即佛卟卟卟卟啊啊; 卟佛; 卟佛了的; jf</Text>
          </View>
          <View className='section-content'>
            <Text>
              <strong>我游览过的国家:</strong>
            </Text>
            <Text>迭佛鹃即佛卟卟卟卟啊啊; 卟佛; 卟佛了的; jf</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserDetail;
