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
}) => {

  const handleClick = () => {
    if (status === 'awaiting' || status === 'ongoing' || status === 'expired') {
      // console.log('navigate to, ' + `/packageOrder/order-detail/index?role=${role}&status=${status}&type=${type}&id=${id}&experienceId=${experienceId}&title=${title}`);
      Taro.navigateTo({ url: `/packageOrder/order-detail/index?role=${role}&status=${status}&type=${type}&id=${id}&experienceId=${experienceId}&title=${title}` });
    }
    else if (status === 'review' && role == 'guest') {
        Taro.showModal({
            title: '前往房源页面评价',
            content: '请前往房源详情页面下的评价给Host留下你的留言哦~',
            confirmText: '前往评价',
            cancelText: '等下再去',
            success: function (res) {
              if (res.confirm) {
                Taro.navigateTo({
                    url: `/packageHouse/housing-detail/index?id=${experienceId}&type=0`,
                  });
              }
            }
          });
    }
    else { // review
      // console.log('navigate to, ' + `/packageOrder/order-review/index?role=${role}&type=${type}&id=${id}&experienceId=${experienceId}&title=${title}`);
      Taro.navigateTo({ url: `/packageOrder/order-review/index?role=${role}&type=${type}&id=${id}&experienceId=${experienceId}&title=${title}` });
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
            {type === 0 ? `€${price}/晚`: price === 0 ? `免费`: `€${price}`
            }，开始{type === 0 ? '日期' : '时间'}：{type === 0 ? date.substring(0, 10) : date}
          </Text>
      </View>
      </View>
  );
};

export default CustomCard;
