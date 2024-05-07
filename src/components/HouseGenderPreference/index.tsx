import { View, Image } from '@tarojs/components';
import './index.scss';
import { useEffect, useMemo, useState } from 'react';
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

interface HouseGenderPreferenceProps {
  onClick: (_) => void;
  isFemaleSelected;
  isMaleSelected;
  isAllGenderSelected;
  className?: String;
}

const HouseGenderPreferences = [
  {
    value: 'Female',
    text: '限女生',
    imgSeleted: WIFISelected,
    imgUnselectd: WIFIUnselected,
  },
  {
    value: 'Male',
    text: '限男生',
    imgSeleted: BathSelectd,
    imgUnselectd: BathUnselected,
  },
  {
    value: 'AllGender',
    text: '不限性别',
    imgSeleted: WashMachineSelected,
    imgUnselectd: WashMachineUnselected,
  },
];

export default (props: HouseGenderPreferenceProps) => {
  const valueMap = {
    Female: props.isFemaleSelected,
    Male: props.isMaleSelected,
    AllGender: props.isAllGenderSelected,
  };
  return (
    <View className={`facility-groups ${props.className}`}>
      {HouseGenderPreferences.map(item => {
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
