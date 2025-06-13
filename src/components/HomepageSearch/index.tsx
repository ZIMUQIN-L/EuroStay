import { View, Text, Input } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.scss';
import { CombinedLocationData } from '@utils/interfaces';
import { formatToday } from '@utils/dateUtil';

interface HomepageSearchProps {
  activeTab: '活动' | '房源';
  isShowDateSelectProps: boolean;
  onDateSelectChange: (value: boolean) => void;
  onCitySelectChange: (value: boolean) => void;
  startDate: string;
  endDate: string;
  location_: CombinedLocationData;
  onSearch: () => void;
  onCapacityChanged: (value: number) => void;
}

const HomepageSearch: React.FC<HomepageSearchProps> = ({
  activeTab,
  isShowDateSelectProps,
  onDateSelectChange,
  startDate,
  endDate,
  location_,
  onCitySelectChange,
  onCapacityChanged,
  onSearch,
}) => {
  useEffect(() => {
    setLocation(location_.displayName);
  }, [location_.displayName]);
  const [location, setLocation] = useState(location_.displayName);
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
          <View
            className={`location-value ${location == '选择国家和城市' ? 'empty' : ''}`}
          >
            {location}
          </View>
        </View>

        <View
          className='dateSection'
          onClick={() => {
            onDateSelectChange(true);
          }}
        >
          <Text>日期</Text>
          <View className={`dateRange ${startDate == '' ? 'empty' : ''}`}>
            {startDate == '' ? (
              '选择日期'
            ) : (
              <>
                {startDate}
                <Text>至</Text>
                {endDate}
              </>
            )}
          </View>
        </View>
        {activeTab == '房源' && (
          <View className='guestsSection'>
            <Text>人数</Text>
            <View className='guestButtons'>
              <View
                className={`guest-button ${guests === 1 ? 'selected' : ''}`}
                onClick={() => {
                  setGuests(1);
                  onCapacityChanged(1);
                }}
              >
                1人
              </View>
              <View
                className={`guest-button ${guests === 2 ? 'selected' : ''}`}
                onClick={() => {
                  setGuests(2);
                  onCapacityChanged(2);
                }}
              >
                2人
              </View>
              <View
                className={`guest-button ${guests === 3 ? 'selected' : ''}`}
                onClick={() => {
                  setGuests(3);
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
