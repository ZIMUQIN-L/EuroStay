import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import './index.css';
import Taro from '@tarojs/taro';
import bell from '@assets/images/bell.svg'
// import axios from 'axios';


interface TravelData {
  _id: string;             // 唯一标识符
  image: string;           // 图片路径
  title: string;           // 旅行标题
  location: string;        // 地点
  startDate: string;       // 开始日期
  endDate: string;         // 结束日期
  status: string;          // 状态，如“待评价”，“已完成”
  type: '求宿' | '供宿' | '活动';  // 旅行类型
  cost: number;            // 成本
  description: string;     // 描述
  isActive: boolean;       // 是否正在进行
  reviewed: boolean;       // 是否已经发布评价
  duration: string;
  hostname: string;
}

interface TravelCardProps {
  travel: TravelData;
  onClick: () => void;  // 这是跳转到详情页的通用点击事件
  onReview?: (id: string) => void;  // 新增，用于处理评价逻辑
}

const TravelCard: React.FC<TravelCardProps> = ({ travel, onClick, onReview }) => {
const [imageLoaded, setImageLoaded] = useState(true);

const handleReplyClick = (e) => {
  e.stopPropagation();  // 防止事件冒泡到卡片点击事件
  Taro.navigateTo({
    url: '/packageHouse/house-application-submission/index'
  });
};

const calculateProgress = () => {
  return 40;
};

const progress = calculateProgress();

  return (
    <View className="card" onClick={onClick}>

      {/* 主体内容 */}
      <View className="main-content">
        {/* 图片部分 */}
        <View className="image-section">
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
        {/* 左侧区域 */}
        <View className="left-section">
          <View className="content">
            <View className="header">
              <Text className="title">{`${travel.title}房`}</Text>
              <Text className="hostname">{`Hosted by ${travel.hostname}`}</Text>
            </View>
            <View className="column">
              <Text className="details">{`${travel.duration}, ${travel.startDate} - ${travel.endDate}`}</Text>
              <Text className="cost">{`${travel.location}`}</Text>
            </View>
          </View>
        </View>

        {/* 右侧区域 */}
        <View className="right-section">
          <Text className="type-pill">{travel.type}</Text>
          {!travel.isActive && onReview && (
            <View
              className="reply-button"
              onClick={(e) => {
                e.stopPropagation();
                onReview(travel._id);
              }}
            >
              <Text className="reply-text">去评价</Text>
              <Text className="arrow-icon">></Text>
            </View>
          )}

          {travel.isActive && (
            <View
              className="reply-button"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Continue Activity');
              }}
            >
            <View className="bell-container">
              <Image
                src={bell}
                style={{ width: '20px', height: '20px' }}
              />
            </View>
            </View>
          )}

        </View>
      </View>
    </View>
  );
};

export default TravelCard;