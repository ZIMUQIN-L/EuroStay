import { View, Text, Input } from '@tarojs/components';
import { useState } from 'react';
import './index.scss';

const CitySelect = () => {
  const [searchValue, setSearchValue] = useState('');

  const hotCities = [
    '阿姆斯特丹',
    '慕尼黑',
    '巴塞罗那',
    '罗马',
    '巴黎',
    '里斯本',
    '伦敦',
    '梵蒂冈',
    '米兰',
    '佛罗伦萨',
    '威尼斯',
    '伊斯坦布尔',
    '布拉格',
    '马德里',
  ];

  const cityGroups = {
    A: ['阿姆斯特丹'],
    B: ['巴塞罗那', '巴黎', '布拉格'],
    C: ['CDEFG'],
    D: ['DEFG'],
  };

  return (
    <View className='city-select'>
      <View className='search-box'>
        <Input
          type='text'
          placeholder='搜索城市/区域'
          value={searchValue}
          onInput={e => setSearchValue(e.detail.value)}
          className='search-input'
        />
      </View>

      <View className='hot-cities'>
        <Text className='section-title'>热门城市</Text>
        <View className='city-grid'>
          {hotCities.map((city, index) => (
            <View key={index} className='city-item'>
              {city}
            </View>
          ))}
        </View>
      </View>

      {Object.entries(cityGroups).map(([letter, cities]) => (
        <View key={letter} className='city-group'>
          <Text className='letter'>{letter}</Text>
          {cities.map((city, index) => (
            <View key={index} className='city-row'>
              {city}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default CitySelect;
