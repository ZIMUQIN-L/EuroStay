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
    path: '',
  },
  {
    text: '待入住',
    icon: AwaitingCheckin,
    path: '',
  },
  {
    text: '待点评',
    icon: AwaitingComment,
    path: '',
  },
  {
    text: '求宿中',
    icon: AwaitingSeeking,
    path: '',
  },
];

const menuList = [
  {
    text: '我的房源',
    icon: MyHouseIcon,
    path: '',
  },
  {
    text: '我的供宿',
    icon: MyOfferingIcon,
    path: '',
  },
  {
    text: '我的收藏',
    icon: MyFavoriteIcon,
    path: '',
  },
  {
    text: '实名认证',
    icon: ValidationIcon,
    path: '',
  },
  {
    text: '反馈咨询',
    icon: ReportIcon,
    path: '',
  },
  {
    text: '设置',
    icon: SettingIcon,
    path: '',
  },
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

  const handleClickAll = () => {
    Taro.navigateTo({
      url: '../../packageUser/my-accomodation/index',
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
          <Text>我的求宿</Text>
          <View onClick={handleClickAll}>
            <Text>全部</Text>
            <Image
              src={RightBottomArrow}
              style={{ width: '18px', height: '18px' }}
            />
          </View>
        </View>
        <View className='action-list'>
          {actionList.map((item, index) => (
            <View key={index} className='action-item'>
              <Image
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
            <View key={index} className='menu-item'>
              <View className='menu-text'>
                <Image
                  src={item.icon}
                  style={{ width: '24px', height: '24px', marginRight: '10px' }}
                />
                <Text>{item.text}</Text>
              </View>
              <View>
                <Image
                  src={RightBottomArrow}
                  style={{ width: '18px', height: '18px' }}
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
