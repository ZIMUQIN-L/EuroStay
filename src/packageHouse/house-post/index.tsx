import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import ImagesUpload from './images-upload';
import HouseDes from './house-des';
import HouseContact from './house-contact';
import { useState, useEffect } from 'react';
import InfoSelection from './info-selection';
import './index.scss';
import Taro from '@tarojs/taro';
import { houseInfoPost } from '@common/database/house/house';
import { UserItemProps, UserDetailInfoItemProps } from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import {
  pointDetailInfoAdd,
  pointIncrease,
} from '@common/database/pointSystem/pointSystem';
import { userInfoSearch } from '@common/database/user/user';
import { formatTimestamp } from '@utils/dateUtil';

const Index = () => {
  const [userInfo, setUserInfo] = useState<UserDetailInfoItemProps>();
  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    userInfoSearch(GlobalStore.userInfo._openid).then(
      (ownerInfo: UserDetailInfoItemProps[]) => {
        setUserInfo(ownerInfo[0]);
      },
    );
  }, []);

  const [images, setImages] = useState<string[]>([]);

  // 处理照片上传的逻辑
  const handleUploadImage = uploadedImagePath => {
    setImages([...images, uploadedImagePath]);
    handleButtonClickable();
  };

  // 删除image
  const handleDeleteImage = deletedImagePath => {
    const updatedImages = images.filter(image => image !== deletedImagePath);
    setImages(updatedImages);
    handleButtonClickable();
  };

  // 用户修改房源描述
  const [houseDescription, setHouseDescription] = useState<string>('');
  const handleUserDescriptionEdit = inputDescription => {
    setHouseDescription(inputDescription);
    handleButtonClickable();
  };

  // 用户联系方式描述
  const [userContact, setUserContact] = useState<string>('');
  const handleUserContactEdit = inputContact => {
    setUserContact(inputContact);
    handleButtonClickable();
  };

  // 房源info属性
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [capacity, setCapacity] = useState(0);
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState({});
  const [utility, setUtility] = useState({});
  const [surrounding, setSurrounding] = useState({});
  const [preference, setPreference] = useState({});

  const handleButtonClickable = () => {
    if (
      images.length != 0 &&
      houseDescription != '' &&
      userContact != '' &&
      location != '' &&
      startDate &&
      endDate &&
      capacity != 0 &&
      Object.keys(gender).length != 0 &&
      (Object.keys(utility).length != 0 ||
        Object.keys(surrounding).length != 0 ||
        Object.keys(surrounding).length != 0)
    ) {
      setClickable(true);
    } else {
      setClickable(false);
    }
  };

  // 获取房源info信息
  const handleUserInfoEdit = (
    location,
    startDate,
    endDate,
    capacity,
    gender,
    utility,
    surrounding,
    preference,
  ) => {
    setLocation(location);
    setStartDate(startDate);
    setEndDate(endDate);
    setCapacity(capacity);
    setGender(gender);
    setUtility(utility);
    setSurrounding(surrounding);
    setPreference(preference);
    handleButtonClickable();
  };

  useEffect(() => {
    handleButtonClickable();
  }, [
    images,
    location,
    startDate,
    endDate,
    userContact,
    capacity,
    utility,
    surrounding,
    houseDescription,
    preference,
    gender,
  ]);

  // post房源信息
  const handleClickPostSubmit = () => {
    // 上传房源
    if (images.length == 0) {
      Taro.showToast({
        title: '请上传房源图片~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (houseDescription == '') {
      Taro.showToast({
        title: '请填写房源描述~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (userContact == '') {
      Taro.showToast({
        title: '请填写联系方式~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (location == '') {
      Taro.showToast({
        title: '请填写房源地址~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (!startDate || !endDate) {
      Taro.showToast({
        title: '请选择可住时间',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (capacity == 0) {
      Taro.showToast({
        title: '请选择可住人数~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (Object.keys(gender).length === 0) {
      Taro.showToast({
        title: '请选择住客性别~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (
      Object.keys(utility).length === 0 &&
      Object.keys(surrounding).length === 0 &&
      Object.keys(surrounding).length === 0
    ) {
      Taro.showToast({
        title: '建议补充设施，周边信息和房主偏好等信息哦',
        icon: 'none',
        mask: true,
        duration: 2000,
      });
    } else {
      handleMessageRequest().then(res => {
        handleUploadHouseInfo();
      });
    }
  };

  const handleMessageRequest = async () => {
    try {
      await Taro.showModal({
        title: '接受消息通知（请勾选`总是保持以上选择`确保消息发送成功',
        content:
          '是否允许小程序在有求宿者联系您时给您发送提醒，这样你们的沟通会更有效哦~',
        confirmColor: '#A6A0E0',
      });

      await Taro.requestSubscribeMessage({
        tmplIds: ['I5kMb7W6-QbKBqcXLlzqZzK9N97JPkrFWdMHBI7hyA4'],
      });
    } catch (error) {
      console.info('be patient plz');
    }
  };

  const handleUploadHouseInfo = () => {
    Taro.showLoading({
      title: '上传中',
      mask: true,
    });
    const mergedPreference = { ...preference, ...gender };
    houseInfoPost(
      location,
      startDate,
      endDate,
      userContact,
      capacity,
      utility,
      surrounding,
      houseDescription,
      mergedPreference,
      images,
      userInfo?._openid,
    ).then(res => {
      pointIncrease(userInfo?._id, 10);
      const timestamp = formatTimestamp(new Date().valueOf());
      pointDetailInfoAdd(
        userInfo?._openid,
        timestamp,
        0,
        '发布房源信息',
        10,
        (userInfo ? userInfo?.point : 0) + 10,
      ).then(res1 => {
        Taro.hideLoading();
        Taro.navigateBack({
          delta: 1,
        });
      });
    });
  };
  return (
    <View className='index'>
      <ImagesUpload
        images={images}
        onUploadImage={handleUploadImage}
        onDeleteImage={handleDeleteImage}
      />
      <HouseDes onUserDescriptionEdit={handleUserDescriptionEdit} />
      <HouseContact onUserContactEdit={handleUserContactEdit} />
      <InfoSelection onUserInfoEdit={handleUserInfoEdit} />
      <View style={{ backgroundColor: 'white' }}>
        <View
          className='post-submit-button'
          style={{ backgroundColor: clickable ? '#FFD111' : '#d6d6d6' }}
          onClick={handleClickPostSubmit}
        >
          <Text>发布房源</Text>
        </View>
      </View>
    </View>
  );
};

export default observer(Index);
