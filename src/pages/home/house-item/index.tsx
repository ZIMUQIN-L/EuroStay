import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import {
  AccomMssageHouseItemProps,
  UserItemProps,
  UserDetailInfoItemProps,
} from '@utils/interfaces';
import { DefaultHouse, DateIcon } from '@utils/cloudIcons';
import { checkImageUrl } from '@utils/validationUtil';
import { useState, useEffect } from 'react';
import RequestCustomCard from '../../../packageUser/request-custom-card';
import GlobalStore from '@store/GlobalStore';
import { accomMessageAdd } from '@common/database/accomMessage/accomMessage';
import { userInfoSearch } from '@common/database/user/user';
import { LocationOutlined } from '@taroify/icons';
import './index.scss';

const HouseItem: React.FC<AccomMssageHouseItemProps> = house => {
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
    const demoUser: UserItemProps = GlobalStore.userInfo;
    setUser(demoUser);
    userInfoSearch(house._openid).then(
      (ownerInfo: UserDetailInfoItemProps[]) => {
        setOwnerUserInfo(ownerInfo[0]);
      },
    );
    const imageUrl =
      house.images.length > 0 && checkImageUrl(house.images[0] as string)
        ? house.images[0]
        : DefaultHouse;
    setImageSrc(imageUrl);
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
      url: `../../packageHouse/house-detail/index?id=${house._id}`,
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

  return (
    <View className='homepage-house-card'>
      <View className='corner-label'>精品Host系列</View>
      <View className='house-like'>收藏</View>
      <Image src='' className='host-avatar' />
      <Image
        src={imageSrc}
        className='house-image'
        mode='aspectFit'
        onError={handleImageError}
      />
      <View className='house-content'>
        <Text className='house-price'>旅行币/人</Text>
        <Text className='title'>国家城市·房源名称</Text>
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
        <View className='house-des'>公寓30m2·1室1床1卫·1人·限女生</View>
        <View className='house-time'>活动时间</View>
        <View className='details'>
          <View className='detail-item'>
            <LocationOutlined className='icon' />
            <Text>近鹿特丹</Text>
          </View>
          <View className='detail-item'>
            <Text>洗衣机</Text>
          </View>

          {/* {activity.tags.map((tag, index) => (
            <View className='detail-item'>
              <Text key={index}># {tag}</Text>
            </View>
          ))} */}
        </View>
      </View>
      {/* <Image
        src={imageSrc}
        className='house-image'
        onClick={toHouseDetail}
        onError={handleImageError}
      />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <View className='house-details'>
          <View className='house-location'>
            <Text>{house.location}</Text>
          </View>
          <View className='house-type'>
            <Text>
              {house.houseType !== 'unKnown' &&
              house.houseType !== '' &&
              house.houseType != undefined
                ? ` - ${house.houseType}`
                : ''}
            </Text>
          </View>
          <View className='house-date' style={{ alignItems: 'center' }}>
            <Image
              src={DateIcon}
              style={{ width: '17px', height: '17px', marginRight: '6px' }}
            />
            <Text style={{ color: '#979797', fontSize: '12px' }}>
              {house.start_date + ' to ' + house.end_date}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#FFD111',
            color: 'white',
            width: '30%',
            justifyContent: 'center',
            height: '32px',
            borderRadius: '32px',
            display: 'flex',
            alignItems: 'center',
          }}
          className='contact-button'
          onClick={onCreateCustomCardFromTenant}
        >
          <Text style={{ fontSize: '14px' }}>联系房主</Text>
        </View>
      </View>
      <View
        style={{
          borderBottom: '1px solid #ddd',
          width: '100%',
          marginTop: '10px',
          marginBottom: '20px',
        }}
      ></View>
      {isModalOpen && (
        <RequestCustomCard
          onClose={() => setModalOpen(false)}
          onRequestDesEdit={handleRequestDesEdit}
          onSendToggleEdit={handleSendToggleEdit}
          onRequestInfoSelectionEdit={handleRequestInfoSelectionEdit}
          onSubmitCard={handleSubmitRequestCustomCard}
        ></RequestCustomCard>
      )} */}
    </View>
  );
};
export default HouseItem;
