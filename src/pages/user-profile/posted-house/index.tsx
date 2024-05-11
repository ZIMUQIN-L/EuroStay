import { View, Text } from '@tarojs/components';
import { HouseItemProps } from '@utils/interfaces';
import HouseItem from '../house-item';
import './index.scss';

interface PostedHouseProps {
  houseList: HouseItemProps[];
}

const PostedHouse: React.FC<PostedHouseProps> = ({ houseList }) => {
  // 确保 houseList 不为 undefined 或 null
  if (!houseList || houseList.length === 0) {
    return (
      <View className='index no-post-house'>
        <Text>暂无发布房源</Text>
      </View>
    );
  }

  return (
    <View className='index'>
      <Text className='house-info'>发布房源</Text>
      <View className='house-list'>
        {houseList.length > 0 &&
          houseList.map((house, index) => <HouseItem key={index} {...house} />)}
      </View>
    </View>
  );
};

export default PostedHouse;
