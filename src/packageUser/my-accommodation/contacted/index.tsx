import CustomCard from '../../custom-card';
import { DefaultAvatar, DefaultHouse } from '@utils/cloudIcons';
import {
  UserAccomMessageItemProps,
  HouseOwnerReplyMessageItemProps,
} from '@utils/interfaces';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import ContactInfoBoard from '@components/ContactInfoBoard';
import { View } from '@tarojs/components';
import { replyMessageSearch } from '@common/database/ownerReply/ownerReply';
import { accomMessageUpdate } from '@common/database/accomMessage/accomMessage';
/**
 * @description 我的求宿-已联系
 */
const ContactedCard: React.FC<UserAccomMessageItemProps> = userAccomMessage => {
  // TODO: 查看求宿信息
  const clickButton = () => {};
  // TODO: 后面需要传入数据

  // TODO: 从数据中分析是否回复，并修改topText, buttonText的内容
  const handleTopText = status => {
    switch (status) {
      case 'unread':
        return '等待房东联系中';
      case 'read':
        return '等待房东联系中';
      case 'contactReceived':
        return '房东已回复';
      case 'rejected':
        return '房东已拒绝'; // only for type with target
      case 'booked':
        return '房客等待入住中';
      case 'checkedIn':
        return '等待房客评价中';
      case 'ownerRated':
        return '等待房客评价中';
      case "guestRated":
        return '等待房东评价中';
      case 'bothRated':
        return '评价已完成'; // TODO: @PJ 可以改为查看房东评价
      default:
        return '未知状态';
    }
  };

  const handleButtonClickable = status => {
    switch (status) {
      case 'unread':
        return false;
      case 'read':
        return false;
      case 'rejected':
        return false;
      case 'contactReceived':
        return true;
      case 'booked':
        return true;
      case 'checkedIn':
        return true;
    case 'ownerRated':
        return true;
    case "guestRated":
        return false;
    case 'bothRated':
        return false; // 或者可以改为查看房东评价
      default:
        return false;
    }
  };

  const handleButtonText = status => {
    switch (status) {
      case 'unread':
        return '等待回复';
      case 'read':
        return '等待回复';
      case 'rejected':
        return '已被拒绝';
      case 'contactReceived':
        return '查看回复';
      case 'booked':
        return '确认入住';
      case 'checkedIn':
        return '请评价房源';
        case 'ownerRated':
            return "请评价房源";
        case "guestRated":
            return "评价已完成";
        case 'bothRated':
            return "评价已完成"; // 或者可以改为查看房东评价
      default:
        return '未知状态';
    }
  };

  const [replyMessage, setReplyMessage] =
    useState<HouseOwnerReplyMessageItemProps | null>();

  const handleUserClickButton = (infoId, infoStatus) => {
    // handleRetriveContactInfoBoard();
    if (infoStatus == 'contactReceived') {
      Taro.showLoading({
        title: '加载回复中',
        mask: true,
      });
      replyMessageSearch(infoId).then(
        (replyMessages: HouseOwnerReplyMessageItemProps[]) => {
          Taro.hideLoading();
          setContactInfoIsShown(true);
          if (replyMessageSearch.length == 0) {
            setReplyMessage(null);
          } else {
            setReplyMessage(replyMessages[0]);
          }
        },
      );
    } else if (infoStatus == 'booked') {
      Taro.showModal({
        title: '确认入住',
        content: '是否确认已经入住~',
        success: function (res) {
          if (res.confirm) {
            accomMessageUpdate(infoId, 'checkedIn');
          } else if (res.cancel) {
            console.log('');
          }
        },
      });
    } else if (infoStatus === 'checkedIn' || infoStatus == 'ownerRated') {
      // Navigates to the new page when the button is clicked and the status is 'unread' or 'read'
      // here the accomid need to be passed and some modification needed
      // TODO!!! @PJ
      Taro.navigateTo({
        url: '../../packageUser/review-on-house/index' // Adjust the path as necessary
      });
    }
  };

  const [contactInfoIsShown, setContactInfoIsShown] = useState(false);

  const handleCloseAllBoards = () => {
    setContactInfoIsShown(false);
  };
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
          handleUserClickButton(userAccomMessage._id, userAccomMessage.status);
        }}
        clickable={handleButtonClickable(userAccomMessage.status)}
      />
      {contactInfoIsShown && (
        <ContactInfoBoard
          onClose={handleCloseAllBoards}
          retrivedData={replyMessage}
          onUpdateData={() => {}}
        ></ContactInfoBoard>
      )}
    </View>
  );
};

export default ContactedCard;
