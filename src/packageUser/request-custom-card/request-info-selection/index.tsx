import { View, Text, Image } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';
import {
  DateSelectionIcon,
  CapacitySelectionIcon,
  RightBottomArrow,
} from '@utils/cloudIcons';

import DateSelection from './date-selection';
import CapacitySelection from './capacity-selection';

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

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [capacity, setCapacity] = useState(0);

  // close function
  const handleClose = () => {
    setIsDateSelection(false);
    setIsCapacitySelection(false);
  };

  // select any module and shown
  const handleDateSelection = () => {
    setIsDateSelection(true);
  };

  const handleCapacitySelection = () => {
    setIsCapacitySelection(true);
  };

  // edit the content
  const handleUserDateEdit = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    // onRequestInfoSelection(start, end, capacity);
  };

  const handleUserCapacityEdit = editedCapacity => {
    // onRequestInfoSelection(startDate, endDate, editedCapacity);
    setCapacity(editedCapacity);
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
                <Text>{startDate && endDate ? `${startDate} - ${endDate}` : '请选择'}</Text>
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
                <Text>{capacity != 0 ? `${capacity}` : '请选择'}</Text>
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
    </View>
  );
};

export default RequestInfoSelection;
