import { View, Text, Input } from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';

interface HomepageSearchProps {
  onSearch?: (searchParams: {
    location: string;
    startDate: string;
    endDate: string;
    guests: number;
  }) => void;
}

const HomepageSearch: React.FC<HomepageSearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('意大利');
  const [startDate, setStartDate] = useState('2月15日');
  const [endDate, setEndDate] = useState('2月18日');
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        location,
        startDate,
        endDate,
        guests,
      });
    }
  };

  console.log(11111);

  return (
    <View className='searchContainer'>
      <View className='searchSection'>
        <View
          className='locationSection'
          onClick={() => {
            Taro.navigateTo({ url: '/pages/city-select/index' });
          }}
        >
          <Text>地区</Text>
          <View className='location-value'>{location}</View>
        </View>

        <View
          className='dateSection'
          onClick={() => {
            console.log(2222);
            Taro.navigateTo({ url: '/pages/date-select/index' });
          }}
        >
          <Text>日期</Text>
          <View className='dateRange'>
            {startDate}
            <Text>至</Text>
            {endDate}
          </View>
        </View>

        <View className='guestsSection'>
          <Text>人数</Text>
          <View className='guestButtons'>
            <View
              className={`guest-button ${guests === 1 ? 'selected' : ''}`}
              onClick={() => setGuests(1)}
            >
              1人
            </View>
            <View
              className={`guest-button ${guests === 2 ? 'selected' : ''}`}
              onClick={() => setGuests(2)}
            >
              2人
            </View>
            <View
              className={`guest-button ${guests === 3 ? 'selected' : ''}`}
              onClick={() => setGuests(3)}
            >
              3人及以上
            </View>
          </View>
        </View>
      </View>

      <View className='searchButton' onClick={handleSearch}>
        查询房源
      </View>
    </View>
  );
};

export default HomepageSearch;
