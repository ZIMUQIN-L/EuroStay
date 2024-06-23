import { View, Text, Image } from '@tarojs/components';
import { HouseDetailItemProps } from '@utils/interfaces';
import Taro from '@tarojs/taro';
import './index.scss';
import { UserItemProps, UserRatingInfoItemProps } from '@utils/interfaces';
import { useState, useEffect } from 'react';
import { accomMessageAdd } from '@common/database/accomMessage/accomMessage';
import GlobalStore from '@store/GlobalStore';
import { RightBottomArrow } from '@utils/cloudIcons';
import { houseReceivedRatingSearch } from '@common/database/ratingInfo/ratingInfo';

const HouseReview: React.FC<HouseDetailItemProps> = house => {
  // user information
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);
  const [ratingInfo, setRatingInfo] = useState<UserRatingInfoItemProps[]>();

  useEffect(() => {
    const demoUser: UserItemProps = GlobalStore.userInfo;
    setUser(demoUser);
    houseReceivedRatingSearch(house._id).then(
      (res: UserRatingInfoItemProps[]) => {
        setRatingInfo(res);
      },
    );
  }, []);

  return (
    <View>
      <View className='lists'>
        <View className='reviews-container'>
          <View className='container-title'>
            <View className='container-title-left'>住客评价</View>
            <View className='container-title-right'>
              查看更多
              <Image src={RightBottomArrow} className='right-bottom-arrow' />
            </View>
          </View>
          <View
            className='review-cards-container'
            onClick={() => {
              //todo house-id
              Taro.redirectTo({
                url: '/packageHouse/house-review/index',
              });
            }}
          >
            {ratingInfo &&
              ratingInfo.map((rating, index) => (
                <View className='review-card'>
                  <View className='review-card-top'>
                    <View className='reviewer-info'>
                      <View className='reviewer-info-avatar'></View>
                      <View className='reviewer-info-details'>
                        <View className='reviewer-info-name'>
                          {rating.sourceUserNickname}
                        </View>
                        <View className='reviewer-info-location'></View>
                      </View>
                    </View>
                    <View className='review-card-top-right'>
                      <View className='review-ratings'>
                        {rating.evaluation['desMatch']}
                      </View>
                      {/* todo */}
                      <View className='review-date'>
                        2023-07-02 to 2023-07-07
                      </View>
                    </View>
                  </View>

                  <View className='review-card-bottom'>
                    <View className='review-card-des'></View>
                    <View className='review-card-pic'></View>
                    {/* todo */}
                  </View>
                  <View className='review-card-view-more'>显示更多</View>
                </View>
              ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default HouseReview;
