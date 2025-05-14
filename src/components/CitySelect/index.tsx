import { View, Text, Input } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.scss';
import Taro from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';

interface IProps {
  onCitySelected: (_: { id: number; cname: string; name: string }) => void;
}
const CitySelect = (props: IProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCity, setSelectedCity] = useState<{ id: number; cname: string; name: string } | null>(null);
  const [topCityList, setTopCityList] = useState<
    {
      id: number;
      cname: string;
      name: string;
    }[]
  >([]);
  const [allCityList, setAllCityList] = useState<
    {
      id: number;
      cname: string;
      name: string;
      pinyin: string;
    }[]
  >([]);
  const [cityGroups, setCityGroups] = useState<{
    [key: string]: { id: number; cname: string; name: string }[];
  }>({});

  useEffect(() => {
    console.log('cuty select');
    post('/app/eslocation/topCities', setTopCityList, {});
    post('/app/eslocation/allCities', setAllCityList, {});
    getCityGroups();
  }, []);
  useEffect(() => {
    getCityGroups();
  }, [allCityList.length]);
  const getCityGroups = () => {
    const groups = {};
    allCityList.forEach(city => {
      const firstLetter = city.pinyin[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(city);
    });
    console.log(groups, 'groups');
    setCityGroups(groups);
  };

  const post = (path, callback, params = {}) => {
    let res = [];
    console.log();
    Taro.request({
      url: `https://api.eurostay.co${path}`,
      method: 'GET',
      header: {
        token: GlobalStore.userInfo.token,
      },
      data: {
        myUid: GlobalStore.userInfo.uid,
        ...params,
      },
      success: function (response) {
        if (response.statusCode === 200 && response.data.code === 0) {
          res = response.data.result;
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

  const handleCityClick = (city: { id: number; cname: string; name: string }) => {
    setSelectedCity(city);
  };

  const handleConfirm = () => {
    if (selectedCity) {
      props.onCitySelected(selectedCity);
    }
  };

  const handleCancel = () => {
    props.onCitySelected({ id: 0, cname: '选择城市', name: '' });
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
          {topCityList.map((city, index) => (
            <View
              key={index}
              className={`city-item ${selectedCity?.id === city.id ? 'selected' : ''}`}
              onClick={() => handleCityClick(city)}
            >
              {city.cname}
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
              className={`city-row ${selectedCity?.id === city.id ? 'selected' : ''}`}
              onClick={() => handleCityClick(city)}
            >
              {city.cname}
            </View>
          ))}
        </View>
      ))}

      <View className='floating-buttons'>
        <View className='confirm-button' onClick={handleConfirm}>
          确认
        </View>
        <View className='cancel-button' onClick={handleCancel}>
          取消
        </View>
      </View>
    </View>
  );
};

export default CitySelect;
