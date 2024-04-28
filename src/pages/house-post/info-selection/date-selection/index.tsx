import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useState } from 'react';
import './index.scss';
import CustomDateRangePicker from '@components/CustomDateRangePicker';

const DateSelection = ({ onClose, onDateSelected }) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    console.log(start, end);
  };

  const handleSubmitDateSelection = () => {
    onDateSelected(startDate, endDate);
    onClose();
  };

  return (
    <CustomFullScreenDialog
      title='选择可住时间'
      onClose={onClose}
      onSubmit={handleSubmitDateSelection}
    >
      <View className='date-picker'>
        <CustomDateRangePicker onDateChange={handleDateChange} />
      </View>
    </CustomFullScreenDialog>
  );
};
export default DateSelection;
