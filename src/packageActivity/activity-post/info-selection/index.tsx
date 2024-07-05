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
import CapacitySelection from './capacity-selection';
import LocationSelection from './location-selection';
import { ActivityInfoItemProps } from '@utils/interfaces';
import StartTimeSelection from './starttime-selection';
import EndTimeSelection from './endtime-selection';
import ContactSelection from './contact-selection';
import PriceSelection from './price-selection';
import PointSelection from './point-selection';
import './index.scss';
import { useState, useEffect } from 'react';
import { activityDetailSearch } from '@common/database/activityInfo/activityInfo';

const InfoSelection = ({ activityId, onActivityInfoEdit }) => {
  // 控制变量
  const [isLocationSelection, setIsLocationSelection] = useState(false);
  const [isStartTimeSelection, setIsStartTimeSelection] = useState(false);
  const [isEndTimeSelection, setIsEndTimeSelection] = useState(false);
  const [isCapacitySelection, setIsCapacitySelection] = useState(false);
  const [isContactSelection, setIsContactSelection] = useState(false);
  const [isPriceSelection, setIsPriceSelection] = useState(false);
  const [isPointSelection, setIsPointSelection] = useState(false);

  // 相关变量
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState<undefined | number>();
  const [point, setPoint] = useState<undefined | number>();

  useEffect(() => {
    if (activityId != 'none') {
      activityDetailSearch(activityId).then(
        (activityDetail: ActivityInfoItemProps) => {
          setCapacity(activityDetail.capacity);
          setStartTime(activityDetail.startTime);
          setEndTime(activityDetail.endTime);
          setContact(activityDetail.contact);
          setPrice(activityDetail.price);
          setPoint(activityDetail.point);
          setLocation(activityDetail.location);
        },
      );
    }
  }, []);

  const handleLocationSelection = () => {
    setIsLocationSelection(true);
  };

  const handleStartTimeSelection = () => {
    setIsStartTimeSelection(true);
  };

  const handleEndTimeSelection = () => {
    setIsEndTimeSelection(true);
  };

  const handleContactSelection = () => {
    setIsContactSelection(true);
  };

  const handlePriceSelection = () => {
    setIsPriceSelection(true);
  };

  const handlePointSelection = () => {
    setIsPointSelection(true);
  };

  const handleCapacitySelection = () => {
    setIsCapacitySelection(true);
  };

  const handleUserCapacityEdit = editedCapacity => {
    onActivityInfoEdit(
      location,
      startTime,
      endTime,
      editedCapacity,
      contact,
      price,
      point,
    );
    setCapacity(editedCapacity);
  };

  const handleClose = () => {
    setIsLocationSelection(false);
    setIsStartTimeSelection(false);
    setIsEndTimeSelection(false);
    setIsCapacitySelection(false);
    setIsPointSelection(false);
    setIsContactSelection(false);
    setIsPriceSelection(false);
  };

  const handleLocationUserEdit = editedLocation => {
    onActivityInfoEdit(
      editedLocation,
      startTime,
      endTime,
      capacity,
      contact,
      price,
      point,
    );
    setLocation(editedLocation);
  };

  const handleStartTimeUserEdit = editedStartTime => {
    onActivityInfoEdit(
      location,
      editedStartTime,
      endTime,
      capacity,
      contact,
      price,
      point,
    );
    setStartTime(editedStartTime);
  };

  const handleEndTimeUserEdit = editedEndTime => {
    onActivityInfoEdit(
      location,
      startTime,
      editedEndTime,
      capacity,
      contact,
      price,
      point,
    );
    setEndTime(editedEndTime);
  };

  const handleContactUserEdit = editedContact => {
    onActivityInfoEdit(
      location,
      startTime,
      endTime,
      capacity,
      editedContact,
      price,
      point,
    );
    setContact(editedContact);
  };

  const handlePriceUserEdit = editedPrice => {
    onActivityInfoEdit(
      location,
      startTime,
      endTime,
      capacity,
      contact,
      editedPrice,
      point,
    );
    setPrice(editedPrice);
  };

  const handlePointUserEdit = editedPoint => {
    onActivityInfoEdit(
      location,
      startTime,
      endTime,
      capacity,
      contact,
      price,
      editedPoint,
    );
    setPoint(editedPoint);
  };

  return (
    <>
      <View className='activity-info'>
        <View className='selection-part'>
          <View className='selection-container'>
            <View className='selection-content'>
              <View className='selection-left'>
                <View className='icon-container'>
                  <Image src={LocationSelectionIcon} />
                </View>
                <Text>活动地址</Text>
              </View>
              <View
                className='selection-right'
                onClick={handleLocationSelection}
              >
                <Text>{location != '' ? `${location}` : `请选择`}</Text>
                <Image src={RightBottomArrow} />
              </View>
              {isLocationSelection && (
                <LocationSelection
                  onClose={handleClose}
                  onLocationSelected={handleLocationUserEdit}
                  prevLocation={location}
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
                <Text>开始时间</Text>
              </View>
              <View
                className='selection-right'
                onClick={handleStartTimeSelection}
              >
                <Text>{startTime != '' ? `${startTime}` : `请选择`}</Text>
                <Image src={RightBottomArrow} />
              </View>
              {isStartTimeSelection && (
                <StartTimeSelection
                  onClose={handleClose}
                  onStartTimeSelected={handleStartTimeUserEdit}
                  prevStartTime={startTime}
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
                <Text>结束时间</Text>
              </View>
              <View
                className='selection-right'
                onClick={handleEndTimeSelection}
              >
                <Text>{endTime != '' ? `${endTime}` : `请选择`}</Text>
                <Image src={RightBottomArrow} />
              </View>
              {isEndTimeSelection && (
                <EndTimeSelection
                  onClose={handleClose}
                  onEndTimeSelected={handleEndTimeUserEdit}
                  prevEndTime={endTime}
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
                <Text>活动人数</Text>
              </View>
              <View
                className='selection-right'
                onClick={handleCapacitySelection}
              >
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
                  <Image src={CapacitySelectionIcon} className='capacity-pic' />
                </View>
                <Text>联系方式</Text>
              </View>
              <View
                className='selection-right'
                onClick={handleContactSelection}
              >
                <Text>{contact != '' ? `${contact}` : `请选择`} </Text>
                <Image src={RightBottomArrow} />
              </View>
              {isContactSelection && (
                <ContactSelection
                  prevContact={contact}
                  onClose={handleClose}
                  onContactSelected={handleContactUserEdit}
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
                <Text>预计价格</Text>
              </View>
              <View className='selection-right' onClick={handlePriceSelection}>
                <Text>{price ? `${price}` : `请选择`} </Text>
                <Image src={RightBottomArrow} />
              </View>
              {isPriceSelection && (
                <PriceSelection
                  prevPrice={price}
                  onClose={handleClose}
                  onPriceSelected={handlePriceUserEdit}
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
                <Text>消耗积分</Text>
              </View>
              <View className='selection-right' onClick={handlePointSelection}>
                <Text>{point ? `${point}` : `请选择`} </Text>
                <Image src={RightBottomArrow} />
              </View>
              {isPointSelection && (
                <PointSelection
                  prevPoint={point}
                  onClose={handleClose}
                  onPointSelected={handlePointUserEdit}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default InfoSelection;
