import { View, Image, Text } from '@tarojs/components';
import LocationSelectionIcon from '@assets/images/location-selection-icon.png';
import DateSelectionIcon from '@assets/images/date-selection-icon.png';
import CapacitySelectionIcon from '@assets/images/capacity-selection-icon.png';
import TypeSelectionIcon from '@assets/images/type-seletion-icon.png';
import UtilitySelectionIcon from '@assets/images/utility-selection-icon.png';
import RightArrow from '@assets/images/right-arrow.svg';
import LocationSelection from './location-selection';
import DateSelection from './date-selection';
import CapacitySelection from './capacity-selection';
import TypeSelection from './type-selection';
import UtilitySelection from './utility-selection';
import './index.scss';
import { useState } from 'react';

const InfoSelection = () => {
  const [isLocationSelection, setIsLocationSelection] = useState(false);
  const [isDateSelection, setIsDateSelection] = useState(false);
  const [isCapacitySelection, setIsCapacitySelection] = useState(false);
  const [isTypeSelection, setIsTypeSelection] = useState(false);
  const [isUtilitySelection, setIsUtilitySelection] = useState(false);

  const handleLocationSelection = () => {
    setIsLocationSelection(true);
  };

  const handleDateSelection = () => {
    setIsDateSelection(true);
  };

  // user select date
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const handleUserDateEdit = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    console.log(start, end);
  };

  // 修改capacity
  const [capacity, setCapacity] = useState(0);

  const handleCapacitySelection = () => {
    setIsCapacitySelection(true);
  };

  const handleUserCapacityEdit = editedCapacity => {
    console.log(editedCapacity);
    setCapacity(editedCapacity);
  };

  const handleTypeSelection = () => {
    setIsTypeSelection(true);
  };

  const handleUtilitySelection = () => {
    setIsUtilitySelection(true);
  };

  const handleClose = () => {
    setIsLocationSelection(false);
    setIsDateSelection(false);
    setIsCapacitySelection(false);
    setIsTypeSelection(false);
    setIsUtilitySelection(false);
  };

  return (
    <>
      <View className='selection-part'>
        <View className='selection-container'>
          <View className='selection-content'>
            <View className='selection-left'>
              <View className='icon-container'>
                <Image src={LocationSelectionIcon} />
              </View>
              <Text>房源地址</Text>
            </View>
            <View className='selection-right' onClick={handleLocationSelection}>
              <Text>请选择 </Text>
              <Image src={RightArrow} />
            </View>
            {isLocationSelection && <LocationSelection onClose={handleClose} />}
          </View>
        </View>
      </View>

      <View className='selection-part'>
        <View className='selection-container'>
          <View className='selection-content'>
            <View className='selection-left'>
              <View className='icon-container'>
                <Image src={DateSelectionIcon} />
              </View>
              <Text>可住时间</Text>
            </View>
            <View className='selection-right' onClick={handleDateSelection}>
              <Text>
                {startDate && endDate ? `${startDate} - ${endDate}` : `请选择`}{' '}
              </Text>
              <Image src={RightArrow} />
            </View>
            {isDateSelection && (
              <DateSelection
                onClose={handleClose}
                onDateSelected={handleUserDateEdit}
              />
            )}
          </View>
        </View>
      </View>

      <View className='selection-part'>
        <View className='selection-container'>
          <View className='selection-content'>
            <View className='selection-left'>
              <View className='icon-container'>
                <Image src={CapacitySelectionIcon} />
              </View>
              <Text>可住人数</Text>
            </View>
            <View className='selection-right' onClick={handleCapacitySelection}>
              <Text>{capacity != 0 ? `${capacity}` : `请选择`} </Text>
              <Image src={RightArrow} />
            </View>
            {isCapacitySelection && (
              <CapacitySelection
                onClose={handleClose}
                onCapacitySelected={handleUserCapacityEdit}
              />
            )}
          </View>
        </View>
      </View>

      <View className='selection-part'>
        <View className='selection-container'>
          <View className='selection-content'>
            <View className='selection-left'>
              <View className='icon-container'>
                <Image src={TypeSelectionIcon} />
              </View>
              <Text>床型</Text>
            </View>
            <View className='selection-right' onClick={handleTypeSelection}>
              <Text>请选择 </Text>
              <Image src={RightArrow} />
            </View>
            {isTypeSelection && <TypeSelection onClose={handleClose} />}
          </View>
        </View>
      </View>

      <View className='selection-part'>
        <View className='selection-container'>
          <View className='selection-content'>
            <View className='selection-left'>
              <View className='icon-container'>
                <Image src={UtilitySelectionIcon} />
              </View>
              <Text>设施</Text>
            </View>
            <View className='selection-right' onClick={handleUtilitySelection}>
              <Text>请选择 </Text>
              <Image src={RightArrow} />
            </View>
            {isUtilitySelection && <UtilitySelection onClose={handleClose} />}
          </View>
        </View>
      </View>

      <View style={{ backgroundColor: 'white' }}>
        <View className='post-submit-button'>
          <Text>发布房源</Text>
        </View>
      </View>
    </>
  );
};

export default InfoSelection;
