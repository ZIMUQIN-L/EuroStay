import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';

const DateSelection = ({ onClose }) => {
  return (
    <CustomFullScreenDialog title='选择可住时间' onClose={onClose}>
      <View>
        <Text>这里是可选时间选择的地方</Text>
      </View>
    </CustomFullScreenDialog>
  );
};
export default DateSelection;
