import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import './index.scss';
import Taro from '@tarojs/taro';
import AwaitFeedback from './await-feedback';
import GlobalStore from '@store/GlobalStore';
import { UserAccomMessageItemProps, UserItemProps } from '@utils/interfaces';
import { houseMessageSearch } from '@common/database/accomMessage/accomMessage';
/**
 * @description 我的求宿页面，尽量共用一些组件，减少重复代码
 */
const Index = () => {
  const router = Taro.useRouter();
  const [currentTab, setCurrentTab] = useState('all');
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);

  const [userAccomData, setUserAccomData] = useState<
    UserAccomMessageItemProps[]
  >([]);
  const [userToReplyAccomData, setUserToReplyAccomData] = useState<
    UserAccomMessageItemProps[]
  >([]);
  const [userRepliedAccomData, setUserRepliedAccomData] = useState<
    UserAccomMessageItemProps[]
  >([]);
  const [userBookedAccomData, setUserBookedAccomData] = useState<
    UserAccomMessageItemProps[]
  >([]);
  const [userRateAccomData, setUserRateAccomData] = useState<
    UserAccomMessageItemProps[]
  >([]);

  useEffect(() => {
    const demoUser: UserItemProps = GlobalStore.userInfo;
    setUser(demoUser);
    houseMessageSearch(demoUser._openid).then(
      (accomMessages: UserAccomMessageItemProps[]) => {
        setUserAccomData(accomMessages);

        const toReplyAccomData = accomMessages.filter(
          item => item.status == 'unread' || item.status == 'read',
        );
        setUserToReplyAccomData(toReplyAccomData);

        const repliedAccomData = accomMessages.filter(
          item => item.status == 'contactReceived' || item.status == 'rejected',
        );
        setUserRepliedAccomData(repliedAccomData);

        const bookedAccomData = accomMessages.filter(
          item => item.status == 'booked',
        );
        setUserBookedAccomData(bookedAccomData);

        const rateAccomData = accomMessages.filter(
          item =>
            item.status == 'checkedIn' ||
            item.status == 'ownerRated' ||
            item.status == 'guestRated' ||
            item.status == 'bothRated',
        );
        setUserRateAccomData(rateAccomData);
      },
    );
  }, []);

  const renderContent = () => {
    // TODO: 根据customcard和数据创建对应的组建
    switch (currentTab) {
      case 'all':
        // TODO：可以以待回复、已回复、待入住、待点评为单位，按顺序分别在全部板块展示
        return (
          <>
            {userAccomData.map(userAccomMessage => (
              <AwaitFeedback key={userAccomMessage._id} {...userAccomMessage} />
            ))}
          </>
        );
      case 'awaitFeedback':
        return (
          <>
            {userToReplyAccomData.map(userAccomMessage => (
              <AwaitFeedback key={userAccomMessage._id} {...userAccomMessage} />
            ))}
          </>
        );
      case 'hasFeedback':
        return (
          <>
            {userRepliedAccomData.map(userAccomMessage => (
              <AwaitFeedback key={userAccomMessage._id} {...userAccomMessage} />
            ))}
          </>
        );
      case 'awaitStay':
        return (
          <>
            {userBookedAccomData.map(userAccomMessage => (
              <AwaitFeedback key={userAccomMessage._id} {...userAccomMessage} />
            ))}
          </>
        );
      case 'awaitComment':
        return (
          <>
            {userRateAccomData.map(userAccomMessage => (
              <AwaitFeedback key={userAccomMessage._id} {...userAccomMessage} />
            ))}
          </>
        );
      default:
        return (
          <>
            {userAccomData.map(userAccomMessage => (
              <AwaitFeedback key={userAccomMessage._id} {...userAccomMessage} />
            ))}
          </>
        );
    }
  };

  useEffect(() => {
    if (router.params.tab) {
      setCurrentTab(router.params.tab);
    }
  }, [router.params]);

  const isActive = tabName => {
    return currentTab === tabName ? 'active' : '';
  };

  return (
    <View>
      <View className='tab-bar'>
        <View className={isActive('all')} onClick={() => setCurrentTab('all')}>
          <Text className={`text ${isActive('all')}`}>全部</Text>
        </View>
        <View
          className={isActive('awaitFeedback')}
          onClick={() => setCurrentTab('awaitFeedback')}
        >
          <Text className={`text ${isActive('awaitFeedback')}`}>待回复</Text>
        </View>
        <View
          className={isActive('hasFeedback')}
          onClick={() => setCurrentTab('hasFeedback')}
        >
          <Text className={`text ${isActive('hasFeedback')}`}>已回复</Text>
        </View>
        <View
          className={isActive('awaitStay')}
          onClick={() => setCurrentTab('awaitStay')}
        >
          <Text className={`text ${isActive('awaitStay')}`}>待入住</Text>
        </View>
        <View
          className={isActive('awaitComment')}
          onClick={() => setCurrentTab('awaitComment')}
        >
          <Text className={`text ${isActive('awaitComment')}`}>待点评</Text>
        </View>
      </View>
      <View className='content'>{renderContent()}</View>
    </View>
  );
};

export default observer(Index);
