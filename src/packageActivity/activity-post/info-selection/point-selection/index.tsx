import { View, Input } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import './index.scss';

const PointSelection = ({ prevPoint, onClose, onPointSelected }) => {
  const [point, setPoint] = useState(prevPoint);
  const handleSubmitPointSelection = () => {
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
      title='输入活动消耗积分'
      onClose={onClose}
      onSubmit={handleSubmitPointSelection}
    >
      <View className='point-text-container' style={{ minHeight: '30px' }}>
        <View className='point-text'>
          <Input
            type='number'
            value={point != 0 ? point : ''}
            placeholder='请输入消耗积分数量'
            onInput={handlePointChange}
          />
        </View>
      </View>
    </CustomFullScreenDialog>
  );
};
export default PointSelection;
