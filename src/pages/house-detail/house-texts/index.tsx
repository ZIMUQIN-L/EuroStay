import { View, Text, Image } from '@tarojs/components';
import { HouseItemProps } from '@utils/interfaces';
import DateIcon from '@assets/images/date-icon.svg';
import CapacityIcon from '@assets/images/capacity-icon.svg';
import LocationIcon from '@assets/images/location-icon.svg';
import './index.scss';

const HouseTexts: React.FC<HouseItemProps> = house => {
  return (
    <View className='lists'>
      <View className='container'>
        <View className='text-container'>
          <Text className='title'>地点：{house.location}</Text>
          <Text className='title'>房间类型：{house.houseType}</Text>
          <View className='sub-title'>
            <Image src={DateIcon} className='icon' />
            <Text>
              {house.startDate} - {house.endDate}
            </Text>
          </View>
          <View className='sub-title'>
            <Image src={CapacityIcon} className='icon' />
            <Text>{house.capacity}</Text>
          </View>
        </View>
      </View>
      <View className='container'>
        <View className='text-container'>
          <Text className='title'>房源概览</Text>
          <Text className='sub-title'>{house.description}</Text>
        </View>
      </View>
      <View className='container'>
        <View className='text-container'>
          <Text className='title'>房源位置</Text>
          <View className='location-container'>
            <Image src={LocationIcon} className='location-icon' />
            <View className='location-texts'>
              <Text className='first-line'>地址</Text>
              <Text className='second-line'>{house.location}</Text>
              {/* 数据库中缺少相应的信息 */}
            </View>
          </View>
        </View>
      </View>
      <View className='container'>
        <View className='text-container'>
          <Text className='title'>房客评价</Text>
        </View>
      </View>
      <View className='contact-container'>
        <View className='contact-button'>
          <Text className='contact-text'>联系房东</Text>
        </View>
      </View>
    </View>
  );
};

export default HouseTexts;
