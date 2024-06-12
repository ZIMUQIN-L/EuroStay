import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import './index.scss';
import Taro from '@tarojs/taro';
import ContactedCard from './contacted';
import { UserAccomMessageItemProps, UserItemProps } from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import { accomMessageSearch } from '@common/database/accomMessage/accomMessage';
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
  const [userContactedAccomData, setUserContactedAccomData] = useState<
    UserAccomMessageItemProps[]
  >([]);
  const [userBookedAccomData, setUserBookedAccomData] = useState<
    UserAccomMessageItemProps[]
  >([]);
  const [userRateAccomData, setUserRateAccomData] = useState<
    UserAccomMessageItemProps[]
  >([]);
  const [userSeekAccomData, setUserSeekAccomData] = useState<
    UserAccomMessageItemProps[]
  >([]);

  //test
  const mockUserAccomMessageData: UserAccomMessageItemProps[] = [
    {
      _id: "1",
      _openid: "openid1",
      end_date: "2024-06-20",
      start_date: "2024-06-15",
      capacity: 2,
      gender: "male",
      location: "New York",
      sourceUserOpenid: "sourceOpenid1",
      description: "Spacious two-bedroom apartment close to Central Park.",
      type: "withTargetHouse",
      status: "contactReceived",
      contact: "1234567890",
      answerToOwner: "Looking forward to staying!",
      houseId: "house1",
      images: [],
      targetUserNickName: "JohnDoe",
      targetUserOpenid: "targetOpenid1"
    },
    {
      _id: "2",
      _openid: "openid2",
      end_date: "2024-07-05",
      start_date: "2024-07-01",
      capacity: 3,
      gender: "female",
      location: "San Francisco",
      sourceUserOpenid: "sourceOpenid2",
      description: "Cozy studio apartment near the Golden Gate Bridge.",
      type: "withoutTargetHouse",
      status: "checkedIn",
      contact: "0987654321",
      answerToOwner: "Please confirm the booking details.",
      houseId: "house2",
      images: [],
      targetUserNickName: "JaneDoe",
      targetUserOpenid: "targetOpenid2"
    },
    {
      _id: "3",
      _openid: "openid3",
      end_date: "2024-06-30",
      start_date: "2024-06-25",
      capacity: 1,
      gender: "male",
      location: "Los Angeles",
      sourceUserOpenid: "sourceOpenid3",
      description: "Modern loft near downtown LA.",
      type: "both",
      status: "checkedIn",
      contact: "123987456",
      answerToOwner: "Sorry, the dates don't work for me.",
      houseId: "house3",
      images: [],
      targetUserNickName: "MikeSmith",
      targetUserOpenid: "targetOpenid3"
    }
  ];
  
  

  useEffect(() => {
    const demoUser: UserItemProps = GlobalStore.userInfo;
      // Set the mock data to your state
    setUserRateAccomData(mockUserAccomMessageData);
    setUser(demoUser);
    accomMessageSearch(demoUser._openid).then(
      (accomMessages: UserAccomMessageItemProps[]) => {
        setUserAccomData(accomMessages);

        const contactedAccomData = accomMessages.filter(
          item =>
            (item.status == 'read' ||
              item.status == 'unread' ||
              item.status == 'contactReceived' ||
              item.status == 'rejected') &&
            (item.type == 'withTargetHouse' || item.type == 'both'),
        );
        setUserContactedAccomData(contactedAccomData);

        const bookedAccomData = accomMessages.filter(
          item => item.status == 'booked',
        );
        setUserBookedAccomData(bookedAccomData);

        //test
        // const rateAccomData = accomMessages.filter(
        //   item => item.status == 'checkedIn' || item.status == 'rated',
        // );
        // setUserRateAccomData(rateAccomData);

        const seekAccomData = accomMessages.filter(
          item =>
            (item.status == 'read' ||
              item.status == 'unread' ||
              item.status == 'contactReceived' ||
              item.status == 'rejected') &&
            (item.type == 'withoutTargetHouse' || item.type == 'both'),
        );
        setUserSeekAccomData(seekAccomData);
      },
    );
  }, []);

  const renderContent = () => {
    switch (currentTab) {
      case 'all':
        return (
          <>
            {userAccomData.map(userAccomMessage => (
              <ContactedCard key={userAccomMessage._id} {...userAccomMessage} />
            ))}
          </>
        );
      case 'contacted':
        return (
          <>
            {userContactedAccomData.map(userAccomMessage => (
              <ContactedCard key={userAccomMessage._id} {...userAccomMessage} />
            ))}
          </>
        );
      case 'toStay':
        return (
          <>
            {userBookedAccomData.map(userAccomMessage => (
              <ContactedCard key={userAccomMessage._id} {...userAccomMessage} />
            ))}
          </>
        );
      case 'toComment':
        return (
          <>
            {userRateAccomData.map(userAccomMessage => (
              <ContactedCard key={userAccomMessage._id} {...userAccomMessage} />
            ))}
          </>
        );
      case 'toSeek':
        return (
          <>
            {userSeekAccomData.map(userAccomMessage => (
              <ContactedCard key={userAccomMessage._id} {...userAccomMessage} />
            ))}
          </>
        );
      default:
        return (
          <>
            {userAccomData.map(userAccomMessage => (
              <ContactedCard key={userAccomMessage._id} {...userAccomMessage} />
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
          className={isActive('contacted')}
          onClick={() => setCurrentTab('contacted')}
        >
          <Text className={`text ${isActive('contacted')}`}>已联系</Text>
        </View>
        <View
          className={isActive('toStay')}
          onClick={() => setCurrentTab('toStay')}
        >
          <Text className={`text ${isActive('toStay')}`}>待入住</Text>
        </View>
        <View
          className={isActive('toComment')}
          onClick={() => setCurrentTab('toComment')}
        >
          <Text className={`text ${isActive('toComment')}`}>待点评</Text>
        </View>
        <View
          className={isActive('toSeek')}
          onClick={() => setCurrentTab('toSeek')}
        >
          <Text className={`text ${isActive('toSeek')}`}>求宿中</Text>
        </View>
      </View>
      <View className='content'>{renderContent()}</View>
    </View>
  );
};

export default observer(Index);
