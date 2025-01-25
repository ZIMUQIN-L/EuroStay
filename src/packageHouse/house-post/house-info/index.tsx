import { View, Image } from '@tarojs/components';
import { GreyAdd, GreySubstract, GreyCircle } from '@utils/cloudIcons';
import PurpleEnable from '@assets/images/purple-enable.svg';

interface IProps {
  capacity: number;
  gender: string;
  type: number;
  onClickCapacity: (_) => void;
  onClickGender: (_) => void;
  onClickType: (_) => void;
}
export default (props: IProps) => {
  return (
    <View className='house-info'>
      <View className='house-info-title'>确认房源价值</View>
      <View className='capacity'>
        <View className='left'>可以接待房客的人数</View>
        <View className='right'>
          <Image
            src={GreySubstract}
            className='img-substract'
            onClick={() => {
              if (props.capacity > 1) {
                props.onClickCapacity(props.capacity - 1);
              }
            }}
          />
          {props.capacity}
          <Image
            src={GreyAdd}
            className='img-add'
            onClick={() => {
              props.onClickCapacity(props.capacity + 1);
            }}
          />
        </View>
      </View>
      <View className='gender'>
        可以接待房客的性别
        <View className='options'>
          <View className={`option`}>
            男
            <Image
              src={props.gender == 'male' ? PurpleEnable : GreyCircle}
              className='img-select'
              onClick={() => {
                props.onClickGender('male');
              }}
            />
          </View>
          <View
            className={`option ${props.gender == 'female' ? 'active' : ''}`}
          >
            女
            <Image
              src={props.gender == 'female' ? PurpleEnable : GreyCircle}
              className='img-select'
              onClick={() => {
                props.onClickGender('female');
              }}
            />
          </View>
          <View
            className={`option ${props.gender == 'nolimited' ? 'active' : ''}`}
          >
            不限
            <Image
              src={props.gender == 'nolimited' ? PurpleEnable : GreyCircle}
              className='img-select'
              onClick={() => {
                props.onClickGender('nolimited');
              }}
            />
          </View>
        </View>
      </View>
      <View className='type'>
        可以提供的住宿类型
        <View className={`option`}>
          <View className='option-name'>您与房客共享同一住宿空间</View>
          <Image
            src={props.type == 1 ? PurpleEnable : GreyCircle}
            className='img-select'
            onClick={() => {
              props.onClickType(1);
            }}
          />
        </View>
        <View className={`option ${props.gender == 'female' ? 'active' : ''}`}>
          <View className='option-name'>房客有独立的住宿空间</View>
          <Image
            src={props.type == 2 ? PurpleEnable : GreyCircle}
            className='img-select'
            onClick={() => {
              props.onClickType(2);
            }}
          />
        </View>
        <View
          className={`option ${props.gender == 'nolimited' ? 'active' : ''}`}
        >
          <View className='option-name'> 房客有整套公寓或者房屋</View>
          <Image
            src={props.type == 3 ? PurpleEnable : GreyCircle}
            className='img-select'
            onClick={() => {
              props.onClickType(3);
            }}
          />
        </View>
      </View>
    </View>
  );
};
