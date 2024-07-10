import React from 'react';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { BannerInfoItemProps } from '@utils/interfaces';
import { bannerInfoSearch } from '@common/database/bannerInfo/bannerInfo';

const Banner = () => {
  //   const images = [
  //     'https://via.placeholder.com/300x200', // Add your image URLs here
  //     'https://via.placeholder.com/300x200',
  //     'https://via.placeholder.com/300x200',
  //   ];
  const [bannerItems, setBannerItems] = useState<BannerInfoItemProps[]>([]);

  useEffect(() => {
    bannerInfoSearch().then((res: BannerInfoItemProps[]) => {
      setBannerItems(res);
    });
  }, []);

  const handleClickBannerImage = activityId => {
    Taro.navigateTo({
      url: `/packageActivity/activity-detail/index?id=${activityId}`,
    });
  };

  return (
    <View>
      {bannerItems.length > 0 && (
        <View className='banner'>
          <Swiper
            className='swiper'
            indicatorDots
            autoplay
            interval={5000}
            duration={500}
          >
            {bannerItems.map((item, index) => (
              <SwiperItem key={index}>
                <Image
                  src={item.bannerImg}
                  className='slide-image'
                  onClick={() => handleClickBannerImage(item.activityId)}
                />
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      )}
    </View>
  );
};

export default Banner;
