import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import ImagesUpload from './images-upload';
import HouseDes from './house-des';
import HouseContact from './house-contact';
import { useState, useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import InfoSelection from './info-selection';
import './index.scss';
import Taro from '@tarojs/taro';
import { houseInfoUpdate } from '@common/database/house/house';
import { UserItemProps } from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import { houseDetailSearch } from '../../common/database/house/house';
import { HouseDetailItemProps } from '@utils/interfaces';

const Index = () => {
  const router = useRouter();
  const houseId = router?.params?.id;
  const [userInfo, setUserInfo] = useState<UserItemProps>(GlobalStore.userInfo);

  // 房源属性信息
  const [images, setImages] = useState<string[]>([]);
  // 房源info属性
  const [startDate, setStartDate] = useState<string | Date>();
  const [endDate, setEndDate] = useState<string | Date>();
  const [capacity, setCapacity] = useState(0);
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState({});
  const [utility, setUtility] = useState({});
  const [setting, setSetting] = useState({});
  const [surrounding, setSurrounding] = useState({});
  const [preference, setPreference] = useState({});

  useEffect(() => {
    const userInfoList: UserItemProps = GlobalStore.userInfo;
    setUserInfo(userInfoList);
    houseDetailSearch(houseId).then((houseDetail: HouseDetailItemProps) => {
      setImages(houseDetail.images);
      setStartDate(houseDetail.start_date);
      setEndDate(houseDetail.end_date);
      setCapacity(houseDetail.capacity);
      setLocation(houseDetail.location);
      setUtility(houseDetail.houseSetting);
      setSurrounding(houseDetail.houseSurrounding);
      setHouseDescription(houseDetail.description);
      setUserContact(houseDetail.contact);
      const genderKeys = ['不限性别', '限女生', '限男生'];
      const genderDict = {};
      const preferenceDict = {};
      for (const [key, value] of Object.entries(houseDetail.preference)) {
        if (genderKeys.includes(key)) {
          genderDict[key] = value;
        } else {
          preferenceDict[key] = value;
        }
      }
      console.log(preferenceDict, genderDict);
      setPreference(preferenceDict);
      setGender(genderDict);
    });
  }, []);

  // 处理照片上传的逻辑
  const handleUploadImage = uploadedImagePath => {
    setImages([...images, uploadedImagePath]);
  };

  // 删除image
  const handleDeleteImage = deletedImagePath => {
    const updatedImages = images.filter(image => image !== deletedImagePath);
    setImages(updatedImages);
  };

  // 用户修改房源描述
  const [houseDescription, setHouseDescription] = useState<string>('');
  const handleUserDescriptionEdit = inputDescription => {
    setHouseDescription(inputDescription);
  };

  // 用户联系方式描述
  const [userContact, setUserContact] = useState<string>('');
  const handleUserContactEdit = inputContact => {
    setUserContact(inputContact);
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
  };

  // post房源信息
  const handleClickEditUpdate = () => {
    if (images.length === 0) {
      Taro.showToast({
        title: '请上传房源图片~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (houseDescription === '') {
      Taro.showToast({
        title: '请填写房源描述~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (userContact === '') {
      Taro.showToast({
        title: '请填写联系方式~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (location === '') {
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
    } else if (capacity === 0) {
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
      Taro.showLoading({
        title: '上传中',
        mask: true,
      });
      console.log(preference, gender);
      const mergedPreference = { ...preference, ...gender };
      houseInfoUpdate(
        houseId,
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
      )
        .then(res => {
          Taro.hideLoading();
          Taro.showToast({
            title: '更新成功!',
            icon: 'success',
            duration: 2000,
          });
          Taro.reLaunch({
            url: `/pages/user-profile/index`,
          });
        })
        .catch(err => {
          Taro.hideLoading();
          Taro.showToast({
            title: '更新失败，请重试',
            icon: 'error',
            duration: 2000,
          });
        });
    }
  };
  return (
    <View className='index'>
      <ImagesUpload
        images={images}
        onUploadImage={handleUploadImage}
        onDeleteImage={handleDeleteImage}
      />
      <HouseDes
        description={houseDescription}
        onUserDescriptionEdit={handleUserDescriptionEdit}
      />
      <HouseContact
        prevContact={userContact}
        onUserContactEdit={handleUserContactEdit}
      />
      <InfoSelection
        prevLocation={location}
        prevCapacity={capacity}
        prevStartDate={startDate}
        prevEndDate={endDate}
        prevGender={gender}
        prevPreference={preference}
        prevSurrounding={surrounding}
        prevUtility={utility}
        onUserInfoEdit={handleUserInfoEdit}
      />
      <View style={{ backgroundColor: 'white' }}>
        <View className='post-submit-button' onClick={handleClickEditUpdate}>
          <Text>发布房源</Text>
        </View>
      </View>
    </View>
  );
};

export default observer(Index);
