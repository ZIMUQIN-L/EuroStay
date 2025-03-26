import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import GlobalStore from '@store/GlobalStore'; 

const RequestMessageBox = (props) => {
  const { isProperty, content, avatar, time, direction = 'left', name, toUid, subjectId } = props
  
  // 根据 direction 动态设置文案和按钮文字
  let message = '';
  let highlightText = '查看';
  let buttonText = '点击查看';
  
  if (direction === 'right') {
    // 右侧消息（通常表示"自己"）
    message = '你已提交房源申请，点击下方按钮或在订单里查看换宿申请：';
    buttonText = '点击查看';
  } else {
    // 左侧消息（通常表示"对方"或"房主"）
    message = `${name || '对方'}已提交房源申请，点击下方按钮或在订单页面审核换宿申请：`;
    highlightText = '审核';
    buttonText = '点击审核';
  }
  
  // 查找高亮文本在消息中的位置
  const highlightIndex = message.indexOf(highlightText);
  
  // 分割消息文本
  let beforeText = '';
  let afterText = '';
  
  if (highlightIndex !== -1) {
    beforeText = message.substring(0, highlightIndex);
    afterText = message.substring(highlightIndex + highlightText.length);
  } else {
    // 如果找不到高亮文本，使用完整消息
    beforeText = message;
  }
  
  const handleClick = () => {
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
        Taro.navigateTo({ url: `/packageOrder/order-detail/index?role=${direction === 'right'?'guest':'host'}&status=awaiting&type=${isProperty?0:1}&id=${subjectId}&experienceId=${res.data.result.experienceId}&title=${res.data.result.title}` });
      }
    })
  }
  
  return (
    <View className={`message-box ${direction}`}>
      {/* 头像 */}
      <Image className='avatar' src={direction === 'left' ? avatar : GlobalStore.userInfo.avatar} />
      
      {/* 气泡内容 */}
      <View className='bubble'>
        {/* 使用嵌套Text实现内联高亮 */}
        <Text className='content'>
          <Text className='normal-text'>{beforeText}</Text>
          <Text className='highlight-text'>{highlightText}</Text>
          <Text className='normal-text'>{afterText}</Text>
        </Text>
        
        <View className='button-wrapper'>
          <Button className='action-button' onClick={handleClick}>
            {buttonText}
          </Button>
        </View>
        
        {/* {time && <Text className='time'>{time}</Text>} */}
      </View>
    </View>
  )
}

export default RequestMessageBox