import { View, Text, Image } from '@tarojs/components';
import { useState } from 'react';
import './index.scss';
import { StarFilled, StarUnfilled } from '@utils/cloudIcons';

interface StarRatingProps {
  initialRating: number;
  outOf?: number;
  label: string;
  onRatingChange?: (newRating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating,
  outOf = 5,
  label,
  onRatingChange,
}) => {
  const [rating, setRating] = useState(initialRating);
  const ratingLabels = ['很差', '差', '一般', '较好', '非常好'];

  const handleStarClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <View className='star-rating'>
      <Text className='rating-label'>{label}</Text>
      <View className='stars'>
        {Array.from({ length: outOf }).map((_, index) => (
          <Image
            src={index < rating ? StarFilled : StarUnfilled}
            className='star-icon'
            key={index}
            style={{ width: '20px', height: '20px' }}
            onClick={() => {
              handleStarClick(index);
            }}
          ></Image>
        ))}
      </View>

      <Text className='rating-name'>{ratingLabels[rating - 1]}</Text>
    </View>
  );
};

export default StarRating;
