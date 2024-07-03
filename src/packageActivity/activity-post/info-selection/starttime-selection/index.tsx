import { View, Input, Picker } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import './index.scss';

const StartTimeSelection = ({
  prevStartTime,
  onClose,
  onStartTimeSelected,
}) => {
  const [startTime, setStartTime] = useState(prevStartTime);
  const handleSubmitStartTimeSelection = () => {
    onStartTimeSelected(startTime);
    onClose();
  };
  useEffect(() => {
    setStartTime(prevStartTime);
  }, [prevStartTime]);

  const handleStartTimeChange = e => {
    setStartTime(e.detail.value);
  };

  return (
    <CustomFullScreenDialog
      title='输入活动开始时间'
      onClose={onClose}
      onSubmit={handleSubmitStartTimeSelection}
    >
      <View className='act-start-text-container' style={{ minHeight: '30px' }}>
        <View className='act-start-text'>
          <Input
            type='text'
            value={startTime}
            placeholder='请输入活动开始时间'
            onInput={handleStartTimeChange}
          />
        </View>
      </View>
    </CustomFullScreenDialog>
  );
};
export default StartTimeSelection;
