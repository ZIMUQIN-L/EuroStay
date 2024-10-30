// src/pages/HouseApplicationPage/UserProfile.jsx
import { View, Image, Text } from '@tarojs/components';
import './index.scss';

const UserProfile = ({ imageUrl, name, tags, title }) => {
  return (
    <View className="user-profile">
      <Text className="profile-title">{title}</Text>
      <View className="profile-content">
        <Image className="avatar" src={imageUrl || '/path/to/default-avatar.jpg'} />
        <View className="info">
          <Text className="name">{name}</Text>
          <View className="tags">
            {tags.map(tag => (
              <Text key={tag} className="tag">{tag}</Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
