// src/pages/travel/index.tsx
import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import TravelCard from '@components/TravelCard';
import './index.scss';

interface TravelData {
  image: string;
  title: string;
  location: string;
  dates: string;
  status: string;
  description: string;
  _id: string;
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
          image: 'path/to/image1.jpg',
          title: '米兰之旅',
          location: '米兰',
          dates: '2024-10-20 to 2024-10-22',
          status: '待评价',
          description: '享受意大利风情。',
        },
        // 其他数据...
      ];
      setTravels(data);
    };

    fetchTravels();
  }, []);

  const navigateToDetail = (id: string) => {
    // 跳转到详情页面
    // 例如使用 Taro 的 navigateTo 或其他路由方式
    console.log('Navigating to detail of travel ID:', id);
  };

  return (
    <View className="travel-page">
      <View className="travel-cards">
        {travels.map((travel) => (
          <TravelCard
            key={travel._id}
            travel={travel}
            onClick={() => navigateToDetail(travel._id)}
          />
        ))}
      </View>
    </View>
  );
};

export default TravelPage;
