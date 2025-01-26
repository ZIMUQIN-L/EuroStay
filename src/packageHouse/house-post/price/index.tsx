import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
interface IProps {
  coin: number;
  onChange: (_) => void;
}

export default (props: IProps) => {
  const systemInfo = Taro.getSystemInfoSync();
  const [coin, setCoin] = useState<number>(props.coin);
  const [pricePercentage, setPricePercentage] = useState<number>(0);
  const [position, setPosition] = useState(systemInfo.windowWidth * 0.1);
  useEffect(() => {
    props.onChange(coin);
  }, [coin]);
  useEffect(() => {
    const percentage = (props.coin - 20) / 60;
    setPricePercentage(percentage);
    const start = systemInfo.windowWidth * 0.1;
    const end = percentage * (systemInfo.windowWidth * 0.8) + start;
    setPosition(end);
  }, []);
  return (
    <View className='price'>
      <View className='title'>确认房源价值</View>

      <View className='step-14-recommend-title'>
        我们根据您提供的信息进行了房源价值评估
      </View>
      <View className='step-14-recommend-des'>
        评估依据详情请见《房源价值评估标准》
      </View>
      <View className='step-14-recommend-price'>推荐价格： 50旅行币/晚</View>
      <View className='step-14-border'></View>

      <View className='step-14-confirm-title'>请修改或确认房源的价值</View>
      <View className='step-14-confirm-des'>
        请在区间内修改并确认房源的旅行币价值。
      </View>
      <View className='step-14-confirm-price'>
        当前价格：<View className='price-number'> {coin} </View>
        旅行币/晚
      </View>
      <View
        className='step-14-confirm-price-range'
        onTouchMove={e => {
          const start = systemInfo.windowWidth * 0.1;
          console.log(e.touches[0].clientX);
          console.log(11, systemInfo.windowWidth * 0.9);
          const end =
            e.touches[0].clientX > systemInfo.windowWidth * 0.9
              ? systemInfo.windowWidth * 0.9
              : e.touches[0].clientX < start
                ? start
                : e.touches[0].clientX;
          const percentage = (end - start) / (systemInfo.windowWidth * 0.8);
          setCoin(
            Math.floor((percentage >= 1 ? 1 : percentage) * (80 - 20) + 20),
          );
          setPricePercentage(percentage >= 1 ? 1 : percentage);
          setPosition(end);
        }}
        onClick={e => {
          const start = systemInfo.windowWidth * 0.1;
          console.log(e.detail.x);
          console.log(111, systemInfo.windowWidth * 0.9);
          const end =
            e.detail.x > systemInfo.windowWidth * 0.9
              ? systemInfo.windowWidth * 0.9
              : e.detail.x < start
                ? start
                : e.detail.x;
          const percentage = (end - start) / (systemInfo.windowWidth * 0.8);
          setCoin(
            Math.floor((percentage >= 1 ? 1 : percentage) * (80 - 20) + 20),
          );
          setPricePercentage(percentage >= 1 ? 1 : percentage);
          setPosition(end);
        }}
      >
        <View
          className='left-part'
          style={{
            width: `${position - systemInfo.windowWidth * 0.1}px`,
            backgroundColor: '#7f00ff',
          }}
        ></View>
        <View
          className='circle'
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '20px',
            backgroundColor: '#7f00ff',
            left: `${position - 10 - systemInfo.windowWidth * 0.1}px`,
            top: '-5px',
            position: 'absolute',
          }}
        ></View>
      </View>
      <View className='price-range-number'>
        <View className='min'>20旅行币/晚</View>
        <View className='max'>80旅行币/晚</View>
      </View>
      <View className='step-14-confirm-tips'>
        当价格接近推荐值时，吸引力较高；当价格高于推荐值，可能影响房客的预订率噢。
      </View>
    </View>
  );
};
