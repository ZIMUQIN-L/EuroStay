import { View, Text } from '@tarojs/components';
import './index.scss';

const CustomFullScreenDialog = ({ title, children, onClose, onSubmit }) => {
  const handleOuterClick = () => {
    onClose();
  };

  return (
    <View className='CustomFullScreenDialog' onClick={handleOuterClick}>
      <View className='dialog-container' onClick={e => e.stopPropagation()}>
        <Text style={{ marginTop: '24px' }}>{title}</Text>
        {children}
        <View className='dialog-save-button' onClick={onSubmit}>
          <Text style={{ color: 'white' }}>保存</Text>
        </View>
      </View>
    </View>
  );
};
export default CustomFullScreenDialog;
