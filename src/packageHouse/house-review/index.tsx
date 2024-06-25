import { View, Text, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useState, useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import {
  UserItemProps,
  UserRatingInfoItemProps,
  HouseDetailItemProps,
} from '@utils/interfaces';
import './index.scss';
import { useReachBottom } from '@tarojs/taro';
import { DefaultAvatar } from '@utils/cloudIcons';
import { houseDetailSearch } from '@common/database/house/house';
import {
  houseReceivedRatingSearch,
  ratingInfoAdd,
} from '@common/database/ratingInfo/ratingInfo';

const HouseReview = () => {
  const router = useRouter();
  const houseId = router?.params?.id;
  const [ratingInfo, setRatingInfo] = useState<UserRatingInfoItemProps[]>([]);
  const [houseDetail, setHouseDetail] = useState<HouseDetailItemProps | null>(
    null,
  );

  useReachBottom(() => {
    houseReceivedRatingSearch(houseId, 10, ratingInfo?.length).then(
      (res: UserRatingInfoItemProps[]) => {
        setRatingInfo(prevData => [...prevData, ...res]);
      },
    );
  });

  useEffect(() => {
    houseReceivedRatingSearch(houseId, 10).then(
      (res: UserRatingInfoItemProps[]) => {
        setRatingInfo(res);
      },
    );
    houseDetailSearch(houseId).then((houseDetail: HouseDetailItemProps) => {
      setHouseDetail(houseDetail);
    });
  }, []);

  //todo:评分的星，review中的照片（以及怎么处理放大看图片），评价者的头像

  return (
    <>
      <View className='house-detail-review'>
        <View className='overall-ratings'>
          <View className='average-ratings'>
            {houseDetail?.rating?.toFixed(2)}
          </View>
          <View className='ratings-details'>
            <View className='rating-container'>
              <View className='rating-title'>描述相符</View>
              <View className='rating-number'>
                {houseDetail?.evaluationNumbers['desMatch']?.toFixed(2)}
              </View>
            </View>
            <View className='rating-container'>
              <View className='rating-title'>地理位置</View>
              <View className='rating-number'>
                {houseDetail?.evaluationNumbers['locationEval']?.toFixed(2)}
              </View>
            </View>
            <View className='rating-container'>
              <View className='rating-title'>清洁程度</View>
              <View className='rating-number'>
                {houseDetail?.evaluationNumbers['cleanEval']?.toFixed(2)}
              </View>
            </View>
            <View className='rating-container'>
              <View className='rating-title'>服务体验</View>
              <View className='rating-number'>
                {houseDetail?.evaluationNumbers['serviceEval']?.toFixed(2)}
              </View>
            </View>
            <View className='rating-container'>
              <View className='rating-title'>性价比</View>
              <View className='rating-number'>
                {houseDetail?.evaluationNumbers['pricePerformance']?.toFixed(2)}
              </View>
            </View>
          </View>
        </View>

        <View className='reviews'>
          <View className='review-card-count'>
            {houseDetail?.ratingNumber}条评论
          </View>

          {ratingInfo &&
            ratingInfo.map((rating, index) => (
              <View className='review-card-container'>
                <View className='review-card-top'>
                  <View className='review-card-reviewer-detail'>
                    <View className='reviewer-detail-avatar'>
                      <Image
                        src={
                          rating.toPublic
                            ? rating.sourceUserAvatarUrl
                            : DefaultAvatar
                        }
                        className='reviewer-detail-avatar'
                      />
                    </View>
                    <View className='reviewer-detail-info'>
                      <View className='reviewer-detail-name'>
                        {rating.toPublic
                          ? rating.sourceUserNickname
                          : '匿名用户'}
                      </View>
                      <View className='reviewer-detail-location'>
                        {rating.sourceUserLocation}
                      </View>
                    </View>
                  </View>
                  <View className='review-card-top-right'>
                    <View className='stars'></View>
                    <View className='duration'>
                      {rating.start_date} - {rating.end_date}
                    </View>
                  </View>
                </View>
                <View className='review-card-text'>{rating.comment}</View>
                <View className='review-card-pictures'>
                  <Image src='' />
                  <Image src='' />
                </View>
              </View>
            ))}
        </View>
      </View>
    </>
  );
};

export default observer(HouseReview);
