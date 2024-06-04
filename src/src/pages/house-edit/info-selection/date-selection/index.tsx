import { View } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useState, useEffect } from 'react';
import './index.scss';
import CustomDateRangePicker from '@components/CustomDateRangePicker';

const DateSelection = ({
  prevStartDate,
  prevEndDate,
  onClose,
  onDateSelected,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(prevStartDate);
  const [endDate, setEndDate] = useState<Date | null>(prevEndDate);
  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };
  useEffect(() => {
    setStartDate(prevStartDate);
    setEndDate(prevEndDate);
  }, [prevStartDate, prevEndDate]);

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
        <CustomDateRangePicker
          onDateChange={handleDateChange}
          initialValue={{ startDate: startDate, endDate: endDate }}
        />
      </View>
    </CustomFullScreenDialog>
  );
};
export default DateSelection;
