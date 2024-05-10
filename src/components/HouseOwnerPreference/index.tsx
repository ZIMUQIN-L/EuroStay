import { View, Image } from '@tarojs/components';
import './index.scss';
import {
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
    imgSeleted: SmokeSelected,
    imgUnselectd: SmokeUnselected,
  },
  {
    value: 'Pet',
    text: '宠物友好',
    imgSeleted: PetFriendlySelected,
    imgUnselectd: PetFriendlyUnselected,
  },
  {
    value: 'Exchange',
    text: '换宿',
    imgSeleted: ExchangeSelected,
    imgUnselectd: ExchangeUnselected,
  },
  {
    value: 'Bedding',
    text: '换洗床具',
    imgSeleted: BeddingSelected,
    imgUnselectd: BeddingUnselected,
  },
  {
    value: 'Rent',
    text: '短租',
    imgSeleted: RentSelected,
    imgUnselectd: RentUnselected,
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
