import { View, Text, Button, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import './index.scss';
import bell from '@assets/images/bell.svg';
import CustomTabBar from '@components/CustomTabBar';
import GlobalStore from '@store/GlobalStore';

interface TravelDetailData {
  id: number;
  propertyId: number;
  applicationId: number;
  hostInfo: {
    uid: number;
    username: string;
    avatar: string;
    cover: string;
    gender: number;
    tags: string[];
    genderStr: string;
    mbti: string;
    aboutMe: string;
  };
  guestInfo: {
    uid: number;
    username: string;
    avatar: string;
    cover: string;
    gender: number;
    tags: string[];
    genderStr: string;
    mbti: string;
    aboutMe: string;
  };
  startDate: string;
  endDate: string;
  title: string;
  cover: string;
  status: number;
  costedCoins: number;
  location: string;
  agreement: string | null;
}

const TravelDetail = () => {
  const [travelDetail, setTravelDetail] = useState<TravelDetailData | null>(null);
  const [reviewed, setReviewed] = useState<boolean | null>(null);
  const [isActive, setIsActive] = useState<boolean | null>(null);

  useEffect(() => {
    const params = Taro.getCurrentInstance().router?.params;
    const id = params?.id;
    const reviewedParam = params?.reviewed === 'true';
    const isActiveParam = params?.isActive === 'true';

    setReviewed(reviewedParam);
    setIsActive(isActiveParam);

    // 获取详情数据
    const fetchTravelDetail = async () => {
      try {
        const res = await Taro.request({
          url: `https://api.eurostay.co/app/esuser/myTravelInfo`,
          method: 'POST',
          data: {
            id: id,
            type: 0,
          },
          header: {
            'Content-Type': 'application/json',
            token: GlobalStore.userInfo.token,
          },
        });
        console.log(res);
        if (res.statusCode === 200) {
          setTravelDetail(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch travel detail:', error);
      }
    };

    if (id) {
      fetchTravelDetail();
    }
  }, []);

  if (!travelDetail) {
    return <View>Loading...</View>;
  }

  // 计算天数
  const calculateDuration = () => {
    const start = new Date(travelDetail.startDate);
    const end = new Date(travelDetail.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays}天`;
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    return dateString.split(' ')[0];
  };

  return (
    <View className="travel-detail">
      <View className="header-section">
        <Image
          src={travelDetail.cover}
          className="header-image"
        />
        <View className="header-content">
          <View className="text-content">
            <Text className="travel-title">{travelDetail.title}</Text>
            <Text className="travel-location">{travelDetail.location}</Text>
            <Text className="travel-dates">
              {calculateDuration()} · {formatDate(travelDetail.startDate)} - {formatDate(travelDetail.endDate)}
            </Text>
          </View>
          <View className="alert-icon">
            <Image src={bell} className="bell-icon" />
          </View>
        </View>
      </View>

      <View className="host-section">
        <View className="host-info">
          <Text className="hosted-by">Hosted by {travelDetail.hostInfo.username}</Text>
          <View className="contact-host" onClick={() => console.log('Contact Host')}>
            <Text className="contact-text">联系host</Text>
            <Text className="arrow-icon">›</Text>
          </View>
        </View>

        <View className="host-description">
          <View className="profile-header">
            <Image
              className="profile-image"
              src={travelDetail.hostInfo.avatar}
              mode="aspectFill"
            />
            <View className="profile-info">
              <Text className="profile-name">{travelDetail.hostInfo.username}</Text>
              <View className="badges">
                <Text className="badge-item">⛺ 超级Host</Text>
                <Text className="badge-item">🏠 换宿x次</Text>
                <Text className="badge-item">🏆 活动x次</Text>
                <Text className="badge-item">💰 打赏x次</Text>
              </View>
              <View className="tags">
                {travelDetail.hostInfo.tags.map((tag, index) => (
                  <Text key={index} className="tag-item">{tag}</Text>
                ))}
                <Text className="tag-item">{travelDetail.hostInfo.mbti}</Text>
                <Text className="tag-item">{travelDetail.hostInfo.genderStr}</Text>
              </View>
            </View>
          </View>

          <View className="divider" />
          <View className="self-intro">
            <Text className="intro-quote">"{travelDetail.hostInfo.aboutMe}"</Text>
          </View>
        </View>
      </View>

      {/* 其他部分的条件渲染保持不变 */}
      {isActive ? (
        <>
          <View className="agreement-section">
            <Text className="agreement-title">入住公约</Text>
            <Text className="agreement-details">
              {travelDetail.agreement || '暂无入住公约'}
            </Text>
          </View>
        </>
      ) : reviewed ? (
        <>
          <View className="review-section">
            <Text className="review-title">我的评价</Text>
            <View className="review-card">
              <Text className="review-content">
                非常棒的住宿体验！环境整洁，位置便利，非常推荐！
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <View className="review-section">
            <Text className="review-title">我的评价</Text>
            <Button
              className="review-button"
              onClick={() => Taro.navigateTo({ 
                url: `/packageUser/review-on-house/index?id=${travelDetail.propertyId}` 
              })}
            >
              还未发布评价, 去评价
            </Button>
          </View>
        </>
      )}

      <View className="reservation-section">
        <Text className="reservation-title">预定信息</Text>
        <Text className="reservation-details">
          预定日期：{formatDate(travelDetail.startDate)} 至 {formatDate(travelDetail.endDate)}
        </Text>
      </View>

      <CustomTabBar />
    </View>
  );
};

export default TravelDetail;
