import LoginLoadingIcon from '@assets/images/login-logo.png';
import { Image, View, Text } from '@tarojs/components';
import './index.scss';

const Loading = () => {
  
  return (
    <View className='loading'>
    <View className='loading-container'>
      <Image src={LoginLoadingIcon} className='loading-logo' />
      <View className='loading-spinner'></View>
    </View>
    <Text>EuroStay</Text>
    </View>
  );
};

export default Loading;
