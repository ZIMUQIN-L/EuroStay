import { View, Text, Image } from '@tarojs/components';
import { HouseDetailItemProps } from '@utils/interfaces';
import './index.scss';
import { DateIcon, CapacityIcon, LocationIcon } from '@utils/cloudIcons';

const HouseSummary = () => {
  return (
    <View className='house-summary-wrap'>
      <View className='house-summary-left'>
        <View className='house-summary-title'>房源名称</View>
        <View className='house-summary-location'>国家城市·公寓30m2</View>
        <View className='house-summary-des'>1室1床1卫·1人·限女生</View>
      </View>
      <View className='house-summary-right'>
        <View className='house-summary-reviews-top'>
          <View className='house-summary-reviews-ratings'>4.2</View>
          <View className='house-summary-reviews-des'>较好</View>
        </View>
        <View className='house-summary-reviews-bottom'>102条评价</View>
      </View>
    </View>
  );
};

export default HouseSummary;
