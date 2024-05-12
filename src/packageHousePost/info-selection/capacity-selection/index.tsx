import { View, Input } from '@tarojs/components';
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
      <View className='capacity-text-container' style={{ minHeight: '30px' }}>
        <View className='capacity-text'>
          <Input
            type='number'
            placeholder='请输入可入住人数~'
            onInput={handleCapacityChange}
          />
        </View>
      </View>
    </CustomFullScreenDialog>
  );
};
export default CapacitySelection;
