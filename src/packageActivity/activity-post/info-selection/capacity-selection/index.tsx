import { View, Input } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import './index.scss';
import Taro from '@tarojs/taro';

const CapacitySelection = ({ prevCapacity, onClose, onCapacitySelected }) => {
  const [capacity, setCapacity] = useState(prevCapacity);
  const handleSubmitCapacitySelection = () => {
    if (capacity === undefined || !Number.isInteger(capacity)) {
      Taro.showToast({
        title: '请输入整数',
        icon: 'error',
        duration: 1000,
      });
      return;
    }
    if (capacity < 0) {
      Taro.showToast({
        title: '请输入正整数',
        icon: 'error',
        duration: 1000,
      });
      return;
    }
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
      title='输入活动最大人数（正整数）'
      onClose={onClose}
      onSubmit={handleSubmitCapacitySelection}
    >
      <View className='capacity-text-container' style={{ minHeight: '30px' }}>
        <View className='capacity-text'>
          <Input
            type='number'
            value={capacity != 0 ? capacity : ''}
            placeholder='请输入活动最大人数~'
            onInput={handleCapacityChange}
          />
        </View>
      </View>
    </CustomFullScreenDialog>
  );
};
export default CapacitySelection;
