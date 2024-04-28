import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useState } from 'react';
import './index.scss';
import CustomDateRangePicker from '@components/CustomDateRangePicker';

const DateSelection = ({ onClose }) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    console.log(startDate, endDate);
  };

  return (
    <CustomFullScreenDialog title='选择可住时间' onClose={onClose}>
      <View className='date-picker'>
        <CustomDateRangePicker onDateChange={handleDateChange} />
      </View>
    </CustomFullScreenDialog>
  );
};
export default DateSelection;
