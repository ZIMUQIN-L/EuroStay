import { View, Text, Image } from '@tarojs/components';
import { HouseDetailItemProps } from '@utils/interfaces';
import './index.scss';
import { DateIcon, CapacityIcon, LocationIcon } from '@utils/cloudIcons';

const HouseTexts: React.FC<HouseDetailItemProps> = house => {
  return (
    <View className='lists'>
      <View className='container'>
        <View className='text-container'>
          <Text className='title'>地点：{house.location}</Text>
          <Text className='title'>房间类型：{house.houseType}</Text>
          <View className='sub-title'>
            <Image src={DateIcon} className='icon' />
            <Text>
              {house.start_date} to {house.end_date}
            </Text>
          </View>
          <View className='sub-title'>
            <Image src={CapacityIcon} className='icon' />
            <Text>{house.capacity}人</Text>
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
            </View>
          </View>
        </View>
      </View>
      {/* <View className='container'>
        <View className='text-container'>
          <Text className='title'>房客评价</Text>
        </View>
      </View>
      <View className='contact-container'>
        <View className='contact-button'>
          <Text className='contact-text'>联系房东</Text>
        </View>
      </View> */}
    </View>
  );
};

export default HouseTexts;
