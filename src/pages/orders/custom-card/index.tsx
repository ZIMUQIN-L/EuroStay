import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';

/**
 * @description 我的供宿和我的求宿的共用组件
 */
const CustomCard = ({
  imageUrl,
  location,
  buttonText,
  houseDesc,
  duration,
  price,
  role,
  status
}) => {

  const handleClick = () => {
    if (status === 'awaiting' || status === 'ongoing' || status === 'expired') {
      Taro.navigateTo({ url: `/packageOrder/order-detail/index?role=${role}&status=${status}` });
    }
    else { // review
      Taro.navigateTo({ url: `/packageOrder/order-review/index?role=${role}` });
    }
  }

  return (
    <View className='card'>
      <Image 
        src={imageUrl}
        className="card-background" 
        mode="aspectFill"
      />
      <View
        className={role === 'host' ? 'card-right-bottom-button-host' : 'card-right-bottom-button-guest'}
        onClick={() => {handleClick()}}
      >
          <Text>{buttonText}</Text>
      </View>
      <View
        className='card-right-top-text'
      >
          <Text>{location}</Text>
      </View>
      <View
        className='card-left-bottom-title'
      >
          <Text>{houseDesc}</Text>
      </View>
      <View
        className='card-left-bottom-text'
      >
          <Text>{price}，共{duration}</Text>
      </View>
      </View>
  );
};

export default CustomCard;
