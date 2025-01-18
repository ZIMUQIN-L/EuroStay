import { View, Image, Text } from "@tarojs/components";
import { useState } from "react";
import "./index.scss";

const GuestReviews = () => {

  const mockProperties = {
      recommendCount: 89,
      reviews: [
        {
          user: {
            uid: 101,
            username: "玉兰花",
            avatar: "https://example.com/avatar1.jpg",
            gender: 2,
            level: 3,
            verifiedId: true,
            verifiedStudent: false,
            tags: "意大利 - 米兰",
          },
          recommend: true,
          content: "非常好的房间，交通便利，很卫生干净！小姐姐回复沟通也特别及时！",
          hidden: false,
          createTime: "2023-07-02 to 2023-07-07",
        },
        {
          user: {
            uid: 102,
            username: "Andre",
            avatar: "https://example.com/avatar2.jpg",
            gender: 1,
            level: 2,
            verifiedId: true,
            verifiedStudent: true,
            tags: "法国 - 巴黎",
          },
          recommend: true,
          content: "离超市和交通枢纽很近！很棒的一次旅程！",
          hidden: false,
          createTime: "2023-07-02 to 2023-07-07",
        },
      ],
    };

  return (
    <View className="property-container">


      {/* Selected Property Details */}
      <View className="property-header">
        <Text className="recommend-text">
          {mockProperties.recommendCount}% 推荐率
        </Text>
      </View>

      {/* Reviews for Selected Property */}
      <Text className="reviews-title">
        {mockProperties.reviews.length} 条评价
      </Text>

      {mockProperties.reviews.map((review, index) => (
        <View key={index} className="review-card">
          {/* User Info */}
          <View className="review-header">
            <View className="review-profile">
              <Image src={review.user.avatar} className="review-avatar" />
              <View className="review-info">
                <Text className="review-name">{review.user.username}</Text>
                <Text className="review-location">{review.user.tags}</Text>
              </View>
            </View>
            <View className="recommandation-date">
              {review.recommend && <Text className="review-badge">推荐</Text>}
              <Text className="review-date">{review.createTime}</Text>
            </View>
          </View>

          {/* Review Content */}
          <Text className="review-text">{review.content}</Text>
          
        </View>
      ))}
    </View>
  );
};

export default GuestReviews;