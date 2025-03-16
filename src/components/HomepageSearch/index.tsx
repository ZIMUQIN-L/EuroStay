import { View, Text, Input } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.scss';

import { formatToday } from '@utils/dateUtil';

interface HomepageSearchProps {
  activeTab: '活动' | '房源';
  isShowDateSelectProps: boolean;
  onDateSelectChange: (value: boolean) => void;
  onCitySelectChange: (value: boolean) => void;
  startDate: string;
  endDate: string;
  location: number;
  onSearch: () => void;
  onCapacityChanged: (value: number) => void;
}

const HomepageSearch: React.FC<HomepageSearchProps> = ({
  activeTab,
  isShowDateSelectProps,
  onDateSelectChange,
  startDate,
  endDate,
  onCitySelectChange,
  onCapacityChanged,
  onSearch,
}) => {
  const [location, setLocation] = useState('意大利');
  const [startDate_, setStartDate] = useState(startDate);
  const [endDate_, setEndDate] = useState(endDate);
  const [guests, setGuests] = useState(1);

  return (
    <View className='searchContainer'>
      <View className='searchSection'>
        <View
          className='locationSection'
          onClick={() => {
            onCitySelectChange(true);
          }}
        >
          <Text>地区</Text>
          <View className='location-value'>{location}</View>
        </View>

        <View
          className='dateSection'
          onClick={() => {
            onDateSelectChange(true);
          }}
        >
          <Text>日期</Text>
          <View className='dateRange'>
            {startDate}
            <Text>至</Text>
            {endDate}
          </View>
        </View>
        {activeTab == '房源' && (
          <View className='guestsSection'>
            <Text>人数</Text>
            <View className='guestButtons'>
              <View
                className={`guest-button ${guests === 1 ? 'selected' : ''}`}
                onClick={() => {
                  onCapacityChanged(1);
                }}
              >
                1人
              </View>
              <View
                className={`guest-button ${guests === 2 ? 'selected' : ''}`}
                onClick={() => {
                  onCapacityChanged(2);
                }}
              >
                2人
              </View>
              <View
                className={`guest-button ${guests === 3 ? 'selected' : ''}`}
                onClick={() => {
                  onCapacityChanged(3);
                }}
              >
                3人及以上
              </View>
            </View>
          </View>
        )}
      </View>

      <View className='searchButton' onClick={onSearch}>
        查询{activeTab}
      </View>
    </View>
  );
};

export default HomepageSearch;
