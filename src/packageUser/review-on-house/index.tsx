import { View, Text, Image, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';
import ReviewDes from './review-des';
import { useEffect, useState } from 'react';
import { useRouter } from '@tarojs/taro';
import { accomMessageUpdate } from '@common/database/accomMessage/accomMessage';
import {
  HouseDetailItemProps,
  UserAccomMessageItemProps,
  UserItemProps,
  UserDetailInfoItemProps,
} from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import HouseInfoCard from './review-house-info-card';
import { DefaultAvatar, DefaultHouse } from '@utils/cloudIcons';
import { houseDetailSearch } from '@common/database/house/house';
import {
  userInfoSearch,
  userHostRatingInfoUpdate,
  userGuestRatingInfoUpdate,
} from '@common/database/user/user';
import { accomMessageSearchWithId } from '@common/database/accomMessage/accomMessage';
import { ratingInfoAdd } from '@common/database/ratingInfo/ratingInfo';
import StarRating from './review-star';

const ReviewOnHouse = () => {
  const router = useRouter();
  const accomInfoId = router?.params?.id;
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);
  const [accommodationDetails, setAccommodationDetails] =
    useState<UserAccomMessageItemProps>();

  const [evaluation, setEvaluation] = useState({
    desMatch: 3, // Default values, change as needed
    locationEval: 3,
    cleanEval: 3,
    serviceEval: 3,
    pricePerformance: 3,
    rating: 3,
  });
  const [comment, setComment] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const [houseDetail, setHouseDetail] = useState<HouseDetailItemProps | null>(
    null,
  );
  const [houseId, setHouseId] = useState<string>('');
  const [type, setType] = useState<string>('tohost');
  const [reviewTarget, setReviewTarget] =
    useState<UserDetailInfoItemProps | null>(null);

  useEffect(() => {
    const demoUser: UserItemProps = GlobalStore.userInfo;
    setUser(demoUser);
    const accomInfoId = router?.params?.id;
    accomMessageSearchWithId(accomInfoId).then(
      (accomInfo: UserAccomMessageItemProps) => {
        setAccommodationDetails(accomInfo);
        setHouseId(accomInfo.houseId);
        if (
          demoUser._openid == accomInfo.sourceUserOpenid &&
          demoUser._openid != accomInfo.targetUserOpenid
        ) {
          setType('tohost');
          houseDetailSearch(accomInfo.houseId).then(
            (houseDetail: HouseDetailItemProps) => {
              setHouseDetail(houseDetail);
              userInfoSearch(houseDetail._openid).then(
                (ownerInfo: UserDetailInfoItemProps[]) => {
                  setReviewTarget(ownerInfo[0]);
                },
              );
            },
          );
        } else {
          setType('toseeker');
          houseDetailSearch(accomInfo.houseId).then(
            (houseDetail: HouseDetailItemProps) => {
              setHouseDetail(houseDetail);
              userInfoSearch(accomInfo.sourceUserOpenid).then(
                (ownerInfo: UserDetailInfoItemProps[]) => {
                  setReviewTarget(ownerInfo[0]);
                },
              );
            },
          );
        }
      },
    );
  }, []);

  const handleUserDescriptionEdit = inputDescription => {
    // Handle user description edit
    setComment(inputDescription);
  };

  const handleIsPublicEdit = isPublic => {
    // Handle isPublic edit
    setIsPublic(isPublic);
  };

  const onCreateReview = () => {
    // 提交review 内容
    console.log(reviewTarget);

    // Refine evaluation based on the type of review: tohost or toseeker
    const refinedEvaluation =
      type === 'tohost'
        ? {
            desMatch: evaluation.desMatch,
            locationEval: evaluation.locationEval,
            cleanEval: evaluation.cleanEval,
            serviceEval: evaluation.serviceEval,
            pricePerformance: evaluation.pricePerformance,
          }
        : {
            rating: evaluation.rating, // Only rating is relevant for 'toseeker'
          };

    var avgTargetScore, targetRatingNumber;
    if (
      reviewTarget?.guestRatingNumber == undefined ||
      reviewTarget?.guestRatingNumber == 0
    ) {
      avgTargetScore =
        type === 'tohost'
          ? (evaluation.desMatch +
              evaluation.locationEval +
              evaluation.cleanEval +
              evaluation.serviceEval +
              evaluation.pricePerformance) /
            5
          : evaluation.rating;

      targetRatingNumber = 1;
    } else {
      const currentScore =
        type === 'tohost'
          ? (evaluation.desMatch +
              evaluation.locationEval +
              evaluation.cleanEval +
              evaluation.serviceEval +
              evaluation.pricePerformance) /
            5
          : evaluation.rating;

      avgTargetScore =
        type === 'tohost'
          ? (currentScore +
              reviewTarget.hostRating * reviewTarget.hostRatingNumber) /
            (reviewTarget.hostRatingNumber + 1)
          : (currentScore +
              reviewTarget.guestRating * reviewTarget.guestRatingNumber) /
            (reviewTarget.guestRatingNumber + 1);

      targetRatingNumber =
        type === 'tohost'
          ? reviewTarget.hostRatingNumber + 1
          : reviewTarget.guestRatingNumber + 1;
    }

    ratingInfoAdd(
      accommodationDetails?._id,
      user._openid,
      user.nickName,
      user.avatarUrl,
      reviewTarget?._openid,
      reviewTarget?.nickName,
      reviewTarget?.avatarUrl,
      houseId,
      refinedEvaluation,
      comment,
      type,
      isPublic,
    ).then(res => {
      if (type == 'tohost') {
        userHostRatingInfoUpdate(
          reviewTarget?._openid,
          avgTargetScore,
          targetRatingNumber,
        );
      } else {
        userGuestRatingInfoUpdate(
          reviewTarget?._openid,
          avgTargetScore,
          targetRatingNumber,
        );
      }
      if (accommodationDetails?.status == 'checkedIn' && type == 'tohost') {
        accomMessageUpdate(accommodationDetails._id, 'guestRated');
      } else if (
        accommodationDetails?.status == 'ownerRated' &&
        type == 'tohost'
      ) {
        accomMessageUpdate(accommodationDetails._id, 'bothRated');
      } else if (
        accommodationDetails?.status == 'checkedIn' &&
        type == 'toseeker'
      ) {
        accomMessageUpdate(accommodationDetails._id, 'ownerRated');
      } else if (
        accommodationDetails?.status == 'guestRated' &&
        type == 'toseeker'
      ) {
        accomMessageUpdate(accommodationDetails._id, 'bothRated');
      }
      Taro.navigateBack({
        delta: 1,
      });
    });

    // console.log('submitting content:', userRatingInfo);
  };

  return (
    <View className='page'>
      <HouseInfoCard
        title={houseDetail ? houseDetail.location : 'location'}
        imageUrl={reviewTarget ? reviewTarget.avatarUrl : DefaultAvatar}
        userInfo={reviewTarget ? reviewTarget.nickName : 'Host'}
        dateInfo={
          houseDetail
            ? houseDetail.start_date + ' to ' + houseDetail.end_date
            : 'unknown'
        }
      />
      <ReviewDes
        onUserDescriptionEdit={handleUserDescriptionEdit}
        onIsPublicEdit={handleIsPublicEdit}
      />

      <View className='detailed-ratings'>
        {type === 'tohost' ? (
          <>
            <StarRating
              initialRating={3}
              label='描述相符'
              onRatingChange={newRating => (evaluation.desMatch = newRating)}
            />
            <StarRating
              initialRating={3}
              label='地理位置'
              onRatingChange={newRating =>
                (evaluation.locationEval = newRating)
              }
            />
            <StarRating
              initialRating={3}
              label='清洁程度'
              onRatingChange={newRating => (evaluation.cleanEval = newRating)}
            />
            <StarRating
              initialRating={3}
              label='服务体验'
              onRatingChange={newRating => (evaluation.serviceEval = newRating)}
            />
            <StarRating
              initialRating={3}
              label='性价比'
              onRatingChange={newRating =>
                (evaluation.pricePerformance = newRating)
              }
            />
          </>
        ) : (
          <StarRating
            initialRating={3}
            label='对房客评价'
            onRatingChange={newRating => (evaluation.rating = newRating)}
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
          marginBottom: '20px',
        }}
        className='review-submit-button'
        onClick={onCreateReview}
      >
        <Text>发表评价</Text>
      </View>
    </View>
  );
};

export default ReviewOnHouse;
