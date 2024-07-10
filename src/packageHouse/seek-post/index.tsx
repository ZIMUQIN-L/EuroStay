import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useState, useEffect } from 'react';
import './index.scss';
import { loadFontFace, useRouter } from '@tarojs/taro';
import Taro from '@tarojs/taro';
import { UserAccomMessageItemProps, UserItemProps } from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import {
  accomMessageSearchWithId,
  accomMessageAdd,
  accomMessageDetailUpdate,
} from '@common/database/accomMessage/accomMessage';
import SeekInfoSelection from './seek-info-selection';
import SeekDescription from './seek-description';

const Index = () => {
  const router = useRouter();
  const seekInfoId = router?.params?.id;
  const [clickable, setClickable] = useState(false);
  const [userInfo, setUserInfo] = useState<UserItemProps>(GlobalStore.userInfo);

  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState<string | Date>();
  const [endDate, setEndDate] = useState<string | Date>();
  const [capacity, setCapacity] = useState(0);
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const userInfoList: UserItemProps = GlobalStore.userInfo;
    setUserInfo(userInfoList);
    if (seekInfoId != 'none') {
      accomMessageSearchWithId(seekInfoId).then(
        (accomInfo: UserAccomMessageItemProps) => {
          setLocation(accomInfo.location);
          setStartDate(accomInfo.start_date);
          setEndDate(accomInfo.end_date);
          setDescription(accomInfo.description);
          setCapacity(accomInfo.capacity);
          setGender(accomInfo.gender);
          setContact(accomInfo.contact);
        },
      );
    }
  }, []);

  Taro.useShareAppMessage(res => {
    return {
      title: 'EuroStay欧洲换宿',
      path: '/pages/login/index',
    };
  });

  const handleButtonClickable = () => {
    if (
      gender != '' &&
      location != '' &&
      startDate &&
      endDate &&
      capacity != 0 &&
      description != ''
    ) {
      setClickable(true);
    } else {
      setClickable(false);
    }
  };

  useEffect(() => {
    handleButtonClickable();
  }, [description, location, startDate, endDate, capacity, gender, contact]);

  const handleRequestInfoSelectionEdit = (
    location,
    startDate,
    endDate,
    capacity: number,
    info,
    genderInfo,
  ) => {
    setLocation(location);
    setStartDate(startDate);
    setEndDate(endDate);
    setCapacity(capacity);
    setContact(info);
    setGender(genderInfo);
    handleButtonClickable();
  };

  const handleSeekDesEdit = editRequestDes => {
    setDescription(editRequestDes);
    handleButtonClickable();
  };

  const handleClickSeekSubmit = () => {
    if (location == '') {
      Taro.showToast({
        title: '请填写求宿地点~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (!startDate || !endDate) {
      Taro.showToast({
        title: '请选择求宿时间',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else if (capacity == 0) {
      Taro.showToast({
        title: '请填写求宿人数~',
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
    } else if (description == '') {
      Taro.showToast({
        title: '请填写房源描述~',
        icon: 'error',
        mask: true,
        duration: 2000,
      });
    } else {
      Taro.showLoading({
        title: '上传中',
        mask: true,
      });
      if (seekInfoId == 'none') {
        accomMessageAdd(
          endDate,
          startDate,
          capacity,
          gender,
          location,
          userInfo._openid,
          userInfo.nickName,
          userInfo.avatarUrl,
          description,
          'withoutTargetHouse',
          'unread',
          contact,
        ).then(res => {
          Taro.hideLoading();
          Taro.navigateBack({
            delta: 1,
          });
        });
      } else {
        accomMessageDetailUpdate(
          seekInfoId,
          endDate,
          startDate,
          capacity,
          gender,
          location,
          description,
          contact,
        ).then(res => {
          Taro.hideLoading();
          Taro.navigateBack({
            delta: 1,
          });
        });
      }
    }
  };

  return (
    <View className='seek-post-index'>
      <SeekInfoSelection
        seekInfoId={seekInfoId}
        onSeekInfoSelection={handleRequestInfoSelectionEdit}
      />
      <SeekDescription
        seekPrevDes={description}
        onChangeDes={handleSeekDesEdit}
      ></SeekDescription>
      <View style={{ backgroundColor: 'white' }}>
        <View
          className='post-submit-button'
          style={{ backgroundColor: clickable ? '#FFD111' : '#d6d6d6' }}
          onClick={handleClickSeekSubmit}
        >
          <Text>发布求宿</Text>
        </View>
      </View>
    </View>
  );
};

export default observer(Index);
