import { View, Text, Image } from '@tarojs/components'
import './index.scss'

const SimpleMessageBox = (props) => {
  const { avatar, content, time, direction = 'left' } = props

  return (
    <View className={`message-box ${direction}`}>
      {/* 头像 */}
      <Image className='avatar' src={avatar} />

      {/* 气泡内容 */}
      <View className='bubble'>
        <Text className='content'>{content}</Text>
        {/* <Text className='time'>{time}</Text> */}
      </View>
    </View>
  )
}

export default SimpleMessageBox
