import { View, Input, Picker } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import './index.scss';

const EndTimeSelection = ({ prevEndTime, onClose, onEndTimeSelected }) => {
  const [endTime, setEndTime] = useState(prevEndTime);
  const handleSubmitEndTimeSelection = () => {
    onEndTimeSelected(endTime);
    onClose();
  };
  useEffect(() => {
    setEndTime(prevEndTime);
  }, [prevEndTime]);

  const handleEndTimeChange = e => {
    setEndTime(e.detail.value);
  };

  return (
    <CustomFullScreenDialog
      title='输入活动结束时间'
      onClose={onClose}
      onSubmit={handleSubmitEndTimeSelection}
    >
      <View className='act-end-text-container' style={{ minHeight: '30px' }}>
        <View className='act-end-text'>
          <Input
            type='text'
            value={endTime}
            placeholder='请输入活动结束时间'
            onInput={handleEndTimeChange}
          />
        </View>
      </View>
    </CustomFullScreenDialog>
  );
};
export default EndTimeSelection;
