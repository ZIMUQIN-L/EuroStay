import { View, Text, Image, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';
import ActivityAppCom from './activity-application-comment';
import { useEffect, useState } from 'react';
import { useRouter } from '@tarojs/taro';
import { accomMessageUpdate } from '@common/database/accomMessage/accomMessage';
import {
  HouseDetailItemProps,
  UserAccomMessageItemProps,
  UserItemProps,
  UserDetailInfoItemProps,
} from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import ActivityDetailSection from './activity-detail-section';
import { StarOutlined } from '@taroify/icons';
import LocationSelection from './location-selection';
const cloudPath =
  'cloud://cloud1-8gb29x2pbe14a4f8.636c-cloud1-8gb29x2pbe14a4f8-1324366677/images';
export const LocationSelectionIcon = `${cloudPath}/location-selection-icon.svg`;
export const RightBottomArrow = `${cloudPath}/right-arrow.svg`;
import CopyHostInfoModal from './copy-host-info-modal';

const ActicityApplicationPage = () => {


    const demohost = {
      avatar: 'https://via.placeholder.com/50x50',
      wechatId: 'wechatId_demo',

    }
    const activity = {
        title: '活动标题线下艺术疗愈workshop',
        location: 'Paris, 2nd ARR',
        price: '€25/人',
        date: '2024年6月31日',
        time: '14:00-15:30',
        duration: '1h30min',
        organizer: 'Username',
        description: '由主持人填写 简要说明线下活动内容或者亮点',
        participants: 15,
        images: [
          'https://via.placeholder.com/300x150',
          'https://via.placeholder.com/300x150',
          'https://via.placeholder.com/300x150',
        ],
      };
  const router = useRouter();
  const [isLocationSelection, setIsLocationSelection] = useState(false);
  const [location, setLocation] = useState('');
  const accomInfoId = router?.params?.id;
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);
  const [isShowSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const demoUser: UserItemProps = GlobalStore.userInfo;
    setUser(demoUser);
  }, []);

  const handleCloseAllWindows = () => {
    setShowSuccessModal(false);
  };

  const showSuccessModalEdit = () => {
    setShowSuccessModal(true);
  };

  const handleLocationSelection = () => {
    setIsLocationSelection(true);
  };

  const handleClose = () => {
    setIsLocationSelection(false);
  }

  const handleLocationUserEdit = editedLocation => {
    console.log("new location", editedLocation);
    setLocation(editedLocation);
  };

  const handleActivityAppComEdit = (description: string) => {
    console.log('description', description);
  };

  const handleGetHostInfoClick = () => {
    showSuccessModalEdit();
    // Taro.navigateTo({
    //   url: `/packageActivity/activity-application/index?id=anyid`,
    // });
  }


  return (
    <View className='activity-application-page'>
      <ActivityDetailSection
        title={activity.title}
        imageUrls={activity.images}
        dateInfo={activity.date}
        timeInfo={activity.time}
        organizer={activity.organizer}
        location={activity.location}
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
              <View
                className='selection-right'
                onClick={handleLocationSelection}
              >
                <Text>{location != '' ? `${location}` : `请选择`}</Text>
                <Image src={RightBottomArrow} />
              </View>
              {isLocationSelection && (
                <LocationSelection
                  onClose={handleClose}
                  onLocationSelected={handleLocationUserEdit}
                  prevLocation={location}
                />
              )}
            </View>
          </View>
        </View>

      <View className='contact-container'>
        <View className='price-info'>
          <Text className='price'>{activity.price}</Text>
          <Text className='participants'>
            预估人数 {activity.participants}人
          </Text>
        </View>
        <View className='right-section'>
          <View className='icon-container'>
            <StarOutlined className='icon' />
          </View>
          <Button className='contact-button' onClick={handleGetHostInfoClick}>发送</Button>
        </View>
      </View>

      <ActivityAppCom
        onUserDescriptionEdit={handleActivityAppComEdit}
      />

      {isShowSuccessModal && (
        <CopyHostInfoModal
          onClose={handleCloseAllWindows}
          title={activity.title}
          date={activity.date}
          time={activity.time}
          location={activity.location}
          username={activity.organizer}
          avatar={demohost.avatar}
          wechatId={demohost.wechatId}
        ></CopyHostInfoModal>
      )}

    </View>
  );
};

export default ActicityApplicationPage;
