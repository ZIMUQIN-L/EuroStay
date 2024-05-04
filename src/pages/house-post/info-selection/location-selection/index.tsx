import { View, Text } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';
import LocationMultiSelector from '@components/locationMultiSelector';
import { useEffect, useState } from 'react';

const LocationSelection = ({ onClose, onLocationSelected }) => {
  const [location, setLocation] = useState('');
  const handleSubmitLocationSelection = () => {
    onLocationSelected(location);
    onClose();
  };

  const handleAddressChange = addressInfo => {
    setLocation(addressInfo);
  };
  return (
    <CustomFullScreenDialog
      title='选择房源地址'
      onClose={onClose}
      onSubmit={handleSubmitLocationSelection}
    >
      <View>
        <LocationMultiSelector onAddressChange={handleAddressChange} />
      </View>
    </CustomFullScreenDialog>
  );
};
export default LocationSelection;
