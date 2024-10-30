import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import './index.scss';
import Taro from '@tarojs/taro';
import PointsInfo from './points-info';
import { UserDetailInfoItemProps } from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import React, { useState, useEffect } from 'react';
import { userInfoSearch } from '@common/database/user/user';

const EarnMoreCoins = () => {
  const tasks = [
    { title: '填写特色profile', description: '填写特色个人档案，可以获得15旅行币！' },
    { title: '完善房源信息', description: '完善房源信息，可以获得15旅行币！' },
    { title: '完成安全认证', description: '认证房屋所有人和个人身份，可以获得20旅行币！' },
    { title: '邀请好友', description: '邀请好友注册平台，可以获得10旅行币！\n好友完善房源，你可获得15旅行币！' },
    { title: '完成换宿并评价', description: '每次换宿后的评价，可以为你带来5旅行币的收益！' },
  ];

  return (
    <View className='earn-coins'>
      <View className='header'>
        <Text className='title'>获取更多旅行币</Text>
        <Text className='link' onClick={() => Taro.navigateTo({ url: '/pages/coin-rules/index' })}>
          旅行币规则 &gt;
        </Text>
      </View>
      <View className='task-list'>
        {tasks.map((task, index) => (
          <View key={index} className='task-item'>
            <Text className='task-title'>{task.title}</Text>
            <Text className='task-description'>{task.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const Index = () => {
  const [currentUser, setCurrentUser] = useState<UserDetailInfoItemProps>();

  useEffect(() => {
    userInfoSearch(GlobalStore.userInfo._openid).then(
      (ownerInfo: UserDetailInfoItemProps[]) => {
        setCurrentUser(ownerInfo[0]);
      }
    );
  }, []);

  Taro.useShareAppMessage(() => {
    return {
      title: 'EuroStay欧洲换宿',
      path: '/pages/login/index',
    };
  });

  return (
    <View className='points'>
      <PointsInfo Detail={false} currentUserDetail={currentUser} />
      <EarnMoreCoins />
    </View>
  );
};

export default observer(Index);