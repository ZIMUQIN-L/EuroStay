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

const Index = () => {
  Taro.useShareAppMessage(() => {
    return {
      title: 'EuroStay欧洲换宿',
      path: `/pages/index/index`,
    };
  });
  // 上拉进行加载，获取更多房源
  useReachBottom(() => {
    //console.log("reaching bottom");
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
    console.log("changed filter", userDestination, userStartDate, userEndDate);
  };

  // delete the testdata for now
  const [demoData, setDemoData] = useState<HouseItemProps[]>([]);

  const fetchInitialData = () => {
    houseInfoSearch('阿姆', '2024-03-24', '2024-03-24').then(
      (houseData: HouseItemProps[]) => {
        setDemoData(houseData); // Set demo data to the fetched initial list
      },
    );
  };

  // Effect to fetch data on mount
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
        setDemoData(houseData); // Update demoData state with the fetched data
      },
    );
    const mockData: HouseItemProps[] = [
      {
        _id: '123', // 微信自动生成的_id，无法修改其名称
        capacity: 4,
        description: '1111111',
        end_date: '2024-1-2', // 后期最好优化成日期格式
        start_date: '2024-1-1', // 当前数据库名称是start_date和end_date, 或许可以先保持？
        houseType: '123',
        images: [''],
        location: '国家 城市',
        ownerTarget: '',
        xhsContact: ',',
      },
      {
        _id: '123', // 微信自动生成的_id，无法修改其名称
        capacity: 4,
        description: '1111111',
        end_date: '2024-1-1', // 后期最好优化成日期格式
        start_date: '2024-1-1', // 当前数据库名称是start_date和end_date, 或许可以先保持？
        houseType: '123',
        images: [''],
        location: '国家 城市',
        ownerTarget: '',
        xhsContact: ',',
      },
      {
        _id: '123', // 微信自动生成的_id，无法修改其名称
        capacity: 4,
        description: '1111111',
        end_date: '2024-1-1', // 后期最好优化成日期格式
        start_date: '2024-1-1', // 当前数据库名称是start_date和end_date, 或许可以先保持？
        houseType: '123',
        images: [''],
        location: '国家 城市',
        ownerTarget: '',
        xhsContact: ',',
      },
    ];
    setIsClickedSearch(true);
    setDemoData(mockData);
  };
  const resetState = () => {
    setUserDestination('');
    setUserStartDate(undefined);
    setUserEndDate(undefined);
    setIsClickedSearch(false);
    fetchInitialData();
    //setDemoData([]);
};

  // for debug
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

      {/* <View className='index'>
        <CustomTabBar />
      </View> */}
    </View>
  );
};

export default observer(Index);
