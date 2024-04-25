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

  const [userDestination, setUserDestination] = useState<string>('');

  const handleDestinationChange = inputDestination => {
    setUserDestination(inputDestination);
  };

  const [userStartDate, setUserStartDate] = useState<Date>();
  const [userEndDate, setUserEndDate] = useState<Date>();

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setUserStartDate(startDate);
    setUserEndDate(endDate);
    console.log(userDestination, userStartDate, userEndDate);
  };

  // delete the testdata for now
  const [demoData, setDemoData] = useState<HouseItemProps[]>([]);
  useEffect(() => {
    houseInfoSearch('阿姆', '2024-03-24', '2024-03-24').then(
      (houseData: HouseItemProps[]) => {
        setDemoData(houseData); // Update demoData state with the fetched data
      },
    );
  }, []);

  const handleClickSearch = () => {
    houseInfoSearch(userDestination, userStartDate, userEndDate).then(
      (houseData: HouseItemProps[]) => {
        setDemoData(houseData); // Update demoData state with the fetched data
      },
    );
  };

  // for debug
  return (
    <View className='home'>
      <SearchCard
        onDestinationChange={handleDestinationChange}
        onDateChange={handleDateChange}
        onClickSearch={handleClickSearch}
      />
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
