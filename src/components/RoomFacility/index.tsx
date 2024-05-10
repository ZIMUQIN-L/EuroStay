import { View, Image } from '@tarojs/components';
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
} from '@utils/cloudIcons';

interface RoomFacilitiesProps {
  onClick: (_) => void;
  isWiFiSelected;
  isBathSelected;
  isWashMachineSelected;
  isKitchenSelected;
  isRefrigeratorSelected;
  isAirConditionSelected;
  isSofaSelected;
  isHeaterSelected;
  className?: String;
}

const RoomFacilities = [
  {
    value: 'WIFI',
    text: 'WiFi',
    imgSeleted: WIFISelected,
    imgUnselectd: WIFIUnselected,
  },
  {
    value: 'Bath',
    text: '独立卫浴',
    imgSeleted: BathSelectd,
    imgUnselectd: BathUnselected,
  },
  {
    value: 'WashMachine',
    text: '洗衣机',
    imgSeleted: WashMachineSelected,
    imgUnselectd: WashMachineUnselected,
  },
  {
    value: 'Kitchen',
    text: '厨房',
    imgSeleted: KitchenSeleted,
    imgUnselectd: KitchenUnselected,
  },
  {
    value: 'Refrigerator',
    text: '冰箱',
    imgSeleted: RefrigeratorSeleted,
    imgUnselectd: RefrigeratorUnselected,
  },
  {
    value: 'AirCondition',
    text: '空调',
    imgSeleted: AirConditionSelected,
    imgUnselectd: AirConditionUnselected,
  },
  {
    value: 'Sofa',
    text: '沙发',
    imgSeleted: SofaSelected,
    imgUnselectd: SofaUnselected,
  },
  {
    value: 'Heater',
    text: '暖气',
    imgSeleted: HeaterSelected,
    imgUnselectd: HeaterUnselected,
  },
];

export default (props: RoomFacilitiesProps) => {
  const valueMap = {
    WIFI: props.isWiFiSelected,
    Bath: props.isBathSelected,
    WashMachine: props.isWashMachineSelected,
    Kitchen: props.isKitchenSelected,
    Refrigerator: props.isRefrigeratorSelected,
    AirCondition: props.isAirConditionSelected,
    Sofa: props.isSofaSelected,
    Heater: props.isHeaterSelected,
  };
  return (
    <View className={`facility-groups ${props.className}`}>
      {RoomFacilities.map(item => {
        return (
          <View
            id={item.value}
            className={valueMap[item.value] ? 'facility active' : 'facility'}
            onClick={() => {
              props.onClick(item.value);
            }}
          >
            <Image
              src={valueMap[item.value] ? item.imgSeleted : item.imgUnselectd}
              className='image'
            />
            <View className='text'>{item.text}</View>
          </View>
        );
      })}
    </View>
  );
};
