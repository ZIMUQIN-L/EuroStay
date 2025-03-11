import { LoginLoadingIcon } from '@utils/cloudIcons';
import { Image, View, Text } from '@tarojs/components';
import './index.scss';

const Loading = () => {
  return (
    <View className='loading'>
      <View className='loading-container'>
        <View className='loading-spinner'>
          <View className='loading-circle'></View>
          <Image src={LoginLoadingIcon} className='loading-logo' />
        </View>
      </View>
      <Text className='loading-text'>EuroStay</Text>
    </View>
  );
};

export default Loading;