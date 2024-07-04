import { View, Text } from '@tarojs/components';
import './index.scss';

const PointsTable = ({ data }) => {
  return (
    <View className='points-table'>
      <View className='table-header'>
        <Text className='header-item'>时间</Text>
        <Text className='header-item'>类型</Text>
        <Text className='header-item'>积分</Text>
        <Text className='header-item'>余额</Text>
      </View>
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <View className='table-row' key={index}>
            <View className='table-cell'>
              {item.date}
              <Text className='time'>{item.time}</Text>
            </View>
            <Text className='table-cell'>{item.type}</Text>
            <Text className='table-cell'>{item.points}</Text>
            <Text className='table-cell'>{item.balance}</Text>
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
