import { View, Input, Picker } from '@tarojs/components';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import './index.scss';

const ContactSelection = ({ prevContact, onClose, onContactSelected }) => {
  const [contact, setContact] = useState(prevContact);
  const handleSubmitContactSelection = () => {
    onContactSelected(contact);
    onClose();
  };
  useEffect(() => {
    setContact(prevContact);
  }, [prevContact]);

  const handleContactChange = e => {
    setContact(e.detail.value);
  };

  return (
    <CustomFullScreenDialog
      title='输入联系方式'
      onClose={onClose}
      onSubmit={handleSubmitContactSelection}
    >
      <View
        className='act-contact-text-container'
        style={{ minHeight: '30px' }}
      >
        <View className='act-contact-text'>
          <Input
            type='text'
            value={contact}
            placeholder='请输入举办人联系方式'
            onInput={handleContactChange}
          />
        </View>
      </View>
    </CustomFullScreenDialog>
  );
};
export default ContactSelection;
