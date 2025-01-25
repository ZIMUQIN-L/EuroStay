import { View, Image } from '@tarojs/components';
import StepOne from '@assets/images/post-step-1.svg';
import StepTwo from '@assets/images/post-step-2.svg';
import StepThree from '@assets/images/post-step-3.svg';
import StepFour from '@assets/images/post-step-4.svg';

export default () => {
  return (
    <View className='start'>
      <View className='title'>开始添加您的第一套房源</View>
      <View className='steps'>
        <View className='step'>
          <View className='step-left'>
            <View className='step-subtitle'>1 介绍您的房源</View>
            <View className='des'>
              介绍房源基本信息，比如房源类型、房源位置、可接待人数、房客性别
            </View>
          </View>
          <View className='step-right'>
            <Image src={StepOne}></Image>
          </View>
        </View>
        <View className='step'>
          <View className='step-left'>
            <View className='step-subtitle'>2 添加房源亮点</View>
            <View className='des'>
              添加房源的基本设施，房源照片，以及房源描述，帮助房客更好的了解
            </View>
          </View>
          <View className='step-right'>
            <Image src={StepTwo}></Image>
          </View>
        </View>
        <View className='step'>
          <View className='step-left'>
            <View className='step-subtitle'>3 填写Guest期待</View>
            <View className='des'>
              描述您理想中的房客、您的兴趣爱好，帮助您匹配到志同道合的房客
            </View>
          </View>
          <View className='step-right'>
            <Image src={StepThree}></Image>
          </View>
        </View>
        <View className='step'>
          <View className='step-left'>
            <View className='step-subtitle'>4 上架发布房源</View>
            <View className='des'>
              确认注意事项、入住公约、可用时间以及房源旅行币价格，上架发布
            </View>
          </View>
          <View className='step-right'>
            <Image src={StepFour}></Image>
          </View>
        </View>
      </View>
    </View>
  );
};
