import CustomCard from '../../custom-card';
import { DefaultAvatar, DefaultHouse } from '@utils/cloudIcons';
import { useState, useEffect } from 'react';
import { UserAccomMessageItemProps, UserItemProps } from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import ContactInfoBoard from '@components/ContactInfoBoard';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { replyMessageAdd } from '@common/database/ownerReply/ownerReply';
import { accomMessageUpdate } from '@common/database/accomMessage/accomMessage';
import MsgInfoBoard from './msg-info-board';
/**
 * @description 我的供宿-等待回复中
 */
const AwaitFeedback: React.FC<UserAccomMessageItemProps> = userAccomMessage => {
  // TODO: 查看求宿信息
  const clickButton = () => {};

  const handleTopText = status => {
    switch (status) {
      case 'unread':
        return '等待你的回复中';
      case 'read':
        return '等待你的回复中';
      case 'contactReceived':
        return '已回复';
      case 'rejected':
        return '已拒绝'; // only for type with target
      case 'booked':
        return '等待房客入住中';
      case 'checkedIn':
        return '待评价';
      case 'rated':
        return '已完成';
      default:
        return '未知状态';
    }
  };

  const handleButtonClickable = status => {
    switch (status) {
      case 'unread':
        return true;
      case 'read':
        return true;
      case 'rejected':
        return false;
      case 'contactReceived': //确认短租/换宿
        return true;
      case 'booked':
        return false;
      case 'checkedIn': //可评价
        return true;
      case 'rated': //查看评价
        return true;
      default:
        return false;
    }
  };

  const handleButtonText = status => {
    switch (status) {
      case 'unread':
        return '查看求宿信息';
      case 'read':
        return '查看求宿信息';
      case 'rejected':
        return '已拒绝';
      case 'contactReceived':
        return '确认短租/换宿';
      case 'booked':
        return '等待入住';
      case 'checkedIn':
        return '待评价';
      case 'rated':
        return '查看评价';
      default:
        return '未知状态';
    }
  };

  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);
  useEffect(() => {
    const demoUser: UserItemProps = GlobalStore.userInfo;
    setUser(demoUser);
  }, []);

  const [selectedInfoId, setSelectedInfoId] = useState();
  const [selectedAccomInfo, setSelectedAccomInfo] =
    useState<UserAccomMessageItemProps>();
  const [infoBoardIsShown, setInfoBoardIsShown] = useState(false);
  const [contactInfoIsShown, setContactInfoIsShown] = useState(false);

  const handleUserClickButton = (accomInfo, infoId, infoStatus) => {
    setSelectedAccomInfo(accomInfo);
    setSelectedInfoId(infoId);
    if (infoStatus == 'unread' || infoStatus == 'read') {
      setInfoBoardIsShown(true);
      // setContactInfoIsShown(true);
    }
  };

  const handleUserAcceptMsg = () => {
    if (infoBoardIsShown == true) {
      setInfoBoardIsShown(false);
      setContactInfoIsShown(true);
    }
  };

  const handleUserRejectMsg = () => {
    if (infoBoardIsShown == true) {
      setInfoBoardIsShown(false);
    }
    // TODO: LOGIC FOR REJECTION
  };

  const handleUserSubmitContactInfo = (contactInfo, helloMessageInfo) => {
    Taro.showLoading({
      title: '上传中',
      mask: true,
    });
    replyMessageAdd(
      user.userOpenid,
      user.nickName,
      user.avatarUrl,
      contactInfo,
      helloMessageInfo,
      selectedInfoId,
    ).then(res => {
      accomMessageUpdate(selectedInfoId, 'contactReceived').then(res => {
        Taro.hideLoading();
      });
    });
  };

  const handleCloseAllBoards = () => {
    setContactInfoIsShown(false);
    setInfoBoardIsShown(false);
  };

  // TODO: 后面需要传入数据
  return (
    <View>
      <CustomCard
        title={userAccomMessage.location}
        imageUrl={
          userAccomMessage.images && userAccomMessage.images.length == 0
            ? DefaultHouse
            : userAccomMessage.images[0]
        }
        userInfo={userAccomMessage.targetUserNickName}
        dateInfo={
          userAccomMessage.start_date + ' to ' + userAccomMessage.end_date
        }
        topText={handleTopText(userAccomMessage.status)}
        buttonText={handleButtonText(userAccomMessage.status)}
        clickButton={() => {
          handleUserClickButton(
            userAccomMessage,
            userAccomMessage._id,
            userAccomMessage.status,
          );
        }}
        clickable={handleButtonClickable(userAccomMessage.status)}
      />
      {contactInfoIsShown && (
        <ContactInfoBoard
          onClose={handleCloseAllBoards}
          retrivedData={null}
          editable={true}
          onUpdateData={handleUserSubmitContactInfo}
        ></ContactInfoBoard>
      )}
      {infoBoardIsShown && (
        <MsgInfoBoard
          userAccomMessage={selectedAccomInfo}
          onClose={handleCloseAllBoards}
          onSubmit={handleUserAcceptMsg}
          onReject={handleUserRejectMsg}
        />
      )}
    </View>
  );
};

export default AwaitFeedback;
