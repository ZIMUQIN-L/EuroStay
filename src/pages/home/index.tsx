import { View, Text, Button } from '@tarojs/components';
import { useStore, observer } from '@store/utils';
import CustomTabBar from '@components/CustomTabBar';
import SearchCard from './search-section';
import './index.scss';
import Taro from '@tarojs/taro';
import HouseItem from './house-item';
import { houseInfoSearch } from '../../common/database/house/house';

const Index = () => {
  Taro.useShareAppMessage(() => {
    return {
      title: 'EuroStay欧洲换宿',
      path: `/pages/index/index`,
    };
  });
  const demoData = [
    {
      id: '1',
      nation: '法国',
      city: '巴黎',
      type: '公寓',
      startDate: new Date(),
      endDate: new Date(),
      owner: 1,
      url: 'data:image/jpeg;base64,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',
    },
    {
      id: '2',
      nation: '德国',
      city: '柏林',
      type: '公寓',
      startDate: new Date(),
      endDate: new Date(),
      owner: 1,
      url: '',
    },
    {
      id: '3',
      nation: '英国',
      city: '伦敦',
      type: '公寓',
      startDate: new Date(),
      endDate: new Date(),
      owner: 1,
      url: '',
    },
    {
      id: '4',
      nation: '瑞士',
      city: '苏黎世',
      type: '公寓',
      startDate: new Date(),
      endDate: new Date(),
      owner: 1,
      url: '',
    },
    {
      id: '5',
      nation: '意大利',
      city: '罗马',
      type: '公寓',
      startDate: new Date(),
      endDate: new Date(),
      owner: 1,
      url: '',
    },
    {
      id: '6',
      nation: '西班牙',
      city: '巴塞罗那',
      type: '公寓',
      startDate: new Date(),
      endDate: new Date(),
      owner: 1,
      url: '',
    },
  ];

  return (
    <View>
      <SearchCard />
      <View className='house-list'>
        {demoData.map(house => (
          <HouseItem key={house.id} house={house} />
        ))}
      </View>
      <View className='index'>
        <CustomTabBar />
      </View>
    </View>
  );
};

export default observer(Index);
