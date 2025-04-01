import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
// import extraImg from '@assets/images/test-paycode.jpg'
import GlobalStore from '@store/GlobalStore'; 

const OfferMessageBox = (props) => {
  const { avatar, time, direction = 'left', hostname, applicantname, price, active = true, isProperty, subjectId } = props
  
  // 根据 direction 动态设置文案和按钮文字
  let content = ''
  let leftButtonText = ''
  let rightButtonText = ''
  let singleButtonText = ''
  
  if (direction === 'right') {
    // 右侧消息（通常表示"自己"）
    content = `你已经通过了${applicantname}的换宿申请。点击下方或在订单栏查看订单详情`
    singleButtonText = '点击查看'
  } else {
    // 左侧消息（通常表示"对方"或"房主"）
    content = `${hostname}已通过你的换宿申请，请点击下方按钮确认你将入住此房屋，并扫下方二维码支付此次换宿费用`
    leftButtonText = '前往付款'
    rightButtonText = '前往拒绝'
  }
  
  const handleSingleButtonClick = () => {
    Taro.request({
        url: isProperty ? `https://api.eurostay.co/app/property/showReservationInfo` : 'https://api.eurostay.co/app/activity/showReservationInfo',
        method: 'POST',
        header: {
            token: GlobalStore.userInfo.token,
        },
        data: {
            id: Number(subjectId),
        },
        success: (res) => {
          console.log(subjectId);
          console.log(res);
          Taro.navigateTo({ url: `/packageOrder/order-detail/index?role=host&status=awaiting&type=${isProperty?0:1}&id=${subjectId}&experienceId=${res.data.result.experienceId}&title=${res.data.result.title}` });
        }
      })
  }
  
  // 当点击"已付款"按钮时，调用 onPaid 回调
  const handleLeftButtonClick = () => {
    Taro.request({
        url: isProperty ? `https://api.eurostay.co/app/property/showReservationInfo` : 'https://api.eurostay.co/app/activity/showReservationInfo',
        method: 'POST',
        header: {
            token: GlobalStore.userInfo.token,
        },
        data: {
            id: Number(subjectId),
        },
        success: (res) => {
          Taro.navigateTo({ url: `/packageOrder/order-detail/index?role=guest&status=awaiting&type=${isProperty?0:1}&id=${subjectId}&experienceId=${res.data.result.experienceId}&title=${res.data.result.title}` });
        }
      })
  }
  
  const handleRightButtonClick = () => {
    Taro.request({
        url: isProperty ? `https://api.eurostay.co/app/property/showReservationInfo` : 'https://api.eurostay.co/app/activity/showReservationInfo',
        method: 'POST',
        header: {
            token: GlobalStore.userInfo.token,
        },
        data: {
            id: Number(subjectId),
        },
        success: (res) => {
          console.log(subjectId);
          console.log(res);
          Taro.navigateTo({ url: `/packageOrder/order-detail/index?role=guest&status=awaiting&type=${isProperty?0:1}&id=${subjectId}&experienceId=${res.data.result.experienceId}&title=${res.data.result.title}` });
        }
      })
  }
  
  return (
    <View className={`message-box ${direction}`}>
      {/* 头像 */}
      <Image className='avatar' src={direction === 'left' ? avatar : GlobalStore.userInfo.avatar} />
      
      {/* 气泡内容 */}
      <View className='bubble'>
        <Text className='content'>{content}</Text>
        
        {/* 如果是左侧消息，则在按钮上方显示额外图片 */}
        {/* {direction === 'left' && (
          <Image className='extra-image' src={extraImg} />
        )} */}
        
        {/* 不同 direction，输出不同的按钮区域 */}
        {direction === 'right' ? (
          // ✅ 右侧时，仅一个按钮，带 active 控制
          <Button
            className={`action-button single-btn ${!active ? 'disabled' : ''}`}
            onClick={handleSingleButtonClick}
            disabled={!active}
          >
            {singleButtonText}
          </Button>
        ) : (
          // ✅ 左侧时，两个按钮，带 active 控制
          <View className='button-group'>
            <Button
              className={`action-button group-btn ${!active ? 'disabled' : ''}`}
              onClick={handleLeftButtonClick}
              disabled={!active}
            >
              {leftButtonText}
            </Button>
            <Button
              className={`action-button group-btn ${!active ? 'disabled' : ''}`}
              onClick={handleRightButtonClick}
              disabled={!active}
            >
              {rightButtonText}
            </Button>
          </View>
        )}
      </View>
    </View>
  )
  
}

export default OfferMessageBox