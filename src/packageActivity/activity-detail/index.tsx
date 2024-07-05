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
import { activityDetailSearch } from '@common/database/activityInfo/activityInfo';
import {
  ActivityInfoItemProps,
  UserDetailInfoItemProps,
} from '@utils/interfaces';
import { userInfoSearch } from '@common/database/user/user';

const DetailPage = () => {
  const router = useRouter();
  const activityId = router?.params?.id;
  const [activity, setActivity] = useState<ActivityInfoItemProps>();
  const [hostInfo, setHostInfo] = useState<UserDetailInfoItemProps>();

  useEffect(() => {
    activityDetailSearch(activityId).then((res: ActivityInfoItemProps) => {
      setActivity(res);
      userInfoSearch(res._openid).then(
        (userInfoRes: UserDetailInfoItemProps[]) => {
          setHostInfo(userInfoRes[0]);
        },
      );
    });
  }, []);

  const handleSignUpClick = () => {
    Taro.navigateTo({
      url: `/packageActivity/activity-application/index?id=${activityId}`,
    });
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
            <Image src={image} className='slide-image' />
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
            <Text className='location'>报名获得详细地址</Text>
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
            {activity?.price}欧, {activity?.point}积分
          </Text>
          <Text className='participants'>预估人数 {activity?.capacity}人</Text>
        </View>
        <View className='right-section'>
          {/* <View className='icon-container'>
            <StarOutlined className='icon' />
          </View> */}
          <Button className='contact-button' onClick={handleSignUpClick}>
            报名活动
          </Button>
        </View>
      </View>
    </View>
  );
};

export default DetailPage;
