import { View, Text, Image, Textarea } from '@tarojs/components';
import { useState, useEffect, useCallback, useRef } from 'react';

interface IProps {
  agreement: string;
  onChange: (_) => void;
}

export default (props: IProps) => {
  return (
    <View className='agreement'>
      <View className='title'>房屋入住公约</View>

      <View className='warning-title'>请填写您的房屋入住公约。</View>
      <Textarea
        className='warning-input'
        value={props.agreement}
        onInput={value => {
          props.onChange(value.detail.value);
        }}
        placeholder='房屋入住公约设定了方可的行为规范，强调房客需遵守的住宿规则。详细的入住公约会帮助您主管理预期行为，减少纠纷。 比如禁止吸烟或宠物，不允许举办聚会，需保持安静时间（如22:00-8:00）等。'
      />
    </View>
  );
};
