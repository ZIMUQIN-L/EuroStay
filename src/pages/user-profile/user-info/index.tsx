import React, { useState, useEffect } from 'react';
import { UserItemProps } from '@utils/interfaces';
import { View, Image } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import { RightBottomArrow } from '@utils/cloudIcons';

const UserInfo: React.FC<UserItemProps> = user => {
  const [userInfo, setUserInfo] = useState<UserItemProps>(user);
  useEffect(() => {
    setUserInfo(user);
  }, []);

  // const editClick = () => {
  //   Taro.navigateTo({
  //     url: '../../packageUser/user-edit/index',
  //   });
  // };

  const toUserDetail = () => {
    Taro.navigateTo({
      url: `/packageUser/user-detail/index?id=${user._openid}`,
    });
  };

  // TODO: 优化样式
  return (
    <View style={{ width: '100%' }}>
      <View className='user-card'>
        <View>
          <Image src={userInfo.avatarUrl} className='avatar-img' />
        </View>
        <View className='user-texts'>
          <View className='tilte'>{userInfo.nickName}</View>
          <View className='sub-title'>ID: {userInfo.userOpenid}</View>
          <View className='sub-title'>所属地: {userInfo.userLocation}</View>
        </View>
        <View
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={toUserDetail}
        >
          <Image
            src={RightBottomArrow}
            style={{
              width: '20px',
              height: '20px',
              position: 'absolute',
              right: '20px',
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default UserInfo;
