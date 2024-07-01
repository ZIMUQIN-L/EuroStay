import React, { useState, useEffect } from 'react';
import { UserDetailInfoItemProps } from '@utils/interfaces';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import { Point } from '@utils/cloudIcons';
import { useRouter } from '@tarojs/taro';
import { userInfoSearch } from '@common/database/user/user';

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

const profileImageUrl = 'https://via.placeholder.com/50';
const roomImageUrl = 'https://via.placeholder.com/80';
const ratingStars = [1, 2, 3, 4, 5];

const UserDetail: React.FC = () => {
  const router = useRouter();
  const userOpenid = router?.params?.id;
  const [userDetailInfo, setUserDetailInfo] =
    useState<UserDetailInfoItemProps>();
  const [activeTab, setActiveTab] = useState('概况');
  useEffect(() => {
    userInfoSearch(userOpenid).then((ownerInfo: UserDetailInfoItemProps[]) => {
      setUserDetailInfo(ownerInfo[0]);
    });
    //   if (userData) {
    //     setUserInfo(userData);
    //   }
    //   console.log('User attributes:', userData);
  }, []);

  if (!userDetailInfo) {
    return <View>Loading...</View>;
  }

  const toEdit = () => {
    Taro.navigateTo({
      url: '/packageUser/user-edit/index',
    });
  };

  const aboutMeEntries = Object.entries(userData.aboutMe);
  console.log('About Me entries:', aboutMeEntries);

  return (
    <View>
      <View className='profile-container'>
        <View className='profile-background' />
        <View className='profile-header'>
          <Image src={userDetailInfo?.avatarUrl} className='profile-image' />
          <View className='info'>
            <Text className='profile-name'>
              {userDetailInfo?.nickName}
              <Text className='badge'>实名认证</Text>
            </Text>
            <View className='badges'>
              {userData.tags.map((tag, index) => (
                <Text key={index} className='badge-item'>
                  {tag}
                </Text>
              ))}
            </View>
          </View>

          <View className='additional-info'>
            <Text className='description'>我的简介：{userData.userDes}</Text>
            <View className='ratings-container'>
              <View className='ratings'>
                <View className='rating-item'>
                  <Text className='rating-title'>房东评分</Text>
                  <Text className='rating-value'>{userData.hostRating}</Text>
                </View>
                <View className='rating-item'>
                  <Text className='rating-title'>房客评分</Text>
                  <Text className='rating-value'>{userData.guestRating}</Text>
                </View>
              </View>
              <View className='edit-button' onClick={toEdit}>
                <Text>编辑资料</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className='tabs'>
        <View
          className={`tab ${activeTab === '概况' ? 'active' : ''}`}
          onClick={() => setActiveTab('概况')}
        >
          概况
        </View>
        <View
          className={`tab ${activeTab === '供宿' ? 'active' : ''}`}
          onClick={() => setActiveTab('供宿')}
        >
          供宿
        </View>
        <View
          className={`tab ${activeTab === '发帖' ? 'active' : ''}`}
          onClick={() => setActiveTab('发帖')}
        >
          发帖
        </View>
      </View>
      <View className='content'>
        <View className='section'>
          <Text className='section-title'>关于{userData.nickName}</Text>
          {aboutMeEntries.map(([key, value], index) => (
            <View key={index} className='section-content'>
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

export default UserDetail;
