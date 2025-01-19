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
import { premiumActivitySearch } from '@common/database/activityInfo/activityInfo';
import hostAdPicTestTest from './host-ad-toscana-florence.png';
import ActivityCard from '@components/ActivityCard';
import { PurpleCalendar, PurpleMap } from '@utils/cloudIcons';
import Popup from '../../../packageHouse/house-post/popup';
import { AtCalendar } from 'taro-ui';
import { formatToday, calculateDaysBetweenDates } from '@utils/dateUtil';
/**
 *
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
  const [curButton, setCurButton] = useState<string>('houses');

  const handleDestinationChange = inputDestination => {
    setUserDestination(inputDestination);
  };

  const [userStartDate, setUserStartDate] = useState<Date>();
  const [userEndDate, setUserEndDate] = useState<Date>();
  const [isClickedSearch, setIsClickedSearch] = useState<Boolean>(false);

  // const handleDateChange = (startDate: Date, endDate: Date) => {
  //   setUserStartDate(startDate);
  //   setUserEndDate(endDate);
  // };

  // delete the testdata for now
  const [demoData, setDemoData] = useState<HouseItemProps[]>([]);

  // const fetchInitialData = () => {
  //   houseInfoSearch('', '', '').then((houseData: HouseItemProps[]) => {
  //     console.log('iniiiii houseData', houseData);
  //     setDemoData(houseData);
  //   });
  // };

  const fetchInitialData = () => {
    Promise.all([houseInfoSearch('', '', ''), premiumActivitySearch()])
      .then(([houseData, activityData]) => {
        // const combined = [...houseData, ...activityData].sort((a, b) => {
        //   // 这里可以添加排序逻辑,例如按创建时间排序
        //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        // });
        const combined = [...activityData, ...houseData];
        setDemoData(combined);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchInitialData();

    // // 显示广告3秒后隐藏
    // const adTimer = setTimeout(() => {
    //   setShowAd(false);
    // }, 300000);

    // return () => clearTimeout(adTimer);
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
  const [isShowSeachPage, setIsShowSearchPage] = useState(false);

  const handleActivityClick = (activityId: string) => {
    Taro.navigateTo({
      url: `/packageActivity/activity-detail/index?id=${activityId}`, // 跳转到活动详情页面
    });
  };
  const [isShowPost, setIsShowPost] = useState(false);

  const onClickPostSeek = () => {
    Taro.navigateTo({
      url: `../../packageHouse/seek-post/index?id=none`,
    });
  };

  const onClickPostActivity = () => {
    Taro.navigateTo({
      url: `../../packageActivity/activity-post/index?id=none`,
    });
  };

  const onClickPostHouse = () => {
    Taro.navigateTo({
      url: '../../packageHouse/house-post/index',
    });
  };
  const today = formatToday();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(null);
  const handleDateChange = (startValue, endValue) => {
    setStartDate(startValue);
    setEndDate(endValue);
  };
  const handleDayClick = date => {
    const selectedDate = date.value;
    if (
      selectedDate < today ||
      (startDate != null && selectedDate < startDate)
    ) {
      handleDateChange(selectedDate, null);
      return;
    }
    if (!startDate) {
      handleDateChange(selectedDate, null);
    } else if (!endDate) {
      setEndDate(selectedDate);
      handleDateChange(startDate, selectedDate);
      const calculatedDays = calculateDaysBetweenDates(startDate, selectedDate);
    } else {
      setStartDate(selectedDate);
      setEndDate(null);
      handleDateChange(selectedDate, null);
    }
  };
  const [isShowCalendarPopup, setIsShowCalendarPopup] = useState(false);
  return (
    <View className='home' id='home'>
      {isShowSeachPage && (
        <View className='home-search-page'>
          <View className='home-search-title'>
            搜索<View className='highlight'>地点</View>和
            <View className='highlight'>时间</View>开启您的探索之旅吧~
          </View>
          <View className='home-search-detail'>
            <View className='home-search-location'>
              <Image src={PurpleMap} className='purple-map'></Image>
              <View className='text'>地点</View>
            </View>
            <View
              className='home-search-time'
              onClick={() => {
                setIsShowCalendarPopup(true);
              }}
            >
              <Image src={PurpleCalendar} className='purple-calendar'></Image>
              <View className='text'>时间</View>
            </View>
          </View>
          <View
            className='home-search-bar'
            onClick={() => {
              setIsShowSearchPage(false);
            }}
          >
            搜索
          </View>
          {isShowCalendarPopup && (
            <Popup
              onClickClose={() => {
                setIsShowCalendarPopup(false);
              }}
              onClickConfirm={() => {
                setIsShowCalendarPopup(false);
              }}
              title={'选择日期'}
              content={
                <View className='calendar-wrapper'>
                  <AtCalendar
                    isMultiSelect
                    currentDate={{ start: startDate, end: endDate }}
                    // validRange={{ start: today }} // 有效日期范围
                    minDate={today}
                    onDayClick={handleDayClick}
                    style={{ width: '100%' }}
                  />
                </View>
              }
            />
          )}
        </View>
      )}
      {isShowPost && (
        <View
          className='page-post-modal'
          onClick={() => {
            setIsShowPost(false);
          }}
        >
          <Button
            className='close-text-button'
            onClick={() => {
              setIsShowPost(false);
            }}
          >
            关闭
          </Button>
          <Button
            className='activity-text-button'
            onClick={onClickPostActivity}
          >
            发布活动
          </Button>

          <Button className='house-text-button' onClick={onClickPostHouse}>
            发布房源
          </Button>

          <Button
            className='house-request-text-button'
            onClick={onClickPostSeek}
          >
            发布求宿
          </Button>
        </View>
      )}

      <>
        <View className='homepage-buttons'>
          <View
            className='homepage-likes'
            onClick={() => {
              setCurButton('likes');
            }}
          >
            <Image src=''></Image>
            收藏
          </View>
          <View
            className='homepage-houses'
            onClick={() => {
              setCurButton('houses');
            }}
          >
            <Image src=''></Image>
            房源
          </View>
          <View
            className='homepage-activities'
            onClick={() => {
              setCurButton('activities');
            }}
          >
            <Image src=''></Image>
            活动
          </View>
          <View
            className='homepage-user'
            onClick={() => {
              setCurButton('users');
            }}
          >
            <Image src=''></Image>
            用户
          </View>
        </View>
        <View
          className='home-search-bar'
          onClick={() => {
            setIsShowSearchPage(true);
          }}
        >
          搜索
        </View>
        {/* {isClickedSearch ? (
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
        )} */}
        {demoData.length === 0 ? (
          <View>
            <Image src={NoDataLogo} />
            <Text className='home-nodata-container'>暂未查询到数据~</Text>
          </View>
        ) : curButton == 'houses' ? (
          <View className='house-list'>
            {demoData.map(item => {
              if (!item.premiumHost)
                return <HouseItem key={item._id} {...item} />;
            })}
          </View>
        ) : (
          curButton == 'activities' && (
            <View className='house-list'>
              {demoData.map(item =>
                item.premiumHost ? ( // 否则为活动
                  <ActivityCard
                    activity={item}
                    onClick={() => handleActivityClick(item._id)}
                  />
                ) : null,
              )}
            </View>
          )
        )}
        <View className='index'>
          <CustomTabBar onHomeSelected={resetState} />
        </View>
      </>
    </View>
  );
  // return (
  //   <View className='home' id='home'>
  //     {showAd ? (
  //       <View className='ad-modal'>
  //         <View className='ad-content'>
  //           <Image className='ad-image' src={hostAdPicTestTest} />
  //           <Close className='close-icon' onClick={handleCloseAd} />
  //         </View>
  //       </View>
  //     ) : (
  //       <>
  //         {isClickedSearch ? (
  //           <SearchAndFilter
  //             onDestinationChange={handleDestinationChange}
  //             onDateChange={handleDateChange}
  //             onClickSearch={handleClickSearch}
  //             userStartDate={userStartDate}
  //             userEndDate={userEndDate}
  //             destination={userDestination}
  //             onClickFilterData={handleClickFilter}
  //           />
  //         ) : (
  //           <SearchCard
  //             onDestinationChange={handleDestinationChange}
  //             onDateChange={handleDateChange}
  //             onClickSearch={handleClickSearch}
  //             searchType='houses'
  //           />
  //         )}
  //         {demoData.length === 0 ? (
  //           <View>
  //             <Image src={NoDataLogo} />
  //             <Text className='home-nodata-container'>暂未查询到数据~</Text>
  //           </View>
  //         ) : (
  //           <View className='house-list'>
  //             {demoData.map(item => (
  //               item.premiumHost ? ( // 否则为活动
  //                 <ActivityCard
  //                   // key={item._id}
  //                   activity={item}
  //                   onClick={() => handleActivityClick(item._id)}
  //                   // isPremiumHost={item.premiumHost !== undefined} // 根据需要传递属性
  //                 />
  //               ) : ( // 判断是否为房源
  //                 <HouseItem key={item._id} {...item} />
  //               )
  //             ))}
  //           </View>
  //         )}
  //         <View className='index'>
  //           <CustomTabBar onHomeSelected={resetState} />
  //         </View>
  //       </>
  //     )}
  //   </View>
  // );
};

export default Houses;
