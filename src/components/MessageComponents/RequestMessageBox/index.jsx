import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const RequestMessageBox = (props) => {
  const { avatar, time, direction = 'left', name } = props

  // 根据 direction 动态设置文案和按钮文字
  let content = ''
  let buttonText = ''

  if (direction === 'right') {
    // 右侧消息（通常表示“自己”）
    content = '你已提交房源申请，点击下方按钮或在订单里查看换宿申请'
    buttonText = '点击查看'
  } else {
    // 左侧消息（通常表示“对方”或“房主”）
    content = `${name || '对方'}已提交房源申请，点击下方按钮或在订单页面审核换宿申请`
    buttonText = '点击审核'
  }


  const handleClick = () => {
    Taro.showToast({ title: `处理申请，toUid=${toUid}, subjectId=${subjectId}`, icon: 'none' })
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

export default RequestMessageBox
