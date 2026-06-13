import { View, Text } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.scss';
import { CombinedLocationData } from '@utils/interfaces';

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

      </View>

      <View className='searchButton' onClick={onSearch}>
        查询{activeTab}
      </View>
    </View>
  );
};

export default HomepageSearch;
