import { View, Text, Slider } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useState, useEffect } from 'react';
import './index.scss';

const CapacitySelection = ({ onClose, onCapacitySelected }) => {
  const [capacity, setCapacity] = useState(1);
  const handleSubmitCapacitySelection = () => {
    onCapacitySelected(capacity);
    onClose();
  };

  const handleCapacityChange = e => {
    setCapacity(e.detail.value);
  };

  return (
    <CustomFullScreenDialog
      title='选择可住人数'
      onClose={onClose}
      onSubmit={handleSubmitCapacitySelection}
    >
      <View className='capacity-slider'>
        <Slider
          className='capacity-slider'
          step={1}
          value={capacity}
          showValue
          min={1}
          max={10}
          onChange={handleCapacityChange}
        />
      </View>
    </CustomFullScreenDialog>
  );
};
export default CapacitySelection;
