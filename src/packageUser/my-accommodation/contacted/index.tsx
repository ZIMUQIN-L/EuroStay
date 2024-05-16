import CustomCard from '../../custom-card';
import { DefaultAvatar, DefaultHouse } from '@utils/cloudIcons';

/**
 * @description 我的求宿-已联系
 */
const ContactedCard = () => {
  // TODO: 查看求宿信息
  const clickButton = () => {

  };
  // TODO: 后面需要传入数据

  // TODO: 从数据中分析是否回复，并修改topText, buttonText的内容
  return (
    <CustomCard
      title='佛罗伦萨大好房'
      imageUrl={DefaultHouse}
      avatarUrl={DefaultAvatar}
      userInfo='房东: Andre' // TODO: 需要修改
      dateInfo='2021-09-01 to 2021-09-07' // TODO: 需要修改
      topText='房东已回复'
      buttonText='查看回复'
      clickButton={() => {}}
    />
  );
};

export default ContactedCard;