import { View, Text, Image, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';
import ActivityAppCom from './activity-application-comment';
import { useEffect, useState } from 'react';
import { useRouter } from '@tarojs/taro';
import { userInfoSearch } from '@common/database/user/user';
import { activityDetailSearch } from '@common/database/activityInfo/activityInfo';
import {
  ActivityInfoItemProps,
  UserDetailInfoItemProps,
} from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import ActivityDetailSection from './activity-detail-section';
import { StarOutlined } from '@taroify/icons';
import { LocationSelectionIcon, RightBottomArrow } from '@utils/cloudIcons';
import CopyHostInfoModal from './copy-host-info-modal';
import { activityApplicationAdd } from '@common/database/activityInfo/activityInfo';

const ActicityApplicationPage = () => {
  const router = useRouter();
  const activityId = router?.params?.id;

  const [activity, setActivity] = useState<ActivityInfoItemProps>();
  const [currentUser, setCurrentUser] = useState<UserDetailInfoItemProps>();
  const [activityHost, setActivityHost] = useState<UserDetailInfoItemProps>();

  const [isShowSuccessModal, setShowSuccessModal] = useState(false);

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
          setActivityHost(userInfoRes[0]);
        },
      );
    });
  }, []);

  const handleCloseAllWindows = () => {
    setShowSuccessModal(false);
    activityApplicationAdd(
      activityId,
      activityHost?._openid,
      actDes,
      actContact,
      currentUser?.avatarUrl,
      currentUser?.nickName,
    ).then(res => {
      Taro.navigateBack({
        delta: 1,
      });
    });
  };

  const showSuccessModalEdit = () => {
    setShowSuccessModal(true);
  };

  const [actDes, setActDes] = useState('');
  const handleActivityAppComEdit = (description: string) => {
    setActDes(description);
  };

  const [actContact, setActContact] = useState('');
  const handleActivityAppContactEdit = (contact: string) => {
    setActContact(contact);
  };

  const handleGetHostInfoClick = () => {
    if (actDes == '') {
        Taro.showToast({
            title: '请介绍一下自己',
            icon: 'error',
            mask: true,
            duration: 2000,
          });
    }
    else if (actContact == '') {
        Taro.showToast({
            title: '请填写联系方式',
            icon: 'error',
            mask: true,
            duration: 2000,
          });
    }
    else {
        showSuccessModalEdit();
    }
  };

  return (
    <View className='activity-application-page'>
      <ActivityDetailSection
        title={activity?.title}
        imageUrls={activity?.images}
        dateInfo={activity?.startTime}
        timeInfo={activity?.endTime}
        organizer={activityHost?.nickName}
        location={activity?.location}
      />

      <View className='selection-part'>
        <View className='selection-container'>
          <View className='selection-content'>
            <View className='selection-left'>
              <View className='icon-container'>
                <Image src={LocationSelectionIcon} />
              </View>
              <Text>活动地址</Text>
            </View>
            <View className='selection-right'>
              <Text>{activity?.location}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className='contact-container'>
        <View className='price-info'>
          <Text className='price'>
            {activity?.price} 欧，{activity?.point} 积分
          </Text>
          <Text className='participants'>预估人数 {activity?.capacity}人</Text>
        </View>
        <View className='right-section'>
          <View className='icon-container'>
            <StarOutlined className='icon' />
          </View>
          <Button className='contact-button' onClick={handleGetHostInfoClick}>
            发送
          </Button>
        </View>
      </View>

      <ActivityAppCom
        onUserDescriptionEdit={handleActivityAppComEdit}
        onUserContactEdit={handleActivityAppContactEdit}
      />

      {isShowSuccessModal && (
        <CopyHostInfoModal
          onClose={handleCloseAllWindows}
          title={activity?.title}
          date={activity?.startTime}
          time={activity?.endTime}
          location={activity?.location}
          username={activityHost?.nickName}
          avatar={activityHost?.avatarUrl}
          wechatId={activity?.contact}
        ></CopyHostInfoModal>
      )}
    </View>
  );
};

export default ActicityApplicationPage;
