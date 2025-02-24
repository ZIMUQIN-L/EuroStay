import { View, Image } from '@tarojs/components';
import './index.scss';
import { useMemo } from 'react';
interface HomepageCardGroups {
  location: string;
  userName: string;
  userPic: string;
  tags: string[];
}
export default (props: HomepageCardGroups) => {
  return (
    <View className={`homepage-card`}>
      <Image src={props.userPic} className='user-pic'></Image>
      <View className='user-location'>{props.location}</View>
      <View className='button-wrapper'>
        <Image src={props.userPic} className='user' />
        <Image src={props.userPic} className='house' />
        <Image src={props.userPic} className='activity' />
      </View>
      <View className='homepage-card-bottom'>
        <Image src='' className='user-avatar' />
        <View className='user-details'>
          <View className='user-name'>{props.userName}</View>
          <View className='user-tags'>
            {props.tags.map(item => {
              return <View className='tag-item'>{item}</View>;
            })}
          </View>
        </View>
        <View></View>
      </View>
    </View>
  );
};
