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
    >
      <View>
        {editable ? (
          <View>
            <View className='avatar-image'>
              <Image src={user.avatarUrl} className='avatar-image' />
            </View>
            <View>
              <Text className='text-title'>{user.nickName}</Text>
            </View>
            <Text className='text-title'>微信号</Text>
            <View
              className='input-text-container'
              style={{ minHeight: '30px' }}
            >
              <View className='input-text'>
                <Input
                  value={contact}
                  onInput={handleUserContactEdit}
                  placeholder='请填写自己的微信号，让租客更好地联系你～'
                />
              </View>
            </View>
            <Text className='text-title'>房主打招呼信息</Text>
            <View className='des-text-container' style={{ minHeight: '80px' }}>
              <View className='des-text'>
                <Textarea
                  value={helloMessage}
                  onInput={handleUserHelloMessageEdit}
                  placeholder='请和求宿者打个招呼吧～'
                />
              </View>
            </View>
          </View>
        ) : (
          <View>
            <View className='avatar-image'>
              <Image
                src={
                  replyMessage == null
                    ? DefaultAvatar
                    : replyMessage.sourceUserAvatarUrl
                }
                className='avatar-image'
              />
            </View>
            <View>
              <Text className='text-title'>
                {replyMessage == null
                  ? '未知用户'
                  : replyMessage.sourceUserNickName}
              </Text>
            </View>
            <Text className='text-title'>微信号</Text>
            <View className='caution-text'>
              <Text>
                {replyMessage == null ? 'unknown' : replyMessage.contact}
              </Text>
            </View>
            <Text className='text-title'>房主打招呼信息</Text>
            <View className='caution-text'>
              <Text>
                {replyMessage == null ? 'unknown' : replyMessage.helloMessage}
              </Text>
            </View>
          </View>
        )}
      </View>
    </CustomFullScreenDialog>
  );
};
export default ContactInfoBoard;
