import { View, Image, Text } from '@tarojs/components';
import { ActivityInfoItemProps } from '@utils/interfaces';
import { useState } from 'react';

// type 1: initiated, 2: registered; status 1: processing, 2: finished
const ActivityCard = (activity, type, status) => {
  const [isRegisteredUserVisible, setIsRegisteredUserVisible] = useState(false);

  const handleCheckUser = () => {
    setIsRegisteredUserVisible(true);
  };

  const handleCheckUserClose = () => {
    setIsRegisteredUserVisible(false);
  };

  return (
    <View className={`card ${status} ${type}`}>
      <View className='card-top'>
        <View className='card-left'>
          <Image src={activity.imageUrl[0]} />
        </View>

        <View className='content'>
          <Text className='title'>{activity.title}</Text>

          <View className='details'>
            <Text className='date'>{activity.date}</Text>
            <Text className='location'>{activity.location}</Text>
            {activity.time && <Text className='time'>{activity.time}</Text>}
          </View>
        </View>
      </View>
      {status == 1 && (
        <View className='card-bottom'>
          {type == 1 && (
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
                <Text>允许报名的按钮</Text>
              </View>
              <View className='view-button' onClick={handleCheckUser}>
                查看报名用户 {'>'}
              </View>
            </View>
          )}
          {type == 2 && <View></View>}
        </View>
      )}
    </View>
  );
};

export default ActivityCard;
