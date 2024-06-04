import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';
import { useEffect, useState } from 'react';
import HouseGenderPreference from '@components/HouseGenderPreference';

const GenderSelection = ({ onClose, onGenderSelected }) => {
  const [isFemaleSelected, setIsFemaleSelected] = useState<Boolean>(false);
  const [isMaleSelected, setIsMaleSelected] = useState<Boolean>(false);
  const [isAllGenderSelected, setIsAllGenderSelected] =
    useState<Boolean>(false);

  const handleSubmitGenderSelection = () => {
    const selectedItems = {
      限女生: isFemaleSelected,
      限男生: isMaleSelected,
      不限性别: isAllGenderSelected,
    };
    const filteredSelectedItems = Object.fromEntries(
      Object.entries(selectedItems).filter(([key, value]) => value === true),
    );
    onGenderSelected(filteredSelectedItems);
    onClose();
  };
  // 对于性别选择，只能够单选
  return (
    <CustomFullScreenDialog
      title='选择房客性别'
      onClose={onClose}
      onSubmit={handleSubmitGenderSelection}
    >
      <View>
        <HouseGenderPreference
          isFemaleSelected={isFemaleSelected}
          isMaleSelected={isMaleSelected}
          isAllGenderSelected={isAllGenderSelected}
          onClick={value => {
            switch (value) {
              case 'Female':
                setIsFemaleSelected(!isFemaleSelected);
                setIsMaleSelected(false);
                setIsAllGenderSelected(false);
                break;
              case 'Male':
                setIsFemaleSelected(false);
                setIsMaleSelected(!isMaleSelected);
                setIsAllGenderSelected(false);
                break;
              case 'AllGender':
                setIsFemaleSelected(false);
                setIsMaleSelected(false);
                setIsAllGenderSelected(!isAllGenderSelected);
                break;
            }
          }}
        />
      </View>
    </CustomFullScreenDialog>
  );
};
export default GenderSelection;
