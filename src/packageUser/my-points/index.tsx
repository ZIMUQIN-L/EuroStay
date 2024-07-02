import { View, Text, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import './index.scss';
import { PointIcon } from '@utils/cloudIcons';
import Taro from '@tarojs/taro';

const Index = () => {
  const navigateToDetails = () => {
    Taro.navigateTo({
      url: '../../packageUser/point-details/index',
    });
  };

  return (
    <View className='points'>
      <View className='my-points'>
        <View className='my-points-points'>
          <Text style={{ marginLeft: '5%' }}>我的积分</Text>
          <Image src={PointIcon} />
          <Text className='my-points-value'>0</Text>{' '}
          {/* GlobalStore.userInfo.point */}
        </View>
        <View className='my-points-details'>
          <Text className='details-button' onClick={navigateToDetails}>
            明细
          </Text>
        </View>
        </View>

        <View className='get-points'>
            <Text>如何获取积分</Text>
            <View className='get-points-list'>
                <View className='get-points-item'>
                    <Text>发布更多房源</Text>
                    <View className='get-button'>
                        <Text>去发布</Text>
                    </View>
                </View>

                <View className='get-points-item'>
                    <Text>发布更多评论</Text>
                    <View className='get-button'>
                        <Text>去评论</Text>
                    </View>
                </View>

                <View className='get-points-item'>
                    <Text>完善个人信息</Text>
                    <View className='get-button'>
                        <Text>去完善</Text>
                    </View>
                </View>
            </View>
        </View>
    </View>
  );
};

export default observer(Index);
