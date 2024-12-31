// import { View, Image, Input, Text, Picker } from '@tarojs/components';
import { observer } from 'mobx-react';
// import { useEffect, useState } from 'react';
// import { useRouter } from '@tarojs/taro';
// import { DefaultAvatar, DefaultHouse } from '@utils/cloudIcons';
// import { UserItemProps, UserDetailInfoItemProps } from '@utils/interfaces';
// import './index.scss';
// import Taro from '@tarojs/taro';
// import { cloudAvatarUpload } from '@common/database/cloudstorage/files';
// import { userInfoSearch, userDetailUpdate } from '@common/database/user/user';
// import TagAdd from '../../packageActivity/activity-post/tag-add';
// import {
//   pointDetailInfoAdd,
//   pointIncrease,
// } from '@common/database/pointSystem/pointSystem';
// import { formatTimestamp } from '@utils/dateUtil';

import { View, Image, Text, Button, Input } from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const [photoList, setPhotoList] = useState([
    { id: 1, src: '/images/photo1.png', isDeletable: true, isCover: true },
    { id: 2, src: '/images/photo2.png', isDeletable: true },
    { id: 3, src: '/images/photo3.png', isDeletable: true },
    { id: 4, src: '/images/photo4.png', isDeletable: true },
    { id: 5, src: '/images/photo5.png', isDeletable: true },
  ]);

  const deletePhoto = (id) => {
    setPhotoList(photoList.filter((photo) => photo.id !== id));
  };

  const addPhoto = () => {
    Taro.chooseImage({
      count: 1,
      success: (res) => {
        const newPhoto = {
          id: Date.now(),
          src: res.tempFilePaths[0],
          isDeletable: true,
        };
        setPhotoList([...photoList, newPhoto]);
      },
    });
  };

  const [activeModal, setActiveModal] = useState<string | null>(null); // Track which modal is open
  const [userName, setUserName] = useState('速食主义');
  const [userLocation, setUserLocation] = useState('西班牙 Valencia');
  const [searchInput, setSearchInput] = useState('');

  const closeModal = () => setActiveModal(null);

  // Open specific modals
  const openNameModal = () => setActiveModal("name");
  const openLocationModal = () => setActiveModal("location");


  return (
    <View className="profile-container">
      <View className="header">
        <Image
          className="profile-avatar"
          src="/images/avatar-placeholder.png"
          mode="aspectFill"
        />
      </View>
      <View className="content">
        <Text className="section-title">照片与视频</Text>
        <Text className="section-subtitle">
          展示你的多彩人生（第一张将作为封图展示）
        </Text>
        <View className="photo-grid">
          {photoList.map((item, index) => (
            <View className="photo-item" key={item.id}>
              <Image className="photo" src={item.src} mode="aspectFill" />
              {item.isDeletable && (
                <Button
                  className="delete-btn"
                  onClick={() => deletePhoto(item.id)}
                >
                  X
                </Button>
              )}
              <Text className="photo-index">
                {item.isCover ? '首图' : index + 1}
              </Text>
            </View>
          ))}
          <View className="photo-item add-photo-btn" onClick={addPhoto}>
            <Text>+</Text>
          </View>
        </View>
        <View className="verification-section">
          <Text className="section-title">认证你的真实身份</Text>
          <Text className="verification-status">未认证</Text>
        </View>

        <View className="user-info-section">
          <View className="info-item" onClick={openNameModal}>
            <Text className="info-label">用户名</Text>
            <Text className="info-value">速食主义</Text>
          </View>
          <View className="info-item" onClick={openLocationModal}>
            <Text className="info-label">地点</Text>
            <Text className="info-value">西班牙, Valencia</Text>
          </View>
          <View className="info-item">
            <Text className="info-label">性别</Text>
            <Text className="info-value">女性</Text>
          </View>
          <View className="info-item">
            <Text className="info-label">MBTI</Text>
            <Text className="info-value">INTP</Text>
          </View>
          <View className="info-item">
            <Text className="info-label">邮箱 (仅供收集)</Text>
            <Text className="info-value">添加</Text>
          </View>
          <View className="info-item">
            <Text className="info-label">出生日期</Text>
            <Text className="info-value">添加</Text>
          </View>
          <View className="info-item">
            <Text className="info-label">工作</Text>
            <Text className="info-value">添加</Text>
          </View>
          <View className="info-item">
            <Text className="info-label">学校</Text>
            <Text className="info-value">添加</Text>
          </View>
          <View className="info-item">
            <Text className="info-label">小红书账号</Text>
            <Text className="info-value">添加</Text>
          </View>
          <View className="interest-section">
            <View className="info-item about-me">
              <Text className="info-label">关于我</Text>
              <Text className="section-subtitle">你是怎样的一个人</Text>
              <Input
                className="about-me-input"
                placeholder="请输入内容"
              />
            </View>

            <View className="info-item why-exchange">
              <Text className="info-label">为什么选择借换宿</Text>
              <Text className="section-subtitle">借宿对你来说意味着什么</Text>
              <Input
                className="about-me-input"
                placeholder="请输入内容"
              />
            </View>

            <View className="info-item tag">
              <Text className="info-label">你的Tag</Text>
              <Text className="section-subtitle">你是什么样的人</Text>
              <View
                className="info-value-box"
                onClick={() => console.log('Tag clicked')}
              >
                添加你的Tag
              </View>
            </View>

            <View className="info-item green-flag">
              <Text className="info-label">Green Flag</Text>
              <Text className="section-subtitle">你喜欢什么样的人</Text>
              <View
                className="info-value-box"
                onClick={() => console.log('Green Flag clicked')}
              >
                添加你喜欢的人的类型
              </View>
            </View>

            <View className="info-item red-flag">
              <Text className="info-label">Red Flag</Text>
              <Text className="section-subtitle">你讨厌什么样的人</Text>
              <View
                className="info-value-box"
                onClick={() => console.log('Red Flag clicked')}
              >
                添加你讨厌的人的类型
              </View>
            </View>


            <View className="info-item interests">
              <Text className="info-label">兴趣爱好</Text>
              <Text className="section-subtitle">选择你特别钟爱的兴趣爱好</Text>
              <View
                  className="info-value-box"
                  onClick={() => console.log('travel clicked')}
                >
                <View className="interest-options">
                
                  <Text className="option">🎬 电影</Text>
                  <Text className="option">📷 摄影</Text>
                  <Text className="option">🎭 话剧</Text>
                  <Text className="option">🎤 音乐</Text>
                </View>
              </View>
            </View>

            <View className="info-item countries">
              <Text className="info-label">去过的国家</Text>
              <Text className="section-subtitle">你去过哪些地方</Text>
              <View
                className="info-value-box"
                onClick={() => console.log('travel clicked')}
              >
                添加你的旅行足迹
              </View>
            </View>

            <View className="info-item memories">
              <Text className="info-label">最难忘的换宿回忆</Text>
              <Text className="section-subtitle">你在借换宿过程中遇到的有趣事情</Text>
              <Input
                className="about-me-input"
                placeholder="请输入内容"
              />
            </View>
          </View>


        </View>
      </View>
      {activeModal === 'name' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-title">编辑名字</Text>
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
            </View>
            <View className="modal-body">
              <Input
                className="modal-input"
                value={userName}
                maxlength={24}
                placeholder="请输入名字"
                onInput={(e) => setUserName(e.detail.value)}
              />
              <Text className="modal-counter">{userName.length}/24</Text>
              <Text className="modal-instruction">
                请设置2–24个字符，不包括 @&lt;&gt;/ 等无效字符，7天内仅可修改1次名字
              </Text>
            </View>
            <View className="modal-footer">
              <Text className="modal-confirm-button" onClick={closeModal}>
                确认
              </Text>
            </View>
          </View>
        </View>
      )}
      {activeModal === 'location' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-title">选择你的地区</Text>
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
            </View>
            <View className="modal-body">
              <Text className="modal-subtitle">定位到的位置</Text>
              <Input
                className="modal-input"
                value={userLocation}
                placeholder="请输入位置"
                onInput={(e) => setUserLocation(e.detail.value)}
              />
              <Text className="modal-subtitle">快速输入/查找</Text>
              <Input
                className="modal-input"
                value={searchInput}
                placeholder="搜索地区"
                onInput={(e) => setSearchInput(e.detail.value)}
              />
              <Text className="modal-subtitle">全部</Text>
              <View className="location-list">
                {['西班牙', '安道尔', '奥地利', '澳大利亚'].map((location, index) => (
                  <View
                    key={index}
                    className="location-item"
                    onClick={() => {
                      setUserLocation(location);
                      closeModal();
                    }}
                  >
                    {location}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};




// const Index = () => {
//   const router = useRouter();
//   const userOpenid = router?.params?.id;
//   const [userInfo, setUserInfo] = useState<UserDetailInfoItemProps>();

//   useEffect(() => {
//     userInfoSearch(userOpenid).then((ownerInfo: UserDetailInfoItemProps[]) => {
//       setUserInfo(ownerInfo[0]);
//       setUserAvatarUrl(ownerInfo[0].avatarUrl);
//       setUserDescription(ownerInfo[0].userDes);
//       setUserLocation(
//         ownerInfo[0].userLocation ? ownerInfo[0].userLocation : '',
//       );
//       setUserTags(ownerInfo[0].tags ? ownerInfo[0].tags : []);
//       setBirthInput(ownerInfo[0].birthday ? ownerInfo[0].birthday : '');
//       setUserBirthday(ownerInfo[0].birthday ? ownerInfo[0].birthday : '');
//       setUserGender(ownerInfo[0].gender ? ownerInfo[0].gender : '');
//       setUserNickname(ownerInfo[0].nickName);
//       if (ownerInfo[0].aboutMe) {
//         setAboutMe(ownerInfo[0].aboutMe);
//       }
//     });
//   }, []);

//   const [userAvatarUrl, setUserAvatarUrl] = useState<string>();
//   const [userDescription, setUserDescription] = useState<string>();
//   const [userLocation, setUserLocation] = useState<string>();
//   const [userBirthday, setUserBirthday] = useState<string>('');
//   const [userNickname, setUserNickname] = useState<string>('');
//   const [aboutMe, setAboutMe] = useState<{ [key: string]: any }>({
//     interests: '',
//     major: '',
//     languages: '',
//     skills: '',
//     funFact: '',
//     visitedCountries: '',
//     serviceProvided: '',
//   });

//   const [birthInput, setBirthInput] = useState<string>(userBirthday);
//   // TODO: 其他信息从数据库中获取

//   const genderOptions = ['男', '女', '非二元'];
//   const [userGender, setUserGender] = useState<string>('');
//   const [genderIndex, setGenderIndex] = useState<number>(
//     genderOptions.indexOf(''),
//   );

//   const [userTags, setUserTags] = useState<string[]>([]);

//   const handleAddTag = newTag => {
//     userTags.push(newTag);
//   };

//   const handleDeleteTag = deletedTag => {
//     const updatedTags = userTags.filter(tag => tag != deletedTag);
//     setUserTags(updatedTags);
//   };

//   const [isTagEdit, setIsTagEdit] = useState(false);

//   const handleOpenTagEdit = () => {
//     setIsTagEdit(true);
//   };

//   const handleCloseAllWindows = () => {
//     setIsTagEdit(false);
//   };

//   const handleBirthdayChange = e => {
//     setBirthInput(e.target.value);
//   };

//   const isValidDate = dateString => {
//     const regEx = /^\d{4}-\d{2}-\d{2}$/;
//     if (!dateString.match(regEx)) return false;

//     const date = new Date(dateString);
//     const timestamp = date.getTime();
//     if (typeof timestamp !== 'number' || isNaN(timestamp)) return false;

//     return dateString === date.toISOString().split('T')[0];
//   };

//   const getAge = dateString => {
//     const today = new Date();
//     const birthDate = new Date(dateString);
//     const age = today.getFullYear() - birthDate.getFullYear();
//     const monthDifference = today.getMonth() - birthDate.getMonth();
//     if (
//       monthDifference < 0 ||
//       (monthDifference === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       return age - 1;
//     }
//     return age;
//   };

//   const handleBirthdayBlur = (): void => {
//     // 使用正则表达式验证输入格式是否为 yyyy-mm-dd
//     const regex = /^\d{4}-\d{2}-\d{2}$/;
//     if (!regex.test(birthInput)) {
//       Taro.showToast({
//         title: '生日格式错误',
//         icon: 'error',
//         duration: 1000,
//       });
//     } else if (!isValidDate(birthInput)) {
//       Taro.showToast({
//         title: '生日日期无效',
//         icon: 'error',
//         duration: 1000,
//       });
//     } else {
//       const age = getAge(birthInput);
//       if (age < 16 || age > 80) {
//         Taro.showToast({
//           title: '请输入一个合理的年龄范围(16-80)',
//           icon: 'error',
//           duration: 1000,
//         });
//       } else {
//         setUserBirthday(birthInput);
//       }
//     }
//   };

//   Taro.useShareAppMessage(res => {
//     return {
//       title: 'EuroStay欧洲换宿',
//       path: '/pages/login/index',
//     };
//   });

//   const handleUserImageEdit = () => {
//     Taro.chooseImage({
//       count: 1,
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album', 'camera'],
//       success: function (res) {
//         const tempFilePaths = res.tempFilePaths;
//         Taro.showLoading({
//           title: '上传中',
//           mask: true,
//         });
//         cloudAvatarUpload(tempFilePaths[0]).then(
//           (uploadedImagePath: string) => {
//             setUserAvatarUrl(uploadedImagePath);
//             Taro.hideLoading();
//           },
//         );
//       },
//       fail: function (err) {
//         Taro.showToast({
//           title: '图片上传失败',
//           icon: 'error',
//           duration: 2000,
//         });
//       },
//     });
//   };

//   const handleGenderChange = e => {
//     const index = e.detail.value;
//     setGenderIndex(index);
//     setUserGender(genderOptions[index]);
//   };

//   const handleUserDescriptionEdit = e => {
//     const inputDescription = e.detail.value;
//     setUserDescription(inputDescription);
//   };

//   const handleUserLocationEdit = e => {
//     const inputLocation = e.detail.value;
//     setUserLocation(inputLocation);
//   };

//   const handleUserNickNameEdit = e => {
//     setUserNickname(e.detail.value);
//   };

//   const handleUserInterestsEdit = e => {
//     setAboutMe(prevAboutMe => ({
//       ...prevAboutMe,
//       interests: e.detail.value,
//     }));
//   };

//   const handleUserMajorEdit = e => {
//     setAboutMe(prevAboutMe => ({
//       ...prevAboutMe,
//       major: e.detail.value,
//     }));
//   };

//   const handleUserLanguageEdit = e => {
//     setAboutMe(prevAboutMe => ({
//       ...prevAboutMe,
//       languages: e.detail.value,
//     }));
//   };

//   const handleUserFunFactEdit = e => {
//     setAboutMe(prevAboutMe => ({
//       ...prevAboutMe,
//       funFact: e.detail.value,
//     }));
//   };

//   const handleUserVisitedCountriesEdit = e => {
//     setAboutMe(prevAboutMe => ({
//       ...prevAboutMe,
//       visitedCountries: e.detail.value,
//     }));
//   };

//   const handleUserServiceProvidedEdit = e => {
//     setAboutMe(prevAboutMe => ({
//       ...prevAboutMe,
//       serviceProvided: e.detail.value,
//     }));
//   };

//   const handleUserSkillsEdit = e => {
//     setAboutMe(prevAboutMe => ({
//       ...prevAboutMe,
//       skills: e.detail.value,
//     }));
//   };

//   // 用户信息修改
//   const handleUserInfoChange = () => {
//     Taro.showLoading({
//       title: '上传中',
//       mask: true,
//     });
//     var pointAdd = 0;
//     if (
//       (userInfo?.gender == '' && userGender != '') ||
//       (userInfo?.nickName == '微信用户' && userNickname != '微信用户') ||
//       (userInfo?.userLocation == '' && userLocation != '') ||
//       (userInfo?.birthday == '' && userBirthday != '')
//     ) {
//       pointAdd += 5;
//     }
//     if ((!userInfo?.tags && userTags.length != 0) || (userInfo?.tags && userInfo?.tags.length == 0 && userTags.length != 0)) {
//       pointAdd += 5;
//     }
//     if ((!userInfo?.aboutMe && (aboutMe.interests != '' || aboutMe.major != '' || aboutMe.languages != '' || aboutMe.skills != '' || aboutMe.funFact != '' || aboutMe.visitedCountries != '' || aboutMe.serviceProvided != '')) ||
//       (userInfo?.aboutMe && userInfo?.aboutMe.interests == '' && aboutMe.interests != '') ||
//       (userInfo?.aboutMe && userInfo?.aboutMe.major == '' && aboutMe.major != '') ||
//       (userInfo?.aboutMe && userInfo?.aboutMe.languages == '' && aboutMe.languages != '') ||
//       (userInfo?.aboutMe && userInfo?.aboutMe.skills == '' && aboutMe.skills != '') ||
//       (userInfo?.aboutMe && userInfo?.aboutMe.funFact == '' && aboutMe.funFact != '') ||
//       (userInfo?.aboutMe && userInfo?.aboutMe.visitedCountries == '' &&
//         aboutMe.visitedCountries != '') ||
//       (userInfo?.aboutMe && userInfo?.aboutMe.serviceProvided == '' && aboutMe.serviceProvided != '')
//     ) {
//       pointAdd += 5;
//     }
//     userDetailUpdate(
//       userInfo?._id,
//       userAvatarUrl,
//       userDescription,
//       userNickname,
//       userLocation,
//       userGender,
//       userBirthday,
//       userTags,
//       aboutMe,
//     ).then(res => {
//       pointIncrease(userInfo?._id, pointAdd);
//       const timestamp = formatTimestamp(new Date().valueOf());
//       pointDetailInfoAdd(
//         userInfo?._openid,
//         timestamp,
//         1,
//         '完善个人信息',
//         pointAdd,
//         (userInfo ? userInfo?.point : 0) + pointAdd,
//       ).then(res1 => {
//         Taro.hideLoading();
//         Taro.redirectTo({
//           url: `/packageUser/user-detail/index?id=${userOpenid}`,
//         });
//       });
//     });
//   };

//   return (
//     <View className='edit-profile-page'>
//       <View className='profile-background' />
//       <View className='profile-avatar'>
//         <Image
//           src={userAvatarUrl ? userAvatarUrl : DefaultAvatar}
//           className='avatar-image'
//           onClick={handleUserImageEdit}
//         />
//       </View>

//       <View className='section'>
//         <Text className='section-title'>我的简介</Text>
//         <View className='description-container'>
//           <View className='description-text'>
//             <Input
//               type='text'
//               value={userDescription}
//               placeholder={
//                 userDescription ? `${userDescription}` : `简单介绍一下自己吧`
//               }
//               className='description-text'
//               onInput={handleUserDescriptionEdit}
//             />
//           </View>
//         </View>
//       </View>
//       <View className='section'>
//         <Text className='section-title'>基本信息</Text>
//         <View className='info-container'>
//           <View className='info-item'>
//             <Text className='info-label'>昵称</Text>
//             <Input
//               type='text'
//               value={userNickname}
//               placeholder={`写下你的昵称吧`}
//               className='info-value'
//               onInput={handleUserNickNameEdit}
//             />
//           </View>
//           <View className='info-item'>
//             <Text className='info-label'>性别</Text>
//             <Picker
//               mode='selector'
//               range={genderOptions}
//               value={genderIndex}
//               onChange={handleGenderChange}
//             >
//               <View className='info-value'>{userGender || '请选择性别'}</View>
//             </Picker>
//           </View>
//           <View className='info-item'>
//             <Text className='info-label'>个人居住地</Text>
//             <View className='info-value'>
//               <Input
//                 type='text'
//                 value={userLocation}
//                 placeholder={
//                   userLocation !== '' && userLocation != undefined
//                     ? `${userLocation}`
//                     : `请填写个人所在地`
//                 }
//                 className='info-value'
//                 onInput={handleUserLocationEdit}
//               />
//             </View>
//           </View>
//           <View className='info-item'>
//             <Text className='info-label'>生日</Text>
//             <View className='info-value'>
//               <Input
//                 type='text'
//                 value={birthInput}
//                 placeholder={
//                   birthInput !== '' && birthInput != undefined
//                     ? `${birthInput}`
//                     : `请输入生日yyyy-mm-dd`
//                 }
//                 onInput={handleBirthdayChange}
//                 onBlur={handleBirthdayBlur}
//                 className='info-value'
//               />
//             </View>
//           </View>
//           {/* <View className='info-item'>
//             <Text className='info-label'>身份</Text>
//             <Input
//               type='text'
//               value='学生'
//               placeholder={`写下你的身份吧`}
//               className='info-value'
//               // onInput={handleUserDescriptionEdit}
//             />
//           </View> */}
//         </View>
//       </View>

//       <View className='section'>
//         <Text className='section-title'>关于我</Text>
//         <View className='info-container'>
//           <View className='info-item'>
//             <Text className='info-label'>个性标签</Text>
//             {!userTags || userTags.length === 0 ? (
//               <Text className='info-value' onClick={handleOpenTagEdit}>
//                 添加个性标签 +
//               </Text>
//             ) : (
//               <View className='info-value'>
//                 {userTags.map((tag, index) => (
//                   <Text key={index} onClick={() => handleDeleteTag(tag)}>
//                     {tag + '   '}
//                   </Text>
//                 ))}
//                 <Text onClick={handleOpenTagEdit}>+</Text>
//               </View>
//             )}
//           </View>

//           <View className='info-item'>
//             <Text className='info-label'>fun facts about me</Text>
//             <Input
//               type='text'
//               value={aboutMe['funFact']}
//               placeholder={`介绍你fun facts~`}
//               className='info-value'
//               onInput={handleUserFunFactEdit}
//             />
//           </View>

//           <View className='info-item'>
//             <Text className='info-label'>兴趣爱好</Text>
//             <Input
//               type='text'
//               value={aboutMe['interests']}
//               placeholder={`介绍你的兴趣爱好~`}
//               className='info-value'
//               onInput={handleUserInterestsEdit}
//             />
//           </View>

//           <View className='info-item'>
//             <Text className='info-label'>语言技能</Text>
//             <Input
//               type='text'
//               value={aboutMe['languages']}
//               placeholder={`介绍你能使用的语言~`}
//               className='info-value'
//               onInput={handleUserLanguageEdit}
//             />
//           </View>

//           <View className='info-item'>
//             <Text className='info-label'>专业领域</Text>
//             <Input
//               type='text'
//               value={aboutMe['major']}
//               placeholder={`介绍你专业领域~`}
//               className='info-value'
//               onInput={handleUserMajorEdit}
//             />
//           </View>

//           <View className='info-item'>
//             <Text className='info-label'>我可以向求宿者提供什么</Text>
//             <Input
//               type='text'
//               value={aboutMe['serviceProvided']}
//               placeholder={`介绍你可以向求宿者/host提供什么~`}
//               className='info-value'
//               onInput={handleUserServiceProvidedEdit}
//             />
//           </View>

//           <View className='info-item'>
//             <Text className='info-label'>我的技能</Text>
//             <Input
//               type='text'
//               value={aboutMe['skills']}
//               placeholder={`介绍一下你的有用小技能吧~`}
//               className='info-value'
//               onInput={handleUserSkillsEdit}
//             />
//           </View>

//           <View className='info-item'>
//             <Text className='info-label'>我游览过的国家</Text>
//             <Input
//               type='text'
//               value={aboutMe['visitedCountries']}
//               placeholder={`介绍你游览过的国家~`}
//               className='info-value'
//               onInput={handleUserVisitedCountriesEdit}
//             />
//           </View>
//         </View>
//       </View>
//       <View className='save-button-container'>
//         <View className='save-button' onClick={handleUserInfoChange}>
//           <Text>保存修改</Text>
//         </View>
//       </View>
//       {isTagEdit && (
//         <TagAdd
//           onClose={handleCloseAllWindows}
//           onTagAdded={handleAddTag}
//         ></TagAdd>
//       )}
//     </View>
//   );
// };

export default observer(Index);