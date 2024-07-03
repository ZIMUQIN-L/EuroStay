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

  const navigateToPost = () => {
    Taro.navigateTo({
      url: '../../packageHouse/house-post/index',
    });
  };

  const navigateToComment = () => {
    Taro.navigateTo({
      url: '../../packageUser/my-accommodation/index?tab=toComment',
    });
  };

  const navigateToProfile = () => {
    Taro.navigateTo({
      url: '../../packageUser/user-edit/index',
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
        <View className='get-points-header'>
          <Text>如何获取积分</Text>
        </View>
        <View className='get-points-list'>
          <View className='get-points-item'>
            <Text>发布更多房源</Text>
            <View className='get-button' onClick={navigateToPost}>
              <Text>去发布</Text>
            </View>
          </View>
          <View className='line-div'></View>

          <View className='get-points-item'>
            <Text>发布更多评论</Text>
            <View className='get-button' onClick={navigateToComment}>
              <Text>去评论</Text>
            </View>
          </View>
          <View className='line-div'></View>

          <View className='get-points-item'>
            <Text>完善个人信息</Text>
            <View className='get-button' onClick={navigateToProfile}>
              <Text>去完善</Text>
            </View>
          </View>
        </View>
      </View>

      <View className='points-rules'>
        <View className='section-title'>
          <Text>积分规则</Text>
        </View>

        <View className='points-section'>
          <Text className='points-subtitle'>初始积分：</Text>
          <Text className='points-value'>10分</Text>
        </View>

        <View className='line-div'></View>

        <View className='points-section'>
          <Text className='points-subtitle'>获取积分：</Text>
          <View className='points-list'>
          <View className='points-item'>
            <Text>发布房源：+10分</Text>
          </View>
          <View className='points-item'>
            <Text>完善个人信息：每增加一个板块 +5分</Text>
          </View>
          <View className='points-item'>
            <Text>进行身份认证（学生/实名）：+20分</Text>
          </View>
          <View className='points-item'>
            <Text>评价房东/房客：+5分</Text>
          </View>
          </View>
        </View>

        <View className='line-div'></View>

        <View className='points-section'>
          <Text className='points-subtitle'>消耗积分：</Text>
          <View className='points-list'>
            <View className='points-item'>
                <Text>
              报名参加活动：依据活动需要消耗的积分数量确定消耗积分值
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default observer(Index);
