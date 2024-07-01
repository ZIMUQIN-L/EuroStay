import React, { useState, useEffect } from 'react';
import { UserDetailInfoItemProps, UserItemProps } from '@utils/interfaces';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import { Point } from '@utils/cloudIcons';

const profileImageUrl = 'https://via.placeholder.com/50';
const roomImageUrl = 'https://via.placeholder.com/80';
const ratingStars = [1, 2, 3, 4, 5];

const UserDetailContent: React.FC<UserDetailInfoItemProps> = userDetailInfo => {
  const [aboutMeEntries, setAboutMeEntries] = useState<{
    [key: string]: string;
  }>({});

  if (!userDetailInfo) {
    return <View>Loading...</View>;
  }

  useEffect(() => {
    if (userDetailInfo.aboutMe) {
      const aboutMeInfo = userDetailInfo.aboutMe;
      setAboutMeEntries(aboutMeInfo);
    } else {
      const aboutMeInfo = {
        interests: '尚未完善',
        major: '尚未完善',
        languages: '尚未完善',
        skills: '尚未完善',
        funFact: '尚未完善',
        visitedCountries: '尚未完善',
        serviceProvided: '尚未完善',
      };
      setAboutMeEntries(aboutMeInfo);
    }
  }, []);

  return (
    <View>
      <View className='content'>
        <View className='section'>
          <Text className='section-title'>关于{userDetailInfo.nickName}</Text>
          {Object.entries(aboutMeEntries).map(([key, value]) => (
            <View key={key} className='section-content'>
              <View className='key-container'>
                <Image src={Point} className='point-image' />
                <Text className='section-key'>{key}:</Text>
              </View>
              <Text className='section-value'>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className='comment-section'>
        <Text className='section-title-comment'>我的评价</Text>
        <View className='tags'>
          <Text className='badge-item'>INTP</Text>
          <Text className='badge-item'>意大利米兰</Text>
          <Text className='badge-item'>米兰理工大学</Text>
        </View>
        <View className='comment-card'>
          <View className='comment-header'>
            <View className='comment-profile'>
              <Image src={profileImageUrl} className='profile-image-comment' />
              <View className='profile-info-comment'>
                <Text className='profile-name-comment'>素食主义</Text>
                <Text className='profile-location-comment'>意大利-米兰</Text>
              </View>
            </View>
            <View className='comment-rating'>
              {ratingStars.map((star, index) => (
                <Text
                  key={index}
                  className={`star ${index < 3 ? 'filled' : ''}`}
                >
                  ★
                </Text>
              ))}
              <Text className='rating-dates'>2023-07-02 to 2023-07-07</Text>
            </View>
          </View>
          <View className='comment-body'>
            <Text className='comment-text'>
              非常好的房间，交通便利，很卫生干净！小姐姐回复沟通也特别及时！
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </Text>
            <Image src={roomImageUrl} className='room-image' />
          </View>
          <View className='comment-footer'>
            <Text className='show-more'>显示更多</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserDetailContent;
