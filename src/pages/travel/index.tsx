import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import TravelCard from '@components/TravelCard';
import './index.scss';
import Taro from '@tarojs/taro';
import CustomTabBar from '@components/CustomTabBar';

const TravelPage: React.FC = () => {
  const [travels, setTravels] = useState<TravelData[]>([]);

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
          reviewed: false,
          hostname: '意大利风情小屋', // 新增字段：主办方
          duration: '2天',
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
          reviewed: false,
          hostname: '罗马遗迹之家', // 新增字段：主办方
          duration: '2天',
        },
        {
          _id: '3',
          type: '活动',
          image: 'path/to/image3.jpg',
          title: '威尼斯狂欢节',
          location: '威尼斯',
          startDate: '2024-02-10',
          endDate: '2024-02-12',
          status: '进行中',
          cost: 200,
          description: '参与盛大的狂欢节庆典。',
          isActive: false,
          reviewed: true,
          hostname: '威尼斯狂欢活动组', // 新增字段：主办方
          duration: '2天'
        },
        {
          _id: '4',
          type: '活动',
          image: 'path/to/image3.jpg',
          title: '威d尼斯狂欢节',
          location: '威d尼斯',
          startDate: '2024-02-10',
          endDate: '2024-02-12',
          status: '进行中',
          cost: 200,
          description: '参与盛节庆典。',
          isActive: true,
          reviewed: true,
          hostname: '威尼', // 新增字段：主办方
          duration: '2天'
        },
      ];
      setTravels(data);
    };

    fetchTravels();
  }, []);
  console.log('Travels:', travels);
  const handleReview = (id: string) => {
    Taro.navigateTo({
      url: `../../packageUser/review-on-house/index?id=${id}`,
    });
  };

  const navigateToDetail = (id: string, reviewed: string, isActive: boolean) => {
    if (reviewed) {
      Taro.navigateTo({
        url: `/packageUser/travel-detail/index?id=${id}&reviewed=${reviewed}&isActive=${isActive}`, // 替换为目标页面的路径
      });
    } else {
      Taro.navigateTo({
        url: `/packageUser/travel-detail/index?id=${id}&isActive=${isActive}`, // 替换为目标页面的路径
      });
    }
  };

  return (
    <View className="travel-page">
      {/* 待处理部分 */}
      <View className="travel-section">
        <View className="section-title">我将要去</View>
        <View className="travel-cards">
          {travels
            .filter(travel => travel.isActive)
            .map(travel => (
              <TravelCard
                key={travel._id}
                travel={travel}
                onClick={() => navigateToDetail(travel._id, travel.reviewed, travel.isActive)}
              />
            ))}
        </View>
      </View>

      {/* 已结束部分 */}
      <View className="travel-section">
        <View className="section-title">我已经去过</View>
        <View className="travel-cards">
          {/*  还没有 reviewed 的部分 */}
          {travels
            .filter(travel => !travel.isActive && !travel.reviewed)
            .map(travel => (
              <TravelCard
                key={travel._id}
                travel={travel}
                onClick={() => navigateToDetail(travel._id, travel.reviewed, travel.isActive)}
                onReview={() => handleReview(travel._id)}
              />
            ))}

          {/* 被 reviewed 的部分 */}
          {travels
            .filter(travel => !travel.isActive && travel.reviewed)
            .map(travel => (
              <TravelCard
                key={travel._id}
                travel={travel}
                onClick={() => navigateToDetail(travel._id, travel.reviewed, travel.isActive)}
              />
            ))}
        </View>
      </View>

      <CustomTabBar />
    </View>
  );
};

export default TravelPage;
