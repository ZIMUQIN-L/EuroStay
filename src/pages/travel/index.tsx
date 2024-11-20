import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import TravelCard from '@components/TravelCard';
import './index.scss';
import Taro from '@tarojs/taro';
import CustomTabBar from '@components/CustomTabBar';

const TravelPage: React.FC = () => {
  const [travels, setTravels] = useState<TravelData[]>([]);
  const [activeTab, setActiveTab] = useState<'待处理' | '已结束'>('待处理'); // Active tab state

  useEffect(() => {
    // Simulate data fetching
    const fetchTravels = async () => {
      const data: TravelData[] = [
        {
          _id: '1',
          type: '求宿',
          image: 'path/to/image1.jpg',
          title: '米兰之旅',
          location: '米兰',
          startDate: '2024-10-20',
          endDate: '2024-10-22',
          status: '待评价',
          cost: 500,
          description: '享受意大利风情。',
          isActive: true,
          reviewed: false
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
          isActive: false,
          reviewed: false
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
          isActive: true,
          reviewed: false
        },
      ];
      setTravels(data);
    };

    fetchTravels();
  }, []);

  const filteredTravels =
    activeTab === '待处理'
      ? travels.filter(travel => travel.isActive)
      : travels.filter(travel => !travel.isActive);

  const handleTabSwitch = (tab: '待处理' | '已结束') => {
    setActiveTab(tab);
  };

  const handleReview = (id: string) => {
    Taro.navigateTo({
      url: `../../packageUser/review-on-house/index?id=${id}`,
    });
  };

  const navigateToDetail = (id: string) => {
    console.log('Navigating to detail of travel ID:', id);
  };

  return (
    <View className="travel-page">
      <View className="tabs">
        <View
          className={`tab ${activeTab === '待处理' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('待处理')}
        >
          待处理
        </View>
        <View
          className={`tab ${activeTab === '已结束' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('已结束')}
        >
          已结束
        </View>
      </View>
      <View className="travel-cards">
        {filteredTravels.map(travel => (
          <TravelCard
            key={travel._id}
            travel={travel}
            onClick={() => navigateToDetail(travel._id)}
            onReview={travel.isActive ? undefined : handleReview}
          />
        ))}
      </View>
      <CustomTabBar />
    </View>
  );
};

export default TravelPage;
