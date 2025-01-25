import { View, Text, Image } from '@tarojs/components';
import { UserCardProps } from '@utils/interfaces';
import './index.scss';
const HouseItem: React.FC<UserCardProps> = user => {
  return (
    <View className='homepage-user-card'>
      <Image className='user-avatar' src={user.avatar}>
        <View className='user-name'>{user.username}</View>
        <View className='user-des'>{user.aboutMe}</View>
      </Image>
      <View className='user-tags'>
        {user.tags.map(item => {
          return <View className='user-tag'>{item}</View>;
        })}
      </View>
    </View>
  );
};
export default HouseItem;
