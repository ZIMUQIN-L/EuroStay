import { View, Image } from '@tarojs/components';
import Single from '@assets/images/single.svg';
import Ensuite from '@assets/images/ensuite.svg';
import Studio from '@assets/images/studio.svg';
import Apartment from '@assets/images/apartment.svg';
import House from '@assets/images/house.svg';
import Other from '@assets/images/other.svg';
interface IProps {
  houseType: string;
  onClickHouseType: (_) => void;
}

export default (props: IProps) => {
  const houseTypeMap = [
    {
      type: 'single',
      des: '单间，与室友公用厨房和卫浴',
      value: 'single',
      pic: Single,
    },
    {
      type: 'Ensuite',
      des: '单间，自带卫浴，厨房需要与室友公用',
      value: 'ensuite',
      pic: Ensuite,
    },
    {
      type: 'Studio',
      des: '一个大空间，起居室兼作卧室，自带厨房和卫浴',
      value: 'studio',
      pic: Studio,
    },
    {
      type: 'Apartment',
      des: '有单独的客厅，卫浴，卧室三者分开',
      value: 'Apartment',
      pic: Apartment,
    },
    {
      type: 'House',
      des: '独门独院的住宅，常为两层或三层',
      value: 'house',
      pic: House,
    },

    {
      type: '其他的',
      des: '或许您的房源是其他有趣的类型',
      value: 'others',
      pic: Other,
    },
  ];
  return (
    <View className='house-type-wrap'>
      <View className='title'>您的房源是什么类型？</View>
      <View className={`house-type`}>
        {houseTypeMap.map(item => {
          return (
            <View
              className={`house-item ${item.value == props.houseType ? 'active' : ''}`}
              onClick={() => {
                props.onClickHouseType(item.value);
              }}
            >
              <Image src={item.pic} className='pic'></Image>
              <View className='house-item-title'>{item.type}</View>
              <View className='des'>{item.des}</View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
