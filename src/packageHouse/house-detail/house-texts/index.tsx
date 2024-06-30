import { View, Text, Image } from '@tarojs/components';
import { HouseDetailItemProps } from '@utils/interfaces';
import './index.scss';
import { DateIcon, CapacityIcon, LocationIcon } from '@utils/cloudIcons';
import Taro from '@tarojs/taro';
import { UserDetailInfoItemProps } from '@utils/interfaces';

// mock data
const userInfo: UserDetailInfoItemProps = {
  _id: 'user-001',
  _openid: 'openid-001',
  userOpenid: 'user-openid-001',
  nickName: '偷心小白菜',
  userDes: 'A friendly and outgoing person who loves to explore new places and meet new people.',
  avatarUrl: 'https://via.placeholder.com/80',
  userLocation: 'Milan, Italy',
  guestRating: 4.8,
  guestRatingNumber: 25,
  hostRating: 4.7,
  hostRatingNumber: 18,
  gender: 'female',
  tags: ['adventurous', 'friendly', 'outgoing'],
  verified: {
    student: true,
    gov: true
  },
  aboutMe: {
    interests: 'Swimming, Movies, Skiing',
    major: 'Computer Science',
    languages: 'English, Italian, Chinese',
    skills: 'Coding, Cooking, Photography',
    funFact: 'I have visited 30 countries and counting!',
    visitedCountries: 'Italy, France, Germany, USA, China, Japan',
    serviceProvided: 'I can offer a cozy place to stay and a local tour around Milan.'
  }
};

const toHostDetail = () => {
  Taro.setStorageSync('userDetail', userInfo);
  Taro.navigateTo({
    url: '/packageUser/user-detail/index',
  });
};

const HouseTexts: React.FC<HouseDetailItemProps> = house => {
  return (
    <View className='lists'>
      <View className='container'>
        <View className='text-container'>
          <Text className='title'>地点：{house.location}</Text>
          <Text className='title'>房间类型：{house.houseType}</Text>
          <View className='sub-title'>
            <Image src={DateIcon} className='icon' />
            <Text>
              {house.start_date} to {house.end_date}
            </Text>
          </View>
          <View className='sub-title'>
            <Image src={CapacityIcon} className='icon' />
            <Text>{house.capacity}人</Text>
          </View>
        </View>
      </View>
      <View className='container'>
        <View className='text-container'>
          <Text className='title'>房东信息</Text>
        </View>
        <View className='contact-button' onClick={toHostDetail}>
          <Text className='contact-text'>房东信息</Text>
        </View>
      </View>
      <View className='container'>
        <View className='text-container'>
          <Text className='title'>房源概览</Text>
          <Text className='sub-title'>{house.description}</Text>
        </View>
      </View>
      <View className='container'>
        <View className='text-container'>
          <Text className='title'>房源位置</Text>
          <View className='location-container'>
            <Image src={LocationIcon} className='location-icon' />
            <View className='location-texts'>
              <Text className='first-line'>地址</Text>
              <Text className='second-line'>{house.location}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* <View className='container'>
        <View className='text-container'>
          <Text className='title'>房客评价</Text>
        </View>
      </View>
      <View className='contact-container'>
        <View className='contact-button'>
          <Text className='contact-text'>联系房东</Text>
        </View>
      </View> */}
    </View>
  );
};

export default HouseTexts;
