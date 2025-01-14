import { View, Text, Image, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "玉兰花",
    location: "意大利 - 米兰",
    date: "2023-07-02 to 2023-07-07",
    text: "非常好的房间，交通便利，很卫生干净！小姐姐回复沟通也特别及时！",
    recommended: true,
    avatar: "https://example.com/avatar1.jpg",
  },
  {
    id: 2,
    name: "Andre",
    location: "法国 - 巴黎",
    date: "2023-07-02 to 2023-07-07",
    text: "离超市和交通枢纽很近！很棒的一次旅程！",
    recommended: true,
    avatar: "https://example.com/avatar2.jpg",
  },
  {
    id: 3,
    name: "跳跳糖",
    location: "荷兰 - 代尔夫特",
    date: "2023-07-02 to 2023-07-07",
    text: "卫生间条件一般。",
    recommended: false,
    avatar: "https://example.com/avatar3.jpg",
  },
];

const Reviews = () => {
  // const [expanded, setExpanded] = useState({});

  // const toggleExpand = (id) => {
  //   setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  // };

  // const handleViewMore = () => {
  //   Taro.navigateTo({
  //     url: "/packageUser/host-view-more/index",
  //   });
  // };

  return (
    <View className="reviews-container">
      <Text className="reviews-header">102条评价</Text>

      {/* {reviews.map((review) => (
        <View key={review.id} className="review-card">
          <View className="review-header">
            <Image src={review.avatar} className="review-avatar" />
            <View className="review-info">
              <Text className="review-name">{review.name}</Text>
              <Text className="review-location">{review.location}</Text>
            </View>
            <Text className="review-date">{review.date}</Text>
          </View>

          <Text className="review-text">
            {expanded[review.id] ? review.text : review.text.slice(0, 50) + "..."}
          </Text>
          <Text className="read-more" onClick={() => toggleExpand(review.id)}>
            {expanded[review.id] ? "收起" : "查看全部"}
          </Text>

          {review.recommended && <Text className="review-badge">推荐</Text>}
        </View>
      ))}

      <Button className="view-more-btn" onClick={handleViewMore}>
        查看更多
      </Button> */}
    </View>
  );
};

export default Reviews;
