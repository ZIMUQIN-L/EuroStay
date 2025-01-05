import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import { KeyArrowRight } from '@utils/cloudIcons';
const Popup = ({ content, title, onClickClose, onClickConfirm }) => {
  return (
    <View className='popup-wrapper'>
      <View className='popup-top'>
        <View className='back' onClick={onClickClose}>
          <Image src={KeyArrowRight} className='back-icon' />
        </View>
        <View className='title'>{title}</View>
        <View className='confirm' onClick={onClickConfirm}>
          确认
        </View>
      </View>
      <View className='popup-content'>{content}</View>
    </View>
  );
};

export default Popup;
