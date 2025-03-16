import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import extraImg from '@assets/images/test-paycode.jpg'

const OfferMessageBox = (props) => {
  const { avatar, time, direction = 'left', hostname, applicantname, price, onPaid, onReject, onCheckSub } = props

  // 根据 direction 动态设置文案和按钮文字
  let content = ''
  let leftButtonText = ''
  let rightButtonText = ''
  let singleButtonText = ''

  if (direction === 'right') {
    // 右侧消息（通常表示“自己”）
    content = `你已经通过了${applicantname}的换宿申请。点击下方或在订单栏查看订单详情`
    singleButtonText = '点击查看'
  } else {
    // 左侧消息（通常表示“对方”或“房主”）
    content = `${hostname}已通过你的换宿申请，请点击下方按钮确认你将入住此房屋，并扫下方二维码支付此次换宿费用${price}`
    leftButtonText = '已付款'
    rightButtonText = '取消申请'
  }


  const handleSingleButtonClick = () => {
    if (onCheckSub) {
      onCheckSub() // 把订单ID等必要信息也可以从props传入再回传
    } else {
      Taro.showToast({ title: '点onCheckSub', icon: 'none' })
    }
  }
  // 当点击“已付款”按钮时，调用 onPaid 回调
  const handleLeftButtonClick = () => {
    if (onPaid) {
      onPaid() // 把订单ID等必要信息也可以从props传入再回传
    } else {
      Taro.showToast({ title: '点击了已付款按钮，但未传回调', icon: 'none' })
    }
  }

  const handleRightButtonClick = () => {
    // Taro.showToast({ title: '点击了取消申请按钮', icon: 'none' })
    if (onReject) {
      onReject() // 把订单ID等必要信息也可以从props传入再回传
    } else {
      Taro.showToast({ title: '点onReject，但未传回调', icon: 'none' })
    }
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
        {/* 不同 direction，输出不同的按钮区域 */}
        {direction === 'right' ? (
          /* 右侧时，仅一个按钮 */
          <Button className='single-btn' onClick={handleSingleButtonClick}>
            {singleButtonText}
          </Button>
        ) : (
          /* 左侧时，两个按钮 */
          <View className='button-group'>
            <Button className='action-btn' onClick={handleLeftButtonClick}>
              {leftButtonText}
            </Button>
            <Button className='action-btn' onClick={handleRightButtonClick}>
              {rightButtonText}
            </Button>
          </View>
        )}
      </View>
    </View>
  )
}

export default OfferMessageBox
