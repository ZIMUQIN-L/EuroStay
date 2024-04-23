import { View, Text, Image } from '@tarojs/components';
import DefaultHouse from '@assets/images/default-house.png';
import DateIcon from '@assets/images/date-icon.svg';

interface HouseItemProps {
  house: {
    id: string;
    capacity: number;
    description: string;
    endDate: string; // 后期最好优化成日期格式
    startDate: string;
    houseType: string;
    images: string[];
    location: string;
    ownerTarget: string;
    xhsContact: string;
  };
}

const HouseItem: React.FC<HouseItemProps> = ({ house }) => {
  const imageUrl = house.images.length > 0 ? house.images[0] : DefaultHouse;

  return (
    <View className='house-item'>
      <Image src={imageUrl} className='house-image' />
      {!house.images && (
        <View
          style={{
            marginTop: '-50px',
            marginBottom: '30px',
            color: '#979797',
            justifyContent: 'center',
            fontSize: '14px',
            display: 'flex',
          }}
        >
          <Text>暂无房源内部照片，请与房主交流获取</Text>
        </View>
      )}

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
            {house.location} - {house.houseType}
          </Text>

          <View className='house-date' style={{ alignItems: 'center' }}>
            <Image
              src={DateIcon}
              style={{ width: '12px', height: '12px', marginRight: '6px' }}
            />
            <Text style={{ color: '#979797', fontSize: '12px' }}>
              {house.startDate + ' to ' + house.endDate}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#FFD111',
            color: 'white',
            width: '30%',
            justifyContent: 'center',
            height: '32px',
            borderRadius: '32px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: '14px' }}>联系房主</Text>
        </View>
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
