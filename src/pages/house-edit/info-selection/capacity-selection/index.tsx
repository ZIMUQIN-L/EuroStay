import { View, Input } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import './index.scss';

const CapacitySelection = ({ prevCapacity, onClose, onCapacitySelected }) => {
  const [capacity, setCapacity] = useState(prevCapacity);
  const handleSubmitCapacitySelection = () => {
    onCapacitySelected(capacity);
    onClose();
  };
  useEffect(() => {
    setCapacity(prevCapacity);
  }, [prevCapacity]);

  const handleCapacityChange = e => {
    setCapacity(Number(e.detail.value));
  };

  return (
    <CustomFullScreenDialog
      title='选择最多可住人数'
      onClose={onClose}
      onSubmit={handleSubmitCapacitySelection}
    >
      <View className='capacity-text-container' style={{ minHeight: '30px' }}>
        <View className='capacity-text'>
          <Input
            type='number'
            value={capacity}
            placeholder='请输入最多可入住人数~'
            onInput={handleCapacityChange}
          />
        </View>
      </View>
    </CustomFullScreenDialog>
  );
};
export default CapacitySelection;
