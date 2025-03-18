import { View } from '@tarojs/components';
import HomepageCard from '@components/HomepageCard';
import './index.scss';
import HomepageSearch from '@components/HomepageSearch';
import { useEffect, useMemo, useState } from 'react';
import Taro, { useReachBottom } from '@tarojs/taro';
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
  const instance = getCurrentInstance();
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
  const [location, setLocation] = useState<{
    id: number;
    cname: string;
    name: string;
  }>({ id: 0, cname: '选择城市', name: '' });
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [capacity, setCapacity] = useState<number>();
  const [isShowDateSelect, setIsShowDateSelect] = useState(false);
  const [isShowCitySelect, setIsShowCitySelect] = useState(false);

  // 添加页码和加载状态
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setStartDate('');
    setEndDate('');
    setCapacity(3);
    setLocation({ id: 0, cname: '选择城市', name: '' });
  }, [activeTab]);
  useEffect(() => {
    console.log(location.cname, 'location.cname ');
  }, [location.cname]);
  useEffect(() => {
    setActiveTab('友友');
    getList('app/esuser/getUserList', setUserList);
    getList('app/activity/getActivityList', setActivityList, {
      searchableLocation: 0,
      startDate: '',
      endDate: '',
      order: 'DES',
    });
    getList('/app/property/getPropertyList', setPropertyList, {
      searchableLocation: 0,
      startDate: '',
      endDate: '',
      order: 'DES_PRICE',
      capacity: 1,
    });
    // post('/app/eslocation/topCities', setTopCityList, {});
  }, []);

  // 修改 getList 函数以支持分页
  const getList = (path, callback, params = {}, isLoadMore = false) => {
    if (loading || (!hasMore && isLoadMore)) return;
    
    setLoading(true);
    const currentPage = isLoadMore ? page : 1;

    Taro.request({
      url: `https://api.eurostay.co/${path}`,
      method: 'POST',
      header: {
        token: GlobalStore.userInfo.token,
      },
      data: {
        myUid: 0,
        page: currentPage,
        ...params,
      },
      success: function (response) {
        if (response.statusCode === 200 && response.data.code === 0) {
          const newData = response.data.result.data;
          if (isLoadMore) {
            if (newData.length === 0) {
              setHasMore(false);
            } else {
              callback(prev => [...prev, ...newData]);
              setPage(currentPage + 1);
            }
          } else {
            callback(newData);
            setPage(2);
            setHasMore(true);
          }
        }
      },
      fail: function (err) {
        Taro.showToast({
          title: '网络请求失败，请重试',
          icon: 'none',
          duration: 2000,
        });
      },
      complete: function () {
        setLoading(false);
      },
    });
  };

  // 处理触底加载
  const handleLoadMore = () => {
    if (!activeTab || loading || !hasMore) return;
    
    if (activeTab === '友友') {
      getList('app/esuser/getUserList', setUserList, {}, true);
    } else if (activeTab === '房源') {
      getList('/app/property/getPropertyList', setPropertyList, {
        searchableLocation: location.id,
        startDate: startDate,
        endDate: endDate,
        capacity: capacity,
        order: 'DES_PRICE',
      }, true);
    } else if (activeTab === '活动') {
      getList('app/activity/getActivityList', setActivityList, {
        searchableLocation: location.id,
        startDate: startDate,
        endDate: endDate,
        order: 'DES',
      }, true);
    }
  };

  // 使用 useReachBottom hook
  useReachBottom(() => {
    handleLoadMore();
  });

  // 切换 tab 时重置分页状态
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [activeTab]);

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
            location_={location}
            onCitySelectChange={value => {
              setIsShowCitySelect(value);
            }}
            onCapacityChanged={value => {
              setCapacity(value);
            }}
            onSearch={() => {
              setPage(1);
              setHasMore(true);
              
              if (activeTab == '房源') {
                getList('/app/property/getPropertyList', setPropertyList, {
                  searchableLocation: location.id,
                  startDate: startDate,
                  endDate: endDate,
                  capacity: capacity,
                  order: 'DES_PRICE',
                });
              }
              if (activeTab == '活动') {
                getList('app/activity/getActivityList', setActivityList, {
                  searchableLocation: location.id,
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
          
          {/* 添加加载状态提示 */}
          {loading && (
            <View className='loading-tips'>加载中...</View>
          )}
          {!hasMore && curList.length > 0 && (
            <View className='no-more-tips'>没有更多数据了</View>
          )}
        </View>
      </View>
    </>
  );
};

export default HomeWorld;
