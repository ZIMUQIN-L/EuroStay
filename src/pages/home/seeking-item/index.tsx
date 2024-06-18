import { View, Image, Text, RichText } from '@tarojs/components';
import { DateIcon } from '@utils/cloudIcons';
import './index.scss';
import { AccomMssageHouseItemProps } from '@utils/interfaces';

const SeekingCard = ({ seekingItem }) => {
  if (!seekingItem) {
    return null;
  }

  return (
    <View className='seeking'>
      <View className='seeking-container'>
        <View className='seeking-title'>{seekingItem.location}</View>
        <View className='seeking-content'>
          <View className='seeking-avatar'>
            <Image src={seekingItem.avatar} />
          </View>
          <View className='seeking-text'>
            <Text>求宿者: {seekingItem.user}</Text>
            <Text>性别: {seekingItem.gender}</Text>
            <Text>求宿者: {seekingItem.destination}</Text>
            <View className='seeking-text-date'>
              <Image
                src={DateIcon}
                style={{ width: '18px', height: '18px', marginRight: '5px' }}
              />
              <Text>
                {seekingItem.start_date} to {seekingItem.end_date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SeekingCard;
