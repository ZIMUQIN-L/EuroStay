import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';

const LocationSelection = () => {
  return (
    <CustomFullScreenDialog title='选择房源地址'>
      <View>
        <Text>这里是房源地址选择的地方</Text>
      </View>
    </CustomFullScreenDialog>
  );
};
export default LocationSelection;
