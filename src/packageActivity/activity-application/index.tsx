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
import {
    pointDetailInfoAdd,
    pointDecrease
  } from '@common/database/pointSystem/pointSystem';
import GlobalStore from '@store/GlobalStore';
import ActivityDetailSection from './activity-detail-section';
import { StarOutlined } from '@taroify/icons';
import { LocationSelectionIcon, RightBottomArrow } from '@utils/cloudIcons';
import CopyHostInfoModal from './copy-host-info-modal';
import { activityApplicationAdd } from '@common/database/activityInfo/activityInfo';
import { formatTimestamp } from '@utils/dateUtil';

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
    Taro.navigateBack({
        delta: 2,
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
    if (currentUser && activity && currentUser?.point <= activity?.point) {
        Taro.showModal({
            title: '积分不足',
            content: '当前积分不足，前往积分页面查看积分获取规则~',
            success: function (res) {
              if (res.confirm) {
                Taro.navigateTo({
                    url: `/packageUser/my-points/index`,
                  });
              } 
            }
          })
      }
    else if (actContact == '') {
        Taro.showToast({
          title: '请填写联系方式',
          icon: 'error',
          mask: true,
          duration: 2000,
        });
      }
     else  if (actDes == '') {
        Taro.showToast({
          title: '请介绍一下自己',
          icon: 'error',
          mask: true,
          duration: 2000,
        });
      } else {
        Taro.showLoading({
            title: '申请中',
            mask: true,
          });
        activityApplicationAdd(
            activityId,
            activityHost?._openid,
            actDes,
            actContact,
            currentUser?.avatarUrl,
            currentUser?.nickName,
          ).then(res => {
            pointDecrease(currentUser?._id, activity?.point);
            const timestamp = formatTimestamp(new Date().valueOf());
            pointDetailInfoAdd(
              currentUser?._openid,
              timestamp,
              4,
              '参加活动消耗',
              -(activity? activity?.point:0),
              (currentUser ? currentUser?.point : 0) - (activity? activity?.point:0),
            ).then(res1 => {
                Taro.hideLoading();
                showSuccessModalEdit();
            });
          });
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
        hostOpenid={activity?._openid}
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
          {/* <View className='icon-container'>
            <StarOutlined className='icon' />
          </View> */}
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
          activity={activity}
          hostInfo={activityHost}
        ></CopyHostInfoModal>
      )}
    </View>
  );
};

export default ActicityApplicationPage;
