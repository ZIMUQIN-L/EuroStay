import { View, Image, Input, Text, Picker } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useRouter } from '@tarojs/taro';
import { DefaultAvatar, DefaultHouse } from '@utils/cloudIcons';
import { UserItemProps, UserDetailInfoItemProps } from '@utils/interfaces';
import './index.scss';
import Taro from '@tarojs/taro';
import { cloudAvatarUpload } from '@common/database/cloudstorage/files';
import { userInfoSearch, userDetailUpdate } from '@common/database/user/user';
import TagAdd from '../../packageActivity/activity-post/tag-add';
import {
  pointDetailInfoAdd,
  pointIncrease,
} from '@common/database/pointSystem/pointSystem';
import { formatTimestamp } from '@utils/dateUtil';
const Index = () => {
  const router = useRouter();
  const userOpenid = router?.params?.id;
  const [userInfo, setUserInfo] = useState<UserDetailInfoItemProps>();

  useEffect(() => {
    userInfoSearch(userOpenid).then((ownerInfo: UserDetailInfoItemProps[]) => {
      setUserInfo(ownerInfo[0]);
      setUserAvatarUrl(ownerInfo[0].avatarUrl);
      setUserDescription(ownerInfo[0].userDes);
      setUserLocation(
        ownerInfo[0].userLocation ? ownerInfo[0].userLocation : '',
      );
      setUserTags(ownerInfo[0].tags ? ownerInfo[0].tags : []);
      setBirthInput(ownerInfo[0].birthday ? ownerInfo[0].birthday : '');
      setUserBirthday(ownerInfo[0].birthday ? ownerInfo[0].birthday : '');
      setUserGender(ownerInfo[0].gender ? ownerInfo[0].gender : '');
      setUserNickname(ownerInfo[0].nickName);
      if (ownerInfo[0].aboutMe) {
        setAboutMe(ownerInfo[0].aboutMe);
      }
    });
  }, []);

  const [userAvatarUrl, setUserAvatarUrl] = useState<string>();
  const [userDescription, setUserDescription] = useState<string>();
  const [userLocation, setUserLocation] = useState<string>();
  const [userBirthday, setUserBirthday] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');
  const [aboutMe, setAboutMe] = useState<{ [key: string]: any }>({
    interests: '',
    major: '',
    languages: '',
    skills: '',
    funFact: '',
    visitedCountries: '',
    serviceProvided: '',
  });

  const [birthInput, setBirthInput] = useState<string>(userBirthday);
  // TODO: 其他信息从数据库中获取

  const genderOptions = ['男', '女', '非二元'];
  const [userGender, setUserGender] = useState<string>('');
  const [genderIndex, setGenderIndex] = useState<number>(
    genderOptions.indexOf(''),
  );

  const [userTags, setUserTags] = useState<string[]>([]);

  const handleAddTag = newTag => {
    userTags.push(newTag);
  };

  const handleDeleteTag = deletedTag => {
    const updatedTags = userTags.filter(tag => tag != deletedTag);
    setUserTags(updatedTags);
  };

  const [isTagEdit, setIsTagEdit] = useState(false);

  const handleOpenTagEdit = () => {
    setIsTagEdit(true);
  };

  const handleCloseAllWindows = () => {
    setIsTagEdit(false);
  };

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

  Taro.useShareAppMessage(res => {
    return {
      title: 'EuroStay欧洲换宿',
      path: '/pages/login/index',
    };
  });

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

  const handleUserLocationEdit = e => {
    const inputLocation = e.detail.value;
    setUserLocation(inputLocation);
  };

  const handleUserNickNameEdit = e => {
    setUserNickname(e.detail.value);
  };

  const handleUserInterestsEdit = e => {
    setAboutMe(prevAboutMe => ({
      ...prevAboutMe,
      interests: e.detail.value,
    }));
  };

  const handleUserMajorEdit = e => {
    setAboutMe(prevAboutMe => ({
      ...prevAboutMe,
      major: e.detail.value,
    }));
  };

  const handleUserLanguageEdit = e => {
    setAboutMe(prevAboutMe => ({
      ...prevAboutMe,
      languages: e.detail.value,
    }));
  };

  const handleUserFunFactEdit = e => {
    setAboutMe(prevAboutMe => ({
      ...prevAboutMe,
      funFact: e.detail.value,
    }));
  };

  const handleUserVisitedCountriesEdit = e => {
    setAboutMe(prevAboutMe => ({
      ...prevAboutMe,
      visitedCountries: e.detail.value,
    }));
  };

  const handleUserServiceProvidedEdit = e => {
    setAboutMe(prevAboutMe => ({
      ...prevAboutMe,
      serviceProvided: e.detail.value,
    }));
  };

  const handleUserSkillsEdit = e => {
    setAboutMe(prevAboutMe => ({
      ...prevAboutMe,
      skills: e.detail.value,
    }));
  };

  // 用户信息修改
  const handleUserInfoChange = () => {
    Taro.showLoading({
      title: '上传中',
      mask: true,
    });
    var pointAdd = 0;
    if (
      (userInfo?.gender == '' && userGender != '') ||
      (userInfo?.nickName == '微信用户' && userNickname != '微信用户') ||
      (userInfo?.userLocation == '' && userLocation != '') ||
      (userInfo?.birthday == '' && userBirthday != '')
    ) {
      pointAdd += 5;
    }
    if (userInfo?.tags.length == 0 && userTags.length != 0) {
      pointAdd += 5;
    }
    if (
      (userInfo?.aboutMe.interests == '' && aboutMe.interests != '') ||
      (userInfo?.aboutMe.major == '' && aboutMe.major != '') ||
      (userInfo?.aboutMe.languages == '' && aboutMe.languages != '') ||
      (userInfo?.aboutMe.skills == '' && aboutMe.skills != '') ||
      (userInfo?.aboutMe.funFact == '' && aboutMe.funFact != '') ||
      (userInfo?.aboutMe.visitedCountries == '' &&
        aboutMe.visitedCountries != '') ||
      (userInfo?.aboutMe.serviceProvided == '' && aboutMe.serviceProvided != '')
    ) {
      pointAdd += 5;
    }
    userDetailUpdate(
      userInfo?._id,
      userAvatarUrl,
      userDescription,
      userNickname,
      userLocation,
      userGender,
      userBirthday,
      userTags,
      aboutMe,
    ).then(res => {
      pointIncrease(userInfo?._id, pointAdd);
      const timestamp = formatTimestamp(new Date().valueOf());
      pointDetailInfoAdd(
        userInfo?._openid,
        timestamp,
        1,
        '完善个人信息',
        pointAdd,
        (userInfo ? userInfo?.point : 0) + pointAdd,
      ).then(res1 => {
        Taro.hideLoading();
        Taro.redirectTo({
          url: `/packageUser/user-detail/index?id=${userOpenid}`,
        });
      });
    });
  };

  return (
    <View className='edit-profile-page'>
      <View className='profile-background' />
      <View className='profile-avatar'>
        <Image
          src={userAvatarUrl ? userAvatarUrl : DefaultAvatar}
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
              value={userNickname}
              placeholder={`写下你的昵称吧`}
              className='info-value'
              onInput={handleUserNickNameEdit}
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
          {/* <View className='info-item'>
            <Text className='info-label'>身份</Text>
            <Input
              type='text'
              value='学生'
              placeholder={`写下你的身份吧`}
              className='info-value'
              // onInput={handleUserDescriptionEdit}
            />
          </View> */}
        </View>
      </View>

      <View className='section'>
        <Text className='section-title'>关于我</Text>
        <View className='info-container'>
          <View className='info-item'>
            <Text className='info-label'>个性标签</Text>
            {!userTags || userTags.length === 0 ? (
              <Text className='info-value' onClick={handleOpenTagEdit}>
                添加个性标签 +
              </Text>
            ) : (
              <View className='info-value'>
                {userTags.map((tag, index) => (
                  <Text key={index} onClick={() => handleDeleteTag(tag)}>
                    {tag + '   '}
                  </Text>
                ))}
                <Text onClick={handleOpenTagEdit}>+</Text>
              </View>
            )}
          </View>

          <View className='info-item'>
            <Text className='info-label'>fun facts about me</Text>
            <Input
              type='text'
              value={aboutMe['funFact']}
              placeholder={`介绍你fun facts~`}
              className='info-value'
              onInput={handleUserFunFactEdit}
            />
          </View>

          <View className='info-item'>
            <Text className='info-label'>兴趣爱好</Text>
            <Input
              type='text'
              value={aboutMe['interests']}
              placeholder={`介绍你的兴趣爱好~`}
              className='info-value'
              onInput={handleUserInterestsEdit}
            />
          </View>

          <View className='info-item'>
            <Text className='info-label'>语言技能</Text>
            <Input
              type='text'
              value={aboutMe['languages']}
              placeholder={`介绍你能使用的语言~`}
              className='info-value'
              onInput={handleUserLanguageEdit}
            />
          </View>

          <View className='info-item'>
            <Text className='info-label'>专业领域</Text>
            <Input
              type='text'
              value={aboutMe['major']}
              placeholder={`介绍你专业领域~`}
              className='info-value'
              onInput={handleUserMajorEdit}
            />
          </View>

          <View className='info-item'>
            <Text className='info-label'>我可以向求宿者提供什么</Text>
            <Input
              type='text'
              value={aboutMe['serviceProvided']}
              placeholder={`介绍你可以向求宿者/host提供什么~`}
              className='info-value'
              onInput={handleUserServiceProvidedEdit}
            />
          </View>

          <View className='info-item'>
            <Text className='info-label'>我的技能</Text>
            <Input
              type='text'
              value={aboutMe['skills']}
              placeholder={`介绍一下你的有用小技能吧~`}
              className='info-value'
              onInput={handleUserSkillsEdit}
            />
          </View>

          <View className='info-item'>
            <Text className='info-label'>我游览过的国家</Text>
            <Input
              type='text'
              value={aboutMe['visitedCountries']}
              placeholder={`介绍你游览过的国家~`}
              className='info-value'
              onInput={handleUserVisitedCountriesEdit}
            />
          </View>
        </View>
      </View>
      <View className='save-button-container'>
        <View className='save-button' onClick={handleUserInfoChange}>
          <Text>保存修改</Text>
        </View>
      </View>
      {isTagEdit && (
        <TagAdd
          onClose={handleCloseAllWindows}
          onTagAdded={handleAddTag}
        ></TagAdd>
      )}
    </View>
  );
};

export default observer(Index);
