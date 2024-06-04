import { View, Text } from '@tarojs/components';
import CustomTabBar from '@components/CustomTabBar';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import './index.scss';
import Taro from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';
import { HouseItemProps, UserItemProps } from '@utils/interfaces';
import UserInfo from './user-info';
import PostedHouse from './posted-house';
import { userHouseInfoSearch } from '@common/database/user/user';

const Index = () => {
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);
  // 用户拥有的房源信息
  const [houseList, setHouseList] = useState<HouseItemProps[]>([]); // HouseItemProps[]

  Taro.useShareAppMessage(res => {
    return {
      title: 'EuroStay',
      path: '/pages/login/index',
    };
  });

  // 在user修改信息后不更新，应该是page没有reload，todo
  useEffect(() => {
    const demoUser: UserItemProps = GlobalStore.userInfo;
    setUser(demoUser);
    userHouseInfoSearch(demoUser._openid).then(
      (houseData: HouseItemProps[]) => {
        setHouseList(houseData); // Update demoData state with the fetched data
      },
    );
    // setHouseList(demoHouseList);
  }, [GlobalStore.userInfo]);

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
