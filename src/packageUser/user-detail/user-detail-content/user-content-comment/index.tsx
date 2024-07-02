import React, { useState, useEffect } from 'react';
import { UserRatingInfoItemProps } from '@utils/interfaces';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import { DefaultAvatar } from '@utils/cloudIcons';

const ratingStars = [1, 2, 3, 4, 5];

const UserCommentCard: React.FC<UserRatingInfoItemProps> = userRatingInfo => {
  const ratingNumber =
    userRatingInfo.type === 'tohost'
      ? (userRatingInfo.evaluation['desMatch'] +
          userRatingInfo.evaluation['locationEval'] +
          userRatingInfo.evaluation['cleanEval'] +
          userRatingInfo.evaluation['serviceEval'] +
          userRatingInfo.evaluation['pricePerformance']) /
        5
      : userRatingInfo.evaluation['rating'];
  return (
    <View>
      <View className='comment-card'>
        <View className='comment-header'>
          <View className='comment-profile'>
            <Image
              src={
                userRatingInfo.toPublic
                  ? userRatingInfo.sourceUserAvatarUrl
                  : DefaultAvatar
              }
              className='profile-image-comment'
            />
            <View className='profile-info-comment'>
              <Text className='profile-name-comment'>
                {userRatingInfo.toPublic
                  ? userRatingInfo.sourceUserNickname
                  : '匿名用户'}
              </Text>
              <Text className='profile-location-comment'>
                {userRatingInfo.sourceUserLocation}
              </Text>
            </View>
          </View>
          <View className='comment-rating'>
            <View className='rating-stars'>
              {ratingStars.map((star, index) => (
                <Text
                  // @PJ TODO
                  key={index}
                  className={`star ${star <= ratingNumber ? 'filled' : ''}`}
                >
                  ★
                </Text>
              ))}
              <Text className='rating-number'>{ratingNumber}</Text>
            </View>
            <Text className='rating-dates'>
              {userRatingInfo.start_date} - {userRatingInfo.end_date}
            </Text>
          </View>
        </View>
        <View className='comment-body'>
          <Text className='comment-text'>{userRatingInfo.comment}</Text>
          {/* <Image src={roomImageUrl} className='room-image' /> */}
        </View>
        <View className='comment-footer'>
          <Text className='show-more'>显示更多</Text>
        </View>
      </View>
    </View>
  );
};

export default UserCommentCard;
