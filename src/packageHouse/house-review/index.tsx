import { View, Text, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useState, useEffect } from 'react';
import { useRouter } from '@tarojs/taro';

import './index.scss';
import Taro from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';

const HouseReview = () => {
  const router = useRouter();
  const houseId = router?.params?.id;

  //todo:评分的星，review中的照片（以及怎么处理放大看图片），评价者的头像

  return (
    <>
      <View className='house-detail-review'>
        <View className='overall-ratings'>
          <View className='average-ratings'>4.2</View>
          <View className='ratings-details'>
            <View className='rating-container'>
              <View className='rating-title'>描述相符</View>
              <View className='rating-number'>4.1</View>
            </View>
            <View className='rating-container'>
              <View className='rating-title'>地理位置</View>
              <View className='rating-number'>4.1</View>
            </View>
            <View className='rating-container'>
              <View className='rating-title'>清洁程度</View>
              <View className='rating-number'>4.1</View>
            </View>
            <View className='rating-container'>
              <View className='rating-title'>服务体验</View>
              <View className='rating-number'>4.1</View>
            </View>
            <View className='rating-container'>
              <View className='rating-title'>性价比</View>
              <View className='rating-number'>4.1</View>
            </View>
          </View>
        </View>
        <View className='reviews'>
          <View className='review-card-count'>102条评论</View>
          <View className='review-card-container'>
            <View className='review-card-top'>
              <View className='review-card-reviewer-detail'>
                <View className='reviewer-detail-avatar'>{/* todo */}</View>
                <View className='reviewer-detail-info'>
                  <View className='reviewer-detail-name'>玉兰花</View>
                  <View className='reviewer-detail-location'>意大利-米兰</View>
                </View>
              </View>
              <View className='review-card-top-right'>
                <View className='stars'></View>
                <View className='duration'>2023-07-02 to 2023-07-07</View>
              </View>
            </View>
            <View className='review-card-text'>
              非常好的房间，交通便利，很卫生干净！小姐姐回复沟通也特别及时！xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </View>
            <View className='review-card-pictures'>
              <Image src='' />
              <Image src='' />
            </View>
          </View>
          <View className='review-card-container'>
            <View className='review-card-top'>
              <View className='review-card-reviewer-detail'>
                <View className='reviewer-detail-avatar'>{/* todo */}</View>
                <View className='reviewer-detail-info'>
                  <View className='reviewer-detail-name'>玉兰花</View>
                  <View className='reviewer-detail-location'>意大利-米兰</View>
                </View>
              </View>
              <View className='review-card-top-right'>
                <View className='stars'></View>
                <View className='duration'>2023-07-02 to 2023-07-07</View>
              </View>
            </View>
            <View className='review-card-text'>
              非常好的房间，交通便利，很卫生干净！小姐姐回复沟通也特别及时！xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </View>
            <View className='review-card-pictures'>
              <Image src='' />
              <Image src='' />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default observer(HouseReview);
