import { View, Text } from '@tarojs/components';
import './index.scss';
import {
  PointDetailItemProps,
  UserDetailInfoItemProps,
} from '@utils/interfaces';

interface PointsTableProps {
  pointData: PointDetailItemProps[] | undefined;
}

const PointsTable: React.FC<PointsTableProps> = ({ pointData }) => {
  return (
    <View className='points-table'>
      <View className='table-header'>
        <Text className='header-item'>时间</Text>
        <Text className='header-item'>类型</Text>
        <Text className='header-item'>积分</Text>
        <Text className='header-item'>余额</Text>
      </View>
      {pointData && pointData.length > 0 ? (
        pointData.map((item, index) => (
          <View className='table-row' key={index}>
            <View className='table-cell'>
              <Text className='time'>{item.timestamp}</Text>
            </View>
            <Text className='table-cell'>{item.eventInfo}</Text>
            <Text className='table-cell'>{item.pointChange}</Text>
            <Text className='table-cell'>{item.pointStatus}</Text>
          </View>
        ))
      ) : (
        <View className='no-data'>
          <Text>没有更多数据了</Text>
        </View>
      )}
    </View>
  );
};

export default PointsTable;
