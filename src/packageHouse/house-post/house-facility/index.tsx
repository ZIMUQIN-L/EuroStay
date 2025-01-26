import { View, Image } from '@tarojs/components';
import { useState } from 'react';
import {
  WIFIUnselected,
  WashMachineUnselected,
  SofaUnselected,
  RefrigeratorUnselected,
  KitchenUnselected,
  HeaterUnselected,
  BathUnselected,
  AirConditionUnselected,
} from '@utils/cloudIcons';

interface IProps {
  hasWifi: boolean;
  hasWashMachine: boolean;
  hasBathroom: boolean;
  hasKitchen: boolean;
  hasFreezer: boolean;
  hasAirConditioner: boolean;
  hasSofa: boolean;
  hasHeat: boolean;
  onClickItem: (_) => void;
}

export default (props: IProps) => {
  return (
    <View className='house-facility'>
      <View className='title'>房源基础设施</View>
      <View className='des'>请选择您的房间内可供房客使用的设施</View>
      <View className='facilities-wrap'>
        <View
          className={`facility-item ${props.hasWifi ? 'active' : ''}`}
          onClick={() => {
            props.onClickItem('wifi');
          }}
        >
          <Image src={WIFIUnselected} className='facility-pic'></Image>
          <View className='facility-name'>wifi</View>
        </View>
        <View
          className={`facility-item ${props.hasWashMachine ? 'active' : ''}`}
          onClick={() => {
            props.onClickItem('washmachine');
          }}
        >
          <Image src={WashMachineUnselected} className='facility-pic'></Image>
          <View className='facility-name'>洗衣机</View>
        </View>
        <View
          className={`facility-item ${props.hasBathroom ? 'active' : ''}`}
          onClick={() => {
            props.onClickItem('bathroom');
          }}
        >
          <Image src={BathUnselected} className='facility-pic'></Image>
          <View className='facility-name'>独立卫浴</View>
        </View>
        <View
          className={`facility-item ${props.hasKitchen ? 'active' : ''}`}
          onClick={() => {
            props.onClickItem('kitchen');
          }}
        >
          <Image src={KitchenUnselected} className='facility-pic'></Image>
          <View className='facility-name'>厨房</View>
        </View>
        <View
          className={`facility-item ${props.hasFreezer ? 'active' : ''}`}
          onClick={() => {
            props.onClickItem('freezer');
          }}
        >
          <Image src={RefrigeratorUnselected} className='facility-pic'></Image>
          <View className='facility-name'>冰箱</View>
        </View>
        <View
          className={`facility-item ${props.hasAirConditioner ? 'active' : ''}`}
          onClick={() => {
            props.onClickItem('aircondition');
          }}
        >
          <Image src={AirConditionUnselected} className='facility-pic'></Image>
          <View className='facility-name'>空调</View>
        </View>
        <View
          className={`facility-item ${props.hasSofa ? 'active' : ''}`}
          onClick={() => {
            props.onClickItem('sofa');
          }}
        >
          <Image src={SofaUnselected} className='facility-pic'></Image>
          <View className='facility-name'>沙发</View>
        </View>
        <View
          className={`facility-item ${props.hasHeat ? 'active' : ''}`}
          onClick={() => {
            props.onClickItem('heat');
          }}
        >
          <Image src={HeaterUnselected} className='facility-pic'></Image>
          <View className='facility-name'>暖气</View>
        </View>
      </View>
    </View>
  );
};
