import CustomCard from '../../custom-card';
import { DefaultAvatar, DefaultHouse } from '@utils/cloudIcons';
import { UserAccomMessageItemProps } from '@utils/interfaces';
import { useState } from 'react';
import ContactInfoBoard from '@components/ContactInfoBoard';
import { View } from '@tarojs/components';
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
      case 'rated':
        return '房客已评价';
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
      case 'rated':
        return true;
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
        return '等待入住';
      case 'checkedIn':
        return '等待评价';
      case 'rated':
        return '查看评价';
      default:
        return '未知状态';
    }
  };

  const handleUserClickButton = infoId => {
    handleRetriveContactInfoBoard();
    console.log('test now');
  };

  const handleRetriveContactInfoBoard = () => {
    setContactInfoIsShown(true);
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
          userAccomMessage.images.length == 0
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
          handleUserClickButton(userAccomMessage._id);
        }}
        clickable={handleButtonClickable(userAccomMessage.status)}
      />
      {contactInfoIsShown && (
        <ContactInfoBoard
          onClose={handleCloseAllBoards}
          onRetriveData={handleRetriveContactInfoBoard}
        ></ContactInfoBoard>
      )}
    </View>
  );
};

export default ContactedCard;
