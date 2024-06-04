import { View } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';
import { useEffect, useState } from 'react';
import RoomSurrounding from '@components/RoomSurrounding';

const SurroundingSelection = ({
  prevSurrounding,
  onClose,
  onSurroundingSelected,
}) => {
  const [isSubwaySelected, setIsSubwaySelected] = useState<Boolean>(false);
  const [isAttractionSelected, setIsAttractionSelected] =
    useState<Boolean>(false);
  const [isChineseSuperMartSelected, setIsChineseSuperMartSelected] =
    useState<Boolean>(false);

  useEffect(() => {
    setIsSubwaySelected(
      prevSurrounding['近地铁'] ? prevSurrounding['近地铁'] : false,
    );
    setIsAttractionSelected(
      prevSurrounding['近景点'] ? prevSurrounding['近景点'] : false,
    );
    setIsChineseSuperMartSelected(
      prevSurrounding['近中超'] ? prevSurrounding['近中超'] : false,
    );
  }, [prevSurrounding]);

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
