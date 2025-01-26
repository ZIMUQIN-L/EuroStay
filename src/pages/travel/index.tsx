import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import TravelCard from '@components/TravelCard';
import './index.scss';
import Taro from '@tarojs/taro';
import CustomTabBar from '@components/CustomTabBar';
import GlobalStore from '@store/GlobalStore';

interface TravelData {
  _id: string;
  type: string;
  image: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
  cost: number;
  isActive: boolean;
  reviewed: boolean;
  hostname: string;
  duration: string;
}

const TravelPage: React.FC = () => {
  const [travels, setTravels] = useState<TravelData[]>([]);

  // 添加日期处理函数
  const formatDate = (dateString: string) => {
    return dateString.split(' ')[0];
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays}天`;
  };

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const res = await Taro.request({
          url: 'https://api.eurostay.co/app/esuser/myGuestList?page=1',
          method: 'POST',
          data: {},
          header: {
            'Content-Type': 'application/json',
            token: GlobalStore.userInfo.token,
          },
        });

        if (res.statusCode === 200 && res.data.code === 0) {
          const transformedData = res.data.result.data.map(item => ({
            _id: item.id.toString(),
            type: '房源', 
            image: item.cover,
            title: item.title,
            location: item.location || '',
            startDate: formatDate(item.startDate),
            endDate: formatDate(item.endDate),
            status: item.status === 1 ? '进行中' : 
                   item.status === 2 ? '已完成' : '已评价',
            cost: item.costedCoins,
            isActive: item.status === 1,
            reviewed: item.status === 3,
            hostname: item.hostInfo.username,
            duration: calculateDuration(item.startDate, item.endDate)
          }));

          setTravels(transformedData);
        }
      } catch (error) {
        console.error('Failed to fetch travel list:', error);
      }
    };

    fetchTravels();
  }, []);

  const handleReview = (id: string) => {
    Taro.navigateTo({
      url: `../../packageUser/review-on-house/index?id=${id}`,
    });
  };

  const navigateToDetail = (id: string, reviewed: boolean, isActive: boolean) => {
    if (reviewed) {
      Taro.navigateTo({
        url: `/packageUser/travel-detail/index?id=${id}&reviewed=${reviewed}&isActive=${isActive}`,
      });
    } else {
      Taro.navigateTo({
        url: `/packageUser/travel-detail/index?id=${id}&isActive=${isActive}`,
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
