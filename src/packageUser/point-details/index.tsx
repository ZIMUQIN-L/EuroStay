import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import PointsInfo from '../my-points/points-info';
import './index.scss';
import PointsTable from './points-table';
import React, { useState, useEffect } from 'react';
import { userInfoSearch } from '@common/database/user/user';
import GlobalStore from '@store/GlobalStore';
import { pointDetailSearch } from '@common/database/pointSystem/pointSystem';
import {
  PointDetailItemProps,
  UserDetailInfoItemProps,
} from '@utils/interfaces';

const demoData = [
  {
    date: '2024-06-30',
    time: '10:44:44',
    type: '发布房源',
    points: 10,
    balance: 35,
  },
  {
    date: '2024-06-30',
    time: '19:32:12',
    type: '完善个人信息',
    points: 5,
    balance: 30,
  },
  {
    date: '2024-06-30',
    time: '19:31:00',
    type: '完善个人信息',
    points: 5,
    balance: 25,
  },
];

const Index = () => {
  const [currentUser, setCurrentUser] = useState<UserDetailInfoItemProps>();

  useEffect(() => {
    userInfoSearch(GlobalStore.userInfo._openid).then(
      (ownerInfo: UserDetailInfoItemProps[]) => {
        setCurrentUser(ownerInfo[0]);
      },
    );
    pointDetailSearch(GlobalStore.userInfo._openid).then(
      (res: PointDetailItemProps[]) => {
        setPointsData(res);
      },
    );
  }, []);

  const [pointsData, setPointsData] = useState<PointDetailItemProps[]>();

  return (
    <View className='point-details'>
      <PointsInfo Detail={true} currentUserDetail={currentUser} />

      <PointsTable pointData={pointsData} />
    </View>
  );
};

export default observer(Index);
