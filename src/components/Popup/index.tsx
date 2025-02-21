import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
const Popup = ({ content, title, onClickClose, onClickConfirm }) => {
  return (
    <View className='popup-wrapper'>
      <View className='popup-top'>
        <View className='back' onClick={onClickClose}></View>
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
