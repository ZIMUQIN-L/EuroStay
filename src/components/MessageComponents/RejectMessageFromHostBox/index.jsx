import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import GlobalStore from '@store/GlobalStore'; 
import Taro from '@tarojs/taro'

const RejectMessageFromHostBox = (props) => {
    const { avatar, name, time, reason, direction = 'left', toUid } = props

    // 根据 direction 动态设置文案
    let content = ''
    if (direction === 'right') {
      content = `您已经拒绝换宿申请，拒绝理由是：${reason}`
    } else {
      content = `${name}已拒绝了你的换宿申请，拒绝理由如下：${reason}`
    }

    return (
      <View className={`message-box ${direction}`}>
        {/* 头像 */}
        <Image className='avatar' src={direction === 'left' ? avatar : GlobalStore.userInfo.avatar} 
        onClick={() => {
          if (direction === 'left') {
            Taro.navigateTo({ url: `/pages/user/index?uid=${toUid}` });
          } else {
            Taro.navigateTo({ url: `/pages/user/index?uid=${GlobalStore.userInfo.uid}` });
          }
        }}/>

        {/* 氣泡内容 */}
        <View className='bubble'>
          <Text className='content'>{content}</Text>
        </View>
      </View>
    )
}

export default RejectMessageFromHostBox
