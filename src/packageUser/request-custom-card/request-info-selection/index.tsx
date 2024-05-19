import { View, Text, Image } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';
import {
  DateSelectionIcon,
  CapacitySelectionIcon,
  RightBottomArrow,
  PreferenceIcon,
} from '@utils/cloudIcons';

import DateSelection from './date-selection';
import CapacitySelection from './capacity-selection';
import ContactSelection from './contact-selection';

interface ContactInfo {
  provideContact: boolean;
  wechat: string;
  email: string;
  phone: string;
}

const RequestInfoSelection = ({ onRequestInfoSelection }) => {
  const [isDateSelection, setIsDateSelection] = useState(false);
  const [isCapacitySelection, setIsCapacitySelection] = useState(false);
  const [isContactSelection, setContactSelection] = useState(false);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [capacity, setCapacity] = useState(0);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  // close function
  const handleClose = () => {
    setIsDateSelection(false);
    setIsCapacitySelection(false);
    setContactSelection(false);
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

  // edit the content
  const handleUserDateEdit = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    onRequestInfoSelection(
      start,
      end,
      capacity,
      contactInfo,

    );
  };

  const handleUserCapacityEdit = editedCapacity => {
    onRequestInfoSelection(
      startDate,
      endDate,
      editedCapacity,
      contactInfo,
    );
    setCapacity(editedCapacity);
  };

  const handleUserContactEdit = (info) => {
    onRequestInfoSelection(
      startDate,
      endDate,
      capacity,
      info,
    );
    setContactInfo(info);
    setContactSelection(false);
  };



  return (
    <>
      <View className='selection-part'>
        <View className='selection-container'>
          <View className='selection-content'>
            <View className='selection-left'>
              <View className='icon-container'>
                <Image src={DateSelectionIcon} />
              </View>
              <Text>求宿时间</Text>
            </View>
            <View className='selection-right' onClick={handleDateSelection}>
              <Text>
                {startDate && endDate ? `${startDate} - ${endDate}` : `请选择`}{' '}
              </Text>
              <Image src={RightBottomArrow} />
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
              <Text>入住人数</Text>
            </View>
            <View className='selection-right' onClick={handleCapacitySelection}>
              <Text>{capacity != 0 ? `${capacity}` : `请选择`} </Text>
              <Image src={RightBottomArrow} />
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
            <Text>个人联系方式</Text>
          </View>
          <View className='selection-right' onClick={handleContactSelection}>
            {/* Optionally display the selected contact info */}
            {contactInfo && (
              <Text>{`${contactInfo.email || contactInfo.wechat || contactInfo.phone}`}</Text>
            )}
            {!contactInfo && <Text>请选择</Text>}
            <Image src={RightBottomArrow} />
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


    </>
  );
};
export default RequestInfoSelection;