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

export const RoomDetailInfo = roomUtility => {
  return (
    <View className={`facility-groups ${Object.keys(roomUtility)}`}>
      {RoomFacilities.map(item => {
        return (
          <View
            id={item.value}
            className={roomUtility[item.value] ? 'facility active' : 'facility'}
          >
            <Image
              src={
                roomUtility[item.value] ? item.imgSeleted : item.imgUnselectd
              }
              className='image'
            />
            <View className='text'>{item.text}</View>
          </View>
        );
      })}
    </View>
  );
};
