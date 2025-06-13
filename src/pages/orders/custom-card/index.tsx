import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import {parseLocation} from '@utils/addressUtil';

/**
 * @description 我的供宿和我的求宿的共用组件
 */
const CustomCard = ({
  image,
  location,
  buttonText,
  title,
  date,
  price,
  role,
  status,
  type, // 房源: 0, 活动: 1
  id, // 订单id
  experienceId, // 活动 or 房源 id
  hasReview, // 是否已完成评价
}) => {

  const handleClick = () => {
    if (status === 'awaiting' || status === 'ongoing' || status === 'expired') {
      // console.log('navigate to, ' + `/packageOrder/order-detail/index?role=${role}&status=${status}&type=${type}&id=${id}&experienceId=${experienceId}&title=${title}`);
      Taro.navigateTo({ url: `/packageOrder/order-detail/index?role=${role}&status=${status}&type=${type}&id=${id}&experienceId=${experienceId}&title=${title}` });
    }
    else if (status === 'completed') {
      // Check if review is needed
      if (hasReview) {
        // Already reviewed, just view the detail
        Taro.navigateTo({ url: `/packageOrder/order-detail/index?role=${role}&status=${status}&type=${type}&id=${id}&experienceId=${experienceId}&title=${title}` });
      } 
      else {
        // Needs to review - both host and guest go to order-review
        Taro.navigateTo({ url: `/packageOrder/order-review/index?role=${role}&type=${type}&id=${id}&experienceId=${experienceId}&title=${title}` });
      }
    }
  }

  const toDetail = () => {
    Taro.navigateTo({ url: `/packageHouse/housing-detail/index?id=${experienceId}&type=${type}` });
  }

  return (
    <View className='card'>
      <Image 
        src={image}
        className="card-background" 
        mode="aspectFill"
        onClick={() => {toDetail()}}
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
          <Text>{parseLocation(location)}</Text>
      </View>
      <View
        className='card-left-bottom-title'
      >
          <Text>{title}</Text>
      </View>
      <View
        className='card-left-bottom-text'
      >
          <Text>
            {`€${price}/晚`} {date}
          </Text>
      </View>
      </View>
  );
};

export default CustomCard;
