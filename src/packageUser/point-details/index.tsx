import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import PointsInfo from '../my-points/points-info';
import './index.scss';
import PointsTable from './points-table';
import { useState } from 'react';

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
]

const Index = () => {

  const [pointsData, setPointsData] = useState(demoData);

  return (
    <View className='point-details'>
      <PointsInfo Detail={true} />

      <PointsTable data={demoData} />
    </View>
  );
};

export default observer(Index);
