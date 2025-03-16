import { View, Text, Input } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.scss';
import Taro from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';

interface IProps {
  onCitySelected: (_: number) => void;
}
const CitySelect = (props: IProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [topCityList, setTopCityList] = useState([]);

  useEffect(() => {
    console.log('cuty select');
    post('/app/eslocation/topCities', setTopCityList, {});
  }, []);

  const post = (path, callback, params = {}) => {
    let res = [];
    console.log();
    Taro.request({
      url: `https://api.eurostay.co${path}`,
      method: 'GET',
      header: {
        token: '2f68dbbf-519d-4f01-9636-e2421b68f379',
      },
      data: {
        myUid: GlobalStore.userInfo.uid,
        ...params,
      },
      success: function (response) {
        if (response.statusCode === 200 && response.data.code === 0) {
          res = response.data.result.data;
          callback && callback(res);
        }
        console.log(path, '1111', response.data);
      },
      fail: function (err) {
        Taro.showToast({
          title: '网络请求失败，请重试',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  };

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
            <View
              key={index}
              className='city-item'
              onClick={() => {
                props.onCitySelected(index);
              }}
            >
              {city}
            </View>
          ))}
        </View>
      </View>

      {Object.entries(cityGroups).map(([letter, cities]) => (
        <View key={letter} className='city-group'>
          <Text className='letter'>{letter}</Text>
          {cities.map((city, index) => (
            <View
              key={index}
              className='city-row'
              onClick={() => {
                props.onCitySelected(index);
              }}
            >
              {city}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default CitySelect;
