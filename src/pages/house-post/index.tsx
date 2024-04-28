import { View } from '@tarojs/components';
import CustomTabBar from '@components/CustomTabBar';
import { observer } from 'mobx-react';
import ImagesUpload from './images-upload';
import HouseDes from './house-des';
import { useState } from 'react';
import InfoSelection from './info-selection';
import './index.scss';

const Index = () => {
  // TODO: 后面可以优化，使用mobx来管理照片
  // TODO：后面可以设定，用户未登录时，不允许上传房源，或者提示用户登录

  const [images, setImages] = useState<string[]>([]);

  // 处理照片上传的逻辑
  const handleUploadImage = uploadedImagePath => {
    // 在image-uploaded模块中调用微信小程序的API上传照片
    // const newImage = '';
    // setImages([...images, newImage]);
    setImages([...images, uploadedImagePath]);
  };

  // 删除image
  const handleDeleteImage = deletedImagePath => {
    const updatedImages = images.filter(image => image !== deletedImagePath);
    setImages(updatedImages);
  };

  // 用户修改房源描述
  const [houseDescription, setHouseDescription] = useState<string>();
  const handleUserDescriptionEdit = inputDescription => {
    setHouseDescription(inputDescription);
  };

  return (
    <View className='index'>
      <ImagesUpload
        images={images}
        onUploadImage={handleUploadImage}
        onDeleteImage={handleDeleteImage}
      />
      <HouseDes onUserDescriptionEdit={handleUserDescriptionEdit} />
      <InfoSelection />
      <CustomTabBar />
    </View>
  );
};

export default observer(Index);
