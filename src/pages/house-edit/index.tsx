import { View, Text } from '@tarojs/components';
import CustomTabBar from '@components/CustomTabBar';
import { observer } from 'mobx-react';
import ImagesUpload from './images-upload';
import HouseDes from './house-des';
import { useState, useEffect } from 'react';
import InfoSelection from './info-selection';
import './index.scss';
import Taro from '@tarojs/taro';
import { houseInfoPost } from '../../common/database/house/house';
import { UserItemProps } from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';

const Index = () => {
  const [userInfo, setUserInfo] = useState<UserItemProps>(GlobalStore.userInfo);
  useEffect(() => {
    const userInfoList: UserItemProps = GlobalStore.userInfo;
    setUserInfo(userInfoList);
  }, []);

  const [images, setImages] = useState<string[]>([]);

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

  // 房源info属性
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [capacity, setCapacity] = useState(0);
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState({});
  const [utility, setUtility] = useState({});
  const [surrounding, setSurrounding] = useState({});
  const [preference, setPreference] = useState({});

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
  const handleClickPostSubmit = () => {
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
      Taro.showLoading({
        title: '上传中',
        mask: true,
      });
      const mergedPreference = { ...preference, ...gender };
      houseInfoPost(
        location,
        startDate,
        endDate,
        '', // for contact info
        capacity,
        utility,
        surrounding,
        houseDescription,
        mergedPreference,
        images,
        userInfo._openid,
      ).then(res => {
        Taro.hideLoading();
        Taro.switchTab({
          url: `/pages/home/index`,
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
      <HouseDes onUserDescriptionEdit={handleUserDescriptionEdit} />
      <InfoSelection onUserInfoEdit={handleUserInfoEdit} />
      <View style={{ backgroundColor: 'white' }}>
        <View className='post-submit-button' onClick={handleClickPostSubmit}>
          <Text>发布房源</Text>
        </View>
      </View>
      <CustomTabBar />
    </View>
  );
};

export default observer(Index);
