import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import './index.css';

interface TravelCardProps {
  travel: {
    image: string;
    title: string;
    location: string;
    dates: string;
    status: string;
    description: string;
  };
  onClick: () => void;
}

const TravelCard: React.FC<TravelCardProps> = ({ travel, onClick }) => {
  return (
    <View className="travel-card" onClick={onClick}>
      <Image src={travel.image} className="travel-image" />
      <View className="travel-info">
        <Text className="travel-title">{travel.title}</Text>
        <Text className="travel-location">{travel.location}</Text>
        <Text className="travel-dates">{travel.dates}</Text>
        <Text className="travel-status">{travel.status}</Text>
        <Text className="travel-description">{travel.description}</Text>
      </View>
    </View>
  );
};

export default TravelCard;
