import { View, Image, Input, Text, Picker } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { UserItemProps } from '@utils/interfaces';
import './index.scss';
import Taro from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';
import { cloudAvatarUpload } from '@common/database/cloudstorage/files';
import { userInfoUpdate } from '@common/database/user/user';
import CustomTabBar from '@components/CustomTabBar';
import TagAdd from '../../packageActivity/activity-post/tag-add';

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

  // TODO: 需要补充用户生日信息
  const [userBirthday, setUserBirthday] = useState<string>('');
  const [birthInput, setBirthInput] = useState<string>(userBirthday);
  // TODO: 其他信息从数据库中获取

  const genderOptions = ['男', '女', ''];
  // const [userGender, setUserGender] = useState<string>(GlobalStore.userInfo.gender || '');
  const [userGender, setUserGender] = useState<string>('');
  // const [genderIndex, setGenderIndex] = useState<number>(['男', '女', ''].indexOf(GlobalStore.userInfo.gender || ''));
  const [genderIndex, setGenderIndex] = useState<number>(
    genderOptions.indexOf(''),
  );

  const [activityTags, setActivityTags] = useState<string[]>([]);

  const handleAddTag = newTag => {
    activityTags.push(newTag);
  };

  const handleDeleteTag = deletedTag => {
    const updatedTags = activityTags.filter(tag => tag != deletedTag);
    setActivityTags(updatedTags);
  };

  const [isTagEdit, setIsTagEdit] = useState(false);

  const handleOpenTagEdit = () => {
    setIsTagEdit(true);
  };

  const handleCloseAllWindows = () => {
    setIsTagEdit(false);
  };

  useEffect(() => {
    const globalUserInfo: UserItemProps = GlobalStore.userInfo;
    setUserInfo(globalUserInfo);
    setUserAvatarUrl(globalUserInfo.avatarUrl);
    setUserDescription(globalUserInfo.userDes);
    setUserLocation(globalUserInfo.userLocation);

    console.log('User attributes: ', globalUserInfo);
  }, []);

  const handleBirthdayChange = e => {
    setBirthInput(e.target.value);
  };

  const isValidDate = dateString => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;

    const date = new Date(dateString);
    const timestamp = date.getTime();
    if (typeof timestamp !== 'number' || isNaN(timestamp)) return false;

    return dateString === date.toISOString().split('T')[0];
  };

  const getAge = dateString => {
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const handleBirthdayBlur = (): void => {
    // 使用正则表达式验证输入格式是否为 yyyy-mm-dd
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(birthInput)) {
      Taro.showToast({
        title: '生日格式错误',
        icon: 'error',
        duration: 1000,
      });
    } else if (!isValidDate(birthInput)) {
      Taro.showToast({
        title: '生日日期无效',
        icon: 'error',
        duration: 1000,
      });
    } else {
      const age = getAge(birthInput);
      if (age < 16 || age > 80) {
        Taro.showToast({
          title: '请输入一个合理的年龄范围(16-80)',
          icon: 'error',
          duration: 1000,
        });
      } else {
        setUserBirthday(birthInput);
      }
    }
  };

  const handleUserImageEdit = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
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
        Taro.showToast({
          title: '图片上传失败',
          icon: 'error',
          duration: 2000,
        });
      },
    });
  };

  const handleGenderChange = e => {
    const index = e.detail.value;
    setGenderIndex(index);
    setUserGender(genderOptions[index]);
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
        Taro.reLaunch({
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
    <View className='edit-profile-page'>
      <View className='profile-background' />
      <View className='profile-avatar'>
        <Image
          src={userAvatarUrl}
          className='avatar-image'
          onClick={handleUserImageEdit}
        />
      </View>
      <View className='section'>
        <Text className='section-title'>我的简介</Text>
        <View className='description-container'>
          <View className='description-text'>
            <Input
              type='text'
              value={userDescription}
              placeholder={
                userDescription ? `${userDescription}` : `简单介绍一下自己吧`
              }
              className='description-text'
              onInput={handleUserDescriptionEdit}
            />
          </View>
        </View>
      </View>
      <View className='section'>
        <Text className='section-title'>基本信息</Text>
        <View className='info-container'>
          <View className='info-item'>
            <Text className='info-label'>昵称</Text>
            <Input
              type='text'
              value={userInfo.nickName}
              placeholder={`写下你的昵称吧`}
              className='info-value'
              // onInput={handleUserDescriptionEdit}
            />
          </View>
          <View className='info-item'>
            <Text className='info-label'>性别</Text>
            <Picker
              mode='selector'
              range={genderOptions}
              value={genderIndex}
              onChange={handleGenderChange}
            >
              <View className='info-value'>{userGender || '请选择性别'}</View>
            </Picker>
          </View>
          <View className='info-item'>
            <Text className='info-label'>个人居住地</Text>
            <View className='info-value'>
              <Input
                type='text'
                value={userLocation}
                placeholder={
                  userLocation !== '' && userLocation != undefined
                    ? `${userLocation}`
                    : `请填写个人所在地`
                }
                className='info-value'
                onInput={handleUserLocationEdit}
              />
            </View>
          </View>
          <View className='info-item'>
            <Text className='info-label'>生日</Text>
            <View className='info-value'>
              <Input
                type='text'
                value={birthInput}
                placeholder={
                  birthInput !== '' && birthInput != undefined
                    ? `${birthInput}`
                    : `请输入生日yyyy-mm-dd`
                }
                onInput={handleBirthdayChange}
                onBlur={handleBirthdayBlur}
                className='info-value'
              />
            </View>
          </View>
          <View className='info-item'>
            <Text className='info-label'>身份</Text>
            <Input
              type='text'
              value='学生'
              placeholder={`写下你的身份吧`}
              className='info-value'
              // onInput={handleUserDescriptionEdit}
            />
          </View>
        </View>
      </View>

      <View className='section'>
        <Text className='section-title'>关于我</Text>
        <View className='info-container'>
          <View className='info-item'>
            <Text className='info-label'>兴趣爱好</Text>
            <Input
              type='text'
              value='游泳，电影，滑雪'
              placeholder={`介绍你的兴趣爱好~`}
              className='info-value'
              // onInput={handleUserDescriptionEdit}
            />
          </View>
          <View className='info-item'>
            <Text className='info-label'>专业领域</Text>
            <Input
              type='text'
              value='xxxx'
              placeholder={`介绍你专业领域~`}
              className='info-value'
              // onInput={handleUserDescriptionEdit}
            />
          </View>
          <View className='info-item'>
            <Text className='info-label'>fun facts about me</Text>
            <Input
              type='text'
              value='xxxx'
              placeholder={`介绍你fun facts~`}
              className='info-value'
              // onInput={handleUserDescriptionEdit}
            />
          </View>
          <View className='info-item'>
            <Text className='info-label'>我游览过的国家</Text>
            <Input
              type='text'
              value='xxxx'
              placeholder={`介绍你游览过的国家~`}
              className='info-value'
              // onInput={handleUserDescriptionEdit}
            />
          </View>
          <View className='info-item'>
            <Text className='info-label'>我居住过的国家</Text>
            <Input
              type='text'
              value='xxxx'
              placeholder={`介绍你居住过的国家~`}
              className='info-value'
              // onInput={handleUserDescriptionEdit}
            />
          </View>
          <View className='info-item'>
            <Text className='info-label'>我可以向求宿者提供什么</Text>
            <Input
              type='text'
              value='xxxx'
              placeholder={`介绍你可以向求宿者提供什么~`}
              className='info-value'
              // onInput={handleUserDescriptionEdit}
            />
          </View>
        </View>
      </View>
      <View className='save-button-container'>
        <View className='save-button' onClick={handleUserInfoChange}>
          <Text>保存修改</Text>
        </View>
      </View>
      <CustomTabBar />
    </View>
  );
};

export default observer(Index);
