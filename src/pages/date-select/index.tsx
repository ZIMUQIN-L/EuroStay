import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import './index.scss';
import { AtCalendar } from 'taro-ui';
import { formatToday } from '@utils/dateUtil';

const DateSelect = () => {
  const today = formatToday();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const handleDateChange = (startValue, endValue) => {
    setStartDate(startValue);
    setEndDate(endValue);
  };

  return (
    <View className='date-select'>
      <View className='calendar-container'>
        <AtCalendar
          isMultiSelect
          currentDate={{ start: startDate, end: endDate }}
          // validRange={{ start: today }} // 有效日期范围
          minDate={today}
          onDayClick={date => {
            const selectedDate = date.value;
            if (selectedDate < startDate) {
              setStartDate(selectedDate);
              setEndDate(null);
              setIsSelected(true);
              return;
            }
            if (isSelected) {
              setEndDate(selectedDate);
              setIsSelected(false);
              return;
            }
            setStartDate(selectedDate);
            setEndDate(null);
            setIsSelected(true);
          }}
          style={{ width: '100%' }}
        />
      </View>
    </View>
  );
};

export default DateSelect;
