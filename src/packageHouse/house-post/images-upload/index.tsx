import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import { cloudImageUpload } from '@common/database/cloudstorage/files';
import { PostImage, DeleteImage } from '@utils/cloudIcons';

const ImagesUpload = ({ images, onUploadImage, onDeleteImage }) => {
  const hasImages = Array.isArray(images) && images.length > 0;

  const showFailureToast = message => {
    Taro.showToast({
      title: message,
      icon: 'error',
      duration: 2000,
    });
  };

  const handleUploadImage = () => {
    Taro.showLoading({
      title: '图片选择中',
      mask: true,
    });

    Taro.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    })
      .then(async res => {
        if (res.tempFilePaths.length > 0) {
          const tempFilePath = res.tempFilePaths[0];
          const compressedImage = Taro.compressImage({
            src: tempFilePath,
            quality: 50,
          });
          Taro.showLoading({
            title: '图片上传中',
            mask: true,
          });
          compressedImage
            .then(res => {
              return cloudImageUpload(res.tempFilePath);
            })
            .then(uploadedImagePath => {
              onUploadImage(uploadedImagePath);
              Taro.hideLoading();
            })
            .catch(err => {
              showFailureToast('上传图片失败');
              Taro.hideLoading();
            });
        }
      })
      .catch(err => {
        Taro.hideLoading();
        if (err.errMsg === 'chooseImage:fail cancel') {
          return;
        }
        showFailureToast('选择图片失败');
      });
  };

  const handleDeleteImage = imageUrl => {
    onDeleteImage(imageUrl);
    deleteImageFile(imageUrl);
  };

  async function deleteImageFile(tempFilePath) {
    try {
      await Taro.cloud.deleteFile({
        fileList: [tempFilePath],
      });
      Taro.showToast({
        title: '删除图片成功',
        icon: 'success',
        duration: 2000,
      });
    } catch (err) {
      showFailureToast('删除图片失败');
    }
  }

  return (
    <View className='upload-part'>
      <View className='image-container'>
        {hasImages &&
          images.map(image => (
            <View className='house-image' key={image}>
              <Image src={image} mode='aspectFill' className='pic' />
              <Image
                src={DeleteImage}
                className='delete'
                onClick={deleteImageFile}
              />
            </View>
          ))}
        <View className='house-image' onClick={handleUploadImage}>
          <Image src={PostImage} mode='aspectFill' className='pic' />
        </View>
      </View>
    </View>
  );
};

export default ImagesUpload;
