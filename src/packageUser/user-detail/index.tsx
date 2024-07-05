import React, { useState, useEffect } from 'react';
import { UserDetailInfoItemProps, UserItemProps } from '@utils/interfaces';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import GlobalStore from '@store/GlobalStore';
import Taro from '@tarojs/taro';
import { useRouter } from '@tarojs/taro';
import { userInfoSearch } from '@common/database/user/user';
import UserDetailContent from './user-detail-content';
import UserAccomContent from './user-accom-content';

// const userData: UserDetailInfoItemProps = {
//   _id: 'user-001',
//   _openid: 'openid-001',
//   userOpenid: 'user-openid-001',
//   nickName: '偷心小白菜',
//   userDes: '欢迎和我进行换宿体验～',
//   avatarUrl: 'https://via.placeholder.com/80',
//   userLocation: 'Milan, Italy',
//   guestRating: 4.8,
//   guestRatingNumber: 25,
//   hostRating: 4.7,
//   hostRatingNumber: 18,
//   gender: 'female',
//   tags: ['INTP', '意大利米兰', '米兰理工大学'],
//   verified: {
//     student: true,
//     gov: true,
//   },
//   aboutMe: {
//     interests: 'Swimming, Movies, Skiing',
//     major: 'Computer Science',
//     languages: 'English, Italian, Chinese',
//     skills: 'Coding, Cooking, Photography',
//     funFact: 'I have visited 30 countries and counting!',
//     visitedCountries: 'Italy, France, Germany, USA, China, Japan',
//     serviceProvided:
//       'I can offer a cozy place to stay and a local tour around Milan.',
//   },
// };

const UserDetail: React.FC = () => {
  const router = useRouter();
  const userOpenid = router?.params?.id;
  const [userDetailInfo, setUserDetailInfo] =
    useState<UserDetailInfoItemProps>();
  const [activeTab, setActiveTab] = useState('概况');
  const [currentUser, setCurrentUser] = useState<UserItemProps>(
    GlobalStore.userInfo,
  );

  const [userPoints, setUserPoints] = useState<number>(0);

  useEffect(() => {
    userInfoSearch(userOpenid).then((ownerInfo: UserDetailInfoItemProps[]) => {
      setUserDetailInfo(ownerInfo[0]);
    });
  }, []);

  if (!userDetailInfo) {
    return <View>Loading...</View>;
  }

  const toEdit = () => {
    Taro.navigateTo({
      url: `/packageUser/user-edit/index?id=${currentUser._openid}`,
    });
  };

  const handlePointsClick = () => {
    Taro.navigateTo({
      url: '/packageUser/my-points/index',
    });
  };

  return (
    <View>
      <View className='profile-container'>
        <View className='profile-background' />
        <View className='profile-header'>
          <Image src={userDetailInfo?.avatarUrl} className='profile-image' />
          <View className='info'>
            <Text className='profile-name'>
              {userDetailInfo?.nickName}
              {/* // TODO, @PJ */}
              <Text className='badge'>实名认证</Text>
              <Text className='badge-points' onClick={handlePointsClick}>
                E分值{userPoints} {'>'}
              </Text>
            </Text>
            <View className='badges'>
              {userDetailInfo.tags ? (
                userDetailInfo.tags.map((tag, index) => (
                  <Text key={index} className='badge-item'>
                    {tag}
                  </Text>
                ))
              ) : (
                <Text className='badge-item'>暂无个性标签</Text>
              )}
            </View>
          </View>

          <View className='additional-info'>
            <Text className='description'>
              我的简介：{userDetailInfo.userDes}
            </Text>
            <View className='ratings-container'>
              <View className='ratings'>
                <View className='rating-item'>
                  <Text className='rating-title'>房东评分</Text>
                  <Text className='rating-value'>
                    {userDetailInfo && userDetailInfo.hostRating
                      ? userDetailInfo.hostRating
                      : '暂无评分'}
                  </Text>
                </View>
                <View className='rating-item'>
                  <Text className='rating-title'>房客评分</Text>
                  <Text className='rating-value'>
                    {userDetailInfo && userDetailInfo.guestRating
                      ? userDetailInfo.guestRating
                      : '暂无评分'}
                  </Text>
                </View>
              </View>
              {userDetailInfo._openid == currentUser._openid ? (
                <View className='edit-button' onClick={toEdit}>
                  <Text>编辑资料</Text>
                </View>
              ) : (
                <View></View>
              )}
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
      {activeTab === '概况' ? (
        <UserDetailContent {...userDetailInfo} />
      ) : activeTab === '供宿' ? (
        <UserAccomContent {...userDetailInfo} />
      ) : null}
    </View>
  );
};

export default UserDetail;
