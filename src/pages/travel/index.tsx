// src/pages/travel/index.tsx
import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import TravelCard from '@components/TravelCard';
import './index.scss';

interface TravelData {
  image: string;
  title: string;
  location: string;
  startDate: string; // 开始时间
  endDate: string; // 结束时间
  status: string; // 状态
  description: string;
  _id: string;
  type: '求宿' | '供宿' | '参与活动'; // 类型
  cost: number; // 成本
  isActive: boolean; // 是否正在进行
}

const TravelPage: React.FC = () => {
  const [travels, setTravels] = useState<TravelData[]>([]);

  useEffect(() => {
    // 这里可以调用 API 或数据库获取 travel 数据
    const fetchTravels = async () => {
      // 模拟数据获取
      const data: TravelData[] = [
        {
          _id: '1',
          type: '求宿', // 类型: 求宿、供宿、参与活动
          image: 'path/to/image1.jpg',
          title: '米兰之旅',
          location: '米兰',
          startDate: '2024-10-20', // 开始时间
          endDate: '2024-10-22', // 结束时间
          status: '待评价', // 状态
          cost: 500, // 成本
          description: '享受意大利风情。',
          isActive: true
        },
        {
          _id: '2',
          type: '供宿',
          image: 'path/to/image2.jpg',
          title: '罗马之旅',
          location: '罗马',
          startDate: '2024-11-01',
          endDate: '2024-11-05',
          status: '已完成',
          cost: 300,
          description: '体验古罗马的魅力。',
          isActive: true
        },
        {
          _id: '3',
          type: '参与活动',
          image: 'path/to/image3.jpg',
          title: '威尼斯狂欢节',
          location: '威尼斯',
          startDate: '2024-02-10',
          endDate: '2024-02-12',
          status: '进行中',
          cost: 200,
          description: '参与盛大的狂欢节庆典。',
          isActive: false
        },
        // 其他数据...
      ];
      setTravels(data);
    };

    fetchTravels();
  }, []);

  const ongoingTravels = travels.filter(travel => travel.isActive);
  const historicalTravels = travels.filter(travel => !travel.isActive);


  const navigateToDetail = (id: string) => {
    // 跳转到详情页面
    // 例如使用 Taro 的 navigateTo 或其他路由方式
    console.log('Navigating to detail of travel ID:', id);
  };

  return (
    <View className="travel-page">
      <View className="ongoing-section">
      <View className="section-container">
        正在进行
      </View>

        <View className="travel-cards">
          {ongoingTravels.map(travel => (
            <TravelCard
              key={travel._id}
              travel={travel}
              onClick={() => navigateToDetail(travel._id)}
            />
          ))}
        </View>
      </View>
      <View className="historical-section">
      <View className="section-container">
        历史记录
      </View>
        <View className="travel-cards">
          {historicalTravels.map(travel => (
            <TravelCard
              key={travel._id}
              travel={travel}
              onClick={() => navigateToDetail(travel._id)}
            />
          ))}
        </View>
      </View>
    </View>

  );
};

export default TravelPage;
