import { View, Image, Text } from "@tarojs/components";
import { useState } from "react";
import "./index.scss";

const PropertyReviews = () => {

  const mockProperties = [
    {
      propertyId: 1,
      propertyName: "国家城市·房源名称 1",
      propertyImage: "https://example.com/property1.jpg",
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
    },
    {
      propertyId: 2,
      propertyName: "国家城市·房源名称 2",
      propertyImage: "https://example.com/property2.jpg",
      recommendCount: 92,
      reviews: [
        {
          user: {
            uid: 201,
            username: "丽萨",
            avatar: "https://example.com/avatar4.jpg",
            gender: 2,
            level: 4,
            verifiedId: true,
            verifiedStudent: false,
            tags: "德国 - 柏林",
          },
          recommend: true,
          content: "房间宽敞，采光很好，公共区域干净整洁。",
          hidden: false,
          createTime: "2023-08-10 to 2023-08-15",
        },
        {
          user: {
            uid: 202,
            username: "Carlos",
            avatar: "https://example.com/avatar5.jpg",
            gender: 1,
            level: 2,
            verifiedId: false,
            verifiedStudent: true,
            tags: "西班牙 - 马德里",
          },
          recommend: false,
          content: "位置不错，但房间有点小。",
          hidden: false,
          createTime: "2023-08-10 to 2023-08-15",
        },
      ],
    },
    {
      propertyId: 3,
      propertyName: "国家城市·房源名称 3",
      propertyImage: "https://example.com/property3.jpg",
      recommendCount: 85,
      reviews: [
        {
          user: {
            uid: 301,
            username: "Sophia",
            avatar: "https://example.com/avatar6.jpg",
            gender: 2,
            level: 5,
            verifiedId: true,
            verifiedStudent: false,
            tags: "美国 - 纽约",
          },
          recommend: true,
          content: "非常现代的公寓，设备齐全，入住体验很好。",
          hidden: false,
          createTime: "2023-09-05 to 2023-09-10",
        },
      ],
    },
  ];

  const [selectedProperty, setSelectedProperty] = useState<number>(1);

  return (
    <View className="property-container">
      {/* Property Selection */}
      <View className="house-image-container">
        {mockProperties.map((property) => (
          <View
            key={property.propertyId}
            className={`house-image ${selectedProperty === property.propertyId ? "selected" : ""}`}
            onClick={() => setSelectedProperty(property.propertyId)}
          >
            <Image src={property.propertyImage} className="house-image-img" />
            <Text className="house-label">{property.propertyName}</Text>
          </View>
        ))}
      </View>

      {/* Selected Property Details */}
      <View className="property-header">
        <Text className="recommend-text">
          {mockProperties.find(p => p.propertyId === selectedProperty)?.recommendCount}% 推荐率
        </Text>
        <Text className="property-name">
          {mockProperties.find(p => p.propertyId === selectedProperty)?.propertyName}
        </Text>
      </View>

      {/* Reviews for Selected Property */}
      <Text className="reviews-title">
        {mockProperties.find(p => p.propertyId === selectedProperty)?.reviews.length} 条评价
      </Text>

      {mockProperties.find(p => p.propertyId === selectedProperty)?.reviews.map((review, index) => (
        <View key={index} className="review-card">
          {/* User Info */}
          <View className="review-header">
            <Image src={review.user.avatar} className="review-avatar" />
            <View className="review-info">
              <Text className="review-name">{review.user.username}</Text>
              <Text className="review-location">{review.user.tags}</Text>
            </View>
            <Text className="review-date">{review.createTime}</Text>
          </View>

          {/* Review Content */}
          <Text className="review-text">{review.content}</Text>

          {/* Recommendation Tag */}
          {review.recommend && <Text className="review-badge">推荐</Text>}
        </View>
      ))}
    </View>
  );
};

export default PropertyReviews;

