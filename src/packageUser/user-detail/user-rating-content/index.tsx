import React from 'react';
import { View, Text } from '@tarojs/components';
import UserCommentCard from './user-content-comment';
import './index.scss';

const UserCommentContent = ({ userDetailInfo, userReceivedRatings }) => {
  // Filter ratings into "from guest" and "from host" categories
  const guestRatings = userReceivedRatings?.filter(rating => rating.type === 'guest') || [];
  const hostRatings = userReceivedRatings?.filter(rating => rating.type === 'host') || [];

  return (
    <View className="comment-section">
      {/* Top Statistics */}
      <View className="statistics">
        <View className="stat-item">
          <Text className="stat-title">活跃Guest</Text>
          <Text className="stat-info">共借宿4次 | 收到打赏x次</Text>
          <Text className="stat-rate">推荐率 89%</Text>
        </View>
        <View className="stat-item">
          <Text className="stat-title">精选host</Text>
          <Text className="stat-info">共供宿19次 | 收到打赏x次</Text>
          <Text className="stat-rate">推荐率 89%</Text>
        </View>
      </View>

      {/* Guest Comments */}
      <View className="ratings-section">
        <Text className="section-title">来自Guest</Text>
        <View className="comment-cards-container">
          {guestRatings.map((ratingInfo, index) => (
            <UserCommentCard key={index} {...ratingInfo}></UserCommentCard>
          ))}
        </View>
        <View className="show-more">
          <Text>查看更多</Text>
        </View>
      </View>

      {/* Host Comments */}
      <View className="ratings-section">
        <Text className="section-title">来自Host</Text>
        <View className="comment-cards-container">
          {hostRatings.map((ratingInfo, index) => (
            <UserCommentCard key={index} {...ratingInfo}></UserCommentCard>
          ))}
        </View>
        <View className="show-more">
          <Text>查看更多</Text>
        </View>
      </View>
    </View>
  );
};

export default UserCommentContent;

