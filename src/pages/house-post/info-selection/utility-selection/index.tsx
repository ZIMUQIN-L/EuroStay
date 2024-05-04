import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';
import { useEffect, useState } from 'react';
import RoomFacility from '@components/RoomFacility';

const UtilitySelection = ({ onClose }) => {
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
