import { View, Image, Text } from '@tarojs/components';
import { ActivityInfoItemProps } from '@utils/interfaces';
import { useEffect, useState } from 'react';
import { DefaultHouse, TrashBinIcon, TurnOnIcon } from '@utils/cloudIcons';
import './index.scss';

// type 1: initiated, 2: registered; status 1: processing, 2: finished, 3: draft
const ActivityCard = ({ activity, type, status }) => {
  const [isRegisteredUserVisible, setIsRegisteredUserVisible] = useState(false);

  const handleCheckUser = () => {
    setIsRegisteredUserVisible(true);
  };

  const handleCheckUserClose = () => {
    setIsRegisteredUserVisible(false);
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
                <Text>{activity.date}</Text>
              </View>
              <Text className='details-item'>{activity.location}</Text>
              {activity.time && (
                <Text className='details-item'>{activity.time}</Text>
              )}
            </View>
          </View>

          {type == 1 && status == 3 && (
            <View className='delete-button'>
              <Image src={TrashBinIcon} />
            </View>
          )}
          <View className='edit-button'>
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
                  <Text className='participants'>允许报名</Text>
                  <View>
                    <Text className='current-participants'>
                      已报名{activity.participants}/{activity.maxParticipants}
                    </Text>
                  </View>
                </View>
                <View className='button'>
                  <Image src={TurnOnIcon} />
                </View>
              </View>

              <View className='view-button' onClick={handleCheckUser}>
                查看报名用户 {'>'}
              </View>
            </>
          )}
          {type == 2 && <View></View>}
        </View>
      )}
    </View>
  );
};

export default ActivityCard;
