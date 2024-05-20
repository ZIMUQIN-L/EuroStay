import {
  View,
  Input,
  Text,
  Switch,
  Checkbox,
  CheckboxGroup,
  Button,
} from '@tarojs/components';
import { useState } from 'react';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import './index.scss';
import { ContactInfo } from '@utils/interfaces';

interface ContactSelectionProps {
  onClose: () => void;
  onContactSelected: (contactInfo: ContactInfo) => void;
}

const ContactSelection: React.FC<ContactSelectionProps> = ({
  onClose,
  onContactSelected,
}) => {
  const [provideContact, setProvideContact] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [wechatValue, setWechatValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

  const handleSubmitContactSelection = () => {
    const contactInfo: ContactInfo = {
      wechat: selectedContacts.includes('wechat') ? wechatValue : undefined,
      email: selectedContacts.includes('email') ? emailValue : undefined,
      phone: selectedContacts.includes('phone') ? phoneValue : undefined,
    };
    onContactSelected(contactInfo);
    onClose();
  };

  const handleCheckboxChange = (e: any) => {
    setSelectedContacts(e.detail.value);
  };

  return (
    <CustomFullScreenDialog
      title='发送个人联系方式'
      onClose={onClose}
      onSubmit={handleSubmitContactSelection}
    >
      <View className='contact-toggle-container'>
        <Text className='contact-toggle-text'>是否提供个人联系方式</Text>
        <Switch
          checked={provideContact}
          onChange={e => setProvideContact(e.detail.value)}
        />
      </View>
      <CheckboxGroup
        className='contact-input-group'
        onChange={handleCheckboxChange}
      >
        <View className='contact-input-container'>
          <View className='contact-checkbox'>
            <Checkbox
              value='wechat'
              checked={selectedContacts.includes('wechat')}
              className='contact-checkbox-checkbox'
              disabled={!provideContact}
            />
            <Text className='contact-checkbox-text'>微信</Text>
          </View>
          <Input
            className='contact-input'
            type='text'
            placeholder='填写微信'
            value={wechatValue}
            disabled={!provideContact || !selectedContacts.includes('wechat')}
            onInput={e => setWechatValue(e.detail.value)}
          />
        </View>
        <View className='contact-input-container'>
          <View className='contact-checkbox'>
            <Checkbox
              value='email'
              checked={selectedContacts.includes('email')}
              className='contact-checkbox-checkbox'
              disabled={!provideContact}
            />
            <Text className='contact-checkbox-text'>邮箱</Text>
          </View>
          <Input
            className='contact-input'
            type='text'
            placeholder='填写邮箱'
            value={emailValue}
            disabled={!provideContact || !selectedContacts.includes('email')}
            onInput={e => setEmailValue(e.detail.value)}
          />
        </View>
        <View className='contact-input-container'>
          <View className='contact-checkbox'>
            <Checkbox
              value='phone'
              checked={selectedContacts.includes('phone')}
              className='contact-checkbox-checkbox'
              disabled={!provideContact}
            />
            <Text className='contact-checkbox-text'>手机号码</Text>
          </View>
          <Input
            className='contact-input'
            type='text'
            placeholder='填写手机号'
            value={phoneValue}
            disabled={!provideContact || !selectedContacts.includes('phone')}
            onInput={e => setPhoneValue(e.detail.value)}
          />
        </View>
      </CheckboxGroup>
    </CustomFullScreenDialog>
  );
};

export default ContactSelection;
