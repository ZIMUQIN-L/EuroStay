import React, { useState, useEffect } from 'react';
import { UserItemProps, UserDetailInfoItemProps } from '@utils/interfaces';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import { RightBottomArrow } from '@utils/cloudIcons';
import GlobalStore from '@store/GlobalStore';

// const UserDetail = () => {
  // const [userInfo, setUserInfo] = useState<UserItemProps>(GlobalStore.userInfo);
  // useEffect(() => {
  //   const globalUserInfo: UserItemProps = GlobalStore.userInfo;
  //   setUserInfo(globalUserInfo);
  //   console.log('User attributes:', globalUserInfo);
  // }, []);



  // const UserDetail: React.FC<UserItemProps> = user => {
  // const [userInfo, setUserInfo] = useState<UserItemProps>(user) ;
  // useEffect(() => {
  //   const userData: UserDetailInfoItemProps = Taro.getStorageSync('userDetail');
  //   if (userData) {
  //     setUserInfo(userData);
  //   }
  //   console.log('User attributes:', user);
  // }, [user]);

  const UserDetail: React.FC= () => {
    const [userInfo, setUserInfo] = useState<UserDetailInfoItemProps | null>(null);
    useEffect(() => {
      const userData: UserDetailInfoItemProps = Taro.getStorageSync('userDetail');
      if (userData) {
        setUserInfo(userData);
      }
      console.log('User attributes:', userData);
    }, []);
    if (!userInfo) {
      return <View>Loading...</View>;
    }


  return (
    <View>
      {/* <View style={{ width: '100%' }}>
        <View className="profile-header">
          <View>
            <Image src={userInfo.avatarUrl} className="avatar-img" />
          </View>
          <View className="user-texts">
            <View className="title">{userInfo.nickName}</View>
          </View>
        </View>
      </View> */}

      <View className="profile-header">
        <Image src={userInfo.avatarUrl} className="profile-image" />
        <View className="info">
          <Text className="profile-name">
          {userInfo.nickName}<Text style={{ color: 'green' }}>实名认证</Text>
          </Text>
          <View className="badges">
            <Text>INTP</Text>
            <Text>意大利米兰</Text>
            <Text>米兰理工大学</Text>
          </View>
          <View className="stats">
            <Text>房东评分: 4.5 颗星</Text>
            <Text>房客评分: 4.6 颗星</Text>
            <Text>获赞与收藏: 100 次</Text>
          </View>
        </View>
      </View>
      <View className="tabs">
        <View className="tab active">概况</View>
        <View className="tab">供宿</View>
        <View className="tab">发帖</View>
      </View>
      <View className="content">
        <View className="section">
          <Text className="section-title">关于她</Text>
          <View className="section-content">
            <Text><strong>兴趣爱好:</strong></Text>
            <Text>游泳, 电影, 滑雪</Text>
          </View>
          <View className="section-content">
            <Text><strong>专业领域:</strong></Text>
            <Text>迭佛鹃即佛卟卟卟卟啊啊; 卟佛; 卟佛了的; jf</Text>
          </View>
          <View className="section-content">
            <Text><strong>fun facts about me:</strong></Text>
            <Text>迭佛鹃即佛卟卟卟卟啊啊; 卟佛; 卟佛了的; jf</Text>
          </View>
          <View className="section-content">
            <Text><strong>我游览过的国家:</strong></Text>
            <Text>迭佛鹃即佛卟卟卟卟啊啊; 卟佛; 卟佛了的; jf</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserDetail;
