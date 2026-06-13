import { View, Text, Image } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import vipPriceImg from '../../assets/images/vip-price.png';
import vipStartImg from '../../assets/images/vip-start.png';
import vipIntroImg from '../../assets/images/vip-intro.png';
import clawImg from '../../assets/images/claw.png';
import crownIcon from '../../assets/icons/crown.svg';

interface WelcomeModalProps {
  visible: boolean;
  onClose: () => void;
  onDownload: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  const handleRecharge = () => {
    onClose();
    Taro.navigateTo({ url: '/packageUser/user-vip/index' });
  };

  return (
    <View className='vip-overlay' onClick={onClose}>
      <View className='vip-wrapper'>

        {/* Overflowing decorations — sit above the card boundary */}
        <Image className='vip-price-img' src={vipPriceImg} mode='aspectFit' />
        <Image className='vip-claw-img' src={clawImg} mode='aspectFit' />

        <View className='vip-card' onClick={e => e.stopPropagation()}>
          {/* Header: cream bg with start text */}
          <View className='vip-card-header'>
            <Image className='vip-start-img' src={vipStartImg} mode='aspectFit' />
          </View>

          {/* Middle intro image */}
          <Image className='vip-intro-img' src={vipIntroImg} mode='widthFix' />

          {/* Buttons */}
          <View className='vip-buttons'>
            <View className='vip-btn vip-btn-primary' onClick={onClose}>
              <Text className='vip-btn-text'>朕知道了</Text>
            </View>
            <View className='vip-btn vip-btn-secondary' onClick={handleRecharge}>
              <Image className='vip-crown-icon' src={crownIcon} mode='aspectFit' />
              <Text className='vip-btn-text'>叽里咕噜说什么呢，立刻充值</Text>
            </View>
          </View>
        </View>

      </View>
    </View>
  );
};

export default WelcomeModal;
