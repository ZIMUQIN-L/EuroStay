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
        return '等待房东评价中';
      case 'guestRated':
        return '等待房东评价中';
      case 'ownerRated':
        return '等待房客评价中';
      case 'bothRated':
        return '评价已完成';
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
      case 'guestRated':
        return true;
      case 'ownerRated':
        return false;
      case 'bothRated': // TODO: 之后可以改为点击查看评价内容 @PJ
        return false;
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
        return '请评价房客';
      case 'guestRated':
        return '请评价房客';
      case 'ownerRated':
        return '评价已完成';
      case 'bothRated':
        return '评价已完成';
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

  const handleUserConfirmOrder = infoId => {
    Taro.showModal({
      title: '确认换宿/短租',
      content: '是否确认已换宿/短租',
      success: function (res) {
        if (res.confirm) {
          accomMessageUpdate(infoId, 'booked').then(res => {
            handleMessageNotification('房东确认了您的换宿', '房东已确认');
          });
        } else if (res.cancel) {
          console.log('');
        }
      },
    });
  };

  const handleUserClickButton = (accomInfo, infoId, infoStatus) => {
    setSelectedAccomInfo(accomInfo);
    setSelectedInfoId(infoId);
    if (infoStatus == 'unread' || infoStatus == 'read') {
      setInfoBoardIsShown(true);
      // setContactInfoIsShown(true);
    } else if (infoStatus == 'contactReceived') {
      handleUserConfirmOrder(infoId);
    } else if (infoStatus == 'checkedIn' || infoStatus == 'guestRated') {
      console.log('review');
      // TODO: @PJ 添加房主评价
    }
  };

  const handleUserAcceptMsg = () => {
    if (infoBoardIsShown == true) {
      setInfoBoardIsShown(false);
      setContactInfoIsShown(true);
    }
  };

  const handleUserRejectMsg = () => {
    handleMessageRequest().then(res => {
      if (infoBoardIsShown == true) {
        setInfoBoardIsShown(false);
        Taro.showLoading({
          title: '回复中',
          mask: true,
        });
        accomMessageUpdate(selectedInfoId, 'rejected').then(res => {
          Taro.hideLoading();
          handleMessageNotification('房东拒绝了您的换宿', '房东已拒绝');
        });
      }
    });
    // TODO: LOGIC FOR REJECTION
  };

  const handleUserSubmitContactInfo = (contactInfo, helloMessageInfo) => {
    handleMessageRequest().then(res => {
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
          handleMessageNotification('房东向您发送了一条回复', helloMessageInfo);
        });
      });
    });
  };

  const handleMessageRequest = async () => {
    try {
      await Taro.showModal({
        title: '接受消息通知（请勾选`总是保持以上选择`确保消息发送成功',
        content:
          '是否允许小程序在有求宿者联系您时给您发送提醒，这样你们的沟通会更有效哦~',
        confirmColor: '#A6A0E0',
      });

      await Taro.requestSubscribeMessage({
        tmplIds: ['I5kMb7W6-QbKBqcXLlzqZzK9N97JPkrFWdMHBI7hyA4'],
      });
    } catch (error) {
      console.info('be patient plz');
    }
  };

  const handleMessageNotification = (content, helloMessageInfo) => {
    // console.log(userAccomMessage.sourceUserOpenid);
    Taro.cloud.callFunction({
      name: 'messageNotification',
      data: {
        content: content,
        userName: user.nickName,
        message: helloMessageInfo,
        userid: userAccomMessage.sourceUserOpenid,
      },
      complete: res => {
        console.log('callFunction test result: ', res);
      },
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
