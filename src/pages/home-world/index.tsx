import { View } from '@tarojs/components';
import HomepageCard from '@components/HomepageCard';
import './index.scss';
import HomepageSearch from '@components/HomepageSearch';
import { useEffect, useMemo, useState } from 'react';
import Taro from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';
import { getCurrentInstance } from '@tarojs/taro';
import DateSelect from '@components/DateSelect';
import {
  homeUserProps,
  homeActivityProps,
  homePropertyProps,
} from '@utils/interfaces';
import CitySelect from '@components/CitySelect';

const HomeWorld = () => {
  const [activeTab, setActiveTab] = useState<'友友' | '房源' | '活动'>(null);
  const [topCityList, setTopCityList] = useState([]);
  const instance = getCurrentInstance();
  // 输出当前页面的 URL 参数对象
  console.log('router', instance?.router?.params);
  const [userList, setUserList] = useState<
    {
      user: homeUserProps;
      activity: homeActivityProps;
      property: homePropertyProps;
    }[]
  >([]);
  const [activityList, setActivityList] = useState<
    {
      user: homeUserProps;
      activity: homeActivityProps;
      property: homePropertyProps;
    }[]
  >([]);
  const [propertyList, setPropertyList] = useState<
    {
      user: homeUserProps;
      activity: homeActivityProps;
      property: homePropertyProps;
    }[]
  >([]);

  const curList: {
    user: homeUserProps;
    activity: homeActivityProps;
    property: homePropertyProps;
  }[] = useMemo(() => {
    if (activeTab == '友友') {
      return userList;
    }
    if (activeTab == '房源') {
      return propertyList;
    }
    if (activeTab == '活动') {
      return activityList;
    }
    return [];
  }, [activeTab, userList, propertyList, activityList]);
  const [location, setLocation] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [capacity, setCapacity] = useState<number>();
  const [isShowDateSelect, setIsShowDateSelect] = useState(false);
  const [isShowCitySelect, setIsShowCitySelect] = useState(false);

  useEffect(() => {
    setActiveTab('友友');
    getList('app/esuser/getUserList', setUserList);
    getList('app/activity/getActivityList', setActivityList);
    getList('/app/property/getPropertyList', setPropertyList, {
      searchableLocation: 0,
      startDate: '',
      endDate: '',
      order: 'DES_PRICE',
      capacity: 1,
    });
    // post('/app/eslocation/topCities', setTopCityList, {});
  }, []);
  const post = (path, callback, params = {}) => {
    let res = [];
    Taro.request({
      url: `https://api.eurostay.co${path}`,
      method: 'POST',
      header: {
        token: GlobalStore.userInfo.token,
      },
      data: {
        myUid: GlobalStore.userInfo.uid,
        ...params,
      },
      success: function (response) {
        if (response.statusCode === 200 && response.data.code === 0) {
          res = response.data.result.data;
          callback && callback(res);
          console.log(path, 'city', res);
        }
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

  const getList = (path, callback, params = {}) => {
    let res = [];
    Taro.request({
      url: `https://api.eurostay.co/${path}`,
      method: 'POST',
      header: {
        token: GlobalStore.userInfo.token,
      },
      data: {
        myUid: GlobalStore.userInfo.uid,
        order: 'DESC',
        page: '1',
        ...params,
      },
      success: function (response) {
        if (response.statusCode === 200 && response.data.code === 0) {
          res = response.data.result.data;
          callback && callback(res);
          console.log(path, '1111', res);
        }
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

  if (isShowDateSelect) {
    return (
      <DateSelect
        onDateChanged={(startDate, endDate) => {
          setStartDate(startDate);
          setEndDate(endDate);
          setIsShowDateSelect(false);
        }}
      />
    );
  }

  if (isShowCitySelect) {
    return (
      <CitySelect
        onCitySelected={city => {
          setLocation(city);
          setIsShowCitySelect(false);
        }}
      />
    );
  }

  return (
    <>
      <View className='home-search'>
        <View className='tab-container'>
          <View
            className={`tab-item ${activeTab === '友友' ? 'active' : ''}`}
            onClick={() => setActiveTab('友友')}
          >
            友友
          </View>
          <View
            className={`tab-item ${activeTab === '房源' ? 'active' : ''}`}
            onClick={() => setActiveTab('房源')}
          >
            房源
          </View>
          <View
            className={`tab-item ${activeTab === '活动' ? 'active' : ''}`}
            onClick={() => setActiveTab('活动')}
          >
            活动
          </View>
        </View>

        {activeTab != '友友' && (
          <HomepageSearch
            startDate={startDate}
            endDate={endDate}
            activeTab={activeTab}
            isShowDateSelectProps={isShowDateSelect}
            onDateSelectChange={value => {
              setIsShowDateSelect(value);
            }}
            location={location}
            onCitySelectChange={value => {
              setIsShowCitySelect(value);
            }}
            onCapacityChanged={value => {
              setCapacity(value);
            }}
            onSearch={() => {
              if (activeTab == '房源') {
                getList('/app/property/getPropertyList', setPropertyList, {
                  searchableLocation: location,
                  startDate: startDate,
                  endDate: endDate,
                  order: 'DES_PRICE',
                  capacity: capacity,
                });
              }
              if (activeTab == '活动') {
                getList('app/activity/getActivityList', setActivityList, {
                  searchableLocation: location,
                  startDate: startDate,
                  endDate: endDate,
                  order: 'DES',
                });
              }
            }}
          />
        )}

        <View className='home-user-wrapper'>
          {activeTab == '友友' &&
            userList.map((item, index) => {
              return (
                <HomepageCard
                  id={`${activeTab}-${index}`}
                  {...{ ...item, activeTab: activeTab }}
                />
              );
            })}
          {activeTab == '房源' &&
            propertyList.map((item, index) => {
              return (
                <HomepageCard
                  id={`${activeTab}-${index}`}
                  {...{ ...item, activeTab: activeTab }}
                />
              );
            })}
          {activeTab == '活动' &&
            activityList.map((item, index) => {
              return (
                <HomepageCard
                  id={`${activeTab}-${index}`}
                  {...{ ...item, activeTab: activeTab }}
                />
              );
            })}
        </View>
      </View>
    </>
  );
};

export default HomeWorld;
