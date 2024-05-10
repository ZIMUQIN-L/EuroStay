import { View, Image } from '@tarojs/components';
import './index.scss';
import {
  WIFISelected,
  WashMachineSelected,
  RefrigeratorSeleted,
  KitchenSeleted,
  BathSelectd,
  WIFIUnselected,
  WashMachineUnselected,
  RefrigeratorUnselected,
  KitchenUnselected,
  BathUnselected,
} from '@utils/cloudIcons';

interface HouseOwnerPreferenceProps {
  onClick: (_) => void;
  isSmokeSelected;
  isPetSelected;
  isExchangeSelected;
  isBeddingSelected;
  isRentSelected;
  className?: String;
}

const HouseOwnerPreferences = [
  {
    value: 'Smoke',
    text: '可吸烟',
    imgSeleted: WIFISelected,
    imgUnselectd: WIFIUnselected,
  },
  {
    value: 'Pet',
    text: '宠物友好',
    imgSeleted: BathSelectd,
    imgUnselectd: BathUnselected,
  },
  {
    value: 'Exchange',
    text: '换宿',
    imgSeleted: WashMachineSelected,
    imgUnselectd: WashMachineUnselected,
  },
  {
    value: 'Bedding',
    text: '换洗床具',
    imgSeleted: KitchenSeleted,
    imgUnselectd: KitchenUnselected,
  },
  {
    value: 'Rent',
    text: '短租',
    imgSeleted: RefrigeratorSeleted,
    imgUnselectd: RefrigeratorUnselected,
  },
];

export default (props: HouseOwnerPreferenceProps) => {
  const valueMap = {
    Smoke: props.isSmokeSelected,
    Pet: props.isPetSelected,
    Bedding: props.isBeddingSelected,
    Exchange: props.isExchangeSelected,
    Rent: props.isRentSelected,
  };
  return (
    <View className={`preference-groups ${props.className}`}>
      {HouseOwnerPreferences.map(item => {
        return (
          <View
            id={item.value}
            className={
              valueMap[item.value] ? 'preference active' : 'preference'
            }
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
