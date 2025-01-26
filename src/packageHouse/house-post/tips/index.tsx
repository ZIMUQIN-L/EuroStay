import { View, Text, Image, Textarea } from '@tarojs/components';
import { useState, useEffect, useCallback, useRef } from 'react';
interface IProps {
  tips: string;
  onChange: (_) => void;
}

export default (props: IProps) => {
  return (
    <View className='tips'>
      <View className='title'>房客房屋注意事项</View>
      <View className='warning-title'>请填写您的房屋注意事项。</View>
      <Textarea
        className='warning-input'
        value={props.tips}
        onInput={value => {
          props.onChange(value.detail.value);
        }}
        placeholder='房屋注意事项提供与房源相关的特殊说明，针对房间的使用方式或条件。 比如房间内有宠物（如猫、狗等），房东会不定期进入某些空间（如共用的客厅），噪音环境提示（如邻近铁路或繁忙街道）。'
      />
    </View>
  );
};
