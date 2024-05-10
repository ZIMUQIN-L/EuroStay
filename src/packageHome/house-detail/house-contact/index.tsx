import { View, Text } from '@tarojs/components';
import { HouseDetailItemProps } from '@utils/interfaces';
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
