import { View } from '@tarojs/components';
import HomepageCard from '@components/HomepageCard';
import { observer } from 'mobx-react';
import './index.scss';
import HomepageSearch from '@components/HomepageSearch';
import { useEffect, useMemo, useState } from 'react';
import Taro, {
  useReachBottom,
  useDidShow,
  usePullDownRefresh,
} from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';
import { getCurrentInstance } from '@tarojs/taro';
import DateSelect from '@components/DateSelect';
import {
  homeUserProps,
  homeActivityProps,
  homePropertyProps,
} from '@utils/interfaces';
import CitySelect from '@components/CitySelect';
import TabBar from '@components/TabBar';

const HomeWorld = () => {
  const [activeTab, setActiveTab] = useState<'友友' | '房源' | '活动'>('友友');
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
  const [capacity, setCapacity] = useState<number>(1);
  const [isShowDateSelect, setIsShowDateSelect] = useState(false);
  const [isShowCitySelect, setIsShowCitySelect] = useState(false);
  const [isShowPostModal, setIsShowPostModal] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  // 为每个tab创建独立的页码状态
  const [userPage, setUserPage] = useState(1);
  const [propertyPage, setPropertyPage] = useState(1);
  const [activityPage, setActivityPage] = useState(1);

  // 为每个tab创建独立的hasMore状态
  const [hasMoreUser, setHasMoreUser] = useState(true);
  const [hasMoreProperty, setHasMoreProperty] = useState(true);
  const [hasMoreActivity, setHasMoreActivity] = useState(true);

  // 添加页码和加载状态
  const [loading, setLoading] = useState(false);

  usePullDownRefresh(() => {
    setUserPage(1);
    setHasMoreUser(true);
    setPropertyPage(1);
    setHasMoreProperty(true);
    setActivityPage(1);
    setHasMoreActivity(true);
    setLocation({ id: 0, cname: '选择城市', name: '' });
    setStartDate('');
    setEndDate('');
    setCapacity(1);
  });

  useDidShow(() => {
    getList('app/esuser/getUserList', setUserList);
    getList('app/activity/getActivityList', setActivityList, {
      searchableLocation: 0,
      startDate: '',
      endDate: '',
      order: 'DES',
    });
    getList('app/property/getPropertyList', setPropertyList, {
      searchableLocation: 0,
      startDate: '',
      endDate: '',
      order: 'DES_PRICE',
      capacity: 1,
    });
  });

  useEffect(() => {
    setActiveTab('友友');
    getList('app/esuser/getUserList', setUserList);
    getList('app/activity/getActivityList', setActivityList, {
      searchableLocation: 0,
      startDate: '',
      endDate: '',
      order: 'DES',
    });
    getList('app/property/getPropertyList', setPropertyList, {
      searchableLocation: 0,
      startDate: '',
      endDate: '',
      order: 'DES_PRICE',
      capacity: 1,
    });
  }, []);

  // 修改 getList 函数以使用对应tab的页码
  const getList = (path, callback, params = {}, isLoadMore = false) => {
    if (loading) return;

    const getCurrentPage = () => {
      switch (activeTab) {
        case '友友':
          return userPage;
        case '房源':
          return propertyPage;
        case '活动':
          return activityPage;
        default:
          return 1;
      }
    };

    const getHasMore = () => {
      switch (activeTab) {
        case '友友':
          return hasMoreUser;
        case '房源':
          return hasMoreProperty;
        case '活动':
          return hasMoreActivity;
        default:
          return true;
      }
    };

    if (isLoadMore && !getHasMore()) return;
    setLoading(true);
    const currentPage = isLoadMore ? getCurrentPage() : 1;

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
            if (newData.length < response.data.result.per_page) {
              callback(prev => [...prev, ...newData]);
              switch (activeTab) {
                case '友友':
                  setHasMoreUser(false);
                  break;
                case '房源':
                  setHasMoreProperty(false);
                  break;
                case '活动':
                  setHasMoreActivity(false);
                  break;
              }
            } else {
              callback(prev => [...prev, ...newData]);
              switch (activeTab) {
                case '友友':
                  setUserPage(currentPage + 1);
                  break;
                case '房源':
                  setPropertyPage(currentPage + 1);
                  break;
                case '活动':
                  setActivityPage(currentPage + 1);
                  break;
              }
            }
          } else {
            callback(newData);
            switch (path) {
              case 'app/esuser/getUserList':
                setUserPage(currentPage + 1);
                setHasMoreUser(
                  newData.length === response.data.result.per_page,
                );
                break;
              case 'app/property/getPropertyList':
                setPropertyPage(currentPage + 1);
                setHasMoreProperty(
                  newData.length === response.data.result.per_page,
                );
                break;
              case 'app/activity/getActivityList':
                setActivityPage(currentPage + 1);
                setHasMoreActivity(
                  newData.length === response.data.result.per_page,
                );
                break;
            }
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
    if (!activeTab || loading) return;

    if (
      (activeTab === '友友' && !hasMoreUser) ||
      (activeTab === '房源' && !hasMoreProperty) ||
      (activeTab === '活动' && !hasMoreActivity)
    ) {
      return;
    }

    if (activeTab === '友友') {
      getList('app/esuser/getUserList', setUserList, {}, true);
    } else if (activeTab === '房源') {
      getList(
        '/app/property/getPropertyList',
        setPropertyList,
        {
          searchableLocation: location.id,
          startDate: startDate,
          endDate: endDate,
          capacity: capacity,
          order: 'DES_PRICE',
        },
        true,
      );
    } else if (activeTab === '活动') {
      getList(
        'app/activity/getActivityList',
        setActivityList,
        {
          searchableLocation: location.id,
          startDate: startDate,
          endDate: endDate,
          order: 'DES',
        },
        true,
      );
    }
  };

  // 使用 useReachBottom hook
  useReachBottom(() => {
    handleLoadMore();
  });

  // 在打开 modal 时保存当前滚动位置
  const handlePostModalOpen = (show: boolean) => {
    if (show) {
      setScrollTop(
        document.documentElement.scrollTop || document.body.scrollTop,
      );
    }
    setIsShowPostModal(show);
  };

  useEffect(() => {
    setLocation({ id: 0, cname: '选择城市', name: '' });
    setStartDate('');
    setEndDate('');
    setCapacity(1);
  }, [activeTab]);
//   在关闭 modal 时恢复滚动位置
  useEffect(() => {
    if (!isShowPostModal && scrollTop > 0) {
      window.scrollTo(0, scrollTop);
    }
  }, [isShowPostModal]);

  if (isShowDateSelect) {
    return (
      <DateSelect
        onDateChanged={(startDate, endDate) => {
          setStartDate(startDate);
          setEndDate(endDate);
          setIsShowDateSelect(false);
        }}
        onCancel={() => {
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
      <View className={`home-search ${isShowPostModal ? 'modal' : ''}`}>
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
                if (GlobalStore.userInfo?.uid === 0) {
                    Taro.showModal({
                      title: '转至登录页面',
                      content: '请登录后选择~',
                      success: function (res) {
                        if (res.confirm) {
                          Taro.reLaunch({
                            url: `/pages/login/index`,
                          });
                        }
                      },
                    });
                  }
                  else {
                    setIsShowDateSelect(value);
                  }
            }}
            location_={location}
            onCitySelectChange={value => {
                if (GlobalStore.userInfo?.uid === 0) {
                    Taro.showModal({
                      title: '转至登录页面',
                      content: '请登录后选择~',
                      success: function (res) {
                        if (res.confirm) {
                          Taro.reLaunch({
                            url: `/pages/login/index`,
                          });
                        }
                      },
                    });
                  }
                  else {
                    setIsShowCitySelect(value);
                  }
            }}
            onCapacityChanged={value => {
              setCapacity(value);
            }}
            onSearch={() => {
              setUserPage(1);
              setHasMoreUser(true);
              setPropertyPage(1);
              setHasMoreProperty(true);
              setActivityPage(1);
              setHasMoreActivity(true);

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
          {loading && <View className='loading-tips'>加载中...</View>}
          {!hasMoreUser && activeTab === '友友' && curList.length > 0 && (
            <View className='no-more-tips'>没有更多数据了</View>
          )}
          {!hasMoreProperty && activeTab === '房源' && curList.length > 0 && (
            <View className='no-more-tips'>没有更多数据了</View>
          )}
          {!hasMoreActivity && activeTab === '活动' && curList.length > 0 && (
            <View className='no-more-tips'>没有更多数据了</View>
          )}
        </View>
      </View>

      <TabBar
        onWorldSelected={() => {
          // 如果当前已经在世界tab，可以触发刷新或回到顶部等操作
          if (activeTab === '友友') {
            // 可以添加你的刷新逻辑
          }
        }}
        setIsShowPostModal={handlePostModalOpen}
        isShowPostModal={isShowPostModal}
      />
    </>
  );
};

export default observer(HomeWorld);
