import { View, Text, Image } from '@tarojs/components';
import './index.scss';
import { phoneLogo } from '@utils/cloudIcons'; 

interface WelcomePopupProps {
  onClose: () => void;
  onJoin: () => void;
}

const WelcomePopup = ({ onClose, onJoin }: WelcomePopupProps) => {
  return (
    <View className='welcome-popup-overlay'>
      <View className='welcome-popup-container'>
        <View className='close-button' onClick={onClose}>
          <Text className='close-icon'>×</Text>
          <Text className='close-text'>免费使用</Text>
        </View>
        <Image src={phoneLogo} className='logo' />
        <Text className='title'>亲爱的冒险家</Text>
        <Text className='message'>感谢你成为了我们的用户!</Text>
        <Text className='message'>经过两个月的设计和开发，我们的APP即将上线啦，我们完善了整体的换宿流程，加入了即时通知，也完善了信息的展示，后续我们将继续加入实名验证等功能~这会是一个会员制的平台, 目前1000名会员仅需1.99欧开启换宿之旅哦~</Text>
        <Text className='message'>再次欢迎您的加入, Eurostay, 世界不贵!我们一起去看世界吧~</Text>
        <View className='button-group'>
          <View className='main-button' onClick={onClose}>
            <Text>朕知道了</Text>
          </View>
          <View className='secondary-button' onClick={onJoin}>
            <Text>👑 加入换宿社群</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WelcomePopup; 