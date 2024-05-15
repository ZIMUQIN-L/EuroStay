import { useState } from 'react';
import SearchCard from '../search-section';
import './index.scss';
import { View } from '@tarojs/components';

/**
 * 求宿页面
 */
const SeekingAccomadation = () => {
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
    console.log('搜索求宿信息');
  };

  // 样式可以直接用房源页面的
  return (
    <View className='home' id='home'>
      <SearchCard
        onDestinationChange={handleDestinationChange}
        onDateChange={handleDateChange}
        onClickSearch={handleClickSearch}
        searchType='accomadation'
      />
      <View className='house-list'></View>
    </View>
  );
};

export default SeekingAccomadation;
