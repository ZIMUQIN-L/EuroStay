
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

const ExplorerSystem = () => {
  return (
    <View className='explorer-system'>
      {/* Account Section */}
      <View className='account-section'>
        <Text className='section-title'>帐篷背景</Text>
        <Text className='section-link' onClick={() => Taro.navigateTo({ url: '/pages/rules/index' })}>
          规则说明 &gt;
        </Text>
        <View className='icon-group'>
          <View className='icon-item'>徽章</View>
          <View className='icon-item large'>角色</View>
          <View className='icon-item'>世界地图</View>
        </View>
      </View>

      {/* Progress Bar Section */}
      <View className='progress-section'>
        <Text className='section-title'>成长进度条</Text>
      </View>

      {/* Explorer Benefits Section */}
      <View className='benefits-section'>
        <Text className='section-title'>一级探险家权益</Text>
        <Text className='section-link' onClick={() => Taro.navigateTo({ url: '/pages/benefits-comparison/index' })}>
          权益对比 &gt;
        </Text>
        <View className='icon-group'>
          <View className='icon-item' />
          <View className='icon-item' />
          <View className='icon-item' />
          <View className='icon-item' />
        </View>
      </View>

      {/* Growth Tasks Section */}
      <View className='tasks-section'>
        <Text className='section-title'>成长任务</Text>
        <Text className='section-link' onClick={() => Taro.navigateTo({ url: '/pages/growth-details/index' })}>
          成长明细 &gt;
        </Text>
        <View className='task-list'>
          <View className='task-item' />
          <View className='task-item' />
          <View className='task-item' />
          <View className='task-item' />
          <View className='task-item' />
        </View>
      </View>
    </View>
  );
};

export default ExplorerSystem;
