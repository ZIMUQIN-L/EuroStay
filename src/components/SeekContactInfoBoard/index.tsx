import { View, Text, Image, Input, Textarea } from '@tarojs/components';
import {
  DefaultAvatar,
  DefaultHouse,
  LocationSelectionIcon,
  RightBottomArrow,
} from '@utils/cloudIcons';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import GlobalStore from '@store/GlobalStore';
import './index.scss';
import {
  HouseOwnerReplyMessageItemProps,
  UserItemProps,
} from '@utils/interfaces';
import HouseSelection from './house-selection';

const SeekReplyBoard = ({
  onClose,
  retrivedData,
  onUpdateData,
  editable = false,
}) => {
  // TODO @PJ add logic for seek reply also need to enable house display for reply in mine
  const [replyMessage, setReplyMessage] =
    useState<HouseOwnerReplyMessageItemProps>(retrivedData);
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);

  const [isHouseSelection, setIsHouseSelection] = useState(false);
  const [houseId, setHouseId] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [houseLocation, setHouseLocation] = useState('');

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
    onUpdateData(contact, helloMessage, houseId, houseLocation, images);
    onClose();
  };

  useEffect(() => {
    const demoUser: UserItemProps = GlobalStore.userInfo;
    setUser(demoUser);
    setReplyMessage(retrivedData);
  }, [retrivedData]);

  const handleHouseSelection = () => {
    setIsHouseSelection(true);
  };

  const handleClose = () => {
    setIsHouseSelection(false);
  };

  const handleUserHouseEdit = (
    chosenHouseId,
    chosenHouseLocation,
    chosenImages,
  ) => {
    setHouseId(chosenHouseId);
    setHouseLocation(chosenHouseLocation);
    setImages(chosenImages);
  };

  return (
    <CustomFullScreenDialog
      title='房东联系方式'
      onClose={onClose}
      onSubmit={editable ? handleSubmitContactInfo : onClose}
      className='seek-reply-board-dialog'
    >
      {editable ? (
        <View className='seek-reply-board-editable-container'>
          <Image src={user.avatarUrl} className='avatar-image' />
          <View className='seek-reply-board-editable-name'>
            <Text className='seek-reply-text-title'>房主：{user.nickName}</Text>
          </View>

          <View className='selection-part'>
            <View className='selection-container'>
              <View className='selection-content'>
                <View className='selection-left'>
                  <View className='icon-container'>
                    <Image src={LocationSelectionIcon} />
                  </View>
                </View>
                <View
                  className='selection-right'
                  onClick={handleHouseSelection}
                >
                  <Text>关联房源</Text>
                  <View className='selection-right-right'>
                    <Text>
                      {houseLocation != '' ? houseLocation : `请选择`}
                    </Text>
                    <Image src={RightBottomArrow} />
                  </View>
                </View>
                {isHouseSelection && (
                  <HouseSelection
                    onClose={handleClose}
                    onHouseSelected={handleUserHouseEdit}
                    prevHouseId={houseId}
                  />
                )}
              </View>
            </View>
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
        <View className='seek-reply-board-uneditable-container'>
          <View className='seek-reply-board-uneditable'>
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
export default SeekReplyBoard;
