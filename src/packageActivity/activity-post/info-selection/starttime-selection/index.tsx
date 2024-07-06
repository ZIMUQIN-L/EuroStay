import { View } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import './index.scss';
import DateTimePicker from '@components/DateTimePicker';

const StartTimeSelection = ({
  prevStartTime,
  onClose,
  onStartTimeSelected,
}) => {
  const [startTime, setStartTime] = useState(prevStartTime || '');

  useEffect(() => {
    setStartTime(prevStartTime || '');
  }, [prevStartTime]);

  const handleStartTimeChange = newStartTime => {
    setStartTime(newStartTime);
  };

  const handleSubmitStartTimeSelection = () => {
    onStartTimeSelected(startTime);
    onClose();
  };

  return (
    <CustomFullScreenDialog
      title='输入活动开始时间'
      onClose={onClose}
      onSubmit={handleSubmitStartTimeSelection}
    >
      <View className='act-time-picker-container'>
        <DateTimePicker value={startTime} onChange={handleStartTimeChange} />
      </View>
    </CustomFullScreenDialog>
  );
};

export default StartTimeSelection;
