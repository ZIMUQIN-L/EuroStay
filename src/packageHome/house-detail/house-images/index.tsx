import { Swiper, SwiperItem, View, Image } from '@tarojs/components';
import { HouseItemProps } from '@utils/interfaces';
// import DefaultHouse from '@assets/images/default-house.png';
import { DefaultHouse } from '../../../utils/cloudIcons';

const HouseImagesSwiper: React.FC<HouseItemProps> = house => {
  // 充满容器的样式
  const fullContainerStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <View className='images'>
      <Swiper
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
        style={{ width: '100%', height: '250px' }} // 设置轮播图的宽高, 目前为固定值，后期可以根据需求调整，适配不同机型
      >
        {house.images.length === 0 ? (
          <SwiperItem style={fullContainerStyle}>
            <View className='swiper-item' style={fullContainerStyle}>
              <Image
                src={DefaultHouse}
                mode='aspectFit' // 保持原始比例，可能留有空白
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
                  mode='aspectFit' // 保持原始比例，可能留有空白
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
