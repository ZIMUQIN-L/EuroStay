import { View, Text, Image } from '@tarojs/components';
import './index.scss';
import {
  WIFISelected,
  WashMachineSelected,
  SofaSelected,
  RefrigeratorSeleted,
  KitchenSeleted,
  BathSelectd,
  HeaterSelected,
  AirConditionSelected,
  WIFIUnselected,
  WashMachineUnselected,
  SofaUnselected,
  RefrigeratorUnselected,
  KitchenUnselected,
  BathUnselected,
  HeaterUnselected,
  AirConditionUnselected,
  AttractionSelected,
  AttractionUnselected,
  MarketSelected,
  MarketUnselected,
  MetroSelected,
  MetroUnselected,
  AllGenderSelected,
  AllGenderUnselected,
  FemaleSelected,
  FemaleUnselected,
  MaleSelected,
  MaleUnselected,
  RentSelected,
  RentUnselected,
  PetFriendlySelected,
  PetFriendlyUnselected,
  ExchangeSelected,
  ExchangeUnselected,
  SmokeSelected,
  SmokeUnselected,
  BeddingSelected,
  BeddingUnselected,
} from '@utils/cloudIcons';

const RoomFacilities = [
  {
    value: 'WIFI',
    text: 'WIFI',
    imgSeleted: WIFISelected,
    imgUnselectd: WIFIUnselected,
  },
  {
    value: '独立卫浴',
    text: '独立卫浴',
    imgSeleted: BathSelectd,
    imgUnselectd: BathUnselected,
  },
  {
    value: '洗衣机',
    text: '洗衣机',
    imgSeleted: WashMachineSelected,
    imgUnselectd: WashMachineUnselected,
  },
  {
    value: '厨房',
    text: '厨房',
    imgSeleted: KitchenSeleted,
    imgUnselectd: KitchenUnselected,
  },
  {
    value: '冰箱',
    text: '冰箱',
    imgSeleted: RefrigeratorSeleted,
    imgUnselectd: RefrigeratorUnselected,
  },
  {
    value: '空调',
    text: '空调',
    imgSeleted: AirConditionSelected,
    imgUnselectd: AirConditionUnselected,
  },
  {
    value: '沙发',
    text: '沙发',
    imgSeleted: SofaSelected,
    imgUnselectd: SofaUnselected,
  },
  {
    value: '暖气',
    text: '暖气',
    imgSeleted: HeaterSelected,
    imgUnselectd: HeaterUnselected,
  },
];

const RoomSurroundings = [
  {
    value: '近地铁',
    text: '近地铁',
    imgSeleted: MetroSelected,
    imgUnselectd: MetroUnselected,
  },
  {
    value: '近景点',
    text: '近景点',
    imgSeleted: AttractionSelected,
    imgUnselectd: AttractionUnselected,
  },
  {
    value: '近中超',
    text: '近中超',
    imgSeleted: MarketSelected,
    imgUnselectd: MarketUnselected,
  },
];

const HouseOwnerPreferences = [
  {
    value: '可吸烟',
    text: '可吸烟',
    imgSeleted: SmokeSelected,
    imgUnselectd: SmokeUnselected,
  },
  {
    value: '宠物友好',
    text: '宠物友好',
    imgSeleted: PetFriendlySelected,
    imgUnselectd: PetFriendlyUnselected,
  },
  {
    value: '换宿',
    text: '换宿',
    imgSeleted: ExchangeSelected,
    imgUnselectd: ExchangeUnselected,
  },
  {
    value: '换洗床具',
    text: '换洗床具',
    imgSeleted: BeddingSelected,
    imgUnselectd: BeddingUnselected,
  },
  {
    value: '短租',
    text: '短租',
    imgSeleted: RentSelected,
    imgUnselectd: RentUnselected,
  },
];
const HouseGenderPreferences = [
  {
    value: '限女生',
    text: '限女生',
    imgSeleted: FemaleSelected,
    imgUnselectd: FemaleUnselected,
  },
  {
    value: '限男生',
    text: '限男生',
    imgSeleted: MaleSelected,
    imgUnselectd: MaleUnselected,
  },
  {
    value: '不限性别',
    text: '不限性别',
    imgSeleted: AllGenderSelected,
    imgUnselectd: AllGenderUnselected,
  },
];

export const RoomDetailInfo = ({
  roomUtility,
  roomSurrounding,
  roomPreference,
}) => {
  return (
    <view className='house-infos'>
      <View className='gender-requirements'>
        <Text>性别要求</Text>
        <View className={`facility-groups ${Object.keys(roomPreference)}`}>
          {HouseGenderPreferences.map(item => {
            if (roomPreference[item.value]) {
              return (
                <View
                  id={item.value}
                  className={
                    roomPreference[item.value] ? 'facility active' : 'facility'
                  }
                >
                  <Image
                    src={
                      roomPreference[item.value]
                        ? item.imgSeleted
                        : item.imgUnselectd
                    }
                    className='image'
                  />
                  <View className='text'>{item.text}</View>
                </View>
              );
            } else {
              return null;
            }
          })}
        </View>
      </View>
      <View className='house-details'>
        <Text>房源信息</Text>
        <View className={`facility-groups ${Object.keys(roomUtility)}`}>
          {RoomFacilities.map(item => {
            if (roomUtility[item.value]) {
              return (
                <View
                  id={item.value}
                  className={
                    roomUtility[item.value] ? 'facility active' : 'facility'
                  }
                >
                  <Image
                    src={
                      roomUtility[item.value]
                        ? item.imgSeleted
                        : item.imgUnselectd
                    }
                    className='image'
                  />
                  <View className='text'>{item.text}</View>
                </View>
              );
            } else {
              return null;
            }
          })}
          {RoomSurroundings.map(item => {
            if (roomSurrounding[item.value]) {
              return (
                <View
                  id={item.value}
                  className={
                    roomSurrounding[item.value] ? 'facility active' : 'facility'
                  }
                >
                  <Image
                    src={
                      roomSurrounding[item.value]
                        ? item.imgSeleted
                        : item.imgUnselectd
                    }
                    className='image'
                  />
                  <View className='text'>{item.text}</View>
                </View>
              );
            } else {
              return null;
            }
          })}
          {HouseOwnerPreferences.map(item => {
            if (roomPreference[item.value]) {
              return (
                <View
                  id={item.value}
                  className={
                    roomPreference[item.value] ? 'facility active' : 'facility'
                  }
                >
                  <Image
                    src={
                      roomPreference[item.value]
                        ? item.imgSeleted
                        : item.imgUnselectd
                    }
                    className='image'
                  />
                  <View className='text'>{item.text}</View>
                </View>
              );
            } else {
              return null;
            }
          })}
        </View>
      </View>
    </view>
  );
};
