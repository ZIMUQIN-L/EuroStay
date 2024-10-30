import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import './index.css';
import Taro from '@tarojs/taro';

interface TravelData {
  _id: string;             // 唯一标识符
  image: string;           // 图片路径
  title: string;           // 旅行标题
  location: string;        // 地点
  startDate: string;       // 开始日期
  endDate: string;         // 结束日期
  status: string;          // 状态，如“待评价”，“已完成”
  type: '求宿' | '供宿' | '参与活动';  // 旅行类型
  cost: number;            // 成本
  description: string;     // 描述
  isActive: boolean;       // 是否正在进行
  reviewed: boolean;       // 是否已经发布评价
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
          {/* 根据旅行的状态显示不同按钮 */}
          {travel.type === '供宿' ? (
            <View className="reply-button" onClick={handleReplyClick}>
            回复申请
          </View>
          ) : (
            travel.isActive && (
              <View className="reply-button" onClick={(e) => {
                e.stopPropagation();
                console.log('Continue Activity');
              }}>
                继续活动
              </View>
            )
          )}
          {!travel.isActive && onReview && (
            <View className="reply-button" onClick={(e) => {
              e.stopPropagation();
              onReview(travel._id);
            }}>
              发布评价
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default TravelCard;