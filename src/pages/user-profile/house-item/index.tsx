import { View, Text, Image } from '@tarojs/components';
// import DefaultHouse from '@assets/images/default-house.png';
// import DateIcon from '@assets/images/date-icon.svg';
import Taro from '@tarojs/taro';
import { HouseItemProps } from '@utils/interfaces';
import { DefaultHouse, DateIcon } from '@utils/cloudIcons';
const HouseItem: React.FC<HouseItemProps> = house => {
  const imageUrl = house.images.length > 0 ? house.images[0] : DefaultHouse;
  // jump to the edit page
  const handleEditHomeClick = () => {
    Taro.switchTab({
      url: `/pages/house-edit/index`,
    });
  };

  return (
    <View className='house-item'>
      <Image src={imageUrl} className='house-image' />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <View>
          <Text>
            {/** 如果房源类型不确定的话，不现实房源类型 */}
            {house.location}
            {house.houseType !== 'unKnown' &&
            house.houseType !== '' &&
            house.houseType != undefined
              ? ` - ${house.houseType}`
              : ''}
          </Text>

          <View className='house-date' style={{ alignItems: 'center' }}>
            <Image
              src={DateIcon}
              style={{ width: '12px', height: '12px', marginRight: '6px' }}
            />
            <Text style={{ color: '#979797', fontSize: '12px' }}>
              {house.start_date + ' to ' + house.end_date}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#FFD111',
          color: 'white',
          width: '100px',
          justifyContent: 'center',
          height: '32px',
          borderRadius: '32px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
        className='edit-home-button'
        onClick={handleEditHomeClick}
      >
        <Text style={{ fontSize: '14px' }}>编辑房源</Text>
      </View>

      <View
        style={{
          borderBottom: '1px solid #ddd',
          width: '100%',
          marginTop: '10px',
          marginBottom: '20px',
        }}
      ></View>
    </View>
  );
};
export default HouseItem;
