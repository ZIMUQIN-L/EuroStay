import { View, Input, Text, Switch } from '@tarojs/components';
import { useState } from 'react';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';

interface ContactSelectionProps {
  onClose: () => void;
  onContactSelected: (contactInfo: string) => void;
}

const ContactSelection: React.FC<ContactSelectionProps> = ({
  onClose,
  onContactSelected,
}) => {
  const [provideContact, setProvideContact] = useState(false);
  const [wechatValue, setWechatValue] = useState('');

  const handleSubmitContactSelection = () => {
    onContactSelected(wechatValue);
    onClose();
  };

  return (
    <CustomFullScreenDialog
      title='发送个人联系方式'
      onClose={onClose}
      onSubmit={handleSubmitContactSelection}
    >
      <View>
        <View className='contact-toggle-container'>
          <Text className='contact-toggle-text'>是否提供个人联系方式</Text>
          <Switch
            checked={provideContact}
            onChange={e => setProvideContact(e.detail.value)}
          />
        </View>
        <Text className='contact-checkbox-text'>微信</Text>
        <Input
          className='contact-input'
          type='text'
          placeholder='填写微信'
          value={wechatValue}
          disabled={!provideContact}
          onInput={e => setWechatValue(e.detail.value)}
        />
      </View>
    </CustomFullScreenDialog>
  );
};

export default ContactSelection;
