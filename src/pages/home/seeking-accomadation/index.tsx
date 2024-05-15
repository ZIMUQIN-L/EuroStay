import { useState } from 'react';
import SearchCard from '../search-section';
import './index.scss';
import { View } from '@tarojs/components';
import { SeekingItemProps } from '@utils/interfaces';
import DefaultAvatar from '@assets/images/default-avatar.png';
import SeekingCard from '../seeking-item';
import CustomTabBar from '@components/CustomTabBar';

const demoData: SeekingItemProps[] = [
  {
    _id: '1',
    user: 'Frances',
    avatar: DefaultAvatar,
    title: '测试求宿信息1',
    gender: '女',
    destination: '阿姆斯特丹',
    start_date: '2024-05-20',
    end_date: '2024-12-12',
  },
  {
    _id: '2',
    user: 'Frances',
    avatar: DefaultAvatar,
    title: '测试求宿信息2',
    gender: '女',
    destination: '阿姆斯特丹',
    start_date: '2024-05-20',
    end_date: '2024-12-12',
  },
];

/**
 * 求宿页面
 */
const SeekingAccommodation = () => {
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

  const [seekingData, setSeekingData] = useState<SeekingItemProps[]>(demoData);

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
