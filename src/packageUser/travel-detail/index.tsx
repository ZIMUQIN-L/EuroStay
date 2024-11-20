import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

const TravelDetail = () => {
  return (
    <View className="travel-detail">
      {/* Header Section */}
      <View className="header-section">
        <View className="header-content">
          <View className="travel-title">佛罗伦萨 xxx 房</View>
          <View className="travel-info">
            <Text className="travel-location">意大利 · 佛罗伦萨</Text>
            <Text className="travel-dates">2024.05.02 - 2024.05.10</Text>
            <Text className="travel-cost">8 晚 · XXX 旅行币</Text>
          </View>
        </View>
      </View>

      {/* Timeline Section */}
      <View className="timeline-section">
        <View className="timeline-item">
          <Text className="timeline-status">已申请</Text>
          <Text className="timeline-date">2024.04.02</Text>
        </View>
        <View className="timeline-item">
          <Text className="timeline-status">等待入住</Text>
          <Text className="timeline-date">2024.04.02</Text>
          <Text className="timeline-note">房东微信：xxxxxxxx</Text>
        </View>
        <View className="timeline-item">
          <Text className="timeline-status">已入住</Text>
          <Text className="timeline-date">2024.04.02</Text>
          <View className="action-buttons">
            <Button className="emergency-btn">紧急联络平台</Button>
            <Button className="complaint-btn">人工申诉</Button>
          </View>
        </View>
        <View className="timeline-item">
          <Text className="timeline-status">待评价</Text>
          <Text className="timeline-date">2024.04.02</Text>
          <Button
            className="review-btn" 
            onClick={() => Taro.navigateTo({ url: '/packageUser/review-on-house/index' })}
          >
            前往评价
          </Button>
        </View>
        <View className="timeline-item">
          <Text className="timeline-status">交易完成</Text>
          <Text className="timeline-date">2024.04.02</Text>
        </View>
      </View>
    </View>
  );
};

export default TravelDetail;
