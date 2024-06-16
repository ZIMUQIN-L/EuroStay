import { View, Text, Image, Input, Textarea } from '@tarojs/components';
import { DefaultAvatar, DefaultHouse } from '@utils/cloudIcons';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import GlobalStore from '@store/GlobalStore';
import './index.scss';
import {
  HouseOwnerReplyMessageItemProps,
  UserItemProps,
} from '@utils/interfaces';

const ContactInfoBoard = ({
  onClose,
  retrivedData,
  onUpdateData,
  editable = false,
}) => {
  const [replyMessage, setReplyMessage] =
    useState<HouseOwnerReplyMessageItemProps>(retrivedData);
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);

  // 联系方式
  const [contact, setContact] = useState('');
  const handleUserContactEdit = e => {
    const inputContact = e.detail.value;
    setContact(inputContact);
  };

  // 房主打招呼信息
  const [helloMessage, setHelloMessage] = useState('');
  const handleUserHelloMessageEdit = e => {
    const inputMsg = e.detail.value;
    setHelloMessage(inputMsg);
  };

  const handleSubmitContactInfo = () => {
    onUpdateData(contact, helloMessage);
    onClose();
  };

  useEffect(() => {
    const demoUser: UserItemProps = GlobalStore.userInfo;
    setUser(demoUser);
    setReplyMessage(retrivedData);
  }, [retrivedData]);

  return (
    <CustomFullScreenDialog
      title='房东联系方式'
      onClose={onClose}
      onSubmit={editable ? handleSubmitContactInfo : onClose}
      className='contact-info-board-dialog'
    >
      {editable ? (
        <View className='contact-info-board-editable-container'>
          <Image src={user.avatarUrl} className='avatar-image' />
          <View className='contact-info-board-editable-name'>
            <Text className='text-title'>求宿者：{user.nickName}</Text>
          </View>
          <View className='wechat-id-input'>
            <Input
              className='wechat-id-input-text'
              style={{ minHeight: '30px', minWidth: '260px' }}
              value={contact}
              onInput={handleUserContactEdit}
              placeholder='请填写自己的微信号，让租客更好地联系你～'
            />
          </View>
          <View
            className='contact-text-container'
            style={{ minHeight: '80px' }}
          >
            <Textarea
              value={helloMessage}
              onInput={handleUserHelloMessageEdit}
              placeholder='请和求宿者打个招呼吧～'
            />
          </View>
        </View>
      ) : (
        <View className='contact-info-board-uneditable-container'>
          <View className='contact-info-board-uneditable'>
            <Image
              src={
                replyMessage == null
                  ? DefaultAvatar
                  : replyMessage.sourceUserAvatarUrl
              }
              className='avatar-image'
            />
            <View className='house-owner-name'>
              供宿者:
              {replyMessage == null
                ? '未知用户'
                : replyMessage.sourceUserNickName}
            </View>
            <View className='wechat-id'>
              微信号:
              {replyMessage == null ? 'unknown' : replyMessage.contact}
            </View>
            <View className='message-from-house-owner'>
              {replyMessage == null
                ? '房主打招呼信息'
                : replyMessage.helloMessage}
            </View>
          </View>
        </View>
      )}
    </CustomFullScreenDialog>
  );
};
export default ContactInfoBoard;
