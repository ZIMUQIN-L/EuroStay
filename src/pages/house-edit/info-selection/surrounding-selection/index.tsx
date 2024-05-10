import { View} from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';
import { useState } from 'react';
import RoomSurrounding from '@components/RoomSurrounding';

const SurroundingSelection = ({ onClose, onSurroundingSelected }) => {
  const [isSubwaySelected, setIsSubwaySelected] = useState<Boolean>(false);
  const [isAttractionSelected, setIsAttractionSelected] =
    useState<Boolean>(false);
  const [isChineseSuperMartSelected, setIsChineseSuperMartSelected] =
    useState<Boolean>(false);

  const handleSubmitSurroundingSelection = () => {
    const selectedItems = {
      近地铁: isSubwaySelected,
      近景点: isAttractionSelected,
      近中超: isChineseSuperMartSelected,
    };
    const filteredSelectedItems = Object.fromEntries(
      Object.entries(selectedItems).filter(([key, value]) => value === true),
    );
    onSurroundingSelected(filteredSelectedItems);
    onClose();
  };
  return (
    <CustomFullScreenDialog
      title='选择周边信息'
      onClose={onClose}
      onSubmit={handleSubmitSurroundingSelection}
    >
      <View>
        <RoomSurrounding
          isAttractionSelected={isAttractionSelected}
          isChineseSuperMartSelected={isChineseSuperMartSelected}
          isSubwaySelected={isSubwaySelected}
          onClick={value => {
            switch (value) {
              case 'Subway':
                setIsSubwaySelected(!isSubwaySelected);
                break;
              case 'Attraction':
                setIsAttractionSelected(!isAttractionSelected);
                break;
              case 'ChineseSuperMart':
                setIsChineseSuperMartSelected(!isChineseSuperMartSelected);
                break;
            }
          }}
        />
      </View>
    </CustomFullScreenDialog>
  );
};
export default SurroundingSelection;
