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
import {
  houseDetailSearch,
  houseRatingInfoUpdate,
} from '@common/database/house/house';
import {
  userInfoSearch,
  userHostRatingInfoUpdate,
  userGuestRatingInfoUpdate,
} from '@common/database/user/user';
import { accomMessageSearchWithId } from '@common/database/accomMessage/accomMessage';
import { ratingInfoAdd } from '@common/database/ratingInfo/ratingInfo';
import StarRating from './review-star';
import { assert } from 'XrFrame/core/utils';

const ReviewOnHouse = () => {
  const router = useRouter();
  const accomInfoId = router?.params?.id;
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);
  const [accommodationDetails, setAccommodationDetails] =
    useState<UserAccomMessageItemProps>();

  const [overallRatings, setOverallRatings] = useState<number>(3);

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
          demoUser._openid == accomInfo.sourceUserOpenid
          //   && demoUser._openid != accomInfo.targetUserOpenid
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

    const currentScore =
      type === 'tohost'
        ? (evaluation.desMatch +
            evaluation.locationEval +
            evaluation.cleanEval +
            evaluation.serviceEval +
            evaluation.pricePerformance) /
          5
        : evaluation.rating;

    // scores for houses and users to be updated
    var avgTargetScore,
      targetRatingNumber,
      avgHouseScore,
      houseRatingNumber,
      houseEvaluationNumbers;

    if (
      houseDetail?.ratingNumber == undefined ||
      houseDetail.ratingNumber == 0
    ) {
      avgHouseScore = currentScore;
      houseRatingNumber = 1;
      houseEvaluationNumbers =
        type === 'tohost'
          ? {
              desMatch: evaluation.desMatch,
              locationEval: evaluation.locationEval,
              cleanEval: evaluation.cleanEval,
              serviceEval: evaluation.serviceEval,
              pricePerformance: evaluation.pricePerformance,
            }
          : {
              rating: evaluation.rating,
            };
    } else {
      avgHouseScore =
        type === 'tohost'
          ? (currentScore + houseDetail.rating * houseDetail.ratingNumber) /
            (houseDetail.ratingNumber + 1)
          : houseDetail.rating;

      houseRatingNumber =
        type === 'tohost'
          ? houseDetail.ratingNumber + 1
          : houseDetail.ratingNumber;

      houseEvaluationNumbers = houseDetail.evaluationNumbers;
      if (type === 'tohost') {
        Object.keys(houseEvaluationNumbers).forEach(key => {
          houseEvaluationNumbers[key] =
            (houseEvaluationNumbers[key] * houseDetail.ratingNumber +
              refinedEvaluation[key]) /
            (houseDetail.ratingNumber + 1);
        });
      }
    }
    if (
      ((reviewTarget?.guestRatingNumber == undefined ||
        reviewTarget?.guestRatingNumber == 0) &&
        type === 'toseeker') ||
      ((reviewTarget?.hostRatingNumber == undefined ||
        reviewTarget?.hostRatingNumber == 0) &&
        type === 'tohost')
    ) {
      avgTargetScore = currentScore;
      targetRatingNumber = 1;
    } else {
      if (reviewTarget) {
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
    }

    ratingInfoAdd(
      accommodationDetails?._id,
      user._openid,
      user.nickName,
      user.avatarUrl,
      user.userLocation,
      reviewTarget?._openid,
      reviewTarget?.nickName,
      reviewTarget?.avatarUrl,
      houseId,
      accommodationDetails?.start_date,
      accommodationDetails?.end_date,
      refinedEvaluation,
      comment,
      type,
      isPublic,
    ).then(res => {
      if (type == 'tohost') {
        userHostRatingInfoUpdate(
          reviewTarget?._id,
          avgTargetScore,
          targetRatingNumber,
        ).then(res => {
          console.log(res);
        });
        houseRatingInfoUpdate(
          houseDetail?._id,
          avgHouseScore,
          houseEvaluationNumbers,
          houseRatingNumber,
        );
      } else {
        userGuestRatingInfoUpdate(
          reviewTarget?._id,
          avgTargetScore,
          targetRatingNumber,
        ).then(res => {
          console.log(res);
        });
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
    <View className='review-on-house-page'>
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
      <View className='overall-ratings'>
        {/* todo:newRating关联请求 */}
        <StarRating
          initialRating={3}
          label='描述相符'
          onRatingChange={newRating => {
            setOverallRatings(newRating);
          }}
        />
      </View>
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
      <View className='review-submit-button' onClick={onCreateReview}>
        <Text>发表评价</Text>
      </View>
    </View>
  );
};

export default ReviewOnHouse;
