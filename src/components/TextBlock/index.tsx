import { View, Text, Image } from '@tarojs/components';
import { HouseDetailItemProps } from '@utils/interfaces';
import './index.scss';
import { DateIcon, CapacityIcon, LocationIcon } from '@utils/cloudIcons';
interface IProps {
  title: string;
  body?: string;
}

const TextBlock = (props: IProps) => {
  return (
    <View className='text-block-wrap'>
      <View className='text-block-title'>{props.title}</View>
      <View className='text-block-body'>{props.body}</View>
    </View>
  );
};

export default TextBlock;
