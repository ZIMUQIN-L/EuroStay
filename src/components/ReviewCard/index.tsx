import { View, Image, Text } from '@tarojs/components';
import './index.scss';

interface ReviewCardProps {
  userAvatar: string;
  userName: string;
  userType: string;
  isRecommended: boolean;
  reviewContent: string;
  images?: string[];
  reviewDate: string;
  location: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  userAvatar,
  userName,
  userType,
  isRecommended,
  reviewContent,
  images,
  reviewDate,
  location,
}) => {
  return (
    <View className="review-card">
      <View className="review-header">
        <View className="user-info">
          <Image className="avatar" src={userAvatar} mode="aspectFill" />
          <View className="user-meta">
            <Text className="username">{userName}</Text>
            <Text className="user-type">{userType}</Text>
          </View>
        </View>
        {isRecommended && <Text className="recommend-tag">好评推荐</Text>}
      </View>

      <Text className="review-content">{reviewContent}</Text>

      {images && images.length > 0 && (
        <View className="image-grid">
          {images.map((image, index) => (
            <Image
              key={index}
              className="review-image"
              src={image}
              mode="aspectFill"
            />
          ))}
        </View>
      )}

      <View className="review-footer">
        <Text className="date">{reviewDate}</Text>
        <Text className="location">{location}</Text>
      </View>
    </View>
  );
};

// Mock data for testing
export const mockReviewData = [
  {
    id: '1',
    userAvatar: 'https://placekitten.com/150/150',
    userName: 'Gina',
    userType: '房客',
    isRecommended: true,
    reviewContent: '太幸福了，这个房子是我住过最舒服的房子，和朋友一起来住真的太完美了！',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60'
    ],
    reviewDate: '2025年1月18日',
    location: '柏林',
  },
  {
    id: '2',
    userAvatar: 'https://placekitten.com/150/150',
    userName: '李四',
    userType: '房客',
    isRecommended: true,
    reviewContent: '位置很好，交通便利，周边有很多餐厅和超市。房间布置很温馨，设施也很完善。',
    reviewDate: '2024-03-14',
    location: '伦敦',
  },
];

export default ReviewCard; 