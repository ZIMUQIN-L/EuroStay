import { View, Text, Image } from '@tarojs/components';
import './index.scss';
import { useState, useEffect } from 'react';
import { UserAccomMessageItemProps } from '@utils/interfaces';
import { accomMessageSearchWithId } from '@common/database/accomMessage/accomMessage';
import {
  LocationSelectionIcon,
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
import LocationSelection from './location-selection';

interface SeekInfoSelectionProps {
  seekInfoId: string | undefined;
  onSeekInfoSelection: (
    location: string | undefined,
    startDate: Date | undefined | string,
    endDate: Date | undefined | string,
    capacity: number,
    contactInfo: string | undefined,
    gender: string | undefined,
  ) => void;
}

const SeekInfoSelection: React.FC<SeekInfoSelectionProps> = ({
  seekInfoId,
  onSeekInfoSelection,
}) => {
  const [isDateSelection, setIsDateSelection] = useState(false);
  const [isCapacitySelection, setIsCapacitySelection] = useState(false);
  const [isContactSelection, setContactSelection] = useState(false);
  const [isGenderSelection, setIsGenderSelection] = useState(false);
  const [isLocationSelection, setIsLocationSelection] = useState(false);

  const [startDate, setStartDate] = useState<Date | string>();
  const [endDate, setEndDate] = useState<Date | string>();
  const [capacity, setCapacity] = useState(0);
  const [contactInfo, setContactInfo] = useState<string>('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (seekInfoId != 'none') {
      accomMessageSearchWithId(seekInfoId).then(
        (accomInfo: UserAccomMessageItemProps) => {
          setLocation(accomInfo.location);
          setStartDate(accomInfo.start_date);
          setEndDate(accomInfo.end_date);
          setCapacity(accomInfo.capacity);
          setGender(accomInfo.gender);
        },
      );
    }
  }, []);

  // close function
  const handleClose = () => {
    setIsDateSelection(false);
    setIsCapacitySelection(false);
    setContactSelection(false);
    setIsGenderSelection(false);
    setIsLocationSelection(false);
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

  const handleLocationSelection = () => {
    setIsLocationSelection(true);
  };

  // edit the content
  const handleUserLocationEdit = locationInfo => {
    setLocation(locationInfo);
    onSeekInfoSelection(
      locationInfo,
      startDate,
      endDate,
      capacity,
      contactInfo,
      gender,
    );
  };

  const handleUserDateEdit = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    onSeekInfoSelection(location, start, end, capacity, contactInfo, gender);
  };

  const handleUserGenderEdit = genderInfo => {
    onSeekInfoSelection(
      location,
      startDate,
      endDate,
      capacity,
      contactInfo,
      genderInfo,
    );
    setGender(genderInfo);
  };

  const handleUserCapacityEdit = editedCapacity => {
    onSeekInfoSelection(
      location,
      startDate,
      endDate,
      editedCapacity,
      contactInfo,
      gender,
    );
    setCapacity(editedCapacity);
  };

  const handleUserContactEdit = (info: string) => {
    onSeekInfoSelection(location, startDate, endDate, capacity, info, gender);
    setContactInfo(info);
  };

  return (
    <View className='request-custome-card'>
      <View className='selection-part'>
        <View className='selection-container'>
          <View className='selection-content'>
            <View className='selection-left'>
              <View className='icon-container'>
                <Image src={LocationSelectionIcon} />
              </View>
            </View>
            <View className='selection-right' onClick={handleLocationSelection}>
              <Text>求宿地点</Text>
              <View className='selection-right-right'>
                <Text>{location != '' ? `${location}` : `请选择`} </Text>
                <Image src={RightBottomArrow} />
              </View>
            </View>
            {isLocationSelection && (
              <LocationSelection
                onClose={handleClose}
                onLocationSelected={handleUserLocationEdit}
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
                prevStartDate={startDate}
                prevEndDate={endDate}
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
                prevCapacity={capacity}
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
                prevContact={contactInfo}
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
                prevGender={gender}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
export default SeekInfoSelection;
