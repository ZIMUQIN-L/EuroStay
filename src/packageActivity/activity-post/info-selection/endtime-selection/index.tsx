import { View, Input, Picker } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import './index.scss';
import DateTimePicker from '@components/DateTimePicker';

const EndTimeSelection = ({ prevEndTime, onClose, onEndTimeSelected }) => {
  const [endTime, setEndTime] = useState(prevEndTime || '');
  const handleSubmitEndTimeSelection = () => {
    onEndTimeSelected(endTime);
    onClose();
  };
  useEffect(() => {
    setEndTime(prevEndTime || '');
  }, [prevEndTime]);

  const handleEndTimeChange = newEndTime => {
    setEndTime(newEndTime);
  };

  return (
    <CustomFullScreenDialog
      title='输入活动结束时间'
      onClose={onClose}
      onSubmit={handleSubmitEndTimeSelection}
    >
      <View className='act-time-picker-container'>
        <DateTimePicker value={endTime} onChange={handleEndTimeChange} />
      </View>
    </CustomFullScreenDialog>
  );
};
export default EndTimeSelection;
