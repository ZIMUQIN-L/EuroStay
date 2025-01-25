import { View } from '@tarojs/components';

export default () => {
  return (
    <View className='house-address'>
      <View className='title'>您的房源地址是？</View>
      <View className='des'>
        房源详情只会展示房源的大致区位，您的详细地址不会直接展示给房客。
      </View>
    </View>
  );
};
