import { View, Text, Image } from '@tarojs/components';
import { DefaultAvatar, DefaultHouse } from '@utils/cloudIcons';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import './index.scss';
import { HouseOwnerReplyMessageItemProps } from '@utils/interfaces';

const ContactInfoBoard = ({
  onClose,
  retrivedData,
  onUpdateData,
  editable = false,
}) => {
  const [replyMessage, setReplyMessage] =
    useState<HouseOwnerReplyMessageItemProps>(retrivedData);

  useEffect(() => {
    setReplyMessage(retrivedData);
  }, [retrivedData]);

  return (
    <CustomFullScreenDialog
      title='房东联系方式'
      onClose={onClose}
      onSubmit={onClose}
    >
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
      <Text className='text-title'>
        {replyMessage == null ? '未知用户' : replyMessage.sourceUserNickName}
      </Text>
      <Text className='text-title'>微信号</Text>
      <View className='caution-text'>
        <Text>{replyMessage == null ? 'unknown' : replyMessage.contact}</Text>
      </View>
      <Text className='text-title'>房主打招呼信息</Text>
      <View className='caution-text'>
        <Text>
          {replyMessage == null ? 'unknown' : replyMessage.helloMessage}
        </Text>
      </View>
    </CustomFullScreenDialog>
  );
};
export default ContactInfoBoard;
