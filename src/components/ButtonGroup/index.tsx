import { View } from '@tarojs/components';
import './index.scss';
import { useMemo } from 'react';
interface ButtonGroupProps {
  buttons: {
    text: string;
    value: any;
  }[];
  onClickButton: (_) => void;
  curValue: any;
  className?: String;
}
export default (props: ButtonGroupProps) => {
  const curButton = useMemo(() => {
    return props.curValue;
  }, [props.curValue]);
  return (
    <View className={`button-groups ${props.className}`}>
      {props.buttons.map((item, index) => {
        return (
          <View
            id={item.text}
            className={curButton == item.value ? 'button active' : 'button'}
            onClick={() => {
              console.log(item.value, '1');
              props.onClickButton(item.value);
            }}
          >
            {item.text}
          </View>
        );
      })}
    </View>
  );
};
