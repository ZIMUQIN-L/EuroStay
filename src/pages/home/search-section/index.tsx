import { Input, View, Text, Picker, Image } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';
import CustomDateRangePicker from '@components/CustomDateRangePicker';
import { RightBottomArrow, SearchIcon } from '@utils/cloudIcons';

const SearchCard = ({
  onDestinationChange,
  onDateChange,
  onClickSearch,
  searchType,
}) => {
  const [region, setRegion] = useState('欧洲');
  // 先只保留欧洲
  // const regions = ['欧洲', '亚洲', '北美', '南美', '非洲', '大洋洲'];
  const regions = ['欧洲'];

  const handleRegionChange = e => {
    const index = e.detail.value;
    const selectedRegion = regions[index];
    setRegion(selectedRegion);
  };

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    onDateChange(startDate, endDate);
  };

  const [userDestination, setUserDestination] = useState<string>('');

  const handleDestinationChange = e => {
    const inputDestination = e.detail.value;
    setUserDestination(inputDestination);
    onDestinationChange(e.detail.value);
  };

  return (
    <View className='search-card'>
      <View className='search-first-line'>
        <Picker
          className='region-input'
          mode='selector'
          range={regions}
          onChange={handleRegionChange}
        >
          <View className='picker'>
            <Text>{region}</Text>
            <Image src={RightBottomArrow} className='right-bottom-arrow' />
          </View>
        </Picker>
        <View className='vertical-line' />
        <Input
          className='destination-input'
          placeholder='目的地'
          value={userDestination}
          onInput={handleDestinationChange}
          placeholder-class='home-destination-input'
        />
      </View>
      <View className='search-second-line'>
        <CustomDateRangePicker onDateChange={handleDateChange} />
      </View>
      <View
        className={`search-button ${searchType === 'houses' ? 'houses' : 'accommodation'}`}
        onClick={onClickSearch}
      >
        <Image src={SearchIcon} className='search-icon' />
        <View>{searchType === 'houses' ? '搜索房源' : '搜索求宿'}</View>
      </View>
    </View>
  );
};

export default SearchCard;
