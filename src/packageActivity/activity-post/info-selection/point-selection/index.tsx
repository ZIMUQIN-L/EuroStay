import { View, Input } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import './index.scss';
import Taro from '@tarojs/taro';

const PointSelection = ({ prevPoint, onClose, onPointSelected }) => {
  const [point, setPoint] = useState<undefined | number>(prevPoint);
  const handleSubmitPointSelection = () => {
    if (point === undefined || !Number.isInteger(point) ) {
      Taro.showToast({
        title: '请输入整数',
        icon: 'error',
        duration: 1000
      });
      return;
    }
    if (point < 0) {
      Taro.showToast({
        title: '请输入正整数',
        icon: 'error',
        duration: 1000
      });
      return;
    }
    onPointSelected(point);
    onClose();
  };
  useEffect(() => {
    setPoint(prevPoint);
  }, [prevPoint]);

  const handlePointChange = e => {
    setPoint(Number(e.detail.value));
  };

  return (
    <CustomFullScreenDialog
      title='输入活动消耗积分（正整数）'
      onClose={onClose}
      onSubmit={handleSubmitPointSelection}
    >
      <View className='point-text-container' style={{ minHeight: '30px' }}>
        <View className='point-text'>
          <Input
            type='number'
            value={point!=undefined? `${point}` : ''}
            placeholder='请输入消耗积分数量'
            onInput={handlePointChange}
          />
        </View>
      </View>
    </CustomFullScreenDialog>
  );
};
export default PointSelection;
