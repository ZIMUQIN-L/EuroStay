import { Input, View, Text, Picker, Image } from '@tarojs/components';
import FilterSelectOff from '@assets/images/filter-select-off.svg';
import FilterSelectOn from '@assets/images/filter-select-on.svg';
import ButtonGroup from '../button-group';
import RightBottomArrowGrey from '@assets/images/right-bottom-arrow-grey.svg';
import YellowFilter from '@assets/images/filter-yellow.svg';
import FilterOn from '@assets/images/filter-on.svg';
import { useEffect, useState } from 'react';
import RightBottomArrow from '@assets/images/right-bottom-arrow.svg';
import './index.scss';
import { formatToday } from '@utils/dateUtil';
import { AtToast, AtCalendar } from 'taro-ui';
enum Gender {
  Female,
  Male,
  Default,
}
enum Number {
  Default,
  One,
  Two,
  Three,
  FourOrMore,
}

enum BedType {
  Default,
  DoubleBed,
  TwinBed,
  StapleBed,
}
enum Location {
  Within1KM,
  Within2KM,
  Within4KM,
  Within6KM,
  Within8KM,
  Within10KM,
  Default,
}

export default ({
  onDestinationChange,
  onDateChange,
  onClickSearch,
  userStartDate,
  userEndDate,
  destination,
}) => {
  const regions = ['欧洲'];
  const [isFilterOn, setIsFilterOn] = useState<Boolean>(false);
  const [region, setRegion] = useState('欧洲');
  const today = formatToday();
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpened, setIsToastOpened] = useState(false);
  const [startDate, setStartDate] = useState(
    userStartDate != null ? userStartDate : today,
  );
  const [endDate, setEndDate] = useState(
    userEndDate != null ? userEndDate : null,
  );
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [curFilterOption, setCurFilterOption] = useState<String>('number');
  const [curNum, setCurNum] = useState<Number>(Number.Default);
  const [curGender, setCurGender] = useState<Gender>(Gender.Default);
  const [curBed, setCurBed] = useState<BedType>(BedType.Default);
  const [curLocation, setCurLocation] = useState<Location>(Location.Default);
  const [userDestination, setUserDestination] = useState<string>('');

  useEffect(() => {
    setStartDate(userStartDate != null ? userStartDate : today);
    setEndDate(userEndDate != null ? userEndDate : null);
    setUserDestination(!!destination ? destination : '');
  }, []);

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
      setErrorMsg(
        selectedDate < today
          ? '不能选择今日之前的日期'
          : '终止日期不能小于起始日期',
      );
      handleDateChange(selectedDate, null);
      setIsToastOpened(true);
      return; // 阻止继续
    }
    setIsToastOpened(false);
    if (!startDate) {
      handleDateChange(selectedDate, null);
    } else if (!endDate) {
      setEndDate(selectedDate);
      handleDateChange(startDate, selectedDate);
      setIsCalendarVisible(false);
      onDateChange(startDate, selectedDate);
      onClickSearch();
    } else {
      setStartDate(selectedDate);
      setEndDate(null);
      handleDateChange(selectedDate, null);
    }
  };

  const handleRegionChange = e => {
    const index = e.detail.value;
    const selectedRegion = regions[index];
    setRegion(selectedRegion);
  };

  const handleDestinationChange = e => {
    const inputDestination = e.detail.value;
    setUserDestination(inputDestination);
    onDestinationChange(e.detail.value);
    onClickSearch(e.detail.value);
  };

  const filterOptions = [
    { text: '人数', value: 'number' },
    { text: '性别', value: 'gender' },
    { text: '床型', value: 'bed' },
    { text: '设备', value: 'facilities' },
    { text: '地理位置', value: 'location' },
  ];
  const numberButtonsValues = [
    { text: '1人', value: Number.One },
    { text: '2人', value: Number.Two },
    { text: '3人', value: Number.Three },
    { text: '4人及以上', value: Number.FourOrMore },
  ];
  const genderButtonsValues = [
    { text: '限女生', value: Gender.Female },
    { text: '限男生', value: Gender.Male },
    { text: '不限', value: Gender.Default },
  ];
  const bedButtonsValues = [
    { text: '大床房', value: BedType.DoubleBed },
    { text: '双床房', value: BedType.TwinBed },
    { text: '上下床', value: BedType.StapleBed },
  ];
  const locationButtonValues = [
    { text: '1km以内', value: Location.Within1KM },
    { text: '2km以内', value: Location.Within2KM },
    { text: '4km以内', value: Location.Within4KM },
    { text: '6km以内', value: Location.Within6KM },
    { text: '8km以内', value: Location.Within8KM },
    { text: '10km以内', value: Location.Within10KM },
  ];

  const buttonValuMap = {
    number: numberButtonsValues,
    gender: genderButtonsValues,
    bed: bedButtonsValues,
    location: locationButtonValues,
  };

  return (
    <View>
      <View
        className={
          !isFilterOn
            ? 'search-card-clicked-up'
            : 'search-card-clicked-up filter-on'
        }
      >
        <View
          className={
            !isFilterOn ? 'search-card-left' : 'search-card-left filter-on'
          }
        >
          <Picker
            className='region-input'
            mode='selector'
            range={regions}
            onChange={handleRegionChange}
          >
            <View className='picker'>
              <Text>{region}</Text>
              <Image src={RightBottomArrow} className='right-bottom-arrow' />
            </View>
          </Picker>
          <View className='vertical-line' />
          <Input
            className='destination-input'
            placeholder='目的地'
            value={userDestination}
            onInput={handleDestinationChange}
            placeholder-class='home-destination-input'
          />
          <View
            className='date-picker'
            onClick={() => {
              setIsCalendarVisible(!isCalendarVisible);
              setIsFilterOn(false);
            }}
          >
            <Text className={startDate && endDate ? 'selected' : ''}>
              {startDate != null && endDate != null
                ? `${startDate.replace(/\-/g, '.')} - ${endDate.replace(/\-/g, '.')}`
                : '添加日期'}
            </Text>
            <Image src={RightBottomArrowGrey} className='right-bottom-arrow' />
          </View>
          <AtToast
            isOpened={isToastOpened}
            text={errorMsg}
            onClose={() => setIsToastOpened(false)}
          />
          {isCalendarVisible && (
            <View className='calendar-block'>
              <AtCalendar
                isMultiSelect
                currentDate={{ start: startDate, end: endDate }}
                // validRange={{ start: today }} // 有效日期范围
                minDate={today}
                onDayClick={handleDayClick}
                style={{ width: '100%' }}
              />
            </View>
          )}
        </View>

        <View className='search-card-right'>
          <Image
            src={isFilterOn ? FilterOn : YellowFilter}
            className='filter'
            onClick={() => {
              setIsCalendarVisible(false);
              setIsFilterOn(!isFilterOn);
            }}
          />
        </View>
      </View>
      {isFilterOn ? (
        <View className='search-card-clicked-down'>
          <View className='filter-options'>
            {filterOptions.map((item, index) => {
              return (
                <View
                  id={item.value}
                  className={
                    curFilterOption == item.value ? 'option active' : 'option'
                  }
                  onClick={() => {
                    setCurFilterOption(item.value);
                  }}
                >
                  <View
                    className={
                      index == 0
                        ? 'option-text-block no-border'
                        : 'option-text-block'
                    }
                  >
                    {item.text}
                    <Image
                      src={
                        curFilterOption == item.value
                          ? FilterSelectOn
                          : FilterSelectOff
                      }
                      className='filter-select-icon'
                    />
                  </View>
                </View>
              );
            })}
          </View>
          {curFilterOption != 'facilities' ? (
            <ButtonGroup
              // @ts-ignore
              buttons={buttonValuMap[curFilterOption]}
              className={curFilterOption}
              onClickButton={value => {
                // @ts-ignore
                if (curFilterOption == 'bed') {
                  setCurBed(value);
                }
                if (curFilterOption == 'number') {
                  setCurNum(value);
                }
                if (curFilterOption == 'gender') {
                  setCurGender(value);
                }
                if (curFilterOption == 'location') {
                  setCurLocation(value);
                }
              }}
              // @ts-ignore
              curValue={
                curFilterOption == 'bed'
                  ? curBed
                  : curFilterOption == 'gender'
                    ? curGender
                    : curFilterOption == 'number'
                      ? curNum
                      : curLocation
              }
            />
          ) : null}

          <View className='reset-and-save'>
            <View
              className='reset'
              onClick={() => {
                setCurBed(BedType.Default);
                setCurGender(Gender.Default);
                setCurNum(Number.Default);
                setCurLocation(Location.Default);
              }}
            >
              重置
            </View>
            <View
              className='save'
              onClick={() => {
                setIsFilterOn(false);
              }}
            >
              保存
            </View>
          </View>
        </View>
      ) : null}
      {/* mask */}
      <View
        className={
          !isFilterOn ? 'search-card-clicked' : 'search-card-clicked-filteron'
        }
      />
    </View>
  );
};
