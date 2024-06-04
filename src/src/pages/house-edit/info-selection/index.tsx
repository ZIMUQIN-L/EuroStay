import { View, Image, Text } from '@tarojs/components';
import {
  LocationSelectionIcon,
  DateSelectionIcon,
  CapacitySelectionIcon,
  UtilitySelectionIcon,
  RightBottomArrow,
  GenderIcon,
  SurroundingIcon,
  PreferenceIcon,
} from '@utils/cloudIcons';

import LocationSelection from './location-selection';
import DateSelection from './date-selection';
import CapacitySelection from './capacity-selection';
import UtilitySelection from './utility-selection';
import './index.scss';
import { useState, useEffect } from 'react';
import SurroundingSelection from './surrounding-selection';
import PreferenceSelection from './preference-selection';
import GenderSelection from './gender-selection';

const InfoSelection = ({
  prevLocation,
  prevStartDate,
  prevEndDate,
  prevCapacity,
  prevGender,
  prevUtility,
  prevSurrounding,
  prevPreference,
  onUserInfoEdit,
}) => {
  const [isLocationSelection, setIsLocationSelection] = useState(false);
  const [isDateSelection, setIsDateSelection] = useState(false);
  const [isCapacitySelection, setIsCapacitySelection] = useState(false);
  const [isTypeSelection, setIsTypeSelection] = useState(false);
  const [isUtilitySelection, setIsUtilitySelection] = useState(false);
  const [isSurroundingSelection, setIsSurroundingSelection] = useState(false);
  const [isPreferenceSelection, setIsPreferenceSelection] = useState(false);
  const [isGenderSelection, setIsGenderSelection] = useState(false);
  useEffect(() => {
    setCapacity(prevCapacity);
    setUtility(prevUtility);
    setPreference(prevPreference);
    setEndDate(prevEndDate);
    setSurrounding(prevSurrounding);
    setStartDate(prevStartDate);
    setLocation(prevLocation);
    setGender(prevGender);
  }, [
    prevLocation,
    prevStartDate,
    prevEndDate,
    prevCapacity,
    prevGender,
    prevUtility,
    prevSurrounding,
    prevPreference,
  ]);
  const handleLocationSelection = () => {
    setIsLocationSelection(true);
  };

  const handleDateSelection = () => {
    setIsDateSelection(true);
  };

  const [startDate, setStartDate] = useState<Date>(prevStartDate);
  const [endDate, setEndDate] = useState<Date>(prevEndDate);
  const handleUserDateEdit = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    onUserInfoEdit(
      location,
      start,
      end,
      capacity,
      gender,
      utility,
      surrounding,
      preference,
    );
  };

  // 修改capacity
  const [capacity, setCapacity] = useState(prevCapacity);

  const handleCapacitySelection = () => {
    setIsCapacitySelection(true);
  };

  const handleUserCapacityEdit = editedCapacity => {
    onUserInfoEdit(
      location,
      startDate,
      endDate,
      editedCapacity,
      gender,
      utility,
      surrounding,
      preference,
    );
    setCapacity(editedCapacity);
  };

  const handleTypeSelection = () => {
    setIsTypeSelection(true);
  };

  const handleUtilitySelection = () => {
    setIsUtilitySelection(true);
  };

  const handleSurroundingSelection = () => {
    setIsSurroundingSelection(true);
  };

  const handlePreferenceSelection = () => {
    setIsPreferenceSelection(true);
  };

  const handleGenderSelection = () => {
    setIsGenderSelection(true);
  };

  const handleClose = () => {
    setIsLocationSelection(false);
    setIsDateSelection(false);
    setIsCapacitySelection(false);
    setIsTypeSelection(false);
    setIsUtilitySelection(false);
    setIsSurroundingSelection(false);
    setIsPreferenceSelection(false);
    setIsGenderSelection(false);
  };

  // post房源location信息
  const [location, setLocation] = useState(prevLocation);
  const handleLocationUserEdit = editedLocation => {
    onUserInfoEdit(
      editedLocation,
      startDate,
      endDate,
      capacity,
      gender,
      utility,
      surrounding,
      preference,
    );
    setLocation(editedLocation);
  };

  // post房源性别信息部分
  const [gender, setGender] = useState(prevGender);
  const handleUserGenderEdit = editedGender => {
    onUserInfoEdit(
      location,
      startDate,
      endDate,
      capacity,
      editedGender,
      utility,
      surrounding,
      preference,
    );
    setGender(editedGender);
  };

  // post房源信息设施部分
  const [utility, setUtility] = useState(prevUtility);
  const handleUserUtilityEdit = editedUtility => {
    onUserInfoEdit(
      location,
      startDate,
      endDate,
      capacity,
      gender,
      editedUtility,
      surrounding,
      preference,
    );
    setUtility(editedUtility);
  };

  // post房源周边信息部分
  const [surrounding, setSurrounding] = useState(prevSurrounding);
  const handleUserSurroundingEdit = editedSurrounding => {
    setSurrounding(editedSurrounding);
    onUserInfoEdit(
      location,
      startDate,
      endDate,
      capacity,
      gender,
      utility,
      editedSurrounding,
      preference,
    );
  };

  // post房主偏好信息
  const [preference, setPreference] = useState(prevPreference);
  const handleUserPreferenceEdit = editedPreference => {
    onUserInfoEdit(
      location,
      startDate,
      endDate,
      capacity,
      gender,
      utility,
      surrounding,
      editedPreference,
    );
    setPreference(editedPreference);
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
              <Text>{location != '' ? `${location}` : `请选择`}</Text>
              <Image src={RightBottomArrow} />
            </View>
            {isLocationSelection && (
              <LocationSelection
                onClose={handleClose}
                onLocationSelected={handleLocationUserEdit}
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
                <Image src={DateSelectionIcon} />
              </View>
              <Text>可住时间</Text>
            </View>
            <View className='selection-right' onClick={handleDateSelection}>
              <Text>
                {startDate && endDate ? `${startDate} - ${endDate}` : `请选择`}{' '}
              </Text>
              <Image src={RightBottomArrow} />
            </View>
            {isDateSelection && (
              <DateSelection
                prevStartDate={startDate}
                prevEndDate={endDate}
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
                <Image src={CapacitySelectionIcon} className='capacity-pic' />
              </View>
              <Text>可住人数</Text>
            </View>
            <View className='selection-right' onClick={handleCapacitySelection}>
              <Text>{capacity != 0 ? `${capacity}` : `请选择`} </Text>
              <Image src={RightBottomArrow} />
            </View>
            {isCapacitySelection && (
              <CapacitySelection
                prevCapacity={capacity}
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
                <Image src={GenderIcon} className='capacity-pic' />
              </View>
              <Text>住客性别</Text>
            </View>
            <View className='selection-right' onClick={handleGenderSelection}>
              <Text>
                {Object.keys(gender).length !== 0
                  ? Object.keys(gender)[0]
                  : `请选择`}{' '}
              </Text>
              <Image src={RightBottomArrow} />
            </View>
            {isGenderSelection && (
              <GenderSelection
                prevGender={gender}
                onClose={handleClose}
                onGenderSelected={handleUserGenderEdit}
              />
            )}
          </View>
        </View>
      </View>

      {/*暂时注释掉 <View className='selection-part'>
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
              <Image src={RightBottomArrow} />
            </View>
            {isTypeSelection && <TypeSelection onClose={handleClose} />}
          </View>
        </View>
      </View> */}

      <View className='selection-part'>
        <View className='selection-container'>
          <View className='selection-content'>
            <View className='selection-left'>
              <View className='icon-container'>
                <Image src={UtilitySelectionIcon} className='utility-pic' />
              </View>
              <Text>设施</Text>
            </View>
            <View className='selection-right' onClick={handleUtilitySelection}>
              <Text>
                {Object.keys(utility).length !== 0
                  ? Object.keys(utility).join(', ')
                  : `请选择`}{' '}
              </Text>
              <Image src={RightBottomArrow} />
            </View>
            {isUtilitySelection && (
              <UtilitySelection
                prevUtility={utility}
                onClose={handleClose}
                onUtilitySelected={handleUserUtilityEdit}
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
                <Image src={SurroundingIcon} className='utility-pic' />
              </View>
              <Text>周边信息</Text>
            </View>
            <View
              className='selection-right'
              onClick={handleSurroundingSelection}
            >
              <Text>
                {Object.keys(surrounding).length !== 0
                  ? Object.keys(surrounding).join(', ')
                  : `请选择`}{' '}
              </Text>
              <Image src={RightBottomArrow} />
            </View>
            {isSurroundingSelection && (
              <SurroundingSelection
                prevSurrounding={surrounding}
                onClose={handleClose}
                onSurroundingSelected={handleUserSurroundingEdit}
              />
            )}
          </View>
        </View>
      </View>

      <View className='selection-part last'>
        <View className='selection-container'>
          <View className='selection-content'>
            <View className='selection-left'>
              <View className='icon-container'>
                <Image src={PreferenceIcon} className='utility-pic' />
              </View>
              <Text>房主偏好</Text>
            </View>
            <View
              className='selection-right'
              onClick={handlePreferenceSelection}
            >
              <Text>
                {Object.keys(preference).length !== 0
                  ? Object.keys(preference).join(', ')
                  : `请选择`}{' '}
              </Text>
              <Image src={RightBottomArrow} />
            </View>
            {isPreferenceSelection && (
              <PreferenceSelection
                prevPreference={preference}
                onClose={handleClose}
                onPreferenceSelected={handleUserPreferenceEdit}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default InfoSelection;
