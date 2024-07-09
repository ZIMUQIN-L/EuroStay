import { View, Image, Text } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import {
  DefaultHouse,
  TrashBinIcon,
  TurnOnIcon,
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
} from '@common/database/activityInfo/activityInfo';
import {
  ActivityInfoItemProps,
  ActivityParticipantCombinedItemProps,
  ActivityApplicationItemProps,
} from '@utils/interfaces';

interface ActivityCardProps {
  activity: ActivityParticipantCombinedItemProps;
  type: number;
  status: number;
}

// type 1: initiated, 2: registered; status 1: processing, 2: finished, 3: draft
const RegisterActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  type,
  status,
}) => {
  const [isRegisteredUserVisible, setIsRegisteredUserVisible] = useState(false);
  const [appUsers, setAppUsers] = useState<ActivityApplicationItemProps[]>([]);

  const handleCheckUser = () => {
    console.log('check user');
    setIsRegisteredUserVisible(true);
  };

  useEffect(() => {}, []);

  const handleCheckUserClose = () => {
    console.log('close user');
    setIsRegisteredUserVisible(false);
  };

  const handleActivityEdit = () => {
    if (status == 1) {
      Taro.navigateTo({
        url: `/packageActivity/activity-post/index?activityId=${activity._id}`,
      });
    }
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

  const image =
    (activity.actInfo[0].images && activity.actInfo[0].images[0]) ||
    DefaultHouse;

  useEffect(() => {
    // console.log(type, status);
    console.log(activity);
  }, [type, status]);

  return (
    <View className='register-card'>
      <View className='card-top'>
        <View className='card-top-left'>
          <Image src={image} />
        </View>

        <View className='card-top-right'>
          <View className='title'>
            <Text>{activity.actInfo[0].title}</Text>
          </View>
          <View className='description'>
            <View className='details'>
              <View className='details-item'>
                <Image src={GreyDateIcon} className='icon' />
                <Text>
                  {activity.actInfo[0].startTime} -{' '}
                  {activity.actInfo[0].endTime}
                </Text>
              </View>
              <View className='details-item'>
                <LocationOutlined className='icon' />
                <Text>{activity.actInfo[0].location}</Text>
              </View>
            </View>
          </View>

          {type == 1 && status == 3 && (
            <View className='delete-button'>
              <Image src={TrashBinIcon} />
            </View>
          )}
          {/* <View className='edit-button' onClick={handleActivityEdit}>
            <Text>{status === 1 ? '编辑' : '查看评价'}</Text>
          </View> */}
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
                      已报名{activity.actInfo[0].capacity}/
                      {activity.actInfo[0].capacity}
                    </Text>
                  </View>
                </View>
                <View className='button'>
                  <Image src={TurnOnIcon} />
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
                    <Text>发起人: {activity.userInfo[0]?.nickName}</Text>
                  </View>
                  <View className='current-participants'>
                    <Text>微信号: {activity.actInfo[0].contact}</Text>
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
                  <Text className='username'>
                    报名用户: {user.userNickName}{' '}
                  </Text>
                  <Text className='wxcontact'>微信号: {user.userContact}</Text>
                </View>
                <View className='buttons'>
                  <View className='delete'>
                    <Image
                      src={TrashBinIcon}
                      onClick={() => handleActivityUserDelete(user._id)}
                    />
                  </View>
                  <View className='paste'>复制</View>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default RegisterActivityCard;
