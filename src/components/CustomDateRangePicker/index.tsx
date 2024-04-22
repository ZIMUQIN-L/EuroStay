import { AtCalendar } from 'taro-ui';
import { View, Text } from '@tarojs/components';
import { AtToast } from 'taro-ui';
import { useState, useEffect } from 'react';
import { formatToday, calculateDaysBetweenDates } from '@utils/dateUtil';
import './index.scss';

const CustomDateRangePicker = () => {
  const today = formatToday();
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpened, setIsToastOpened] = useState(false);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [days, setDays] = useState(0);

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
    setIsSelected(true);
    setIsToastOpened(false);
    if (!startDate) {
      handleDateChange(selectedDate, null);
    } else if (!endDate) {
      setEndDate(selectedDate);
      handleDateChange(startDate, selectedDate);
    } else {
      setStartDate(selectedDate);
      setEndDate(null);
      handleDateChange(selectedDate, null);
    }
    if (startDate && endDate) {
      const calculatedDays = calculateDaysBetweenDates(startDate, endDate);
      setDays(calculatedDays);
    } else if (!endDate) {
      setDays(1);
    } else {
      setDays(0);
    }
  };

  const getButtonLabel = () => {
    if (!isSelected) {
      return '入住退房日期';
    }

    if (endDate === null || startDate === endDate) {
      return startDate;
    }

    return `${startDate} 至 ${endDate}`;
  };

  // 切换日历的显示状态
  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  return (
    <View style={{ width: '100%' }}>
      <View onClick={toggleCalendar} className='calendar'>
        <Text className='date-text'>{getButtonLabel()}</Text>
        <Text className='nights-text'>共{days}晚</Text>
      </View>

      <AtToast
        isOpened={isToastOpened}
        text={errorMsg}
        onClose={() => setIsToastOpened(false)}
      />
      {isCalendarVisible && ( // 仅在可见时显示日历
        <AtCalendar
          isMultiSelect
          currentDate={{ start: startDate, end: endDate }}
          // validRange={{ start: today }} // 有效日期范围
          minDate={today}
          onDayClick={handleDayClick}
          style={{ width: '100%' }}
        />
      )}
    </View>
  );
};

export default CustomDateRangePicker;
