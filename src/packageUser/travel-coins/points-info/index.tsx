import { View, Text, Image } from '@tarojs/components';
import { PointIcon } from '@utils/cloudIcons';
import Taro from '@tarojs/taro';
import './index.scss';
import { UserDetailInfoItemProps } from '@utils/interfaces';

interface PointsInfoProps {
  Detail: boolean;
  currentUserDetail: UserDetailInfoItemProps | undefined;
}

const PointsInfo: React.FC<PointsInfoProps> = ({
  Detail,
  currentUserDetail,
}) => {
  const navigateToDetails = () => {
    Taro.navigateTo({
      url: '../../packageUser/point-details/index',
    });
  };

  return (
    <View className='points-section'>
      <View className='header'>
        <Text className='title'>我的旅行币</Text>
        <Text className='link' onClick={() => Taro.navigateTo({ url: '/pages/coin-info/index' })}>
          了解旅行币 &gt;
        </Text>
      </View>
      <View className='balance-box'>
        <Text className='label'>余额</Text>
        <Text className='balance-amount'>{currentUserDetail?.point || 200}</Text>
        <Text className='details-button' onClick={navigateToDetails}>明细</Text>
      </View>
    </View>
  );
};

export default PointsInfo;

