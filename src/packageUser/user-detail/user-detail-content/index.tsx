import React, { useState, useEffect } from 'react';
import {
  UserDetailInfoItemProps,
  UserRatingInfoItemProps,
} from '@utils/interfaces';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import { Point } from '@utils/cloudIcons';
import UserCommentCard from './user-content-comment';
import { userReceivedRatingSearch } from '@common/database/ratingInfo/ratingInfo';

const UserDetailContent: React.FC<UserDetailInfoItemProps> = userDetailInfo => {
  const [aboutMeEntries, setAboutMeEntries] = useState<{
    [key: string]: string;
  }>({});
  const [userReceivedRatings, setUserReceivedRatings] = useState<
    UserRatingInfoItemProps[]
  >([]);

  const infoMap = {
    interests: '兴趣爱好',
    major: '专业领域',
    languages: '语言',
    skills: '技能',
    funFact: 'fun facts about me',
    visitedCountries: '我游览过的国家',
    serviceProvided: '我可以向求宿者/host提供什么',
  };

  if (!userDetailInfo) {
    return <View>Loading...</View>;
  }

  useEffect(() => {
    userReceivedRatingSearch(userDetailInfo._openid).then(
      (ratings: UserRatingInfoItemProps[]) => {
        setUserReceivedRatings(ratings);
      },
    );

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
<View className="about-travel-section">
  {/* Intro Section */}
  <View className="intro-section">
    <View className="sectiontitle">关于TA</View>
    <View className="tag-group">
      <Text className="representative-tag">代表Tag</Text>
      <View className="tags">
        <Text className="tag">🌍 环球冒险家</Text>
        <Text className="tag">📷 摄影爱好者</Text>
        <Text className="tag">👩‍🍳 厨神</Text>
      </View>
    </View>
  
    <View className="details">
      <Text className="title">为什么选择借换宿</Text>
      <Text className="content">
        换宿对我来说是一种人生的体验，可以帮助我了解认识到不同的地域文化...
      </Text>
    </View>
  
    <View className="details">
      <Text className="title">Green Flag</Text>
      <View className="tags">
        <Text className="tag">爱聊天</Text>
        <Text className="tag">爱吃饭</Text>
        <Text className="tag">会摄影</Text>
      </View>
    </View>
  
    <View className="details">
      <Text className="title">Red Flag</Text>
      <View className="tags">
        <Text className="tag">遇见鬼</Text>
        <Text className="tag">不诚实</Text>
        <Text className="tag">吃得少</Text>
      </View>
    </View>
  
    <View className="details">
      <Text className="title">兴趣爱好</Text>
      <View className="tags">
        <Text className="tag">🎬 电影</Text>
        <Text className="tag">📷 摄影</Text>
        <Text className="tag">🎭 话剧</Text>
        <Text className="tag">🎤 音乐</Text>
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
      <Text className="content">埃及、意大利、荷兰、爱尔兰、英国</Text>
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
      <Text className="content">半夜和房东一起去沙滩上偷螃蟹</Text>
    </View>
  </View>
</View>

  
    // <View>
    //   <View className='content'>
    //     <View className='section'>
    //       <Text className='section-title'>关于'{userDetailInfo.nickName}'</Text>
    //       {Object.entries(aboutMeEntries).map(([key, value]) => (
    //         <View key={key} className='section-content'>
    //           <View className='key-container'>
    //             <Image src={Point} className='point-image' />
    //             <Text className='section-key'>{infoMap[key]}:</Text>
    //           </View>
    //           <Text className='section-value'>{value}</Text>
    //         </View>
    //       ))}
    //     </View>
    //   </View>

    //   <View className='comment-section'>
    //     <Text className='section-title-comment'>我的评价</Text>
    //     <View className='tags'>
    //       {userDetailInfo.tags &&
    //         userDetailInfo.tags.map((tag, index) => (
    //           <Text key={index} className='badge-item'>
    //             {tag}
    //           </Text>
    //         ))}
    //     </View>
    //     <View className='comment-cards-container'>
    //       {userReceivedRatings.map(ratingInfo => (
    //         <UserCommentCard {...ratingInfo}></UserCommentCard>
    //       ))}
    //     </View>
    //   </View>
    // </View>
  );
};

export default UserDetailContent;
