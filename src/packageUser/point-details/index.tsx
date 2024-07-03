import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import PointsInfo  from '../my-points/points-info';
import './index.scss';
import PointsTable from './points-table';

const Index = () => {
  return (
    <View className='point-details'>
      <PointsInfo Detail={true} />

      <View className='points-data'>
      <PointsTable data={[]} />
      </View>
    </View>
  );
};

export default observer(Index);
