import { View } from '@tarojs/components';
import HomepageCard from '@components/HomepageCard';
import { observer } from 'mobx-react';
import './index.scss';
import HomepageSearch from '@components/HomepageSearch';
import { useEffect, useState } from 'react';
import Taro, { useReachBottom } from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';
import { homeUserProps, homePropertyProps, CombinedLocationData } from '@utils/interfaces';
import CitySelect from '@components/CitySelect';
import TabBar from '@components/TabBar';
import { API } from '@utils/apiService';
import WelcomeModal from '@components/WelcomeModal';

type HomeItemType = {
  user: homeUserProps;
  property: homePropertyProps;
};

const HomeWorld = () => {
  const [propertyList, setPropertyList] = useState<HomeItemType[]>([]);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [location, setLocation] = useState<CombinedLocationData>({
    countryId: null,
    cityId: null,
    displayName: '选择国家和城市',
    countryName: '',
    cityName: '',
  });
  const [isShowCitySelect, setIsShowCitySelect] = useState(false);
  const [isShowPostModal, setIsShowPostModal] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [propertyPage, setPropertyPage] = useState(1);
  const [hasMoreProperty, setHasMoreProperty] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPropertyList({ country: null, city: null });
    setShowWelcomeModal(true);
  }, []);

  const fetchPropertyList = async (
    params: { country?: number | null; city?: number | null },
    isLoadMore = false,
  ) => {
    if (loading) return;
    if (isLoadMore && !hasMoreProperty) return;

    try {
      setLoading(true);
      const currentPage = isLoadMore ? propertyPage : 1;

      const result = await API.property.getPropertyList({
        page: currentPage,
        country: params.country,
        city: params.city,
        sort: 0,
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

  useReachBottom(() => {
    if (!loading && hasMoreProperty) {
      fetchPropertyList({ country: location.countryId, city: location.cityId }, true);
    }
  });

  const handlePostModalOpen = (show: boolean) => {
    if (show) {
      setScrollTop(document.documentElement.scrollTop || document.body.scrollTop);
    }
    setIsShowPostModal(show);
  };

  useEffect(() => {
    if (!isShowPostModal && scrollTop > 0) {
      window.scrollTo(0, scrollTop);
    }
  }, [isShowPostModal]);

  if (isShowCitySelect) {
    return (
      <CitySelect
        onCitySelected={combinedLocation => {
          setLocation(combinedLocation);
          fetchPropertyList({ country: combinedLocation.countryId, city: combinedLocation.cityId });
          setIsShowCitySelect(false);
        }}
      />
    );
  }

  return (
    <>
      <WelcomeModal
        visible={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        onDownload={() => {
          Taro.showToast({ title: '跳转下载页面', icon: 'success' });
          setShowWelcomeModal(false);
        }}
      />

      <View className={`home-search ${isShowPostModal ? 'modal' : ''}`}>
        <HomepageSearch
          startDate=''
          endDate=''
          activeTab='房源'
          isShowDateSelectProps={false}
          onDateSelectChange={() => {}}
          location_={location}
          onCitySelectChange={() => {
            if (GlobalStore.userInfo?.uid === 0) {
              Taro.showModal({
                title: '转至登录页面',
                content: '请登录后选择~',
                success: res => {
                  if (res.confirm) Taro.reLaunch({ url: '/pages/login/index' });
                },
              });
            } else {
              setIsShowCitySelect(true);
            }
          }}
          onCapacityChanged={() => {}}
          onSearch={() => {
            fetchPropertyList({ country: location.countryId, city: location.cityId });
          }}
        />

        <View className='home-user-wrapper'>
          {propertyList.map((item, index) => (
            <HomepageCard
              key={`property-${index}`}
              id={`property-${index}`}
              {...{ ...item, activeTab: '房源' }}
            />
          ))}
          {loading && <View className='loading-tips'>加载中...</View>}
          {!hasMoreProperty && propertyList.length > 0 && (
            <View className='no-more-tips'>没有更多了</View>
          )}
        </View>
      </View>

      <TabBar
        onWorldSelected={() => {}}
        setIsShowPostModal={handlePostModalOpen}
        isShowPostModal={isShowPostModal}
      />
    </>
  );
};

export default observer(HomeWorld);
