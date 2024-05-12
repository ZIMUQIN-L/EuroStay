import { View } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';
import { useState } from 'react';
import RoomFacility from '@components/RoomFacility';

const UtilitySelection = ({ onClose, onUtilitySelected }) => {
  const [isWiFiSelected, setIsWiFiSelected] = useState<Boolean>(false);
  const [isBathSelected, setIsBathSelected] = useState<Boolean>(false);
  const [isWashMachineSelected, setIsWashMachineSelected] =
    useState<Boolean>(false);
  const [isKitchenSelected, setIsKitchenSelected] = useState<Boolean>(false);
  const [isRefrigeratorSelected, setIsRefrigeratorSelected] =
    useState<Boolean>(false);
  const [isAirConditionSelected, setIsAirConditionSelected] =
    useState<Boolean>(false);
  const [isSofaSelected, setIsSofaSelected] = useState<Boolean>(false);
  const [isHeaterSelected, setIsHeaterSelected] = useState<Boolean>(false);

  const handleSubmitUtilitySelection = () => {
    const selectedItems = {
      WIFI: isWiFiSelected,
      独立卫浴: isBathSelected,
      洗衣机: isWashMachineSelected,
      独立厨房: isKitchenSelected,
      冰箱: isRefrigeratorSelected,
      空调: isAirConditionSelected,
      沙发: isSofaSelected,
      暖气: isHeaterSelected,
    };
    const filteredSelectedItems = Object.fromEntries(
      Object.entries(selectedItems).filter(([key, value]) => value === true),
    );
    onUtilitySelected(filteredSelectedItems);
    onClose();
  };
  return (
    <CustomFullScreenDialog
      title='选择设施'
      onClose={onClose}
      onSubmit={handleSubmitUtilitySelection}
    >
      <View>
        <RoomFacility
          isSofaSelected={isSofaSelected}
          isAirConditionSelected={isAirConditionSelected}
          isBathSelected={isBathSelected}
          isKitchenSelected={isKitchenSelected}
          isRefrigeratorSelected={isRefrigeratorSelected}
          isHeaterSelected={isHeaterSelected}
          isWashMachineSelected={isWashMachineSelected}
          isWiFiSelected={isWiFiSelected}
          onClick={value => {
            switch (value) {
              case 'WIFI':
                setIsWiFiSelected(!isWiFiSelected);
                break;
              case 'Bath':
                setIsBathSelected(!isBathSelected);
                break;
              case 'WashMachine':
                setIsWashMachineSelected(!isWashMachineSelected);
                break;
              case 'Kitchen':
                setIsKitchenSelected(!isKitchenSelected);
                break;
              case 'Refrigerator':
                setIsRefrigeratorSelected(!isRefrigeratorSelected);
                break;
              case 'AirCondition':
                setIsAirConditionSelected(!isAirConditionSelected);
                break;
              case 'Sofa':
                setIsSofaSelected(!isSofaSelected);
                break;
              case 'Heater':
                setIsHeaterSelected(!isHeaterSelected);
                break;
            }
          }}
        />
      </View>
    </CustomFullScreenDialog>
  );
};
export default UtilitySelection;
