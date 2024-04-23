import { Input, View, Text, Picker, Image } from '@tarojs/components';
import './index.scss';
import { useState, createContext } from 'react';
import RightBottomArrow from '@assets/images/right-bottom-arrow.svg';
import SearchIcon from '@assets/images/search.svg';
import CustomDateRangePicker from '@components/CustomDateRangePicker';

const SearchCard = () => {
  const [region, setRegion] = useState('欧洲');
  const regions = ['欧洲', '亚洲', '北美', '南美', '非洲', '大洋洲'];

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
  };

  const [userDestination, setUserDestination] = useState<string>('');

  const handleDestinationChange = e => {
    const inputDestination = e.detail.value;
    setUserDestination(inputDestination);
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
        />
      </View>
      <View className='search-second-line'>
        <CustomDateRangePicker />
      </View>
      <View className='search-button'>
        <Image src={SearchIcon} className='search-icon' />
        <View>搜索房源</View>
      </View>
    </View>
  );
};

export default SearchCard;

// todo for access value from search card
// const SearchContext = createContext(null);
// export const SearchProvider = ({ children }) => {
//   const [startDate, setStartDate] = useState();
//   const [endDate, setEndDate] = useState();

//   const value = {
//     startDate,
//     setStartDate,
//     endDate,
//     setEndDate,
//   };

//   return (
//     <SearchContext.Provider value={value}>
//       {children}
//     </SearchContext.Provider>
//   );
// };
