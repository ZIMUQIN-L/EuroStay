import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';

const TypeSelection = ({ onClose }) => {
  return (
    <CustomFullScreenDialog title='选择床型' onClose={onClose}>
      <View>
        <Text>这里是床型选择的地方</Text>
      </View>
    </CustomFullScreenDialog>
  );
};
export default TypeSelection;