import { View, Text } from '@tarojs/components';
import './index.scss'; // Import your styles here

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <View className='modal-overlay'>
      <View className='modal-content'>
        <View className='modal-header'>
          <Text className='modal-title'>Custom Card</Text>
        </View>
        <View className='modal-body'>{children}</View>
        <View className='modal-footer'>
          <Text className='modal-button' onClick={onClose}>
            确定
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomModal;
