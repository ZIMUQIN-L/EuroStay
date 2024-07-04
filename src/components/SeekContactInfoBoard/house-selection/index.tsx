import { View, Input, Image, Text } from '@tarojs/components';
import { DefaultHouse } from '@utils/cloudIcons';
import CustomFullScreenDialog from '@components/CustomFullScreenDialog';
import { useEffect, useState } from 'react';
import { HouseItemProps, UserItemProps } from '@utils/interfaces';
import GlobalStore from '@store/GlobalStore';
import './index.scss';
import { userHouseInfoSearch } from '@common/database/user/user';

const HouseSelection = ({ onClose, onHouseSelected, prevHouseId }) => {
  const [user, setUser] = useState<UserItemProps>(GlobalStore.userInfo);
  const [houseList, setHouseList] = useState<HouseItemProps[]>([]);
  const [houseId, setHouseId] = useState('');
  const handleSubmitHouseSelection = () => {
    // onHouseSelected(chosenHouseId, chosenHouseLocation);
    onClose();
  };

  useEffect(() => {
    const demoUser: UserItemProps = GlobalStore.userInfo;
    setUser(demoUser);
    userHouseInfoSearch(demoUser._openid).then(
      (houseData: HouseItemProps[]) => {
        setHouseList(houseData); // Update demoData state with the fetched data
      },
    );
    setHouseId(prevHouseId);
  }, []);

  const handleHouseClick = (
    chosenHouseId,
    chosenHouseLocation,
    chosenImages,
  ) => {
    setHouseId(chosenHouseId);
    onHouseSelected(chosenHouseId, chosenHouseLocation, chosenImages);
  };

  return (
    <CustomFullScreenDialog
      title='请关联房源'
      onClose={onClose}
      onSubmit={handleSubmitHouseSelection}
    >
      <View className='seek-house-grid'>
        {houseList.map(house => (
          <View
            key={house._id}
            className={`seek-house-card ${houseId != '' && houseId == house._id ? 'chosen' : ''}`}
            onClick={() =>
              handleHouseClick(house._id, house.location, house.images)
            }
          >
            {/* <Image
            src={house.images.length > 0 ? house.images[0] : DefaultHouse}
            mode='aspectFill'
          /> */}
            <Text className='seek-house-title'>{house.location}</Text>
            <View className='seek-house-info'>
              <Text>{house.capacity}人</Text>
            </View>
          </View>
        ))}
      </View>
    </CustomFullScreenDialog>
  );
};
export default HouseSelection;
