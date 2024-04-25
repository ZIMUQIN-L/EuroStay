import { Input, View, Text, Picker, Image, Button } from '@tarojs/components';
import './index.scss';
import { useState, createContext } from 'react';
import RightBottomArrow from '@assets/images/right-bottom-arrow.svg';
import SearchIcon from '@assets/images/search.svg';
import CustomDateRangePicker from '@components/CustomDateRangePicker';

const SearchCard = ({ onDestinationChange, onDateChange, onClickSearch }) => {
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
          placeholder-class="home-destination-input"
        />
      </View>
      <View className='search-second-line'>
        <CustomDateRangePicker onDateChange={handleDateChange}/>
      </View>
      <View className='search-button' onClick={onClickSearch}>
      {/* <Button className='search-button'> */}
        <Image src={SearchIcon} className='search-icon' />
        <View>搜索房源</View>
        {/* </Button> */}
      </View>
    </View>
  );
};

export default SearchCard;
