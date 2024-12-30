import React, { useState, useEffect } from 'react';
import { UserRatingInfoItemProps } from '@utils/interfaces';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import { DefaultAvatar } from '@utils/cloudIcons';

const ratingStars = [1, 2, 3, 4, 5];

const UserCommentCard: React.FC<UserRatingInfoItemProps> = userRatingInfo => {
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const [isHostModalVisible, setHostModalVisible] = useState(false);

  const showHostModal = () => setHostModalVisible(true);
  const hideHostModal = () => setHostModalVisible(false);

  const ratingNumber =
    userRatingInfo.type === 'host'
      ? (userRatingInfo.evaluation['desMatch'] +
          userRatingInfo.evaluation['locationEval'] +
          userRatingInfo.evaluation['cleanEval'] +
          userRatingInfo.evaluation['serviceEval'] +
          userRatingInfo.evaluation['pricePerformance']) /
        5
      : userRatingInfo.evaluation['rating'];
  return (
    <View>
      {userRatingInfo.type === 'guest' ? (
        <View className="host-comment-card">
        {/* Host Room Details */}
        <View className="host-details">
          <View className="host-room-image-placeholder"></View>

          <View className="host-room-info">
            <Text className="host-room-title">国家城市·房源名称...</Text>         
            <View className="host-room-details">
              <Text className="host-room-details-item">🇪🇸 西班牙 | Valencia</Text>
              <Text className="host-room-details-item">距离市中心步行10mins</Text>
              <Text className="host-room-details-item">独享单人床</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="divider"></View>

        {/* Host Comment Section */}
        
        <View className="comment-header">
          <View className="comment-profile">
            {/* <Image
              src={
                userRatingInfo.toPublic
                  ? userRatingInfo.sourceUserAvatarUrl
                  : DefaultAvatar
              }
              className="profile-image-comment"
            /> */}
            <View className="profile-image-placeholder" />
            <View className="profile-info-comment">
              <Text className="profile-name-comment">
                {userRatingInfo.toPublic
                  ? userRatingInfo.sourceUserNickname
                  : '匿名用户'}
              </Text>
              <Text className="profile-location-comment">
                {userRatingInfo.sourceUserLocation}
              </Text>
            </View>
          </View>
          <View className="comment-rating">
            <Text className="recommendation-badge">推荐</Text>
            <Text className="rating-dates">
              {userRatingInfo.start_date} - {userRatingInfo.end_date}
            </Text>
          </View>
        </View>
        <View className="comment-body">
          <Text className="comment-text">{userRatingInfo.comment}</Text>
        </View>
        <View className="comment-footer">
          <Text className="show-more" onClick={showModal}>显示更多</Text>
        </View>
      {isModalVisible && (
        <View className="modal">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-title">完整评价</Text>
              <Text className="modal-close" onClick={hideModal}>
                ✕
              </Text>
            </View>
            <View className="host-details">
              {/* <Image
                className="host-room-image"
                src="/path-to-room-image.jpg" // Placeholder for now
                alt="Room Image"
              /> */}
              <View className="host-room-image-placeholder"></View>
              <View className="host-room-info">
                <Text className="host-room-title">国家城市·房源名称...</Text>
                <View className="host-room-details">
                  <Text className="host-room-details-item">🇪🇸 西班牙 | Valencia</Text>
                  <Text className="host-room-details-item">距离市中心步行10mins</Text>
                  <Text className="host-room-details-item">独享单人床</Text>
                </View>
              </View>
            </View>
            <View className="divider" />
            <View className="comment-full-body">
              <View className="comment-header">
                <View className="comment-profile">
                  <View className="profile-image-placeholder" />
                  <View className="profile-info-comment">
                    <Text className="profile-name-comment">
                      {userRatingInfo.sourceUserNickname}
                    </Text>
                    <Text className="profile-location-comment">
                      {userRatingInfo.sourceUserLocation}
                    </Text>
                  </View>
                </View>
                <View className="comment-rating">
                  <Text className="recommendation-badge">推荐</Text>
                  <Text className="rating-dates">
                    {userRatingInfo.start_date} - {userRatingInfo.end_date}
                  </Text>
                </View>
              </View>
              <View className="comment-body">
                <Text className="modal-comment-content">{userRatingInfo.comment}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      </View>
      ): (
      <View className='comment-card'>
        <View className='comment-header'>
          <View className='comment-profile'>
            {/* <Image
              src={
                userRatingInfo.toPublic
                  ? userRatingInfo.sourceUserAvatarUrl
                  : DefaultAvatar
              }
              className='profile-image-comment'
            /> */}
            <View className="profile-image-placeholder" />
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
            {/* <View className='rating-stars'>
              {ratingStars.map((star, index) => (
                <Text
                  key={index}
                  className={`star ${star <= ratingNumber ? 'filled' : ''}`}
                >
                  ★
                </Text>
              ))}
              <Text className='rating-number'>{ratingNumber}</Text>
            </View> */}
            <Text className="recommendation-badge">推荐</Text>
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
          <Text className='show-more' onClick={showHostModal}>显示更多</Text>
        </View>
        {isHostModalVisible && (
        <View className="modal">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-title">完整评价</Text>
              <Text className="modal-close" onClick={hideHostModal}>
                ✕
              </Text>
            </View>
            <View className="comment-full-body">
              <View className="comment-header">
                <View className="comment-profile">
                  <View className="profile-image-placeholder" />
                  <View className="profile-info-comment">
                    <Text className="profile-name-comment">
                      {userRatingInfo.sourceUserNickname}
                    </Text>
                    <Text className="profile-location-comment">
                      {userRatingInfo.sourceUserLocation}
                    </Text>
                  </View>
                </View>
                <View className="comment-rating">
                  <Text className="recommendation-badge">推荐</Text>
                  <Text className="rating-dates">
                    {userRatingInfo.start_date} - {userRatingInfo.end_date}
                  </Text>
                </View>
              </View>
              <View className="comment-body">
                <Text className="modal-comment-content">{userRatingInfo.comment}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      </View>)}
    </View>
  );
};

export default UserCommentCard;
