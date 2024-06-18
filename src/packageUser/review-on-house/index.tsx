import { View, Text, Image, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';
import ReviewDes from './review-des';
import { useEffect, useState } from 'react';
import { HouseDetailItemProps, UserRatingInfoItemProps, UserItemProps } from '@utils/interfaces';
import HouseInfoCard from './review-house-info-card';
import { DefaultAvatar, DefaultHouse } from '@utils/cloudIcons';
import { houseDetailSearch } from '@common/database/house/house';
import { userInfoSearch } from '@common/database/user/user';
import StarRating from './review-star';
import GlobalStore from '@store/GlobalStore';
import { set } from 'mobx';

const ReviewOnHouse = () => {

  // Dummy data for illustration
  const accommodationDetails = {
    name: "精致民宿xxx房",
    host: "Andre",
    period: "2024-05-02 to 2024-05-10",
    rating: 3,
    review: "设施齐全的民宿体验，给其他朋友一些帮助~",
    imageUrl: "path_to_accommodation_image.png" // Update path as needed
  };

  const toHostAccommodationDetails = {
      "houseId": "7d8ff72c666e735f02fb906e5cc30315",
      "type": "tohost",
      // "type": "toseeker",
      "userOpenId": "owGKZ68uKjrM_-7RiYFrGcmiW_iI",
      "accommodationDetails": {
        "name": "精致民宿xxx房",
        "host": "Andre",
        "period": "2024-05-02 to 2024-05-10",
        "rating": 3,
        "review": "设施齐全的民宿体验，给其他朋友一些帮助~",
        "imageUrl": "path_to_accommodation_image.png"
    }
  }


  const [evaluation, setEvaluation] = useState({
    desMatch: 3,  // Default values, change as needed
    locationEval: 3,
    cleanEval: 3,
    serviceEval: 3,
    pricePerformance: 3,
    rating: 3
  });
  const [comment, setComment] = useState('');

  const [houseDetail, setHouseDetail] = useState<HouseDetailItemProps | null>(
    null,
  );
  const [houseId, setHouseId] = useState<string>('');
  const [type, setType] = useState<string>('tohost');
  const [host, setHost] = useState<UserItemProps | null>(null);

  useEffect(() => {
    //get the houseId from the mock data toHostAccommodationDetails
    const houseId = toHostAccommodationDetails.houseId;
    setHouseId(houseId);
    setType(toHostAccommodationDetails.type);

    houseDetailSearch(houseId).then((houseDetail: HouseDetailItemProps) => {
      setHouseDetail(houseDetail);
    });

    userInfoSearch(toHostAccommodationDetails.userOpenId).then((user: UserItemProps) => {
      setHost(user[0]);
    });

  }, []);


  const handleUserDescriptionEdit = inputDescription => {
    // Handle user description edit
    setComment(inputDescription);
  }

  const handleInputChange = (e, field) => {
    const value = parseFloat(e.target.value);  // Assuming input type='number'
    setEvaluation(prev => ({ ...prev, [field]: value }));
  };

  const onCreateReviewFromSeeker = () => {
    // 提交review 内容

    // Refine evaluation based on the type of review: tohost or toseeker
    const refinedEvaluation = type === 'tohost' ? {
      desMatch: evaluation.desMatch,
      locationEval: evaluation.locationEval,
      cleanEval: evaluation.cleanEval,
      serviceEval: evaluation.serviceEval,
      pricePerformance: evaluation.pricePerformance
    } : {
      rating: evaluation.rating  // Only rating is relevant for 'toseeker'
    };


    const userRatingInfo = {
      houseId,
      evaluation: refinedEvaluation,
      comment: comment,
      type: type
    };

    console.log("submitting content:", userRatingInfo);
  }


  return (
    <View className='page'>
      <HouseInfoCard
        title={houseDetail ? houseDetail.location: "location"}
        imageUrl={
          host? host.avatarUrl : DefaultAvatar
        }
        userInfo={ host? host.nickName : "Host"}
        dateInfo={
          houseDetail ? houseDetail.start_date + ' to ' + houseDetail.end_date : "2024-05-02 to 2024-05-10"
        }

      />
      <ReviewDes onUserDescriptionEdit={handleUserDescriptionEdit} />

      <View className='detailed-ratings'>
      {toHostAccommodationDetails.type === 'tohost' ? (
          <>
        <StarRating initialRating={3} label="描述相符" onRatingChange={(newRating) => evaluation.desMatch = newRating}
        />
        <StarRating initialRating={3} label="地理位置" onRatingChange={(newRating) => evaluation.locationEval = newRating}
        />
        <StarRating initialRating={3} label="清洁程度" onRatingChange={(newRating) => evaluation.cleanEval = newRating}
        />
        <StarRating initialRating={3} label="服务体验" onRatingChange={(newRating) => evaluation.serviceEval = newRating}
        />
        <StarRating initialRating={3} label="性价比" onRatingChange={(newRating) => evaluation.pricePerformance = newRating}
        />
                  </>
        ) : (
          <StarRating initialRating={3} label="对房客评价" onRatingChange={(newRating) => evaluation.rating = newRating}
        />
        )}
      </View>
      <View
          style={{
            backgroundColor: '#FFD111',
            color: 'black',
            width: '80%',
            justifyContent: 'center',
            height: '50px',
            fontSize: '15px',
            borderRadius: '32px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '40px',
            marginBottom: '20px'
          }}
          className='review-submit-button'
          onClick={onCreateReviewFromSeeker}
        >
          <Text>发表评价</Text>
        </View>
    </View>
  );
};

export default ReviewOnHouse;
