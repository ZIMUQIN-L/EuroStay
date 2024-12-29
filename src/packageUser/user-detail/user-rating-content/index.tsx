import React from 'react';
import { View, Text } from '@tarojs/components';
import UserCommentCard from './user-content-comment';
import './index.scss';

const UserCommentContent = ({ userDetailInfo, userReceivedRatings }) => {
  const mock = userReceivedRatings
  const userReceivedRatings2 = [
    {
      type: "guest",
      evaluation: {
        desMatch: 5,
        locationEval: 4,
        cleanEval: 5,
        serviceEval: 4,
        pricePerformance: 5,
        rating: 4.8,
      },
      toPublic: true,
      sourceUserAvatarUrl: "/path-to-avatar.jpg",
      sourceUserNickname: "John Doe",
      sourceUserLocation: "New York, USA",
      start_date: "2024-12-20",
      end_date: "2024-12-27",
      comment: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxGreat host, very welcoming!Great host, very welcoming!Great host, very welcoming!Great host, very welcoming!Great host, very welcoming!",
    },
    {
      type: "guest",
      evaluation: {
        desMatch: 5,
        locationEval: 4,
        cleanEval: 5,
        serviceEval: 4,
        pricePerformance: 5,
        rating: 4.8,
      },
      toPublic: true,
      sourceUserAvatarUrl: "/path-to-avatar.jpg",
      sourceUserNickname: "John Doe",
      sourceUserLocation: "New York, USA",
      start_date: "2024-12-20",
      end_date: "2024-12-27",
      comment: "Great host, very welcoming!",
    },
    {
      type: "host",
      evaluation: {
        desMatch: 5,
        locationEval: 4,
        cleanEval: 5,
        serviceEval: 4,
        pricePerformance: 5,
        rating: 4.8,
      },
      toPublic: true,
      sourceUserAvatarUrl: "/path-to-avatar.jpg",
      sourceUserNickname: "John Doe",
      sourceUserLocation: "New York, USA",
      start_date: "2024-12-20",
      end_date: "2024-12-27",
      comment: "非常好的房间，交通便利，很卫生干净！小姐姐回复沟通也特别及时！xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxThis is a test for a super long msg but this is still not long enough ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    },
    {
      type: "host",
      evaluation: {
        desMatch: 5,
        locationEval: 4,
        cleanEval: 5,
        serviceEval: 4,
        pricePerformance: 5,
        rating: 4.8,
      },
      toPublic: true,
      sourceUserAvatarUrl: "/path-to-avatar.jpg",
      sourceUserNickname: "John Doe",
      sourceUserLocation: "New York, USA",
      start_date: "2024-12-20",
      end_date: "2024-12-27",
      comment: "Great host, very welcoming!",
    },
  ];
  // Filter ratings into "from guest" and "from host" categories
  const guestRatings = userReceivedRatings2?.filter(rating => rating.type === 'guest') || [];
  const hostRatings = userReceivedRatings2?.filter(rating => rating.type === 'host') || [];

  



  return (
    <View className="comment-section">
      {/* Top Statistics */}
      <View className="statistics">
        <View className="stat-item">
          <Text className="stat-title">活跃Guest</Text>
          <Text className="stat-info">共借宿4次 | 收到打赏x次</Text>
          <Text className="stat-rate">推荐率 89%</Text>
        </View>
        <View className="stat-divider"></View>
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
        <View className="more">
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
        <View className="more">
          <Text>查看更多</Text>
        </View>
      </View>
    </View>
  );
};

export default UserCommentContent;

