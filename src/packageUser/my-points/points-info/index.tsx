import { View, Text, Image } from '@tarojs/components';
import { PointIcon } from '@utils/cloudIcons';
import Taro from '@tarojs/taro';
import './index.scss';

interface PointsInfoProps {
  Detail: boolean;
}

const PointsInfo: React.FC<PointsInfoProps> = ({Detail}) => {
    const navigateToDetails = () => {
        Taro.navigateTo({
          url: '../../packageUser/point-details/index',
        });
      };

    return (
        <View className='my-points'>
        <View className='my-points-points'>
          <Text style={{ marginLeft: '5%' }}>我的积分</Text>
          <Image src={PointIcon} />
          <Text className='my-points-value'>0</Text>{' '}
          {/* GlobalStore.userInfo.point */}
        </View>
        {!Detail && <View className='my-points-details'>
          <Text className='details-button' onClick={navigateToDetails}>
            明细
          </Text>
        </View>}
      </View>
    )
};

export default PointsInfo;