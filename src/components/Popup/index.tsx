import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
const Popup = ({ content, title, onClickClose, onClickConfirm, className }) => {
  return (
    <View className={`popup-wrapper ${className}`}>
      <View className='popup-top'>
        <View className='back' onClick={onClickClose}>
          返回
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
