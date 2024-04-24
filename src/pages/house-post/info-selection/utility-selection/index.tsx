import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';

const UtilitySelection = ({ onClose }) => {
  return (
    <CustomFullScreenDialog title='选择设施' onClose={onClose}>
      <View>
        <Text>这里是设施选择的地方</Text>
      </View>
    </CustomFullScreenDialog>
  );
};
export default UtilitySelection;
