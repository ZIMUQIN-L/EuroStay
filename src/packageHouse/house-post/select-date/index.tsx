import { View, Text, Image, Textarea } from '@tarojs/components';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  formatToday,
  calculateDaysBetweenDates,
  formatTimestamp,
} from '@utils/dateUtil';
import { AtCalendar } from 'taro-ui';
interface IProps {
  selectDataList: [];
  onChange: (_) => void;
}

export default (props: IProps) => {
  const currentDateMulti = useRef(formatToday());
  const today = formatToday();
  // 多选 不连续 多选 选择的日期 [{ value: '2024-06-10' }, { value: '2024-06-12' }]
  const [selectDataList, setSelectDataList] = useState(props.selectDataList);
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const startDate = useRef(formatToday());
  const selectDateMulti = data => {
    // 先赋值，防止dom不变
    if (isStartDateSelected) {
      currentDateMulti.current = data.value;
      const list = JSON.parse(JSON.stringify(selectDataList));
      console.log(
        data.value,
        calculateDaysBetweenDates(startDate.current, data.value),
      );
      for (
        let i = 0;
        i <= calculateDaysBetweenDates(startDate.current, data.value);
        i++
      ) {
        console.log(
          'add gap',
          formatTimestamp(
            new Date(startDate.current).getTime() + i * 24 * 60 * 60 * 1000,
          ),
        );
        list.push({
          value: formatTimestamp(
            new Date(startDate.current).getTime() + i * 24 * 60 * 60 * 1000,
          ),
        });
      }
      setSelectDataList(JSON.parse(JSON.stringify(list)));
      props.onChange(JSON.parse(JSON.stringify(list)));
      setIsStartDateSelected(false);
    } else {
      setIsStartDateSelected(true);
      startDate.current = data.value;
    }
  };

  return (
    <View className='select-date'>
      <View className='select-date-title'>房源空闲档期</View>

      <View className='select-date-des'>选择您可以接待房客的时间</View>
      <View className='calendar-wrapper'>
        <AtCalendar
          multiple={true}
          // multiple={true}
          isMultiSelect
          // marks={selectDataList.current}
          currentDate={currentDateMulti.current}
          marks={selectDataList}
          // validRange={{ start: today }} // 有效日期范围
          minDate={today}
          onDayClick={selectDateMulti}
          style={{ width: '100%' }}
        />
      </View>
    </View>
  );
};
