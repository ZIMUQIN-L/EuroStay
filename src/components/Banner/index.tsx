import React from 'react';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
import './index.scss';

const Banner = () => {
  const images = [
    'https://via.placeholder.com/300x150', // Add your image URLs here
    'https://via.placeholder.com/300x150',
    'https://via.placeholder.com/300x150'
  ];

  return (
    <View className='banner'>
      <Swiper
        className='swiper'
        indicatorDots
        autoplay
        interval={5000}
        duration={500}
      >
        {images.map((image, index) => (
          <SwiperItem key={index}>
            <Image src={image} className='slide-image' />
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  );
};

export default Banner;
