import { View, Text } from '@tarojs/components';
import CustomTabBar from '@components/CustomTabBar';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import './index.scss';
import { HouseItemProps, UserItemProps } from '@utils/interfaces';
import UserInfo from './user-info';
import PostedHouse from './posted-house';

const Index = () => {
  const [user, setUser] = useState<UserItemProps>();
  // 用户拥有的房源信息
  const [houseList, setHouseList] = useState<HouseItemProps[]>([]); // HouseItemProps[]

  const demoUser: UserItemProps = {
    id: '1',
    openId: '1',
    avatarUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
    nickName: 'Demo User',
    userDes: '',
    userOpenid: '',
  };

  // Mock data for houseList
  const demoHouseList: HouseItemProps[] = [
    {
      id: '1',
      capacity: 3,
      description: 'Beautiful house with garden',
      endDate: '2024-05-01',
      startDate: '2024-04-25',
      houseType: 'Villa',
      images: [],
      location: '123 Main Street',
      ownerTarget: 'Families',
      xhsContact: 'John Doe',
    },
  ];

  useEffect(() => {
    setUser(demoUser);
    setHouseList(demoHouseList);
  }, []);

  // 需要优化
  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className='page-container'>
      <UserInfo {...user} />
      <PostedHouse houseList={houseList} />
      <CustomTabBar />
    </View>
  );
};

export default observer(Index);
