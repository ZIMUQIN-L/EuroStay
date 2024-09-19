import { View, Image, Text, Switch } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import {
  DefaultHouse,
  TrashBinIcon,
  TurnOnIcon,
  TurnOffIcon,
  PurpleDownArrow,
  PurpleUpArrow,
  GreyDateIcon,
  GreyTimeIcon,
  GreyPeopleIcon,
} from '@utils/cloudIcons';
import { LocationOutlined } from '@taroify/icons';
import './index.scss';
import {
  activityUsersSearch,
  activityAppApproveUpdate,
  activityActiveUpdate,
  activityDetailSearch,
  getEurostayActApplication
} from '@common/database/activityInfo/activityInfo';
import {
  ActivityInfoItemProps,
  UserItemProps,
  ActivityApplicationItemProps,
  ActivityApplicationItemDetailProps,
  ActivityParticipantCombinedItemProps,
} from '@utils/interfaces';

interface ActivityCardProps {
  activity: ActivityInfoItemProps;
  type: number;
  status: number;
}

// type 1: initiated, 2: registered; status 1: processing, 2: finished, 3: draft
const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  type,
  status,
}) => {
  const [isRegisteredUserVisible, setIsRegisteredUserVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [appUsers, setAppUsers] = useState<ActivityApplicationItemProps[]>([]);

  const handleCheckUser = () => {
    console.log('check user');
    setIsRegisteredUserVisible(true);
  };

  useEffect(() => {
    setIsActive(activity.active);
    if (type == 1) {
      activityUsersSearch(activity._id).then(
        (appInfo: ActivityApplicationItemProps[]) => {
          setAppUsers(appInfo);
        },
      );
    }
  }, []);

  const handleCheckUserClose = () => {
    console.log('close user');
    setIsRegisteredUserVisible(false);
  };

  const handleClickHostAvatar = hostOpenid => {
    Taro.navigateTo({
      url: `/packageUser/user-detail/index?id=${hostOpenid}`,
    });
  };

  const handleClickActImage = () => {
    Taro.navigateTo({
      url: `/packageActivity/activity-detail/index?id=${activity._id}`,
    });
  };


  const handleClickSubmissionDetail = eurostayApplyId => {
    Taro.navigateTo({
      url: `/packageActivity/activity-submission-detail/index?id=${eurostayApplyId}`,
    });
  }

  const handleClickClipboard = contactInfo => {
    Taro.setClipboardData({
      data: contactInfo,
      success: function (res) {
        Taro.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000,
        });
      },
    });
  };

  const handleActivityEdit = () => {
    if (status == 1) {
      Taro.navigateTo({
        url: `/packageActivity/activity-post/index?id=${activity._id}`,
      });
    }
  };

  const handleEnableActivity = () => {
    Taro.showModal({
      title: `${isActive ? '停止' : '开始'}报名确认`,
      content: `您是否确认${isActive ? '停止' : '开始'}该活动的报名？`,
      success: function (res) {
        if (res.confirm) {
          activityActiveUpdate(activity._id, !isActive);
          setIsActive(!isActive);
        }
      },
    });
  };

  const handleActivityUserDelete = actAppid => {
    Taro.showModal({
      title: '删除确认',
      content: '确认删除该名参与者？',
      success: function (res) {
        if (res.confirm) {
          activityAppApproveUpdate(actAppid);
        }
      },
    });
  };

  const image = activity?.images?.[0] || DefaultHouse;

  useEffect(() => {
    console.log(type, status);
  }, [type, status]);

  return (
    <View className='card'>
      <View className='card-top'>
        <View className='card-top-left'>
          <Image src={image} onClick={handleClickActImage} />
        </View>

        <View className='card-top-right'>
          <View className='title'>
            <Text>{activity.title}</Text>
          </View>
          <View className='description'>
            <View className='details'>
              <View className='details-item'>
                <Image src={GreyDateIcon} className='icon' />
                <Text>
                  {activity.startTime} - {activity.endTime}
                </Text>
              </View>
              <View className='details-item'>
                <LocationOutlined className='icon' />
                <Text>{activity.location}</Text>
              </View>
            </View>
          </View>

          {type == 1 && status == 3 && (
            <View className='delete-button'>
              <Image src={TrashBinIcon} />
            </View>
          )}
          {status === 1 && (
            <View className='edit-button' onClick={handleActivityEdit}>
              <Text>{status === 1 ? '编辑' : '查看评价'}</Text>
            </View>
          )}
        </View>
      </View>
      {status === 1 && <View className='div-line'></View>}
      {status == 1 && (
        <View className='card-bottom'>
          {type == 1 && (
            <>
              <View className='card-bottom-left'>
                <View className='details'>
                  <View className='participants'>
                    <Text>允许报名</Text>
                  </View>

                  <View className='current-participants'>
                    <Image src={GreyPeopleIcon} className='icon' />

                    <Text>
                      已报名{appUsers.length}/{activity.capacity}
                    </Text>
                  </View>
                </View>
                <View
                  className='switch-button'
                  onClick={() => handleEnableActivity()}
                >
                  {isActive ? (
                    <Image src={TurnOnIcon} />
                  ) : (
                    <Image src={TurnOffIcon} />
                  )}
                </View>
              </View>

              {!isRegisteredUserVisible ? (
                <View className='view-button' onClick={handleCheckUser}>
                  查看报名用户 <Image src={PurpleDownArrow} />
                </View>
              ) : (
                <View className='view-button' onClick={handleCheckUserClose}>
                  收起报名用户 <Image src={PurpleUpArrow} />
                </View>
              )}
            </>
          )}
          {type == 2 && (
            <>
              <View className='card-bottom-left'>
                <View className='details'>
                  <View className='participants'>
                    <Text>发起人 {activity.contact}</Text>
                  </View>
                  <View className='current-participants'>
                    <Text>微信号: {activity.contact}</Text>
                  </View>
                </View>
              </View>
              <View className='paste-button'>
                <Text>复制联系方式</Text>
              </View>
            </>
          )}
        </View>
      )}
      {isRegisteredUserVisible && (
        <>
          <View className='div-line'></View>
          <View className='registered-users'>
            {/* {activity.registeredUsers.map((user, index) => (
              <View key={index} className='user'>
                <Text>{user}</Text>
              </View>
            ))} */}
            {appUsers.map((user, index) => (
              <View className='user' key={index}>
                <View className='user-info'>
                  <View className='user-name-box'>
                    <Image
                      src={user.userAvatarUrl}
                      className='user-image'
                      mode='aspectFit'
                      onClick={() => handleClickHostAvatar(user._openid)}
                    />
                    <Text className='username'>
                      报名用户: {user.userNickName}{' '}
                    </Text>
                  </View>
                  <Text className='wxcontact'>微信号: {user.userContact}</Text>
                </View>
                <View className='buttons'>
                  <View className='delete'>
                    <Image
                      src={TrashBinIcon}
                      onClick={() => handleActivityUserDelete(user._id)}
                    />
                  </View>
                  <View
                    className='paste'
                    onClick={() => handleClickClipboard(user.userContact)}
                  >
                    复制
                  </View>

                  <View
                    className='detail'
                    onClick={() => handleClickSubmissionDetail(user._id)}
                  >
                    详情
                  </View>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default ActivityCard;
