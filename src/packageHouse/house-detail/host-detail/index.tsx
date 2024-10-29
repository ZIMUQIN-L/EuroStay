import { View, Text, Image } from '@tarojs/components';
import { HouseDetailItemProps } from '@utils/interfaces';
import './index.scss';
import { DateIcon, CapacityIcon, LocationIcon } from '@utils/cloudIcons';

const HostDetail = () => {
  return (
    <View className='host-detail-wrap'>
      <View className='host-detail-left'>
        <Image
          src=''
          className='host-detail-avatar'
          style={{ width: '60px', height: '60px', borderRadius: '60px' }}
        />
      </View>
      <View className='host-detail-right'>
        <View className='host-detail-name'>房东 Username</View>
        <View className='host-detail-des'>x星房东·x年出租经验</View>
      </View>
    </View>
  );
};

export default HostDetail;
