import { View } from '@tarojs/components';
import { observer } from '@store/utils';
import CustomTabBar from '@components/CustomTabBar';
import SearchCard from './search-section';
import './index.scss';
import Taro, { useReachBottom } from '@tarojs/taro';
import { useState, useEffect } from 'react';
import HouseItem from './house-item';
import { houseInfoSearch } from '../../common/database/house/house';
import { HouseItemProps } from '@utils/interfaces';
import SearchAndFilter from './search-and-filter';
import { formatToday } from '@utils/dateUtil';

const Index = () => {
  Taro.useShareAppMessage(() => {
    return {
      title: 'EuroStay欧洲换宿',
      path: `/pages/index/index`,
    };
  });
  // 上拉进行加载，获取更多房源
  useReachBottom(() => {
    houseInfoSearch(
      userDestination,
      userStartDate,
      userEndDate,
      1,
      {},
      {},
      {},
      demoData.length,
    ).then((houseData: HouseItemProps[]) => {
      setDemoData(prevData => [...prevData, ...houseData]);
    });
  });

  const [userDestination, setUserDestination] = useState<string>('');

  const handleDestinationChange = inputDestination => {
    setUserDestination(inputDestination);
  };

  const [userStartDate, setUserStartDate] = useState<Date>();
  const [userEndDate, setUserEndDate] = useState<Date>();
  const [isClickedSearch, setIsClickedSearch] = useState<Boolean>(false);

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setUserStartDate(startDate);
    setUserEndDate(endDate);
  };

  // delete the testdata for now
  const [demoData, setDemoData] = useState<HouseItemProps[]>([]);

  const fetchInitialData = () => {
    const today = formatToday();
    houseInfoSearch('', today, today).then((houseData: HouseItemProps[]) => {
      setDemoData(houseData);
    });
  };

  useEffect(() => {
    fetchInitialData();
  }, []);
  // useEffect(() => {
  //   houseInfoSearch('阿姆', '2024-03-24', '2024-03-24').then(
  //     (houseData: HouseItemProps[]) => {
  //       setDemoData(houseData); // Update demoData state with the fetched data
  //     },
  //   );
  // }, []);

  const handleClickSearch = () => {
    houseInfoSearch(userDestination, userStartDate, userEndDate).then(
      (houseData: HouseItemProps[]) => {
        setDemoData(houseData);
      },
    );

    setIsClickedSearch(true);
  };
  const resetState = () => {
    setUserDestination('');
    setUserStartDate(undefined);
    setUserEndDate(undefined);
    setIsClickedSearch(false);
    fetchInitialData();
  };

  // 使用filter进行查询
  const handleClickFilter = (houseData: HouseItemProps[]) => {
    setDemoData(houseData);
  };

  return (
    <View className='home' id='home'>
      {isClickedSearch ? (
        <SearchAndFilter
          onDestinationChange={handleDestinationChange}
          onDateChange={handleDateChange}
          onClickSearch={handleClickSearch}
          userStartDate={userStartDate}
          userEndDate={userEndDate}
          destination={userDestination}
          onClickFilterData={handleClickFilter}
        />
      ) : (
        <SearchCard
          onDestinationChange={handleDestinationChange}
          onDateChange={handleDateChange}
          onClickSearch={handleClickSearch}
        />
      )}
      <View className='house-list'>
        {demoData.map(house => (
          <HouseItem key={house._id} {...house} />
        ))}
      </View>
      <View className='index'>
        <CustomTabBar onHomeSelected={resetState} />
      </View>
    </View>
  );
};

export default observer(Index);
