import { observer } from 'mobx-react';
import { DefaultHouse } from '@utils/cloudIcons';
import { View, Text, Image } from '@tarojs/components';
import StarIcon from '../icons/star.svg';
import './index.scss';

const houses = [
  {
    id: '1',
    image: DefaultHouse,
    title: '宽敞大床房',
    destination: '意大利罗马',
    capacity: 2,
    gender: '仅限女生',
    likes: 20,
  },
  {
    id: '2',
    image: DefaultHouse,
    destination: '意大利米兰',
    title: '现代风格套房',
    capacity: 3,
    gender: '性别不限',
    likes: 40,
  },
];

const Index = () => {
  return (
    <View className='house-grid'>
      {houses.map(house => (
        <View key={house.id} className='house-card'>
          <Image
            src={house.image}
            mode='aspectFill'
            style={{ width: '100%', height: '100px' }}
          />
          <Text className='house-title'>
            {house.destination}·{house.title}
          </Text>
          <View className='house-info'>
            <Text>
              {house.capacity}人·{house.gender}
            </Text>
            <View className='house-likes'>
              <Image src={StarIcon} />
              <Text>{house.likes}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default observer(Index);
