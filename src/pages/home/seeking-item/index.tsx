import { View, Image, Text, RichText } from '@tarojs/components';
import { DateIcon } from '@utils/cloudIcons';
import './index.scss';
import { UserAccomMessageItemProps } from '@utils/interfaces';

interface SeekingCardProps {
  seekingItem: UserAccomMessageItemProps;
  onClick; // Add onClick prop
}

const SeekingCard: React.FC<SeekingCardProps> = ({ seekingItem, onClick }) => {
  if (!seekingItem) {
    return null;
  }

  return (
    <View className='seeking'>
      <View className='seeking-container' onClick={onClick}>
        <View className='seeking-title'>{seekingItem.location}</View>
        <View className='seeking-content'>
          <View className='seeking-avatar'>
            <Image src={seekingItem.sourceUserAvatarUrl} />
          </View>
          <View className='seeking-text'>
            <Text>求宿者: {seekingItem.sourceUserNickName}</Text>
            <Text>性别: {seekingItem.gender}</Text>
            <Text>人数: {seekingItem.capacity}人</Text>
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
