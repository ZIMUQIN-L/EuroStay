import { View, Text, Image } from '@tarojs/components';
import {
  HouseDetailItemProps,
  UserDetailInfoItemProps,
} from '@utils/interfaces';
import Taro from '@tarojs/taro';
import './index.scss';
import { UserItemProps } from '@utils/interfaces';
import { useState, useEffect } from 'react';
import { accomMessageAdd } from '@common/database/accomMessage/accomMessage';
import GlobalStore from '@store/GlobalStore';
import RequestCustomCard from '../../../packageUser/request-custom-card';
import { userInfoSearch } from '@common/database/user/user';

const HouseContact: React.FC<HouseDetailItemProps> = house => {
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
  const [ownerUserInfo, setOwnerUserInfo] =
    useState<UserDetailInfoItemProps | null>(null);

  // user information
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);

  useEffect(() => {
    const demoUser: UserItemProps = GlobalStore.userInfo;
    setUser(demoUser);
    userInfoSearch(house._openid).then(
      (ownerInfo: UserDetailInfoItemProps[]) => {
        setOwnerUserInfo(ownerInfo[0]);
      },
    );
  }, []);

  const handleSendToggleEdit = editSendToggle => {
    setShareToggle(editSendToggle);
  };
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
        title: '请填写住客性别~',
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

  const formatDate = dateString => {
    const date = new Date(dateString);
    const month = `0${date.getMonth() + 1}`.slice(-2); // Add leading zero and slice last two digits
    const day = `0${date.getDate()}`.slice(-2); // Add leading zero and slice last two digits
    return `${month}月${day}日`;
  };

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
    //   setModalOpen(true);
    Taro.navigateBack({
        delta: 1,
      });
    }
  };
  return (
    <View>
      <View className='lists'>
        <View className='contact-container'>
          <View className='date-container'>
            <Text className='date-text'>{formatDate(house.start_date)}</Text>
            <Text className='date-separator'>至</Text>
            <Text className='date-text'>{formatDate(house.end_date)}</Text>
          </View>
          <View className='right-section'>
            {/* <View className="icon-container">
            <Image src={Star} className="star-icon" />
          </View> */}
            <View
              className='contact-button'
              onClick={onCreateCustomCardFromTenant}
            >
              回到主页联系房主
            </View>
          </View>
        </View>
      </View>
      {isModalOpen && (
        <RequestCustomCard
          onClose={() => setModalOpen(false)}
          onRequestDesEdit={handleRequestDesEdit}
          onSendToggleEdit={handleSendToggleEdit}
          onRequestInfoSelectionEdit={handleRequestInfoSelectionEdit}
          onSubmitCard={handleSubmitRequestCustomCard}
        ></RequestCustomCard>
      )}
    </View>
  );
};

export default HouseContact;
