import { Swiper, SwiperItem, View, Image } from '@tarojs/components';
import { HouseDetailItemProps } from '@utils/interfaces';
import { DefaultHouse } from '@utils/cloudIcons';
import { filterValidImageUrls } from '@utils/validationUtil';
import './index.scss';

const HouseImagesSwiper: React.FC<HouseDetailItemProps> = house => {
  const fullContainerStyle = {
    width: '100%',
    height: '100%',
  };
  const imageUrls = filterValidImageUrls(house.images);

  return (
    <View className='detail-page-images'>
      <Swiper
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
        style={{ width: '100%', height: '250px' }}
      >
        {imageUrls.length === 0 ? (
          <SwiperItem style={fullContainerStyle}>
            <View className='swiper-item' style={fullContainerStyle}>
              <Image
                src={DefaultHouse}
                mode='aspectFit'
                style={fullContainerStyle}
              />
            </View>
          </SwiperItem>
        ) : (
          house.images.map((image, index) => (
            <SwiperItem key={index} style={fullContainerStyle}>
              <View className='swiper-item' style={fullContainerStyle}>
                <Image
                  src={image}
                  mode='aspectFit'
                  style={fullContainerStyle}
                />
              </View>
            </SwiperItem>
          ))
        )}
      </Swiper>
    </View>
  );
};

export default HouseImagesSwiper;
