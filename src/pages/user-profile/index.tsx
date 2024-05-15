import { View, Text } from '@tarojs/components';
import CustomTabBar from '@components/CustomTabBar';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import './index.scss';
import GlobalStore from '@store/GlobalStore';
import { HouseItemProps, UserItemProps } from '@utils/interfaces';
import UserInfo from './user-info';
import { userHouseInfoSearch } from '@common/database/user/user';
import { AwaitingCheckin, AwaitingComment, AwaitingSeeking, AlreadyContact } from '@utils/cloudIcons';

const actionList = [
  {
    text: '已联系',
    icon: AlreadyContact,
    path: ''
  },
  {
    text: '待入住',
    icon: AwaitingCheckin,
    path: ''
  },
  {
    text: '待点评',
    icon: AwaitingComment,
    path: ''
  },
  {
    text: '求宿中',
    icon: AwaitingSeeking,
    path: ''
  }
];

const menuList = [
  {
    text: '我的房源',
    icon: '',
    path: ''
  },
  {
    text: '我的供宿',
    icon: '',
    path: ''
  },
  {
    text: '我的收藏',
    icon: '',
    path: ''
  },
  {
    text: '实名认证',
    icon: '',
    path: ''
  },
  {
    text: '反馈咨询',
    icon: '',
    path: ''
  },
  {
    text: '设置',
    icon: '',
    path: ''
  }
]

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

  // TODO: mofidy the page if user is null
  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className='page-container'>
      <UserInfo {...user} />
      
      <CustomTabBar />
    </View>
  );
};

export default observer(Index);
