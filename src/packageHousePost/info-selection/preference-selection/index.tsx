import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';
import { useEffect, useState } from 'react';
import HouseOwnerPreference from '@components/HouseOwnerPreference';

const PreferenceSelection = ({ onClose, onPreferenceSelected }) => {
  const [isSmokeSelected, setIsSmokeSelected] = useState<Boolean>(false);
  const [isPetSelected, setIsPetSelected] = useState<Boolean>(false);
  const [isExchangeSelected, setIsExchangeSelected] = useState<Boolean>(false);
  const [isBeddingSelected, setIsBeddingSelected] = useState<Boolean>(false);
  const [isRentSelected, setIsRentSelected] = useState<Boolean>(false);

  const handleSubmitPreferenceSelection = () => {
    const selectedItems = {
      可吸烟: isSmokeSelected,
      宠物友好: isPetSelected,
      换宿: isExchangeSelected,
      换洗床具: isBeddingSelected,
      短租: isRentSelected,
    };
    const filteredSelectedItems = Object.fromEntries(
      Object.entries(selectedItems).filter(([key, value]) => value === true),
    );
    onPreferenceSelected(filteredSelectedItems);
    onClose();
  };
  return (
    <CustomFullScreenDialog
      title='选择房主偏好'
      onClose={onClose}
      onSubmit={handleSubmitPreferenceSelection}
    >
      <View>
        <HouseOwnerPreference
          isSmokeSelected={isSmokeSelected}
          isPetSelected={isPetSelected}
          isExchangeSelected={isExchangeSelected}
          isBeddingSelected={isBeddingSelected}
          isRentSelected={isRentSelected}
          onClick={value => {
            switch (value) {
              case 'Smoke':
                setIsSmokeSelected(!isSmokeSelected);
                break;
              case 'Pet':
                setIsPetSelected(!isPetSelected);
                break;
              case 'Exchange':
                setIsExchangeSelected(!isExchangeSelected);
                break;
              case 'Bedding':
                setIsBeddingSelected(!isBeddingSelected);
                break;
              case 'Rent':
                setIsRentSelected(!isRentSelected);
                break;
            }
          }}
        />
      </View>
    </CustomFullScreenDialog>
  );
};
export default PreferenceSelection;
