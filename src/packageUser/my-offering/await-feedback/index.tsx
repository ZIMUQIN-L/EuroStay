import CustomCard from '../../custom-card';
import { DefaultAvatar, DefaultHouse } from '@utils/cloudIcons';

/**
 * @description 我的供宿-等待回复中
 */
const AwaitFeedback = () => {
  // TODO: 查看求宿信息
  const clickButton = () => {};

  // TODO: 后面需要传入数据
  return (
    <CustomCard
      title='米兰大好房'
      imageUrl={DefaultHouse}
      avatarUrl={DefaultAvatar}
      userInfo='求宿者米兰' // TODO: 需要修改
      dateInfo='2021-09-01 to 2021-09-07' // TODO: 需要修改
      topText='等待你的回复中'
      buttonText='查看求宿消息'
      clickButton={() => {}}
    />
  );
};

export default AwaitFeedback;
