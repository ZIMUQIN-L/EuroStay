import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import {
  AccomMssageHouseItemProps,
  UserItemProps,
  UserDetailInfoItemProps,
} from '@utils/interfaces';
import Like from '@assets/images/like.svg';
import Liked from '@assets/images/liked.svg';
import { DefaultHouse, DateIcon } from '@utils/cloudIcons';
import { checkImageUrl } from '@utils/validationUtil';
import { useState, useEffect } from 'react';
import GlobalStore from '@store/GlobalStore';
import { accomMessageAdd } from '@common/database/accomMessage/accomMessage';
import { LocationOutlined } from '@taroify/icons';
import './index.scss';
const HouseItem: React.FC<AccomMssageHouseItemProps> = house => {
  const [isCollection, setIsCollection] = useState(house.isCollection);
  const [imageSrc, setImageSrc] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  // if user want to share this message to board or not
  const [shareToggle, setShareToggle] = useState(false);
  // items for message card
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [capacity, setCapacity] = useState(0);
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [userDescription, setUserDescription] = useState<string>('');

  // user information
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);
  const [ownerUserInfo, setOwnerUserInfo] =
    useState<UserDetailInfoItemProps | null>(null);

  useEffect(() => {
    // const demoUser: UserItemProps = GlobalStore.userInfo;
    // setUser(demoUser);
    // userInfoSearch(house._openid).then(
    //   (ownerInfo: UserDetailInfoItemProps[]) => {
    //     setOwnerUserInfo(ownerInfo[0]);
    //   },
    // );
    // const imageUrl =
    //   house.images.length > 0 && checkImageUrl(house.images[0] as string)
    //     ? house.images[0]
    //     : DefaultHouse;
    // setImageSrc(imageUrl);
    // handleSetTargetUserOpenid(house._openid);
  }, []);

  const handleImageError = e => {
    setImageSrc(DefaultHouse);
  };

  const handleSendToggleEdit = editSendToggle => {
    setShareToggle(editSendToggle);
  };

  // request data
  const handleRequestDesEdit = (editRequestDes: string) => {
    setUserDescription(editRequestDes);
  };

  const handleRequestInfoSelectionEdit = (
    startDate,
    endDate,
    capacity: number,
    contactInfo,
    genderInfo,
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setCapacity(capacity);
    setContact(contactInfo);
    setGender(genderInfo);
  };

  const handleMessageNotification = () => {
    Taro.cloud.callFunction({
      name: 'messageNotification',
      data: {
        content: '求宿者向您发送了一条求宿信息',
        userName: ownerUserInfo?.nickName,
        message: userDescription,
        userid: house._openid,
      },
      complete: res => {
        console.log('callFunction test result: ', res);
      },
    });
  };

  // submit message card content
  const handleSubmitRequestCustomCard = async () => {
    if (!startDate || !endDate) {
      Taro.showToast({
        title: '请选择入住时间',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (capacity == 0) {
      Taro.showToast({
        title: '请选择入住人数~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (gender == '') {
      Taro.showToast({
        title: '请选择住客性别~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (userDescription == '') {
      Taro.showToast({
        title: '请填写个人描述~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else {
      accomMessageAdd(
        endDate,
        startDate,
        capacity,
        gender,
        house.location,
        user.userOpenid,
        user.nickName,
        user.avatarUrl,
        userDescription,
        'withTargetHouse',
        'unread',
        contact,
        '',
        house._id,
        house.images,
        ownerUserInfo?.nickName,
        house._openid,
        ownerUserInfo?.avatarUrl,
      ).then(msg => {
        setModalOpen(false);
        handleMessageNotification();
      });
      if (shareToggle) {
        accomMessageAdd(
          endDate,
          startDate,
          capacity,
          gender,
          house.location,
          user.userOpenid,
          user.nickName,
          user.avatarUrl,
          userDescription,
          'withoutTargetHouse',
          'unread',
          contact,
          '',
        );
      }
    }
  };

  // 跳转至房源详情
  const toHouseDetail = () => {
    Taro.navigateTo({
      url: `../../packageHouse/house-detail/index?pid=${house.pid}`,
    });
  };

  //新建消息卡片
  const onCreateCustomCardFromTenant = () => {
    if (GlobalStore.userInfo._id == '') {
      Taro.showModal({
        title: '转至登录页面',
        content: '请登录后联系房主~',
        success: function (res) {
          if (res.confirm) {
            Taro.reLaunch({
              url: `/pages/login/index`,
            });
          }
        },
      });
    } else {
      setModalOpen(true);
    }
  };

  const onClickLikeHouse = () => {
    // const res = await POST('/app/property/addPropertyCollection', {
    //   propertyId: house.pid,
    //   uid: house.uid,
    // });
    console.log('res', 11);
  };

  return (
    <View className='homepage-house-card' onClick={toHouseDetail}>
      <Image
        className='house-like'
        src={isCollection ? Liked : Like}
        onClick={e => {
          e.stopPropagation();
          if (!isCollection) {
            Taro.request({
              url: 'https://api.eurostay.co/app/property/addPropertyCollection',
              method: 'POST',
              data: {
                propertyId: house.pid,
                uid: house.uid,
              },
              header: {
                'Content-Type': 'application/json',
                token: GlobalStore.userInfo.token,
              },
            }).then(res => {
              if (res.statusCode == 200) {
                setIsCollection(true);
              }
            });
          } else {
            Taro.request({
              url: 'https://api.eurostay.co/app/property/cancelPropertyCollection',
              method: 'POST',
              data: {
                propertyId: house.pid,
                uid: house.uid,
              },
              header: {
                'Content-Type': 'application/json',
                token: GlobalStore.userInfo.token,
              },
            }).then(res => {
              if (res.statusCode == 200) {
                setIsCollection(false);
              }
            });
          }
        }}
      />
      <Image
        src={house.cover}
        className='house-image'
        mode='aspectFit'
        onError={handleImageError}
      >
        {house.isRecommended && (
          <View className='corner-label'>精品Host系列</View>
        )}

        <View className='host-detail'>
          <View className='host-tags'>
            {house.appUserAbstract.tags.map(item => {
              return <View className='host-tag'>{item}</View>;
            })}
          </View>
          <View className='host-des'>{house.appUserAbstract.aboutMe}</View>
          <Image src={house.appUserAbstract.avatar} className='host-avatar' />
        </View>
      </Image>
      <View className='house-content'>
        <Text className='house-price'>{house.coinsPerNight}旅行币/人</Text>
        <Text className='title'>{house.title}</Text>
        {/* <View className='organizer'>
          <UserCircleOutlined className='icon' />
          <Image
            src={sourceUser ? sourceUser?.avatarUrl : ''}
            className='icon'
            mode='aspectFit'
            onClick={handleClickHostAvatar}
          />
          <Text>由 {sourceUser?.nickName} 发起</Text>
        </View> */}
        {/* <View className='house-des'>{house.location}</View> */}
        {/* <View className='house-time'>活动时间</View> */}
        <View className='details'>
          <View className='detail-item'>
            <LocationOutlined className='icon' />
            <Text>{house.location}</Text>
          </View>
          {/* 暂时别删
          <View className='detail-item'>
            <Text>洗衣机</Text>
          </View>
          {activity.tags.map((tag, index) => (
            <View className='detail-item'>
              <Text key={index}># {tag}</Text>
            </View>
          ))} */}
        </View>
      </View>
    </View>
  );
};
export default HouseItem;
