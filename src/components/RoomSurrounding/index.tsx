import { View, Image } from '@tarojs/components';
import './index.scss';
import { useEffect, useMemo, useState } from 'react';
import {
  WIFISelected,
  WashMachineSelected,
  BathSelectd,
  WIFIUnselected,
  WashMachineUnselected,
  BathUnselected,
} from '@utils/cloudIcons';

interface RoomSurroundingsProps {
  onClick: (_) => void;
  isSubwaySelected;
  isAttractionSelected;
  isChineseSuperMartSelected;
  className?: String;
}

const RoomSurroundings = [
  {
    value: 'Subway',
    text: '近地铁',
    imgSeleted: WIFISelected,
    imgUnselectd: WIFIUnselected,
  },
  {
    value: 'Attraction',
    text: '近景点',
    imgSeleted: BathSelectd,
    imgUnselectd: BathUnselected,
  },
  {
    value: 'ChineseSuperMart',
    text: '近中超',
    imgSeleted: WashMachineSelected,
    imgUnselectd: WashMachineUnselected,
  },
];

export default (props: RoomSurroundingsProps) => {
  const valueMap = {
    Subway: props.isSubwaySelected,
    Attraction: props.isAttractionSelected,
    ChineseSuperMart: props.isChineseSuperMartSelected,
  };
  return (
    <View className={`facility-groups ${props.className}`}>
      {RoomSurroundings.map(item => {
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
