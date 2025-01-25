import { View, Image, Text, Button } from '@tarojs/components';
import CustomTabBar from '@components/CustomTabBar';
import './index.scss';
import Taro, { useReachBottom } from '@tarojs/taro';
import { useState, useEffect } from 'react';
import HouseItem from '../house-item';
import { houseInfoSearch } from '@common/database/house/house';
import { HouseItemProps } from '@utils/interfaces';
import { NoDataLogo } from '@utils/cloudIcons';
import ActivityCard from '@components/ActivityCard';
import { PurpleCalendar, PurpleMap } from '@utils/cloudIcons';
import { POST } from '@utils/post';

import Popup from '../../../packageHouse/house-post/popup';
import { AtCalendar } from 'taro-ui';
import {
  formatToday,
  calculateDaysBetweenDates,
  formatDate,
} from '@utils/dateUtil';
import GlobalStore from '@store/GlobalStore';
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
  //暂时不要删除
  // useReachBottom(() => {
  //   houseInfoSearch(
  //     userDestination,
  //     userStartDate,
  //     userEndDate,
  //     1,
  //     {},
  //     {},
  //     {},
  //     demoData.length,
  //   ).then((houseData: HouseItemProps[]) => {
  //     setDemoData(prevData => [...prevData, ...houseData]);
  //   });
  // });

  const [userDestination, setUserDestination] = useState<string>('');
  const [curButton, setCurButton] = useState<string>('houses');

  const [userStartDate, setUserStartDate] = useState<Date>();
  const [userEndDate, setUserEndDate] = useState<Date>();
  const [isClickedSearch, setIsClickedSearch] = useState<Boolean>(false);

  // delete the testdata for now
  const [demoData, setDemoData] = useState<HouseItemProps[]>([]);
  const [token, setToken] = useState('');
  const [houseList, setHouseList] = useState([]);

  useEffect(() => {
    Taro.request({
      url: 'https://api.eurostay.co/app/property/defaultList',
      method: 'POST',
      data: {
        endDate: '',
        myUid: 1,
        order: 'DES_PRICE',
        page: 0,
        searchableLocation: '',
        startDate: '',
        tags: [],
      },
      header: {
        'Content-Type': 'application/json',
        token: GlobalStore.userInfo.token,
      },
    })
      .then(res => {
        if (res.statusCode == 200) {
          console.log(res.data.result.data);
          setHouseList(res.data.result.data);
        }
      })
      .catch(err => {
        console.error('Request failed');
        return 1;
      });
  }, []);

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
  const [isShowSeachPage, setIsShowSearchPage] = useState(false);

  const handleActivityClick = (activityId: string) => {
    Taro.navigateTo({
      url: `/packageActivity/activity-detail/index?id=${activityId}`, // 跳转到活动详情页面
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
        {houseList?.length === 0 ? (
          <View>
            <Image src={NoDataLogo} />
            <Text className='home-nodata-container'>暂未查询到数据~</Text>
          </View>
        ) : curButton == 'houses' ? (
          <View className='house-list'>
            {houseList.map(item => {
              return <HouseItem {...item} />;
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
};

export default Houses;
