import { View, Text } from '@tarojs/components';
import CustomTabBar from '@components/CustomTabBar';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import './index.scss';
import { UserItemProps } from '@utils/interfaces';
import UserInfo from './user-info';
import PostedHouse from './posted-house';

const Index = () => {
  const [user, setUser] = useState<UserItemProps>();

  const demoData: UserItemProps = {
    user: {
      id: '1',
      openId: '1',
      avatarUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
      nickName: 'Demo User',
      userDes: '',
      userOpenid: '',
    },
  };

  useEffect(() => {
    setUser(demoData);
  }, []);

  // 需要优化
  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className='page-container'>
      <UserInfo user={user?.user} />
      <PostedHouse />
      <CustomTabBar />
    </View>
  );
};

export default observer(Index);
