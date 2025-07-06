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
        <View className='content-scroll-area'>
          <Image src={phoneLogo} className='logo' />
          <Text className='title'>亲爱的冒险家</Text>
          <Text className='message'>欢迎加入 EuroStay 换宿社群！在这里，我们因热爱旅行与分享而相遇——</Text>
          {/* <Text className='message'>是留学生、是背包客、是上班族、是 gap year 行者、是自由职业者……我们用技能、故事或房源，换住理想目的地。让旅行，不再昂贵！</Text> */}
          <Text className='message'>目前我们已汇聚：1w+ 用户、300+ 精选房源、1000+换宿体验！</Text>
          <Text className='message'>历经一年的调研与打磨，EuroStay 正式版将于 7 月上线。为回馈支持，我们开启限时会员计划：</Text>
          <Text className='message'>APP抢先试用一个月€1.99，APP抢先试用两个月€2.99，APP上线后恢复原价~</Text>
          <Text className='message'>为了回馈所有的早期用户，ES CODE前 1000 名终身€1.99/月，ES CODE前 5000 名终身€2.99/月！</Text>
          <Text className='message'>这不仅是一张换宿通行证，更是一张走向世界的邀请函。EuroStay，世界不贵。</Text>
        </View>
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