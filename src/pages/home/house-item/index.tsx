import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AccomMssageHouseItemProps, UserItemProps } from '@utils/interfaces';
import { DefaultHouse, DateIcon } from '@utils/cloudIcons';
import { checkImageUrl } from '@utils/validationUtil';
import { useState, useEffect } from 'react';
import RequestCustomCard from '../../../packageUser/request-custom-card';
import CustomModal from '@components/CustomModal';
import GlobalStore from '@store/GlobalStore';
import { accomMessageAdd } from '@common/database/accomMessage/accomMessage';

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
  const [userDescription, setUserDescription] = useState<string>('');

  // user information
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);

  useEffect(() => {
    // const demoUser: UserItemProps = GlobalStore.userInfo;
    // setUser(demoUser);
    const imageUrl =
      house.images.length > 0 && checkImageUrl(house.images[0] as string)
        ? house.images[0]
        : DefaultHouse;
    setImageSrc(imageUrl);
    // handleSetTargetUserOpenid(house._openid);
  });

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
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setCapacity(capacity);
    setContact(contactInfo);
  };

  // submit message card content
  const handleSubmitRequestCustomCard = async () => {
    console.log(
      startDate,
      endDate,
      capacity,
      contact,
      shareToggle,
      userDescription,
    );
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
        '',
        house.location,
        user.userOpenid,
        userDescription,
        shareToggle ? 'both' : 'withTargetHouse',
        'unread',
        contact,
        '',
        house._id,
        house.images,
        house._openid,
        house._openid,
      ).then(msg => {
        setModalOpen(false);
      });
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
    setModalOpen(true);
  };

  return (
    <View className='house-item'>
      <Image
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

      <CustomModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <RequestCustomCard
          onClose={() => setModalOpen(false)}
          onRequestDesEdit={handleRequestDesEdit}
          onSendToggleEdit={handleSendToggleEdit}
          onRequestInfoSelectionEdit={handleRequestInfoSelectionEdit}
          onSubmitCard={handleSubmitRequestCustomCard}
        ></RequestCustomCard>
      </CustomModal>
    </View>
  );
};
export default HouseItem;
