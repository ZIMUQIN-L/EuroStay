import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import './index.scss';

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
      {Array.from({ length: outOf }).map((_, index) => (
        <Text
          key={index}
          className={`star ${index < rating ? 'filled' : 'unfilled'}`}
          onClick={() => handleStarClick(index)}
        >
          ★
        </Text>
      ))}
      <Text className='rating-name'>{ratingLabels[rating - 1]}</Text>
    </View>
  );
};

export default StarRating;
