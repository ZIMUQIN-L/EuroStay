import { View, Input } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import './index.scss';

const PriceSelection = ({ prevPrice, onClose, onPriceSelected }) => {
  const [price, setPrice] = useState<undefined | number>(prevPrice);
  const handleSubmitPriceSelection = () => {
    onPriceSelected(price);
    onClose();
  };
  useEffect(() => {
    setPrice(prevPrice);
  }, [prevPrice]);

  const handlePriceChange = e => {
    setPrice(Number(e.detail.value));
    console.log(e.detail.value)
  };

  return (
    <CustomFullScreenDialog
      title='输入活动预计价格（欧元）'
      onClose={onClose}
      onSubmit={handleSubmitPriceSelection}
    >
      <View className='price-text-container' style={{ minHeight: '30px' }}>
        <View className='price-text'>
          <Input
            type='number'
            value={price!=undefined ? `${price}` : ''}
            placeholder='请输入活动预计价格'
            onInput={handlePriceChange}
          />
        </View>
      </View>
    </CustomFullScreenDialog>
  );
};
export default PriceSelection;
