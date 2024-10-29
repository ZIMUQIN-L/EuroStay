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
import UserProfileCard from '@components/UserProfileCard';
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
  MockUserDetailInfoItemProps,
  UserItemProps,
  HouseDetailItemProps,
  ActivityApplicationItemProps,
} from '@utils/interfaces';
import { userInfoSearch } from '@common/database/user/user';
import { houseDetailSearch } from '@common/database/house/house';
import {
  WIFISelected,
  WashMachineSelected,
  SofaSelected,
  RefrigeratorSeleted,
  KitchenSeleted,
  BathSelectd,
  HeaterSelected,
  AirConditionSelected,
  WIFIUnselected,
  WashMachineUnselected,
  SofaUnselected,
  RefrigeratorUnselected,
  KitchenUnselected,
  BathUnselected,
  HeaterUnselected,
  AirConditionUnselected,
} from '@utils/cloudIcons';
import TextBlock from '@components/TextBlock';
import HouseContact from 'src/packageHouse/house-detail/house-contact';
import ActivityContact from './activity-contact';
const fullContainerStyle = {
  width: '100%',
  height: '100%',
};
const DetailPage = () => {
  const router = useRouter();
  const activityId = router?.params?.id;
  const [activity, setActivity] = useState<ActivityInfoItemProps>();
  const [hostInfo, setHostInfo] = useState<UserDetailInfoItemProps>(); //主办方信息
  const [applicable, setApplicable] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserDetailInfoItemProps>();
  const [premiumHost, setPremiumHost] = useState<
    UserDetailInfoItemProps | undefined | null
  >(undefined);
  const [houseInfoDetail, setHouseInfoDetail] = useState<{
    [key: string]: string;
  } | null>(null);
  const [houseIconDetail, setHouseIconDetail] = useState<{
    [key: string]: boolean;
  } | null>(null);

  const RoomFacilities = [
    {
      value: 'WIFI',
      text: 'WiFi',
      imgSeleted: WIFISelected,
      imgUnselectd: WIFIUnselected,
    },
    {
      value: 'Bath',
      text: '独立卫浴',
      imgSeleted: BathSelectd,
      imgUnselectd: BathUnselected,
    },
    {
      value: 'WashMachine',
      text: '洗衣机',
      imgSeleted: WashMachineSelected,
      imgUnselectd: WashMachineUnselected,
    },
    {
      value: 'Kitchen',
      text: '厨房',
      imgSeleted: KitchenSeleted,
      imgUnselectd: KitchenUnselected,
    },
    {
      value: 'Refrigerator',
      text: '冰箱',
      imgSeleted: RefrigeratorSeleted,
      imgUnselectd: RefrigeratorUnselected,
    },
    {
      value: 'AirCondition',
      text: '空调',
      imgSeleted: AirConditionSelected,
      imgUnselectd: AirConditionUnselected,
    },
    {
      value: 'Sofa',
      text: '沙发',
      imgSeleted: SofaSelected,
      imgUnselectd: SofaUnselected,
    },
    {
      value: 'Heater',
      text: '暖气',
      imgSeleted: HeaterSelected,
      imgUnselectd: HeaterUnselected,
    },
  ];

  useEffect(() => {
    const curUser = GlobalStore.userInfo;
    userInfoSearch(curUser._openid).then(
      (ownerInfo: UserDetailInfoItemProps[]) => {
        setCurrentUser(ownerInfo[0]);
      },
    );
    activityDetailSearch(activityId).then((res: ActivityInfoItemProps) => {
      setActivity(res);
      console.log('activity::::', res);
      userInfoSearch(res._openid).then(
        (userInfoRes: UserDetailInfoItemProps[]) => {
          setHostInfo(userInfoRes[0]);
        },
      );

      if (res.houseInfoDetail) {
        setHouseInfoDetail(res.houseInfoDetail);
      }

      if (res.houseIconDetail) {
        setHouseIconDetail(res.houseIconDetail);
      }

      activityContainUser(activityId, GlobalStore.userInfo._openid).then(
        (items: ActivityApplicationItemProps[]) => {
          if (items.length == 0) {
            setApplicable(true);
          }
        },
      );

      // 判断是否有 premiumHost 并获取其信息
      if (res.hostInfo) {
        setPremiumHost(res.hostInfo as MockUserDetailInfoItemProps); // 确保类型匹配o
      } else if (res.premiumHost) {
        userInfoSearch(res.premiumHost).then(
          (ownerInfo: UserDetailInfoItemProps[]) => {
            if (ownerInfo && ownerInfo.length > 0) {
              setPremiumHost(ownerInfo[0]);
            } else {
              setPremiumHost(null); // 如果没有返回有效的数据，设置为空
            }
          },
        );
      } else {
        setPremiumHost(null); // 如果没有 hostInfo 和 premiumHost，设置为空
      }
    });
  }, []);

  const handleClickHostAvatar = () => {
    Taro.navigateTo({
      url: `/packageUser/user-detail/index?id=${hostInfo?._openid}`,
    });
  };

  Taro.useShareAppMessage(res => {
    return {
      title: 'EuroStay欧洲换宿',
      path: '/pages/login/index',
    };
  });

  const handleSignUpClick = () => {
    if (GlobalStore.userInfo._id == '') {
      Taro.showModal({
        title: '转至登录页面',
        content: '请登录后报名活动~',
        success: function (res) {
          if (res.confirm) {
            Taro.reLaunch({
              url: `/pages/login/index`,
            });
          }
        },
      });
    } else if (
      currentUser &&
      activity &&
      currentUser?.point <= activity?.point
    ) {
      Taro.showModal({
        title: '积分不足',
        content: '当前积分不足，前往积分页面查看积分获取规则~',
        success: function (res) {
          if (res.confirm) {
            Taro.navigateTo({
              url: `/packageUser/my-points/index`,
            });
          }
        },
      });
    } else if (applicable && activity?.official == false) {
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
    <View className='activity-page-detail'>
      <View className='activity-page-swiper'>
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
          style={{ width: '100%', height: '250px' }}
        >
          {activity?.images.map((image, index) => (
            <SwiperItem key={index} style={fullContainerStyle}>
              <View className='swiper-item' style={fullContainerStyle}>
                <Image
                  src={image}
                  mode='aspectFit'
                  style={fullContainerStyle}
                />
              </View>
            </SwiperItem>
          ))}
        </Swiper>
      </View>
      <View className='activity-summary-wrap'>
        <View className='activity-summary-left'>
          <View className='activity-summary-title'>活动名称</View>
          <View className='activity-summary-location'>国家城市·具体地址</View>
          <View className='activity-summary-des'>1室1床1卫·1人·限女生</View>
        </View>
      </View>
      <TextBlock
        title='房源描述'
        body='详情介绍：两室一卫一厅、与人合租，地理位置好极了！该房源位于米兰理工Bovisa校区附近，交通便利，离中央火车站20min公交！周围有中超和Lidl～'
      />
      <TextBlock title='房源亮点与设施' />
      <TextBlock title='房源位置' />
      <TextBlock title='住客评价' />
      <ActivityContact />
      {/* <HouseTexts {...houseDetail} /> */}
      {/* <RoomDetailInfo
        roomUtility={houseDetail.houseSetting}
        roomSurrounding={houseDetail.houseSurrounding}
        roomPreference={houseDetail.preference}
      />
      <HouseReviewCard {...houseDetail} />
      <HouseOwner {...houseDetail} /> */}
      {/* <HouseContact /> */}
    </View>
    // <View className='detail-page'>

    //   <View className='activity-info'>
    //     <Text className='title'>{activity?.title}</Text>
    //     <View className='details'>
    //       <View className='location-container'>
    //         <LocationOutlined className='icon' />
    //         <Text className='location'>{activity?.location}</Text>
    //       </View>
    //       <View className='location-container'>
    //         <Text className='location'>
    //           {applicable && activity?.official == false
    //             ? '报名获得详细地址'
    //             : activity?.location}
    //         </Text>
    //       </View>
    //     </View>
    //     <View className='details'>
    //       <View className='date-container'>
    //         <NotesOutlined className='icon' />
    //         <Text>
    //           {activity?.startTime},{activity?.endTime}
    //         </Text>
    //       </View>
    //       {/* <View className='date-container'>
    //         <Text>{activity.duration}</Text>
    //       </View> */}
    //     </View>
    //     <View className='organizer'>
    //       <Image
    //         src={hostInfo ? hostInfo?.avatarUrl : ''}
    //         className='organizer-image'
    //         mode='aspectFit'
    //         onClick={handleClickHostAvatar}
    //       />
    //       <View className='organizer-info'>
    //         <Text className='organizer-name'>发起人 {hostInfo?.nickName}</Text>
    //         <Text className='organizer-description'>{hostInfo?.userDes}</Text>
    //       </View>
    //     </View>
    //     <View className='description'>
    //       <Image src={PreferenceIcon} className='description-image' />
    //       <View className='description-info'>
    //         <Text className='description-title'>活动亮点介绍</Text>
    //         <Text className='description-content'>{activity?.description}</Text>
    //       </View>
    //     </View>
    //     {activity?.detail && (
    //       <View>
    //         {Object.entries(activity.detail).map(([key, value], index) => (
    //           <View className='description'>
    //           <View key={index} className='description-info'>
    //             <Text className='description-title'>{key}：</Text>
    //             <Text className='description-content'>{value}</Text>
    //           </View>
    //           </View>
    //         ))}
    //       </View>
    //     )}
    //     <UserProfileCard
    //       user = {premiumHost}
    //     />
    //     {houseInfoDetail && (
    //       <View>
    //         {Object.entries(houseInfoDetail).map(([key, value], index) => (
    //           <View className='description'>
    //           <View key={index} className='description-info'>
    //             <Text className='description-title'>{key}：</Text>
    //             <Text className='description-content'>{value}</Text>
    //           </View>
    //           </View>
    //         ))}
    //       </View>
    //     )}

    //     {houseIconDetail && (
    //       <View>
    //         <View className='description'>
    //           <View className='description-info'>
    //             <Text className='description-title'>房间亮点与设施</Text>
    //           </View>
    //         </View>
    //         <View className="facility-groups">
    //           {RoomFacilities.filter(item => houseIconDetail[item.value]).map((item) => (
    //             <View
    //               key={item.value}
    //               className='facility'
    //             >
    //               <Image
    //                 src={item.imgSeleted} // Always show the selected image since it’s true
    //                 className='image'
    //               />
    //               <View className='text'>{item.text}</View>
    //             </View>
    //           ))}
    //         </View>
    //       </View>
    //     )}

    //   </View>

    //   <View className='contact-container'>
    //     <View className='price-info'>
    //       <Text className='price'>
    //         {activity?.price} 欧， {activity?.point} 积分
    //       </Text>
    //       <Text className='participants'>预估人数 {activity?.capacity}人</Text>
    //     </View>
    //     <View className='right-section'>
    //       {/* <View className='icon-container'>
    //         <StarOutlined className='icon' />
    //       </View> */}
    //       <View
    //         className='contact-button'
    //         onClick={handleSignUpClick}
    //         style={{ backgroundColor: applicable ? '#FFD111' : '#d6d6d6' }}
    //       >
    //         {applicable ? '报名活动' : '已报名'}
    //       </View>
    //     </View>
    //   </View>
    // </View>
  );
};

export default DetailPage;
