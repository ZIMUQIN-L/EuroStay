import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';

const TypeSelection = ({ isOpen }) => {
  return (
    <CustomFullScreenDialog title='选择床型' isOpen={isOpen}>
      <View>
        <Text>这里是床型选择的地方</Text>
      </View>
    </CustomFullScreenDialog>
  );
};
export default TypeSelection;
