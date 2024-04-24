import { View } from '@tarojs/components';
import CustomTabBar from '@components/CustomTabBar';
import { observer } from 'mobx-react';
import ImagesUpload from './images-upload';
import { useState } from 'react';

const Index = () => {
  const [images, setImages] = useState<string[]>([]);

  // TODO: 处理照片上传的逻辑
  const handleUploadImage = () => {
    // TODO: 调用微信小程序的API上传照片
    // const newImage = '';
    // setImages([...images, newImage]);
  };

  return (
    <View className='index'>
      <ImagesUpload images={images} handleUploadImage={handleUploadImage} />
      <CustomTabBar />
    </View>
  );
};

export default observer(Index);
