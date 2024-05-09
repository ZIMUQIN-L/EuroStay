import { View, Text, Image } from '@tarojs/components';
import { HouseDetailItemProps } from '@utils/interfaces';
// import DateIcon from '@assets/images/date-icon.svg';
// import CapacityIcon from '@assets/images/capacity-icon.svg';
// import LocationIcon from '@assets/images/location-icon.svg';
import './index.scss';

const HouseContact: React.FC<HouseDetailItemProps> = house => {
  return (
    <View className='lists'>
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

export default HouseContact;
