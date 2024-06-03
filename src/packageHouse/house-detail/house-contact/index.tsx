import { View, Text } from '@tarojs/components';
import { HouseDetailItemProps } from '@utils/interfaces';
import Taro from '@tarojs/taro';
import './index.scss';
import { UserItemProps } from '@utils/interfaces';
import { useState, useEffect } from 'react';
import { accomMessageAdd } from '@common/database/accomMessage/accomMessage';
import GlobalStore from '@store/GlobalStore';
import RequestCustomCard from '../../../packageUser/request-custom-card';

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

  // user information
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);

  useEffect(() => {
    const demoUser: UserItemProps = GlobalStore.userInfo;
    setUser(demoUser);
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

  const onCreateCustomCardFromTenant = () => {
    setModalOpen(true);
  };
  return (
    <View>
      <View className='lists'>
        <View className='container'>
          <View className='text-container'>
            <Text className='title'>房客评价</Text>
          </View>
        </View>
        <View className='contact-container'>
          <View
            className='contact-button'
            onClick={onCreateCustomCardFromTenant}
          >
            <Text className='contact-text'>联系房东</Text>
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
