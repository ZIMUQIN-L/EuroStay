import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import UploadIcon from '@assets/images/upload-icon.svg';
import image from '@taroify/core/image';

const ImagesUpload = ({ images, handleUploadImage }) => {
  const hasImages = Array.isArray(images) && images.length > 0;

  return (
    <View className='index'>
      <View className='image-container'>
        {hasImages &&
          images.map(image => (
            <View className='house-image' key={image}>
              <Image src={image} mode='aspectFill' />
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
