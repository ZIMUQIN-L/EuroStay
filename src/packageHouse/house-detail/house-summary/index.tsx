import { View, Text, Image } from '@tarojs/components';
import { HouseDetailItemProps } from '@utils/interfaces';
import './index.scss';
import { DateIcon, CapacityIcon, LocationIcon } from '@utils/cloudIcons';

const HouseSummary: React.FC<HouseDetailItemProps> = house => {
  return (
    <>
      <View className='house-summary-wrap'>
        <View className='house-summary-left'>
          <View className='house-summary-title'>{house.title}</View>
          <View className='house-summary-location'>{house.location}</View>
          {/* <View className='house-summary-des'>1室1床1卫·1人·限女生</View> */}
        </View>
        <View className='house-summary-right'>
          <View className='house-summary-reviews-top'>
            <View className='house-summary-reviews-des'>推荐次数</View>
            <View className='house-summary-reviews-ratings'>
              {house.recommendedTimes}
            </View>
          </View>
          <View className='house-summary-reviews-bottom'>查看详情</View>
        </View>
      </View>
    </>
  );
};

export default HouseSummary;
