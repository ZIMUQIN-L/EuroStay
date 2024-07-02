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
    <View>
      <View className='content'>
        <View className='section'>
          <Text className='section-title'>关于'{userDetailInfo.nickName}'</Text>
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
          {userDetailInfo.tags &&
            userDetailInfo.tags.map((tag, index) => (
              <Text key={index} className='badge-item'>
                {tag}
              </Text>
            ))}
        </View>
        <View className='comment-cards-container'>
          {userReceivedRatings.map(ratingInfo => (
            <UserCommentCard {...ratingInfo}></UserCommentCard>
          ))}
        </View>
      </View>
    </View>
  );
};

export default UserDetailContent;
