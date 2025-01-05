import { View, Text, Button, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import { UserDetailInfoItemProps, UserItemProps } from '@utils/interfaces';
import './index.scss';
import { userInfoSearch } from '@common/database/user/user';
import bell from '@assets/images/bell.svg';
import CustomTabBar from '@components/CustomTabBar';

const TravelDetail = () => {

  const [userDetailInfo, setUserDetailInfo] =
    useState<UserDetailInfoItemProps>();
  const [reviewed, setReviewed] = useState<boolean | null>(null);
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const [itemId, setItemId] = useState<string | null>(null);
  useEffect(() => {

    // 获取 URL 参数
    const params = Taro.getCurrentInstance().router?.params;
    const reviewedParam = params?.reviewed === 'true';
    const isActiveParam = params?.isActive === 'true'; // 将字符串转换为布尔值

    // 设置状态
    setReviewed(reviewedParam);
    setIsActive(isActiveParam);
    console.log("27", params)


    userInfoSearch('op4AH7ZoGt92dlbDy3MD90iIhcOI').then((ownerInfo: UserDetailInfoItemProps[]) => {
      setUserDetailInfo(ownerInfo[0]);
    });
  }, []);

  return (
    <View className="travel-detail">
      {/* Header Section */}
      <View className="header-section">
        <Image
          src="path/to/room-image.jpg" // 替换为实际图片路径
          className="header-image"
        />
      <View className="header-content">
        <View className="text-content">
          <Text className="travel-title">巴黎近地铁小公寓</Text>
          <Text className="travel-location">意大利 · 佛罗伦萨</Text>
          <Text className="travel-dates">7天 · 2024.05.02 - 2024.05.10</Text>
        </View>
        <View className="alert-icon">
          <Image
            src={bell} // 替换为实际警钟图标路径
            className="bell-icon"
          />
        </View>
      </View>
      </View>

      {/* Host Information Section */}
      <View className="host-section">
      <View className="host-info">
        <Text className="hosted-by">Hosted by Nana</Text>
        <View className="contact-host" onClick={() => console.log('Contact Host')}>
          <Text className="contact-text">联系host</Text>
          <Text className="arrow-icon">›</Text>
        </View>
      </View>

      <View className="host-description">
        <View className="profile-header">
          {/* 头像 */}
          <Image
            src={userDetailInfo?.avatarUrl || "/default-avatar.png"}
            className="profile-image"
          />
          {/* 用户信息 */}
          <View className="info">
            {/* 用户名 */}
            <Text className="profile-name">
              {userDetailInfo?.nickName || "未知用户"}
              <Text className="badge">认证</Text>
              <Text className="last-online">5min前在线</Text>
            </Text>

            {/* 徽章 */}
            <View className="badges">
              <Text className="badge-item">⛺ 超级Host</Text>
              <Text className="badge-item">🏠 换宿x次</Text>
              <Text className="badge-item">🏆 活动x次</Text>
              <Text className="badge-item">💰 打赏x次</Text>
            </View>

            {/* 标签 */}
            <View className="tags">
              <Text className="tag-item">西班牙Valencia</Text>
              <Text className="tag-item">INTP</Text>
              <Text className="tag-item">🙋‍♀️ 天蝎座</Text>
              <Text className="tag-item">🌍 环球冒险家</Text>
              <Text className="tag-item">📷 摄影爱好者</Text>
              <Text className="tag-item">👩‍🍳 厨神</Text>
            </View>
          </View>
        </View>
        <View className="divider" />
        {/* 自我介绍 */}
        <View className="self-intro">
          <Text className="intro-quote">
            “Hello，欢迎来瓦伦西亚找我玩，住我家！如果有更长的自我介绍就继续写。。。。”
          </Text>
        </View>

      </View>

      </View>

      <View className="travel-detail-diverse">
      {/* 根据 isActive 和 reviewId 动态渲染内容 */}
      {isActive ? (
        <>
          {/* Agreement Section */}
          <View className="agreement-section">
            <Text className="agreement-title">入住公约</Text>
            <Text className="agreement-details">
              禁止吸烟或宠物，不允许举办聚会和保有安静时间（如22:00 - 8:00）。
            </Text>
          </View>

          {/* Address Section */}
          <View className="address-section">
            <Text className="address-title">详细地址</Text>
            <Text className="address-details">Harmennestet 20地址行 城市，国家</Text>
            <View className="map-placeholder">
              <Image src="path/to/map-image.png" className="map-image" />
            </View>
          </View>
        </>
      ) : reviewed ? (
        <>
          {/* 我的评价板块 */}
          <View className="review-section">
            <Text className="review-title">我的评价</Text>
            <View className="review-card">
              <Text className="review-content">
                非常棒的住宿体验！环境整洁，位置便利，非常推荐！
              </Text>
            </View>
          </View>

          {/* 预定信息板块 */}
          <View className="reservation-section">
            <Text className="reservation-title">预定信息</Text>
            <Text className="reservation-details">
              预定日期：2024-05-01 至 2024-05-07
            </Text>
          </View>
        </>
      ) : (
        <>
          {/* 我的评价板块（按钮） */}
          <View className="review-section">
            <Text className="review-title">我的评价</Text>
            <Button
              className="review-button"
              onClick={() => Taro.navigateTo({ url: `../../packageUser/review-on-house/index?id='itemId'` })}
            >
              还未发布评价, 去评价
            </Button>
          </View>

          {/* 预定信息板块 */}
          <View className="reservation-section">
            <Text className="reservation-title">预定信息</Text>
            <Text className="reservation-details">
              预定日期：2024-05-01 至 2024-05-07
            </Text>
          </View>
        </>
      )}
    </View>

      {/* Contact Section */}
      <View className="contact-section">
        <Text className="contact-title">联系客服</Text>
        <Text className="contact-details">
          请发送邮件至 XXX@XXX.com 联系我们。
        </Text>
      </View>

      <CustomTabBar />
    </View>
  );
};

export default TravelDetail;
