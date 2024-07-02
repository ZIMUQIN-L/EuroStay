import { View, Text, Image } from '@tarojs/components';
import CustomTabBar from '@components/CustomTabBar';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import './index.scss';
import GlobalStore from '@store/GlobalStore';
import { HouseItemProps, UserItemProps } from '@utils/interfaces';
import UserInfo from './user-info';
import { userHouseInfoSearch } from '@common/database/user/user';
import {
  AwaitingCheckin,
  AwaitingComment,
  AwaitingSeeking,
  AlreadyContact,
  MyHouseIcon,
  MyOfferingIcon,
  MyFavoriteIcon,
  ValidationIcon,
  ReportIcon,
  SettingIcon,
  RightBottomArrow,
} from '@utils/cloudIcons';
import Taro from '@tarojs/taro';

const actionList = [
  {
    text: '已联系',
    icon: AlreadyContact,
    tab: 'contacted',
  },
  {
    text: '待入住',
    icon: AwaitingCheckin,
    tab: 'toStay',
  },
  {
    text: '待点评',
    icon: AwaitingComment,
    tab: 'toComment',
  },
  {
    text: '求宿中',
    icon: AwaitingSeeking,
    tab: 'toSeek',
  },
];

const offeringList = [
  {
    text: '待回复',
    // todo: icon
    icon: AlreadyContact,
    tab: 'awaitFeedback',
  },
  {
    text: '已回复',
    icon: AlreadyContact,
    tab: 'hasFeedback',
  },
  {
    text: '待入住',
    icon: AwaitingCheckin,
    tab: 'awaitStay',
  },
  {
    text: '待点评',
    icon: AwaitingComment,
    tab: 'awaitComment',
  },
];

const menuList = [
  {
    text: '我的房源',
    icon: MyHouseIcon,
    path: '../../packageUser/my-houses/index',
  },
  {
    text: '我的收藏',
    icon: MyFavoriteIcon,
    path: '',
  },
  {
    text: '我的活动',
    icon: MyFavoriteIcon,
    path: '../../packageActivity/my-activities/index',
  },
  {
    text: '实名认证',
    icon: ValidationIcon,
    path: '',
  },
  {
    text: '设置',
    icon: SettingIcon,
    path: '',
  }
];

const Index = () => {
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);
  // 用户拥有的房源信息
  const [houseList, setHouseList] = useState<HouseItemProps[]>([]);

  // 在user修改信息后不更新，应该是page没有reload，todo
  useEffect(() => {
    const demoUser: UserItemProps = GlobalStore.userInfo;
    setUser(demoUser);
    userHouseInfoSearch(demoUser._openid).then(
      (houseData: HouseItemProps[]) => {
        setHouseList(houseData);
      },
    );
  }, [GlobalStore.userInfo]);

  function navigateToAccommodation(tab) {
    Taro.navigateTo({
      url: `../../packageUser/my-accommodation/index?tab=${tab}`,
    });
  }

  function navigateToOffering(tab) {
    Taro.navigateTo({
      url: `../../packageUser/my-offering/index?tab=${tab}`,
    });
  }

  const navigateToMenu = page => {
    Taro.navigateTo({
      url: page,
    });
  };

  const handleClickAll = () => {
    Taro.navigateTo({
      url: '../../packageUser/my-accommodation/index',
    });
  };

  const handleClickAllOffering = () => {
    Taro.navigateTo({
      url: '../../packageUser/my-offering/index',
    });
  };

  // TODO: mofidy the page if user is null
  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className='user-page'>
      <UserInfo {...user} />

      <View className='action'>
        <View className='action-text'>
          <Text className='action-text-title'>我的求宿</Text>
          <View onClick={handleClickAll}>
            <Text className='action-text-to-see-all'>全部</Text>
            <Image
              src={RightBottomArrow}
              style={{
                width: '12px',
                height: '12px',
                position: 'relative',
                top: '1px',
              }}
            />
          </View>
        </View>
        <View className='action-list'>
          {actionList.map((item, index) => (
            <View
              key={index}
              className='action-item'
              onClick={() => navigateToAccommodation(item.tab)}
            >
              <Image
                className='action-item-pic'
                src={item.icon}
                style={{ width: '24px', height: '24px' }}
              />
              <Text>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className='action'>
        <View className='action-text'>
          <Text className='action-text-title'>我的供宿</Text>
          <View onClick={handleClickAllOffering}>
            <Text className='action-text-to-see-all'>全部</Text>
            <Image
              src={RightBottomArrow}
              style={{
                width: '12px',
                height: '12px',
                position: 'relative',
                top: '1px',
              }}
            />
          </View>
        </View>
        <View className='action-list'>
          {offeringList.map((item, index) => (
            <View
              key={index}
              className='action-item'
              onClick={() => navigateToOffering(item.tab)}
            >
              <Image
                className='action-item-pic'
                src={item.icon}
                style={{ width: '24px', height: '24px' }}
              />
              <Text>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className='menu'>
        <View className='menu-title'>常用功能</View>
        <View className='menu-list'>
          {menuList.map((item, index) => (
            <View
              key={index}
              className='menu-item'
              onClick={() => navigateToMenu(item.path)}
            >
              <View className='menu-text'>
                <Image
                  src={item.icon}
                  style={{
                    width: '18px',
                    height: '18px',
                    marginRight: '10px',
                  }}
                />
                <Text>{item.text}</Text>
              </View>
              <View>
                <Image
                  src={RightBottomArrow}
                  style={{ width: '12px', height: '12px' }}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <CustomTabBar />
    </View>
  );
};

export default observer(Index);
