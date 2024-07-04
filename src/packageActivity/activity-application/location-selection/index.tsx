import { View, Input } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import './index.scss';

const LocationSelection = ({ prevLocation, onClose, onLocationSelected }) => {
  const [location, setLocation] = useState(prevLocation);
  const handleSubmitLocationSelection = () => {
    onLocationSelected(location);
    onClose();
  };
  useEffect(() => {
    setLocation(prevLocation);
  }, [prevLocation]);

  const handleLocationChange = e => {
    setLocation(e.detail.value);
  };

  return (
    <CustomFullScreenDialog
      title='选择活动地点'
      onClose={onClose}
      onSubmit={handleSubmitLocationSelection}
    >
      <View
        className='act-location-text-container'
        style={{ minHeight: '30px' }}
      >
        <View className='act-location-text'>
          <Input
            type='text'
            value={location}
            placeholder='请输入活动地点'
            onInput={handleLocationChange}
          />
        </View>
      </View>
    </CustomFullScreenDialog>
  );
};
export default LocationSelection;
