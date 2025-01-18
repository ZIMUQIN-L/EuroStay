import React, { useState, useEffect } from 'react';
import {
  UserResult,
  UserRatingInfoItemProps,
} from '@utils/interfaces';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import { Point } from '@utils/cloudIcons';
import UserCommentCard from '../user-rating-content/user-content-comment';
import { userReceivedRatingSearch } from '@common/database/ratingInfo/ratingInfo';

const UserDetailContent: React.FC<UserResult> = userDetailInfo => {
  const [aboutMeEntries, setAboutMeEntries] = useState<{
    [key: string]: string;
  }>({});
  const [userReceivedRatings, setUserReceivedRatings] = useState<
    UserRatingInfoItemProps[]
  >([]);

  if (!userDetailInfo) {
    return <View>Loading...</View>;
  }

  // useEffect(() => {
  //   userReceivedRatingSearch(userDetailInfo._openid).then(
  //     (ratings: UserRatingInfoItemProps[]) => {
  //       setUserReceivedRatings(ratings);
  //     },
  //   );

  //   if (userDetailInfo.aboutMe) {
  //     const aboutMeInfo = userDetailInfo.aboutMe;
  //     setAboutMeEntries(aboutMeInfo);
  //   } else {
  //     const aboutMeInfo = {
  //       interests: '尚未完善',
  //       major: '尚未完善',
  //       languages: '尚未完善',
  //       skills: '尚未完善',
  //       funFact: '尚未完善',
  //       visitedCountries: '尚未完善',
  //       serviceProvided: '尚未完善',
  //     };
  //     setAboutMeEntries(aboutMeInfo);
  //   }
  // }, []);

  return (
  <View className="about-travel-section">
    {/* Intro Section */}
    <View className="intro-section">
      <View className="sectiontitle">关于TA</View>
      <View className="tag-group">
        <Text className="representative-tag">代表Tag</Text>
        <View className="tags">
          {userDetailInfo?.tagStr && userDetailInfo.tagStr.length > 0 ? (
              userDetailInfo.tagStr.map((tag, index) => (
                <Text key={index} className="tag">
                  {tag}
                </Text>
              ))
            ) : (
              <Text className="tag">尚未完善</Text>
            )}
        </View>
      </View>
    
      <View className="details">
        <Text className="title">为什么选择借换宿</Text>
        <Text className="content">
          {userDetailInfo?.whySwap || '尚未完善'}
        </Text>
      </View>
    
      <View className="details">
        <Text className="title">Green Flag</Text>
        <View className="tags">
          {userDetailInfo?.greenTag && userDetailInfo.greenTag.length > 0 ? (
              userDetailInfo.greenTag.map((tag, index) => (
                <Text key={index} className="tag">
                  {tag}
                </Text>
              ))
            ) : (
              <Text className="tag">尚未完善</Text>
            )}
        </View>
      </View>
    
      <View className="details">
        <Text className="title">Red Flag</Text>
        <View className="tags">
          {userDetailInfo?.redTag && userDetailInfo.redTag.length > 0 ? (
            userDetailInfo.redTag.map((tag, index) => (
              <Text key={index} className="tag">
                {tag}
              </Text>
            ))
          ) : (
            <Text className="tag">尚未完善</Text>
          )}
        </View>
      </View>
    
      <View className="details">
        <Text className="title">兴趣爱好</Text>
        <View className="tags">
          {userDetailInfo?.hobby && userDetailInfo.hobby.length > 0 ? (
            userDetailInfo.hobby.map((tag, index) => (
              <Text key={index} className="tag">
                {tag}
              </Text>
            ))
          ) : (
            <Text className="tag">尚未完善</Text>
          )}
        </View>
      </View>
    </View>

    {/* Travel Section */}
    <View className="travel-section">
      <View className="sectiontitle">TA 的旅迹</View>

      {/* Visited Countries Section */}
      <View className="details">
        <Text className="title">
          <Text className="icon">📍</Text> 去过的国家
          <Text className="link">（电子地图）</Text>
        </Text>
        <Text className="content">          
          {userDetailInfo?.countryVisited && userDetailInfo.countryVisited.length > 0
            ? userDetailInfo.countryVisited.join('、')
            : '尚未完善'}
        </Text>
      </View>

      {/* Map Section */}
      <View className="map-container">
        <Image src="/path-to-map-image.png" className="map-image" />
      </View>

      {/* Participated Activities Section */}
      <View className="details">
        <Text className="title">
          <Text className="icon">🌐</Text> 参加过的活动
        </Text>
        <View className="tags">
          <Text className="tag">2024中秋做月饼</Text>
          <Text className="tag">2024万圣节活动</Text>
        </View>
      </View>

      {/* Memorable Swap Memories Section */}
      <View className="details">
        <Text className="title">
          <Text className="icon">🌟</Text> 最难忘的换宿回忆
        </Text>
        <Text className="content">{userDetailInfo?.memorableStory || '尚未完善'}</Text>
      </View>
    </View>
  </View>
    );
};

export default UserDetailContent;
