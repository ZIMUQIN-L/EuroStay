import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import './index.scss';
import Taro from '@tarojs/taro';
import PointsInfo from './points-info';

const Index = () => {

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
      
      
      <PointsInfo Detail={false} />

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
