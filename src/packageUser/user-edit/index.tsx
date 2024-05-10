import { View, Image, Input, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { UserItemProps } from '@utils/interfaces';
// import EditIcon from '@assets/images/profile-edit-icon.svg';
import './index.scss';
import Taro from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';
import { cloudAvatarUpload } from '../../common/database/cloudstorage/files';
import { userInfoUpdate } from '../../common/database/user/user';
import CustomTabBar from '@components/CustomTabBar';

const Index = () => {
  const [userInfo, setUserInfo] = useState<UserItemProps>(GlobalStore.userInfo);
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>(
    GlobalStore.userInfo.avatarUrl,
  );
  const [userDescription, setUserDescription] = useState<string>(
    GlobalStore.userInfo.userDes,
  );
  const [userLocation, setUserLocation] = useState<string>(
    GlobalStore.userInfo.userLocation,
  );

  useEffect(() => {
    const globalUserInfo: UserItemProps = GlobalStore.userInfo;
    setUserInfo(globalUserInfo);
    setUserAvatarUrl(globalUserInfo.avatarUrl);
    setUserDescription(globalUserInfo.userDes);
    setUserLocation(globalUserInfo.userLocation);
  }, []);

  // 用户图片上传
  const handleUserImageEdit = () => {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        Taro.showLoading({
          title: '上传中',
          mask: true,
        });
        cloudAvatarUpload(tempFilePaths[0]).then(
          (uploadedImagePath: string) => {
            setUserAvatarUrl(uploadedImagePath);
            Taro.hideLoading();
          },
        );
      },
      fail: function (err) {
        console.log(err);
      },
    });
  };

  const handleUserDescriptionEdit = e => {
    const inputDescription = e.detail.value;
    setUserDescription(inputDescription);
  };

  // 添加用户位置信息
  const handleUserLocationEdit = e => {
    const inputLocation = e.detail.value;
    setUserLocation(inputLocation);
  };

  // 用户信息修改
  const handleUserInfoChange = () => {
    Taro.showLoading({
      title: '信息修改中',
      mask: true,
    });
    userInfoUpdate(
      userInfo?._id,
      userAvatarUrl,
      userDescription,
      userInfo?.nickName,
      userLocation,
    ).then(res => {
      console.log(res);
      if (res == 'document.update:ok') {
        const updatedGlobalUserInfo: UserItemProps = {
          _id: userInfo._id,
          _openid: userInfo._openid,
          avatarUrl: userAvatarUrl,
          nickName: userInfo.nickName,
          userDes: userDescription,
          userOpenid: userInfo.userOpenid,
          userLocation: userInfo.userLocation,
        };
        GlobalStore.userInfo = updatedGlobalUserInfo;
        Taro.hideLoading();
        Taro.switchTab({
          url: `/pages/user-profile/index`,
        });
      } else {
        Taro.hideLoading();
        Taro.showToast({
          title: '个人信息修改失败',
          icon: 'error',
          duration: 2000,
        });
        Taro.switchTab({
          url: `/pages/user-profile/index`,
        });
      }
    });
  };

  return (
    <View className='index'>
      <Image
        src={userAvatarUrl}
        className='avatar-img'
        onClick={handleUserImageEdit}
      />
      <View>
        <View className='user-texts'>
          <View className='user-name'>
            <Text>{userInfo.nickName}</Text>
          </View>
          <View className='sub-title'>ID:{userInfo.userOpenid}</View>
          {/* <View className='sub-title'>所属地: 英国</View> */}
        </View>
      </View>
      <View className='user-location'>
        <Input
          type='text'
          value={userLocation}
          placeholder={
            userLocation !== '' && userLocation != undefined
              ? `${userLocation}`
              : `请填写个人所在地（国家地区）`
          }
          className='location-input'
          onInput={handleUserLocationEdit}
        />
      </View>
      <View className='user-des'>
        <Input
          type='text'
          value={userDescription}
          placeholder={
            userDescription
              ? `${userDescription}`
              : `个人描述：简单介绍一下自己吧`
          }
          className='des-input'
          onInput={handleUserDescriptionEdit}
        />
      </View>
      <View className='save-button' onClick={handleUserInfoChange}>
        <Text>保存修改</Text>
      </View>
      <CustomTabBar />
    </View>
  );
};

export default observer(Index);
