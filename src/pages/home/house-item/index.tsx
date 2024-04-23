import { View, Text, Image } from '@tarojs/components';
import DefaultHouse from '@assets/images/default-house.png';
import { formatDate } from '@utils/dateUtil';
import DateIcon from '@assets/images/date-icon.svg';

interface HouseItemProps {
  house: {
    id: string;
    nation: string;
    city: string;
    type: string;
    startDate: Date;
    endDate: Date;
    owner: number;
    url: string;
  };
}

const HouseItem: React.FC<HouseItemProps> = ({ house }) => {
  const imageUrl = house.url ? house.url : DefaultHouse;

  return (
    <View className='house-item'>
      <Image src={imageUrl} className='house-image' />
      {!house.url && (
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
            {house.nation}
            {house.city} - {house.type}
          </Text>

          <View className='house-date' style={{ alignItems: 'center' }}>
            <Image
              src={DateIcon}
              style={{ width: '12px', height: '12px', marginRight: '6px' }}
            />
            <Text style={{ color: '#979797', fontSize: '12px' }}>
              {formatDate(house.startDate) + ' to ' + formatDate(house.endDate)}
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
