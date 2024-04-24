import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';

const CapacitySelection = ({ onClose }) => {
  return (
    <CustomFullScreenDialog title='选择可住人数' onClose={onClose}>
      <View>
        <Text>这里是可住人数选择的地方</Text>
      </View>
    </CustomFullScreenDialog>
  );
};
export default CapacitySelection;
