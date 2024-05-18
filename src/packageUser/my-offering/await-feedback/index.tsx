import CustomCard from '../../custom-card';
import { DefaultAvatar, DefaultHouse } from '@utils/cloudIcons';
import { UserAccomMessageItemProps } from '@utils/interfaces';
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

  const handleUserClickButton = infoId => {
    handleRetriveContactInfoBoard();
    console.log('test now');
  };

  const handleRetriveContactInfoBoard = () => {
    console.log('for now reserved');
  };

  // TODO: 后面需要传入数据
  return (
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
  );
};

export default AwaitFeedback;
