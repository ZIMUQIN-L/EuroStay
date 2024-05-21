import { observer } from 'mobx-react';
import { DefaultHouse } from '@utils/cloudIcons';
import { View, Text, Image } from '@tarojs/components';
import StarIcon from '../icons/star.svg';
import { useEffect, useState } from 'react';
import GlobalStore from '@store/GlobalStore';
import { HouseItemProps, UserItemProps } from '@utils/interfaces';
import './index.scss';
import Taro from '@tarojs/taro';
import { userHouseInfoSearch } from '@common/database/user/user';

const houses = [
  {
    id: '1',
    image: DefaultHouse,
    title: '宽敞大床房',
    destination: '意大利罗马',
    capacity: 2,
    gender: '仅限女生',
    likes: 20,
  },
  {
    id: '2',
    image: DefaultHouse,
    destination: '意大利米兰',
    title: '现代风格套房',
    capacity: 3,
    gender: '性别不限',
    likes: 40,
  },
];

const Index = () => {
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);
  const [houseList, setHouseList] = useState<HouseItemProps[]>([]);
  useEffect(() => {
    const demoUser: UserItemProps = GlobalStore.userInfo;
    setUser(demoUser);
    userHouseInfoSearch(demoUser._openid).then(
      (houseData: HouseItemProps[]) => {
        setHouseList(houseData); // Update demoData state with the fetched data
      },
    );
  }, [GlobalStore.userInfo]);

  const handleHouseClick = houseId => {
    Taro.navigateTo({
      url: `/packageHouse/house-edit/index?id=${houseId}`,
    });
  };
  return (
    <View className='house-grid'>
      {houseList.map(house => (
        <View
          key={house._id}
          className='house-card'
          onClick={() => handleHouseClick(house._id)}
        >
          <Image
            src={house.images.length > 0 ? house.images[0] : DefaultHouse}
            mode='aspectFill'
            style={{ width: '100%', height: '100px' }}
          />
          <Text className='house-title'>{house.location}</Text>
          <View className='house-info'>
            <Text>{house.capacity}人</Text>
            <View className='house-likes'>
              <Image src={StarIcon} />
              {/* <Text>{house.likes}</Text> */}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default observer(Index);
