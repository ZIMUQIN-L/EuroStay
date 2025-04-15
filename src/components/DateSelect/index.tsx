import { View } from '@tarojs/components';
import { useState } from 'react';
import './index.scss';
import { AtCalendar } from 'taro-ui';
import { formatToday } from '@utils/dateUtil';
import Taro from '@tarojs/taro';
interface IProps {
  onDateChanged: (value1: string, value2: string) => void;
  onCancel: () => void;
}

const DateSelect = (props: IProps) => {
  const today = formatToday();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

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
      <View className='date-select-button'>
        <View
          className='date-select-button-confirm'
          onClick={() => {
            if (!startDate || !endDate) {
              Taro.showToast({
                title: '请选择日期',
                icon: 'none',
              });
              return;
            }
            props.onDateChanged(startDate, endDate);
          }}
        >
          确定
        </View>
        <View
          className='date-select-button-cancel'
          onClick={() => {
            props.onCancel();
          }}
        >
          取消
        </View>
      </View>
    </View>
  );
};

export default DateSelect;
