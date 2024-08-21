import { View, Image, Text } from '@tarojs/components';
import './index.scss';

const UserProfileCard = ({ user }) => {
  if (!user) {
    return <View></View>; // Display loading state before user data is loaded
  }

  return (
    <View className="profile-container">
      {/* White card only for specific sections */}
      <View className="profile-card">
        <View className="profile-header">
            <View className="profile-avatar">
                <Image src={user.avatarUrl} className="avatar-image" />
            </View>
            <View className="profile-info">
                <Text className="username">{user.nickName}</Text>
            </View>
            <View className="profile-info">
                <Text className="role">房东</Text>
            </View>
        </View>
        <View className="profile-stats">
            <View className="profile-stats-item">
            <Text style={{ fontSize: '13px', color: '#888' }}>评价</Text>
                <Text>
                    {user && user.receiveReviewNum
                        ? user.receiveReviewNum
                        : 0} 条
                </Text>
            </View>
            <View className="profile-stats-item">
                <Text style={{ fontSize: '13px', color: '#888' }}>评分</Text>
                <Text>
                    {user && user.hostRating
                        ? user.hostRating
                        : '暂无评分'}
                </Text>
            </View>
            <View className="profile-stats-item">
                <Text style={{ fontSize: '13px', color: '#888' }}>主办经验</Text>
            <Text>
                {user && user.hostingExperience
                    ? user.hostingExperience
                    : '小于1年'}
            </Text>
            </View>
        </View>
    </View>

      {/* Keep the rest of the content outside the white card */}
      <View className="profile-details">
        {Object.entries(user.aboutMe).map(([key, value], index) => (
          <View className="detail-item" key={index}>
            <Text className="detail-key">{key}:</Text>
            <Text className="detail-value">{value}</Text>
          </View>
        ))}
      </View>
      <View className="profile-footer">
        <Text className="footer-text">
          嗨，我是{user.nickName}！这里可以写下主持方想对活动参与者说的话，并简单介绍自己，让更多的人参与到您的活动中来！（可以在这里放上xhs的账号）
        </Text>
      </View>
    </View>
  );
};

export default UserProfileCard;
