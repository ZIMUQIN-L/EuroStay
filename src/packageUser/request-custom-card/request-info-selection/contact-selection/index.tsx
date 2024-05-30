import { View, Input, Text, Switch, Checkbox } from '@tarojs/components';
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
            type={'checkbox'}
            color={'#FFD111'}
            onChange={e => setProvideContact(e.detail.value)}
          />
        </View>
        {/* <Text className='contact-checkbox-text'>微信</Text> */}
        <Input
          className='contact-input'
          type='text'
          placeholder='请填写自己的微信~'
          value={wechatValue}
          disabled={!provideContact}
          onInput={e => setWechatValue(e.detail.value)}
        />
      </View>
    </CustomFullScreenDialog>
  );
};

export default ContactSelection;
