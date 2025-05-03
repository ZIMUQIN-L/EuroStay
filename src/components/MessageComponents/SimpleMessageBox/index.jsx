import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import GlobalStore from '@store/GlobalStore';
import Taro from '@tarojs/taro'

const SimpleMessageBox = (props) => {
  const { avatar, content, time, direction = 'left', toUid, showTime = false } = props;

  return (
    <>
      {showTime ? <View className='message-time'><Text className='time'>{time}</Text></View> : null}
      <View className={`message-box ${direction}`}>
        {/* 头像 */}
        <Image className='avatar' src={direction === 'left' ? avatar : GlobalStore.userInfo.avatar}
          onClick={() => {
            if (direction === 'left') {
              Taro.navigateTo({ url: `/pages/user/index?uid=${toUid}` });
            } else {
              Taro.navigateTo({ url: `/pages/user/index?uid=${GlobalStore.userInfo.uid}` });
            }
          }} />
        {/* 气泡内容 */}
        <View className='bubble'>
          <Text className='content'>{content}</Text>
          {/* <Text className='time'>{time}</Text> */}
        </View>
      </View>
    </>
  )
}

export default SimpleMessageBox
