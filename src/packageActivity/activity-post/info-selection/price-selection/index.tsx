import { View, Input } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';

const PriceSelection = ({ prevPrice, onClose, onPriceSelected }) => {
  const [price, setPrice] = useState<string>(
    prevPrice ? prevPrice.toFixed(2) : '',
  );

  const handleSubmitPriceSelection = () => {
    const numericPrice = parseFloat(price);

    if (isNaN(numericPrice)) {
      Taro.showToast({
        title: '请输入有效的价格',
        icon: 'error',
        duration: 1000,
      });
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      Taro.showToast({
        title: '请输入最多两位小数',
        icon: 'error',
        duration: 1000,
      });
      return;
    }

    const formattedPrice = numericPrice.toFixed(2);
    onPriceSelected(parseFloat(formattedPrice));
    onClose();
  };

  useEffect(() => {
    if (prevPrice !== undefined) {
      setPrice(prevPrice.toFixed(2));
    }
  }, [prevPrice]);

  const handlePriceChange = e => {
    let value = e.detail.value;
    // 更新为字符串形式
    setPrice(value);
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
            type='digit'
            value={price}
            placeholder='请输入活动预计价格'
            onInput={handlePriceChange}
          />
        </View>
      </View>
    </CustomFullScreenDialog>
  );
};

export default PriceSelection;
