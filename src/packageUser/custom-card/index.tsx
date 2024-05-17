import { View, Image, Text } from '@tarojs/components';
import './index.scss';

/**
 * @description 我的供宿和我的求宿的共用组件
 */
const CustomCard = ({
  imageUrl,
  title,
  userInfo,
  dateInfo,
  topText,
  buttonText,
  clickButton,
  clickable = false,
  avatarUrl = '',
  buttonTextSecond = '',
  clickButtonSecond = () => {}, // 第二个按钮可选参数
}) => {
  // TODO: 可以传入参数来调整样式，button和上面text的颜色
  return (
    <View className='card'>
      <View className='card-left'>
        <Image src={imageUrl} />
      </View>
      <View className='card-right'>
        <View className='card-right-top'>
          <Text>{title}</Text>
          <Text>{topText}</Text>
        </View>
        <View className='card-right-middle'>
          <View>{avatarUrl != '' && <Image src={avatarUrl} />}</View>
          <View className='card-right-middle-text'>
            <Text>{userInfo}</Text>
            <Text>{dateInfo}</Text>
          </View>
        </View>
        <View className='card-right-bottom'>
          <View
            onClick={clickable ? clickButton : null}
            className={
              clickable
                ? 'card-right-bottom-button'
                : 'card-right-bottom-button-noclick'
            }
          >
            <Text>{buttonText}</Text>
          </View>
          {buttonTextSecond && (
            <View onClick={clickButtonSecond}>
              <Text>{buttonTextSecond}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CustomCard;
