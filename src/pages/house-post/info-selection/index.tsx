import { View, Image, Text } from '@tarojs/components';
import LocationSelectionIcon from '@assets/images/location-selection-icon.png';
import RightArrow from '@assets/images/right-arrow.svg';
import LocationSelection from './location-selection';
import './index.scss';
import { useState } from 'react';

const InfoSelection = () => {
  const [isLocationSelection, setIsLocationSelection] = useState(false);

  const handleLocationSelection = () => {
    setIsLocationSelection(true);
  };

  return (
    <View className='selection-part'>
      <View className='selection-container'>
        <View className='selection-content'>
          <View className='selection-left'>
            <Image src={LocationSelectionIcon} />
            <Text>房源地址</Text>
          </View>
          <View className='selection-right' onClick={handleLocationSelection}>
            <Text>请选择 </Text>
            <Image src={RightArrow} />
          </View>
          {isLocationSelection && <LocationSelection />}
        </View>
      </View>
    </View>
  );
};

export default InfoSelection;
