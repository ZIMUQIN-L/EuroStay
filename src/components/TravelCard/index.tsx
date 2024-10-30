import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import './index.css';

interface TravelCardProps {
  travel: {
    image: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    status: string;
    type: '求宿' | '供宿' | '参与活动';
    cost: number;
    description: string;
  };
  onClick: () => void;
}

const TravelCard: React.FC<TravelCardProps> = ({ travel, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
<View className="card" onClick={onClick}>
  <View className="main-content">
    <View className="image-container">
      {travel.image && imageLoaded ? (
        <Image
          src={travel.image}
          className="image-style"
          onError={() => setImageLoaded(false)}
        />
      ) : (
        <View className="image-fallback" />
      )}
    </View>
    <View className="content">
      <View className="header">
        <Text className="title">{`${travel.title}房`}</Text>
        <Text className="type">{travel.type}</Text>
      </View>
      <Text className="details">{`日期：${travel.startDate} 至 ${travel.endDate}`}</Text>
      <Text className="cost">{`成本：${travel.cost}旅行币`}</Text>
      <Text className="status">{`状态：${travel.status}`}</Text>
      <View className="reply-button">回复申请</View>
    </View>
  </View>
  <View className="communication">
    <Text className="communication-info">{`2024-10-19 18:11 由你发起的沟通`}</Text>
  </View>
</View>

  );
};

export default TravelCard;
