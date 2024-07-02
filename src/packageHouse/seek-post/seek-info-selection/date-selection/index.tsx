import { View } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useState, useEffect } from 'react';
import './index.scss';
import CustomDateRangePicker from '@components/CustomDateRangePicker';

const DateSelection = ({
  onClose,
  onDateSelected,
  prevStartDate,
  prevEndDate,
}) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    if (prevStartDate && prevEndDate) {
      setStartDate(prevStartDate);
      setEndDate(prevEndDate);
    }
  }, []);

  const handleSubmitDateSelection = () => {
    onDateSelected(startDate, endDate);
    onClose();
  };

  return (
    <CustomFullScreenDialog
      title='选择可住时间'
      onClose={onClose}
      onSubmit={handleSubmitDateSelection}
      className='request-date-selection-dialog'
    >
      <View className='date-picker'>
        <CustomDateRangePicker onDateChange={handleDateChange} />
      </View>
    </CustomFullScreenDialog>
  );
};
export default DateSelection;
