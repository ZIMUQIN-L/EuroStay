import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const ContactMessageBox = (props) => {
  const { avatar, time, direction = 'left'} = props

  // 根据 direction 动态设置文案和按钮文字
  let content = ''
  let buttonText = ''

  if (direction === 'right') {
    // 右侧消息（通常表示“自己”）
    content = '你已确认将入住此房屋。需要任何后续帮助请联系小助手:'
    buttonText = '联系小助手'
  } else {
    // 左侧消息（通常表示“对方”或“房主”）
    content = `${name || '对方'}已确认将入住此房屋。需要任何后续帮助请联系小助手:`
    buttonText = '联系小助手'
  }


  const handleClick = () => {
    Taro.showToast({ title: `处理申请, toUid=${toUid}, subjectId=${subjectId}`, icon: 'none' })
  }


  return (
    <View className={`message-box ${direction}`}>
      {/* 头像 */}
      <Image className='avatar' src={avatar} />

      {/* 气泡内容 */}
      <View className='bubble'>
      <Text className='content'>{content}</Text>
        <Button className='bottom-btn' onClick={handleClick}>
          {buttonText}
        </Button>
      </View>

    </View>
  )

}

export default ContactMessageBox
