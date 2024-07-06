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
import { activityUsersSearch } from '@common/database/activityInfo/activityInfo';
import {
  ActivityInfoItemProps,
  UserItemProps,
  ActivityApplicationItemProps,
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
  const [appUsers, setAppUsers] = useState<ActivityApplicationItemProps[]>([]);

  const handleCheckUser = () => {
    console.log('check user');
    setIsRegisteredUserVisible(true);
  };

  useEffect(() => {
    if (type == 1) {
      activityUsersSearch(activity._id).then(
        (appInfo: ActivityApplicationItemProps[]) => {
          setAppUsers(appInfo);
        },
      );
    }
  });

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

  const image = activity?.images?.[0] || DefaultHouse;

  useEffect(() => {
    console.log(type, status);
  }, [type, status]);

  return (
    <View className='card'>
      <View className='card-top'>
        <View className='card-top-left'>
          <Image src={image} />
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
          <View className='edit-button' onClick={handleActivityEdit}>
            <Text>{status === 1 ? '编辑' : '查看评价'}</Text>
          </View>
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
                      已报名{activity.capacity}/{activity.capacity}
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
                  <Text className='username'>报名用户 </Text>
                  <Text className='wxcontact'>微信号: wx23849769_nvi378</Text>
                </View>
                <View className='buttons'>
                  <View className='delete'>
                    <Image src={TrashBinIcon} />
                  </View>
                  <View className='paste'>复制</View>
                </View>
              </View>
            ))}
            <View className='user'>
              <View className='user-info'>
                <Text className='username'>报名用户 Username</Text>
                <Text className='wxcontact'>微信号: wx23849769_nvi378</Text>
              </View>
              <View className='buttons'>
                <View className='delete'>
                  <Image src={TrashBinIcon} />
                </View>
                <View className='paste'>复制</View>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default ActivityCard;
