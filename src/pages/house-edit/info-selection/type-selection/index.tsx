import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';

const TypeSelection = ({ onClose }) => {
  const handleSubmitHouseTypeSelection = () => {
    onClose();
  };

  return (
    <CustomFullScreenDialog
      title='房源类型'
      onSubmit={handleSubmitHouseTypeSelection}
      onClose={onClose}
    >
      <View>
        <Text>这里是床型选择的地方</Text>
      </View>
    </CustomFullScreenDialog>
  );
};
export default TypeSelection;
