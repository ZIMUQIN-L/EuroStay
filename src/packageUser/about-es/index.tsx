import { View, Text } from '@tarojs/components';
import './index.scss';

const AboutES = () => {
  return (
    <View className='about-es'>
      <View className='contact-header'>
        <Text className='title'>关于我们的一些故事</Text>
      </View>
      <View className='content'>
        {/* 关于我们 */}
        <View className='section'>
          <View className='section-title'>关于我们</View>
          <View className='section-content'>
          Eurostay 是一个承接新欧洲青年的去中心化旅行社交平台，致力于用住宿连接全世界角落的每一个有趣的人。我们希望打破欧洲华人之间的社交孤岛，汇集了全欧洲有趣的人，通过换宿和深度体验建立一个真正有温度、有信任的社群。我们相信，每个人的家都可以以每个人的家为基点，让世界上有趣的陌生人为纽带，构建一个共情网络，让世界不再昂贵、生活不再孤单。打造一个社交化的旅行社区，让旅行从单纯的“目的地消费”模式，转变为更有深度和互动的体验。
          </View>
        </View>

        {/* 如何预宿 */}
        <View className='section'>
          <View className='section-title'>如何换宿</View>
          <View className='section-content'>
            点击EuroStay小程序，找到你想拜访的Host，填写申请，等待回复就好啦~
          </View>
        </View>
      </View>
    </View>
  );
};

export default AboutES;
