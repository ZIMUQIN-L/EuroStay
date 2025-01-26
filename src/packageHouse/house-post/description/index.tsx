import { View, Textarea, IconProps } from '@tarojs/components';

interface IProps {
  title: string;
  des: string;
  message: string;
  onChangeTitle: (_) => void;
  onChangeDes: (_) => void;
  onChangeMessage: (_) => void;
}

export default (props: IProps) => {
  return (
    <View className='description'>
      <View className='title'>描述您的房源</View>
      <View className='question-title'>请给您的房源起一个简洁的标题吧！</View>
      <Textarea
        className='title-text-input'
        value={props.title}
        onInput={value => {
          props.onChangeTitle(value.detail.value);
        }}
        placeholder=''
      />
      <View className='question-des'>请用您自己的话对房源进行描述吧！</View>
      <Textarea
        className='des-text-input'
        value={props.des}
        onInput={value => {
          props.onChangeDes(value.detail.value);
        }}
        placeholder='请填写回答（不要忘记您的房源最大的亮点是什么，推荐给房客吧！）'
      />
      <View className='question-message'>您想对预定成功的房客说的一句话？</View>
      <Textarea
        className='message-text-input'
        value={props.message}
        onInput={value => {
          props.onChangeMessage(value.detail.value);
        }}
        placeholder='请填写回答'
      />
    </View>
  );
};
