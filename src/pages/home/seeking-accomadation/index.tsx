import { useState, useEffect } from 'react';
import SearchCard from '../search-section';
import './index.scss';
import { View } from '@tarojs/components';
import { SeekingItemProps, AccomMssageHouseItemProps } from '@utils/interfaces';
import Taro, { useReachBottom } from '@tarojs/taro';
import DefaultAvatar from '@assets/images/default-avatar.png';
import SeekingCard from '../seeking-item';
import CustomTabBar from '@components/CustomTabBar';
import { accomPageMessageSearch } from '@common/database/accomMessage/accomMessage';

/**
 * 求宿页面
 */
const SeekingAccommodation = () => {
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
  const [isClickedSearch, setIsClickedSearch] = useState<Boolean>(false);

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setUserStartDate(startDate);
    setUserEndDate(endDate);
  };

  const handleClickSearch = () => {
    accomPageMessageSearch(userDestination, userStartDate, userEndDate).then(
      (seekingAccomData: AccomMssageHouseItemProps[]) => {
        setSeekingData(seekingAccomData);
      },
    );
    setIsClickedSearch(true);
  };

  const fetchInitialData = () => {
    accomPageMessageSearch('', '', '').then(
      (seekingAccomData: AccomMssageHouseItemProps[]) => {
        setSeekingData(seekingAccomData);
      },
    );
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const [seekingData, setSeekingData] = useState<AccomMssageHouseItemProps[]>(
    [],
  );

  // 样式可以直接用房源页面的
  return (
    <View className='home' id='home'>
      <SearchCard
        onDestinationChange={handleDestinationChange}
        onDateChange={handleDateChange}
        onClickSearch={handleClickSearch}
        searchType='accomadation'
      />
      <View className='house-list'>
        {seekingData.length > 0 &&
          seekingData.map(item => (
            <SeekingCard key={item._id} seekingItem={item} />
          ))}
      </View>
      <CustomTabBar />
    </View>
  );
};

export default SeekingAccommodation;
