import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import extraImg from '@assets/images/test-paycode.jpg'

const OfferMessageBox = (props) => {
  const { avatar, time, direction = 'left', hostname, applicantname, price } = props

  // 根据 direction 动态设置文案和按钮文字
  let content = ''
  let buttonText = ''

  if (direction === 'right') {
    // 右侧消息（通常表示“自己”）
    content = `你已经通过了${applicantname}的换宿申请。点击下方或在订单栏查看订单详情`
    buttonText = '点击查看'
  } else {
    // 左侧消息（通常表示“对方”或“房主”）
    content = `${hostname}已通过你的换宿申请，请点击下方按钮确认你将入住此房屋，并扫下方二维码支付此次换宿费用${price}`
    buttonText = '已付款'
  }

  const handleClick = () => {
    Taro.showToast({ title: `处理申请`, icon: 'none' })
  }

  return (
    <View className={`message-box ${direction}`}>
      {/* 头像 */}
      <Image className='avatar' src={avatar} />

      {/* 气泡内容 */}
      <View className='bubble'>
        <Text className='content'>{content}</Text>
        {/* 如果是左侧消息，则在按钮上方显示额外图片 */}
        {direction === 'left' && (
          <Image className='extra-image' src={extraImg} />
        )}
        <Button className='bottom-btn' onClick={handleClick}>
          {buttonText}
        </Button>
      </View>
    </View>
  )
}

export default OfferMessageBox
