import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';
import { useEffect, useState } from 'react';
import HouseGenderPreference from '@components/HouseGenderPreference';

const GenderSelection = ({ onClose, onGenderSelected, prevGender }) => {
  const [isFemaleSelected, setIsFemaleSelected] = useState<Boolean>(false);
  const [isMaleSelected, setIsMaleSelected] = useState<Boolean>(false);
  const [isAllGenderSelected, setIsAllGenderSelected] =
    useState<Boolean>(false);

  useEffect(() => {
    if (prevGender == '全女生') {
      setIsFemaleSelected(true);
    } else if (prevGender == '全男生') {
      setIsMaleSelected(true);
    } else if (prevGender == '都有') {
      setIsAllGenderSelected(true);
    }
  }, []);

  const handleSubmitGenderSelection = () => {
    const selectedItems = {
      全女生: isFemaleSelected,
      全男生: isMaleSelected,
      都有: isAllGenderSelected,
    };
    const filteredSelectedItems = Object.fromEntries(
      Object.entries(selectedItems).filter(([key, value]) => value === true),
    );
    onGenderSelected(Object.keys(filteredSelectedItems)[0]);
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
