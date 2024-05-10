import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import { cloudImageUpload } from '../../../common/database/cloudstorage/files';

const ImagesUpload = ({ images, onUploadImage, onDeleteImage }) => {
  const hasImages = Array.isArray(images) && images.length > 0;

  const handleUploadImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;

        // 为了不上传大量图片至服务器端在测试时使用本地图片，请在上线时删除下面两行代码
        onUploadImage(tempFilePaths);
        return;

        Taro.showLoading({
          title: '上传中',
          mask: true,
        });
        cloudImageUpload(tempFilePaths[0]).then((uploadedImagePath: string) => {
          onUploadImage(uploadedImagePath);
          Taro.hideLoading();
        });
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

  const handleDeleteImage = imageUrl => {
    onDeleteImage(imageUrl);
  };

  return (
    <View className='upload-part'>
      <View className='image-container'>
        {hasImages &&
          images.map(image => (
            <View className='house-image' key={image}>
              <Image src={image} mode='aspectFill' />
              <View
                className='image-delete'
                onClick={() => handleDeleteImage(image)}
              >
                删除
              </View>
            </View>
          ))}
        <View className='upload' onClick={handleUploadImage}>
          <Text style={{ fontSize: '22px' }}> + </Text>
          <Text style={{ fontSize: '10px' }}>上传照片</Text>
        </View>
      </View>
    </View>
  );
};

export default ImagesUpload;
