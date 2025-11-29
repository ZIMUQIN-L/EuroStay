import { View, Text, Image } from '@tarojs/components';
import HomepageCard from '@components/HomepageCard';
import { observer } from 'mobx-react';
import './index.scss';
import HomepageSearch from '@components/HomepageSearch';
import { useEffect, useMemo, useState } from 'react';
import Taro, {
  useReachBottom,
} from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';
import { getCurrentInstance } from '@tarojs/taro';
import DateSelect from '@components/DateSelect';
import {
  homeUserProps,
  homeActivityProps,
  homePropertyProps,
  LocationData,
  CombinedLocationData,
  TravelData
} from '@utils/interfaces';
import CitySelect from '@components/CitySelect';
import TabBar from '@components/TabBar';
import { API } from '@utils/apiService';
import WelcomeModal from '@components/WelcomeModal';

type TabType = '房源' | '旅行者';

// Home item type
type HomeItemType = {
  user: homeUserProps;
  property: homePropertyProps;
  travel?: TravelData;
};

const HomeWorld = () => {
  const [activeTab, setActiveTab] = useState<TabType>('房源');
  const instance = getCurrentInstance();
  const [userList, setUserList] = useState<HomeItemType[]>([]);
  const [propertyList, setPropertyList] = useState<HomeItemType[]>([]);
  // 添加弹窗状态
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const curList: HomeItemType[] = useMemo(() => {
    switch (activeTab) {
      case '旅行者':
        return userList;
      case '房源':
        return propertyList;
      default:
        return [];
    }
  }, [activeTab, userList, propertyList]);

  const [location, setLocation] = useState<CombinedLocationData>({
    countryId: null,
    cityId: null,
    displayName: '选择国家和城市',
    countryName: '',
    cityName: ''
  });
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

  // 为每个tab创建独立的hasMore状态
  const [hasMoreUser, setHasMoreUser] = useState(true);
  const [hasMoreProperty, setHasMoreProperty] = useState(true);

  // 添加页码和加载状态
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveTab('房源');
    fetchUserList();
    fetchPropertyList({
      country: location.countryId,
      city: location.cityId,
      startDate: startDate,
      endDate: endDate,
      people: capacity,
      order: 1,
    });
    
    // 显示欢迎弹窗
    setShowWelcomeModal(true);
  }, []);

  // 获取用户列表
  const fetchUserList = async (params = {}, isLoadMore = false) => {
    if (loading) return;
    if (isLoadMore && !hasMoreUser) return;

    try {
      setLoading(true);
      const currentPage = isLoadMore ? userPage : 1;

      const result = await API.user.getUserList({
        page: currentPage,
        country: null,
        city: null,
        startDate: null,
        endDate: null,
        people: null,
        sort: 0,
        ...params
      });

      if (isLoadMore) {
        setUserList(prev => [...prev, ...result.data]);
        if (result.current_page >= result.last_page) {
          setHasMoreUser(false);
        } else {
          setUserPage(currentPage + 1);
        }
      } else {
        setUserList(result.data);
        setUserPage(2);
        setHasMoreUser(result.current_page < result.last_page);
      }
    } catch (error) {
      console.error('获取用户列表失败', error);
    } finally {
      setLoading(false);
    }
  };

  // 获取房源列表
  const fetchPropertyList = async (params = {}, isLoadMore = false) => {
    if (loading) return;
    if (isLoadMore && !hasMoreProperty) return;

    try {
      setLoading(true);
      const currentPage = isLoadMore ? propertyPage : 1;

      const result = await API.property.getPropertyList({
        page: currentPage,
        ...params
      });

      if (isLoadMore) {
        setPropertyList(prev => [...prev, ...result.data]);
        if (result.current_page >= result.last_page) {
          setHasMoreProperty(false);
        } else {
          setPropertyPage(currentPage + 1);
        }
      } else {
        setPropertyList(result.data);
        setPropertyPage(2);
        setHasMoreProperty(result.current_page < result.last_page);
      }
    } catch (error) {
      console.error('获取房源列表失败', error);
    } finally {
      setLoading(false);
    }
  };

  // 处理触底加载
  const handleLoadMore = () => {
    if (!activeTab || loading) return;

    if (
      (activeTab === '旅行者' && !hasMoreUser) ||
      (activeTab === '房源' && !hasMoreProperty)
    ) {
      return;
    }

    console.log("start loading more");

    if (activeTab === '旅行者') {
      fetchUserList({}, true);
    } else if (activeTab === '房源') {
      fetchPropertyList({
        country: location.countryId,
        city: location.cityId,
        startDate: startDate,
        endDate: endDate,
        people: capacity,
        order: 1,
      }, true);
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
    setLocation({
      countryId: null,
      cityId: null,
      displayName: '选择国家和城市',
      countryName: '',
      cityName: ''
    });
    setStartDate('');
    setEndDate('');
    setCapacity(1);
  }, [activeTab]);

  // 在关闭 modal 时恢复滚动位置
  useEffect(() => {
    if (!isShowPostModal && scrollTop > 0) {
      window.scrollTo(0, scrollTop);
    }
  }, [isShowPostModal]);

  // 处理弹窗关闭
  const handleCloseModal = () => {
    setShowWelcomeModal(false);
  };

  // 处理下载APP
  const handleDownloadApp = () => {
    // 这里可以添加下载APP的逻辑
    Taro.showToast({
      title: '跳转下载页面',
      icon: 'success'
    });
    setShowWelcomeModal(false);
  };

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
        onCitySelected={combinedLocation => {
          setLocation(combinedLocation);
          if (activeTab === '房源') {
            fetchPropertyList({
              country: combinedLocation.countryId,
              city: combinedLocation.cityId,
              startDate: startDate,
              endDate: endDate,
              people: capacity,
              order: 1,
            });
          } else if (activeTab === '旅行者') {
            fetchUserList({
              country: combinedLocation.countryId,
              city: combinedLocation.cityId,
              startDate: startDate,
              endDate: endDate,
              people: capacity,
              order: 1,
            });
          }
          setIsShowCitySelect(false);
        }}
      />
    );
  }

  return (
    <>
      {/* 欢迎弹窗组件 */}
      <WelcomeModal
        visible={showWelcomeModal}
        onClose={handleCloseModal}
        onDownload={handleDownloadApp}
      />

      <View className={`home-search ${isShowPostModal ? 'modal' : ''}`}>
        <View className='tab-container'>
          <View
            className={`tab-item ${activeTab === '房源' ? 'active' : ''}`}
            onClick={() => setActiveTab('房源')}
          >
            房源
          </View>
          <View
            className={`tab-item ${activeTab === '旅行者' ? 'active' : ''}`}
            onClick={() => setActiveTab('旅行者')}
          >
            旅行者
          </View>
        </View>

        <View className='content-container'>
          {activeTab !== '旅行者' && (
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
                if (activeTab === '房源') {
                  fetchPropertyList({
                    country: location.countryId,
                    city: location.cityId,
                    startDate: startDate,
                    endDate: endDate,
                    people: capacity,
                    order: 1,
                  });
                } else if (activeTab === '旅行者') {
                  fetchUserList({
                    country: location.countryId,
                    city: location.cityId,
                    startDate: startDate,
                    endDate: endDate,
                    people: capacity,
                    order: 1,
                  });
                }
              }}
            />
          )}

          <View className='home-user-wrapper'>
            {activeTab === '旅行者' &&
              userList.map((item, index) => {
                return (
                  <HomepageCard
                    key={`${activeTab}-${index}`}
                    id={`${activeTab}-${index}`}
                    {...{ ...item, activeTab: activeTab }}
                  />
                );
              })}
            {activeTab === '房源' &&
              propertyList.map((item, index) => {
                return (
                  <HomepageCard
                    key={`${activeTab}-${index}`}
                    id={`${activeTab}-${index}`}
                    {...{ ...item, activeTab: activeTab }}
                  />
                );
              })}

            {/* 添加加载状态提示 */}
            {loading && <View className='loading-tips'>加载中...</View>}
            {!hasMoreUser && activeTab === '旅行者' && curList.length > 0 && (
              <View className='no-more-tips'>没有更多数据了</View>
            )}
            {!hasMoreProperty && activeTab === '房源' && curList.length > 0 && (
              <View className='no-more-tips'>没有更多数据了</View>
            )}
          </View>
        </View>
      </View>

      <TabBar
        onWorldSelected={() => {
          // 如果当前已经在世界tab，可以触发刷新或回到顶部等操作
          if (activeTab === '旅行者') {
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
