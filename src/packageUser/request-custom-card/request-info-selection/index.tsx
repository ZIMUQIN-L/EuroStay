import { View, Text, Image } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';
import {
  DateSelectionIcon,
  CapacitySelectionIcon,
  RightBottomArrow,
  PreferenceIcon,
  GenderIcon,
} from '@utils/cloudIcons';

import DateSelection from './date-selection';
import CapacitySelection from './capacity-selection';
import ContactSelection from './contact-selection';
import GenderSelection from './gender-selection';

interface RequestInfoSelectionProps {
  onRequestInfoSelection: (
    startDate: Date | undefined,
    endDate: Date | undefined,
    capacity: number,
    contactInfo: string | undefined,
    gender: string | undefined,
  ) => void;
}

const RequestInfoSelection: React.FC<RequestInfoSelectionProps> = ({
  onRequestInfoSelection,
}) => {
  const [isDateSelection, setIsDateSelection] = useState(false);
  const [isCapacitySelection, setIsCapacitySelection] = useState(false);
  const [isContactSelection, setContactSelection] = useState(false);
  const [isGenderSelection, setIsGenderSelection] = useState(false);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [capacity, setCapacity] = useState(0);
  const [contactInfo, setContactInfo] = useState<string>();
  const [gender, setGender] = useState('');

  // close function
  const handleClose = () => {
    setIsDateSelection(false);
    setIsCapacitySelection(false);
    setContactSelection(false);
    setIsGenderSelection(false);
  };

  // select any module and shown
  const handleDateSelection = () => {
    setIsDateSelection(true);
  };

  const handleCapacitySelection = () => {
    setIsCapacitySelection(true);
  };

  const handleContactSelection = () => {
    setContactSelection(true);
  };

  const handleGenderSelection = () => {
    setIsGenderSelection(true);
  };

  // edit the content
  const handleUserDateEdit = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    onRequestInfoSelection(start, end, capacity, contactInfo, gender);
  };

  const handleUserGenderEdit = genderInfo => {
    onRequestInfoSelection(
      startDate,
      endDate,
      capacity,
      contactInfo,
      genderInfo,
    );
    setGender(genderInfo);
  };

  const handleUserCapacityEdit = editedCapacity => {
    onRequestInfoSelection(
      startDate,
      endDate,
      editedCapacity,
      contactInfo,
      gender,
    );
    setCapacity(editedCapacity);
  };

  const handleUserContactEdit = (info: string) => {
    onRequestInfoSelection(startDate, endDate, capacity, info, gender);
    setContactInfo(info);
  };

  return (
    <View className='request-custome-card'>
      <View className='selection-part'>
        <View className='selection-container'>
          <View className='selection-content'>
            <View className='selection-left'>
              <View className='icon-container'>
                <Image src={DateSelectionIcon} />
              </View>
            </View>
            <View className='selection-right' onClick={handleDateSelection}>
              <Text>求宿时间</Text>
              <View className='selection-right-right'>
                <Text>
                  {startDate && endDate
                    ? `${startDate} - ${endDate}`
                    : `请选择`}{' '}
                </Text>
                <Image src={RightBottomArrow} />
              </View>
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
                <Image src={CapacitySelectionIcon} className='capacity-pic' />
              </View>
            </View>
            <View className='selection-right' onClick={handleCapacitySelection}>
              <Text>入住人数</Text>
              <View className='selection-right-right'>
                <Text>{capacity != 0 ? `${capacity}` : `请选择`} </Text>
                <Image src={RightBottomArrow} />
              </View>
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
                <Image src={PreferenceIcon} />
              </View>
            </View>
            <View className='selection-right' onClick={handleContactSelection}>
              <Text>个人联系方式</Text>
              <View className='selection-right-right'>
                {/* Optionally display the selected contact info */}
                {contactInfo != undefined && contactInfo != '' && (
                  <Text>{`${contactInfo}`}</Text>
                )}
                {!(contactInfo != undefined && contactInfo != '') && (
                  <Text>请选择</Text>
                )}
                <Image src={RightBottomArrow} />
              </View>
            </View>
            {isContactSelection && (
              <ContactSelection
                onClose={handleClose}
                onContactSelected={handleUserContactEdit}
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
            </View>
            <View className='selection-right' onClick={handleGenderSelection}>
              <Text>住客性别</Text>
              <View className='selection-right-right'>
                {/* Optionally display the selected contact info */}
                <Text>{gender != '' ? gender : `请选择`}</Text>
                <Image src={RightBottomArrow} />
              </View>
            </View>
            {isGenderSelection && (
              <GenderSelection
                onClose={handleClose}
                onGenderSelected={handleUserGenderEdit}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
export default RequestInfoSelection;
