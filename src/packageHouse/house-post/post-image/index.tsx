import { View, Image } from '@tarojs/components';
import { useState } from 'react';
import ImagesUpload from '.././images-upload';

interface IProps {
  bedroomImages: string[];
  livingroomImages: string[];
  bathroomImages: string[];
  otherImages: string[];
  onSetImage: (_, _) => void;
}
export default (props: IProps) => {
  const handleUploadImage = type => {
    if (type == 'bedroom') {
      const onUploadImage = uploadedImagePath => {
        props.onSetImage('bedroom', [
          ...props.bedroomImages,
          uploadedImagePath,
        ]);
      };
      return onUploadImage;
    } else if (type == 'livingroom') {
      const onUploadImage = uploadedImagePath => {
        props.onSetImage('livingroom', [
          ...props.livingroomImages,
          uploadedImagePath,
        ]);
      };
      return onUploadImage;
    } else if (type == 'bathroom') {
      const onUploadImage = uploadedImagePath => {
        props.onSetImage('bathroom', [
          ...props.bathroomImages,
          uploadedImagePath,
        ]);
      };
      return onUploadImage;
    } else if (type == 'others') {
      const onUploadImage = uploadedImagePath => {
        props.onSetImage('others', [...props.otherImages, uploadedImagePath]);
      };
      return onUploadImage;
    }
    return () => {};
  };

  // 删除image
  const handleDeleteImage = type => {
    if (type == 'bedroom') {
      const onDeleteImage = deletedImagePath => {
        const updatedImages = props.bedroomImages.filter(
          image => image !== deletedImagePath,
        );
        props.onSetImage('bedroom', updatedImages);
      };
      return onDeleteImage;
    } else if (type == 'livingroom') {
      const onDeleteImage = deletedImagePath => {
        const updatedImages = props.livingroomImages.filter(
          image => image !== deletedImagePath,
        );
        props.onSetImage('livingroom', updatedImages);
      };
      return onDeleteImage;
    } else if (type == 'bathroom') {
      const onDeleteImage = deletedImagePath => {
        const updatedImages = props.bathroomImages.filter(
          image => image !== deletedImagePath,
        );
        props.onSetImage('bathroom', updatedImages);
      };
      return onDeleteImage;
    } else if (type == 'others') {
      const onDeleteImage = deletedImagePath => {
        const updatedImages = props.otherImages.filter(
          image => image !== deletedImagePath,
        );
        props.onSetImage('others', updatedImages);
      };
      return onDeleteImage;
    }
    return () => {};
  };

  return (
    <View className='post-image'>
      <View className='title'>您的房源是？</View>
      <View className='post-image-des'>
        一些传照片的prompt，类似于 请根据指示拍摄清晰且未经修饰的照片之类的{' '}
      </View>
      <View className='house-type'>
        <View className='house-item'>
          <View className='house-item-title'>房客住宿区</View>
          <View className='des'>请拍摄包含房客住宿的床的照片</View>
          <ImagesUpload
            images={props.bedroomImages}
            onUploadImage={handleUploadImage('bedroom')}
            onDeleteImage={handleDeleteImage('bedroom')}
          />
        </View>
        <View className='house-item'>
          <View className='house-item-title'>公共区</View>
          <View className='des'>请拍摄包含客厅/娱乐区的照片</View>
          <ImagesUpload
            images={props.livingroomImages}
            onUploadImage={handleUploadImage('livingroom')}
            onDeleteImage={handleDeleteImage('livingroom')}
          />
        </View>
        <View className='house-item'>
          <View className='house-item-title'>卫生间</View>
          <View className='des'>请拍摄包含卫浴区、马桶的照片</View>
          <ImagesUpload
            images={props.bathroomImages}
            onUploadImage={handleUploadImage('bathroom')}
            onDeleteImage={handleDeleteImage('bathroom')}
          />
        </View>
        <View className='house-item'>
          <View className='house-item-title'>其他</View>
          <View className='des'>点击添加拍摄其他照片</View>
          <ImagesUpload
            images={props.otherImages}
            onUploadImage={handleUploadImage('others')}
            onDeleteImage={handleDeleteImage('others')}
          />
        </View>
      </View>
    </View>
  );
};
