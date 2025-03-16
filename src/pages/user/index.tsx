import { View, Image, Text } from '@tarojs/components';
import { useEffect, useState } from 'react';
import HouseCard, { mockHouseData, mockActivityData } from '../../components/HouseCard';
import ReviewCard, { mockReviewData } from '../../components/ReviewCard';
import './index.scss';

interface UserShortInfo {
  uid: number;
  username: string;
  avatar: string;
  backgroundPic: string;
  tags: string[];
  location: string;
  aboutMe: string;
  isVip: boolean;
}

// 模拟数据
const mockUserData: UserShortInfo = {
  uid: 125,
  username: "我是一条想飞的鱼",
  avatar: "https://placekitten.com/200/200",
  backgroundPic: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
  tags: ["ENFP", "游戏", "美食"],
  location: "德国柏林",
  aboutMe: "大家好～我是想飞的鱼！\n喜欢美食、旅游、钢琴\n欢迎大家来我家做客！！",
  isVip: true
};

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<UserShortInfo | null>(null);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    // 模拟API调用
    const fetchUserInfo = async () => {
      try {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500));
        setUserInfo(mockUserData);
      } catch (error) {
        console.error('获取用户信息失败:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSettingClick = (id: number) => {
    console.log('点击设置按钮:', id);
  };

  if (!userInfo) {
    return <View className="loading">加载中...</View>;
  }

  return (
    <View className="user-profile">
      <Image className="background-image" src={userInfo.backgroundPic} mode="aspectFill" />
      <View className="user-info">
        <View className="basic-info">
          <Image className="avatar" src={userInfo.avatar} mode="aspectFit" />
          <View className="user-meta">
            <View className="username-container">
              <Text className="username">{userInfo.username}</Text>
              {userInfo.isVip && <View className="vip-badge">VIP</View>}
            </View>
            <Text className="user-id">账号：{String(userInfo.uid).padStart(5, '0')}</Text>
            <Text className="location">地区：{userInfo.location}</Text>
          </View>
        </View>
        <View className="user-details">
          <Text className="about-me">{userInfo.aboutMe}</Text>
          <View className="tags">
            {userInfo.tags.map((tag, index) => (
              <Text key={index} className="tag">{tag}</Text>
            ))}
          </View>
        </View>
      </View>
      
      <View className="tabs">
        <View 
          className={`tab-item ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <Text>我发布的</Text>
          {activeTab === 'posts' && <View className="tab-line" />}
        </View>
        <View 
          className={`tab-item ${activeTab === 'participated' ? 'active' : ''}`}
          onClick={() => setActiveTab('participated')}
        >
          <Text>我参与的</Text>
          {activeTab === 'participated' && <View className="tab-line" />}
        </View>
        <View 
          className={`tab-item ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          <Text>评价</Text>
          {activeTab === 'reviews' && <View className="tab-line" />}
        </View>
      </View>
      
      <View className="tab-content">
        {activeTab === 'posts' && (
          <View className="posts-list">
            {[...mockHouseData, ...mockActivityData].map(item => (
              <HouseCard
                key={item.id}
                images={item.images}
                title={item.title}
                availableDate={item.availableDate}
                price={item.price}
                currency={(item.currency as '€' | '$' | '¥') || '€'}
                location={item.location}
                mode="posted"
                onSettingClick={() => handleSettingClick(item.id)}
              />
            ))}
          </View>
        )}
        {activeTab === 'participated' && (
          <View className="participated-list">
            {mockActivityData.map(item => (
              <HouseCard
                key={item.id}
                images={item.images}
                title={item.title}
                availableDate={item.availableDate}
                price={item.price}
                currency={(item.currency as '€' | '$' | '¥') || '€'}
                location={item.location}
                mode="participated"
                onFavoriteClick={() => console.log('收藏', item.id)}
              />
            ))}
          </View>
        )}
        {activeTab === 'reviews' && (
          <View className="reviews-list">
            {mockReviewData.map(item => (
              <ReviewCard
                key={item.id}
                userAvatar={item.userAvatar}
                userName={item.userName}
                userType={item.userType}
                isRecommended={item.isRecommended}
                reviewContent={item.reviewContent}
                images={item.images}
                reviewDate={item.reviewDate}
                location={item.location}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default UserProfile;
