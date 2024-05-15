import { View, Image, Text, RichText } from '@tarojs/components';
import { DateIcon } from '@utils/cloudIcons';
import './index.scss';

const SeekingCard = ({ seekingItem }) => {
  if (!seekingItem) {
    return null;
  }

  return (
    <View className='seeking'>
      <View className='seeking-container'>
        <View>{seekingItem.title}</View>
        <View className='seeking-content'>
          <View>
            <Image
              src={seekingItem.avatar}
              style={{ width: '60px', height: '60px', marginRight: '20px' }}
            />
          </View>
          <View className='seeking-text'>
            <Text>求宿者: {seekingItem.user}</Text>
            <Text>性别: {seekingItem.gender}</Text>
            <Text>求宿者: {seekingItem.destination}</Text>
            <View>
              <Image
                src={DateIcon}
                style={{ width: '20px', height: '20px', marginRight: '5px' }}
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
