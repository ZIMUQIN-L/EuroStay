import React, { useState, useEffect } from "react";
import { UserItemProps } from '@utils/interfaces';
import { View, Image } from '@tarojs/components';
import EditIcon from '@assets/images/profile-edit-icon.svg';
import DefaultAvatar from '@assets/images/default-avatar.png';
import './index.scss';
import Taro from '@tarojs/taro';

const UserInfo: React.FC<UserItemProps> = user => {
  const [userInfo, setUserInfo] = useState({
    avatarUrl: DefaultAvatar,
    nickName: '未登录',
    userDes: '',
    id: undefined as string | undefined
  });
  Taro.getStorage({
    key: 'userInfo',
    success: (res) => {
      console.log("local storage: " + res.data.nickName)
      setUserInfo({
        ...userInfo,
        avatarUrl: res.data.avatarUrl || DefaultAvatar,
        nickName: res.data.nickName || '未登录',
        userDes: res.data.userDes || '',
        id: res.data.id || undefined
      });
    }
  })
  // 如果用户未登录，提供默认框架
  // const isEmpty = !user;
  // const avatarUrl = isEmpty ? DefaultAvatar : user.avatarUrl;
  // const nickName = isEmpty ? '未登录' : user.nickName;
  // const userDes = isEmpty ? '' : user.userDes;

  const editClick = () => {
    Taro.navigateTo({
      url: '/pages/user-edit/index',
    });
  };

  return (
    <View className='user-card'>
      <View className='inner-card'>
        <Image src={EditIcon} className='edit-icon' onClick={editClick} />
        <View className='higher-part'>
          <View>
            <Image src={userInfo.avatarUrl} className='avatar-img' />
          </View>
          <View className='user-texts'>
            <View className='tilte'>{userInfo.nickName}</View>
            <View className='sub-title'>ID: {userInfo.id}</View>
            <View className='sub-title'>所属地: </View> {/* 数据库暂无数据 */}
          </View>
        </View>
        <View className='user-des'>
          个人描述：{userInfo.userDes === '' ? '简单介绍一下自己吧～' : userInfo.userDes}
        </View>
      </View>
    </View>
  );
};
export default UserInfo;
