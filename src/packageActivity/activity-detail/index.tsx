import React from 'react';
import {
  View,
  Text,
  Image,
  Swiper,
  SwiperItem,
  Button,
} from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.scss';
import { useRouter } from '@tarojs/taro';
import {
  StarOutlined,
  LocationOutlined,
  NotesOutlined,
  GoldCoinOutlined,
  FriendsOutlined,
} from '@taroify/icons';
import { PreferenceIcon } from '@utils/cloudIcons';
import Taro from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';
import {
  activityDetailSearch,
  activityContainUser,
} from '@common/database/activityInfo/activityInfo';
import {
  ActivityInfoItemProps,
  UserDetailInfoItemProps,
  UserItemProps,
  ActivityApplicationItemProps,
} from '@utils/interfaces';
import { userInfoSearch } from '@common/database/user/user';

const DetailPage = () => {
  const router = useRouter();
  const activityId = router?.params?.id;
  const [activity, setActivity] = useState<ActivityInfoItemProps>();
  const [hostInfo, setHostInfo] = useState<UserDetailInfoItemProps>();
  const [applicable, setApplicable] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserDetailInfoItemProps>();

  useEffect(() => {
    const curUser = GlobalStore.userInfo;
    userInfoSearch(curUser._openid).then(
      (ownerInfo: UserDetailInfoItemProps[]) => {
        setCurrentUser(ownerInfo[0]);
      },
    );
    activityDetailSearch(activityId).then((res: ActivityInfoItemProps) => {
      setActivity(res);
      userInfoSearch(res._openid).then(
        (userInfoRes: UserDetailInfoItemProps[]) => {
          setHostInfo(userInfoRes[0]);
        },
      );
      activityContainUser(activityId, GlobalStore.userInfo._openid).then(
        (items: ActivityApplicationItemProps[]) => {
          if (items.length == 0) {
            setApplicable(true);
          }
        },
      );
      // todo also change it for eurostay act @PJ
    });
  }, []);

  const handleClickHostAvatar = () => {
    Taro.navigateTo({
      url: `/packageUser/user-detail/index?id=${hostInfo?._openid}`,
    });
  };

  const handleSignUpClick = () => {
    if (currentUser && activity && currentUser?.point <= activity?.point) {
        Taro.showModal({
            title: '积分不足',
            content: '当前积分不足，前往积分页面查看积分获取规则~',
            success: function (res) {
              if (res.confirm) {
                Taro.navigateTo({
                    url: `/packageUser/my-points/index`,
                  });
              } 
            }
          })
      }
    else if (applicable && activity?.official == false) {
      Taro.navigateTo({
        url: `/packageActivity/activity-application/index?id=${activityId}`,
      });
    } else if (applicable && activity?.official == true) {
      Taro.navigateTo({
        url: `/packageActivity/activity-apply-eurostay/index?id=${activityId}`,
      });
    }
  };

  return (
    <View className='detail-page'>
      <Swiper
        className='swiper'
        indicatorDots
        autoplay
        interval={5000}
        duration={500}
      >
        {activity?.images.map((image, index) => (
          <SwiperItem key={index}>
            <Image src={image} className='slide-image' mode='aspectFit' />
          </SwiperItem>
        ))}
      </Swiper>
      <View className='activity-info'>
        <Text className='title'>{activity?.title}</Text>
        <View className='details'>
          <View className='location-container'>
            <LocationOutlined className='icon' />
            <Text className='location'>{activity?.location}</Text>
          </View>
          <View className='location-container'>
            <Text className='location'>
              {applicable && activity?.official == false
                ? '报名获得详细地址'
                : activity?.location}
            </Text>
          </View>
        </View>
        <View className='details'>
          <View className='date-container'>
            <NotesOutlined className='icon' />
            <Text>
              {activity?.startTime},{activity?.endTime}
            </Text>
          </View>
          {/* <View className='date-container'>
            <Text>{activity.duration}</Text>
          </View> */}
        </View>
        <View className='organizer'>
          <Image
            src={hostInfo ? hostInfo?.avatarUrl : ''}
            className='organizer-image'
            mode='aspectFit'
            onClick={handleClickHostAvatar}
          />
          <View className='organizer-info'>
            <Text className='organizer-name'>发起人 {hostInfo?.nickName}</Text>
            <Text className='organizer-description'>{hostInfo?.userDes}</Text>
          </View>
        </View>
        <View className='description'>
          <Image src={PreferenceIcon} className='description-image' />
          <View className='description-info'>
            <Text className='description-title'>活动亮点介绍</Text>
            <Text className='description-content'>{activity?.description}</Text>
          </View>
        </View>
      </View>
      <View className='contact-container'>
        <View className='price-info'>
          <Text className='price'>
            {activity?.price} 欧， {activity?.point} 积分
          </Text>
          <Text className='participants'>预估人数 {activity?.capacity}人</Text>
        </View>
        <View className='right-section'>
          {/* <View className='icon-container'>
            <StarOutlined className='icon' />
          </View> */}
          <View
            className='contact-button'
            onClick={handleSignUpClick}
            style={{ backgroundColor: applicable ? '#FFD111' : '#d6d6d6' }}
          >
            {applicable ? '报名活动' : '已报名'}
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailPage;
