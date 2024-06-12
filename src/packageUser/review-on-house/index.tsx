import { View, Text, Image, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';
import ReviewDes from './review-des';

const Index = () => {
  // Dummy data for illustration
  const accommodationDetails = {
    name: "精致民宿xxx房",
    host: "Andre",
    period: "2024-05-02 to 2024-05-10",
    rating: 3,
    review: "设施齐全的民宿体验，给其他朋友一些帮助~",
    imageUrl: "path_to_accommodation_image.png" // Update path as needed
  };

  const handleUserDescriptionEdit = inputDescription => {
    // Handle user description edit
  }

  return (
    <View className='page'>
      <View className='header'>
        <Image className='accommodation-image' src={accommodationDetails.imageUrl} />
        <Text className='accommodation-name'>{accommodationDetails.name}</Text>
        <Text className='host-name'>房东: {accommodationDetails.host}</Text>
        <Text className='date-range'>{accommodationDetails.period}</Text>
      </View>
      <ReviewDes onUserDescriptionEdit={handleUserDescriptionEdit} />
      <View className='rating-section'>
        <Text className='rating-label'>描述相符</Text>
        {/* Example for displaying stars based on rating */}
        {Array.from({ length: 5 }).map((_, index) => (
          <Text key={index} className={`star ${index < accommodationDetails.rating ? 'filled' : ''}`}>★</Text>
        ))}
        <Text className='review'>{accommodationDetails.review}</Text>
      </View>
      <View className='interaction-buttons'>
        <Button className='upload-photo'>上传照片</Button>
        <Button className='upload-video'>上传视频</Button>
      </View>
      <View className='detailed-ratings'>
        <Text className='rating-category'>地理位置</Text>
        <Text className='rating-category'>清洁程度</Text>
        <Text className='rating-category'>服务体验</Text>
        <Text className='rating-category'>性价比</Text>
      </View>
      <Button className='submit-button'>发表评价</Button>
    </View>
  );
};

export default Index;
