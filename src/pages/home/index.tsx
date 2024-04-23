import { View } from '@tarojs/components';
import { observer } from '@store/utils';
import CustomTabBar from '@components/CustomTabBar';
import SearchCard from './search-section';
import './index.scss';
import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import HouseItem from './house-item';
import { houseInfoSearch } from '../../common/database/house/house';
import { HouseItemProps } from '@utils/interfaces';

const Index = () => {
  Taro.useShareAppMessage(() => {
    return {
      title: 'EuroStay欧洲换宿',
      path: `/pages/index/index`,
    };
  });
  // delete the testdata for now
  const [demoData, setDemoData] = useState<HouseItemProps[]>([]);
  useEffect(() => {
    houseInfoSearch('阿姆', 1, '2024-03-24', '2024-03-24', {}, {}, {}, 0).then(
      (houseData: HouseItemProps[]) => {
        setDemoData(houseData); // Update demoData state with the fetched data
      },
    );
  }, []);
  // for debug
  //   console.log(demoData)
  return (
    <View>
      <SearchCard />
      <View className='house-list'>
        {demoData.map(house => (
          <HouseItem key={house._id} {...house} />
        ))}
      </View>
      <View className='index'>
        <CustomTabBar />
      </View>
    </View>
  );
};

export default observer(Index);
