import { View, Image, Text } from '@tarojs/components';
import { ActivityInfoItemProps } from '@utils/interfaces';
import { useEffect, useState } from 'react';
import { DefaultHouse } from '@utils/cloudIcons';
import './index.scss';

// type 1: initiated, 2: registered; status 1: processing, 2: finished
const ActivityCard = (activity, type, status) => {
  const [isRegisteredUserVisible, setIsRegisteredUserVisible] = useState(false);

  const handleCheckUser = () => {
    setIsRegisteredUserVisible(true);
  };


  const handleCheckUserClose = () => {
    setIsRegisteredUserVisible(false);
  };

    const image = activity?.images?.[0] || DefaultHouse;

    useEffect(() => {
      console.log('activity', activity.activity)
    })

  return (
    <View className='card'>
      <View className='card-top'>
        <View className='card-top-left'>
        <Image src={image}/>
        </View>

        <View className='content'>
          <Text className='title'>{activity.activity.title}</Text>

          <View className='details'>
            <Text className='date'>{activity.activity.date}</Text>
            <Text className='location'>{activity.activitylocation}</Text>
            {activity.activity.time && <Text className='time'>{activity.activity.time}</Text>}
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
                    已报名{activity.activity.participants}/{activity.activity.maxParticipants}
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
