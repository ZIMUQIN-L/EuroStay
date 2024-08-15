import { View, Image, Text, Button } from '@tarojs/components';
import CustomTabBar from '@components/CustomTabBar';
import SearchCard from '../search-section';
import './index.scss';
import Taro, { useReachBottom } from '@tarojs/taro';
import { useState, useEffect } from 'react';
import HouseItem from '../house-item';
import { houseInfoSearch } from '@common/database/house/house';
import { HouseItemProps } from '@utils/interfaces';
import SearchAndFilter from '../search-and-filter';
import { NoDataLogo } from '@utils/cloudIcons';
import hostAdPic from '@assets/images/host-ad-toscana-florence.png';
import { Close } from '@taroify/icons'; 
import hostAdPicTest from './home.png'; 
import hostAdPicTestTest from './host-ad-toscana-florence.png'

/**
 * 主页的房源列表板块
 */
const Houses = () => {
  Taro.useShareAppMessage(() => {
    return {
      title: 'EuroStay欧洲换宿',
      path: `/pages/index/index`,
    };
  });
  // 上拉进行加载，获取更多房源
  useReachBottom(() => {
    houseInfoSearch(
      userDestination,
      userStartDate,
      userEndDate,
      1,
      {},
      {},
      {},
      demoData.length,
    ).then((houseData: HouseItemProps[]) => {
      setDemoData(prevData => [...prevData, ...houseData]);
    });
  });
  const [showAd, setShowAd] = useState(true);
  const [userDestination, setUserDestination] = useState<string>('');

  const handleDestinationChange = inputDestination => {
    setUserDestination(inputDestination);
  };

  const [userStartDate, setUserStartDate] = useState<Date>();
  const [userEndDate, setUserEndDate] = useState<Date>();
  const [isClickedSearch, setIsClickedSearch] = useState<Boolean>(false);

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setUserStartDate(startDate);
    setUserEndDate(endDate);
  };

  // delete the testdata for now
  const [demoData, setDemoData] = useState<HouseItemProps[]>([]);

  const fetchInitialData = () => {
    houseInfoSearch('', '', '').then((houseData: HouseItemProps[]) => {
      setDemoData(houseData);
    });
  };

  useEffect(() => {
    fetchInitialData();

    // 显示广告3秒后隐藏
    const adTimer = setTimeout(() => {
      setShowAd(false);
    }, 300000);

    return () => clearTimeout(adTimer);
  }, []);
  // useEffect(() => {
  //   houseInfoSearch('阿姆', '2024-03-24', '2024-03-24').then(
  //     (houseData: HouseItemProps[]) => {
  //       setDemoData(houseData); // Update demoData state with the fetched data
  //     },
  //   );
  // }, []);

  const handleClickSearch = () => {
    houseInfoSearch(userDestination, userStartDate, userEndDate).then(
      (houseData: HouseItemProps[]) => {
        setDemoData(houseData);
      },
    );

    setIsClickedSearch(true);
  };
  const resetState = () => {
    setUserDestination('');
    setUserStartDate(undefined);
    setUserEndDate(undefined);
    setIsClickedSearch(false);
    fetchInitialData();
  };

  // 使用filter进行查询
  const handleClickFilter = (houseData: HouseItemProps[]) => {
    setDemoData(houseData);
  };

  const handleCloseAd = () => {
    setShowAd(false);
  };

  return (
    <View className='home' id='home'>
      {showAd ? (
        <View className='ad-modal'>
          <View className='ad-content'>
            <Text>测试文字，看看是否显示</Text>
            <Image className='ad-image' src={hostAdPicTest}   onLoad={() => console.log('Image loaded successfully!')}
  onError={() => console.log('Failed to load image!')}/>
            <Image className='ad-image' src={hostAdPicTestTest} />
            <Close className='close-icon' onClick={handleCloseAd} />
          </View>
        </View>
      ) : (
        <>
          {isClickedSearch ? (
            <SearchAndFilter
              onDestinationChange={handleDestinationChange}
              onDateChange={handleDateChange}
              onClickSearch={handleClickSearch}
              userStartDate={userStartDate}
              userEndDate={userEndDate}
              destination={userDestination}
              onClickFilterData={handleClickFilter}
            />
          ) : (
            <SearchCard
              onDestinationChange={handleDestinationChange}
              onDateChange={handleDateChange}
              onClickSearch={handleClickSearch}
              searchType='houses'
            />
          )}
          {demoData.length === 0 ? (
            <View>
              <Image src={NoDataLogo} />
              <Text className='home-nodata-container'>暂未查询到数据~</Text>
            </View>
          ) : (
            <View className='house-list'>
              {demoData.map(house => (
                <HouseItem key={house._id} {...house} />
              ))}
            </View>
          )}
          <View className='index'>
            <CustomTabBar onHomeSelected={resetState} />
          </View>
        </>
      )}
    </View>
  );
};

export default Houses;
