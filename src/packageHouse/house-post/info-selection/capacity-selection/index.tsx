import { View, Input } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useState } from 'react';
import './index.scss';
import Taro from '@tarojs/taro';

const CapacitySelection = ({ onClose, onCapacitySelected }) => {
  const [capacity, setCapacity] = useState(1);
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

  const handleCapacityChange = e => {
    setCapacity(Number(e.detail.value));
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
