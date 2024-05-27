import { View, Text } from '@tarojs/components';
import './index.scss';

interface IProps {
  title: string;
  children: any;
  onClose: () => void;
  onSubmit: () => void;
  className?: string;
}

const CustomFullScreenDialog = (props: IProps) => {
  const { title, children, onClose, onSubmit } = props;
  const handleOuterClick = () => {
    onClose();
  };

  return (
    <View className={`CustomFullScreenDialog`} onClick={handleOuterClick}>
      <View
        className={`dialog-container ${!!props?.className ? props.className : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <Text style={{ marginTop: '24px' }} className='diaglog-container-title'>
          {title}
        </Text>
        {children}
        <View className='dialog-save-button' onClick={onSubmit}>
          <Text style={{ color: 'white' }}>确认</Text>
        </View>
      </View>
    </View>
  );
};
export default CustomFullScreenDialog;
