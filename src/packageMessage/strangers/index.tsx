import { View, Text, Image, ScrollView } from '@tarojs/components'
import { observer } from 'mobx-react'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import './index.scss'
import GlobalStore from '@store/GlobalStore'
// 移除自定义导航栏，与消息列表页保持一致
// import CustomNavBarStranger from '@components/MessageComponents/message-detail-nav-bar-stranger'

const StrangersPage = () => {
  const [strangers, setStrangers] = useState([])
  const [loading, setLoading] = useState(true)
  const myUid = GlobalStore.userInfo.uid || Taro.getStorageSync('uid')


  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '陌生人打招呼'
    })
    
    // 首先尝试从本地存储中获取陌生人消息
    const localStrangers = Taro.getStorageSync('strangerMessages')
    if (localStrangers) {
      try {
        const parsedStrangers = JSON.parse(localStrangers)
        if (Array.isArray(parsedStrangers) && parsedStrangers.length > 0) {
          setStrangers(parsedStrangers)
          setLoading(false)
          console.log("27", parsedStrangers);
          return
        }
      } catch (error) {
        console.error('解析本地陌生人消息失败:', error)
      }
    }
  }, [])



  // 格式化时间
  const formatTime = (dateString) => {
    if (!dateString) return ''
    
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    
    // 今天内的消息显示时:分
    if (diff < 24 * 60 * 60 * 1000 && 
        date.getDate() === now.getDate()) {
      return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
    }
    
    // 一周内的消息显示星期几
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = ['日', '一', '二', '三', '四', '五', '六']
      return `星期${days[date.getDay()]}`
    }
    
    // 更早的消息显示年-月-日
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  // 处理点击陌生人项目
  const handleStrangerClick = (stranger) => {
    // 创建新的会话或进入已有会话
    startConversation(stranger)
  }

  // 创建或进入会话
  const startConversation = async (stranger) => {
    try {
      const token = GlobalStore.userInfo.token || Taro.getStorageSync('token')
      
      // 如果已经有会话ID，直接跳转
      if (stranger.id) {
        Taro.navigateTo({
          url: `/packageMessage/message-detail/index?id=${stranger.id}&name=${encodeURIComponent(stranger.name)}`
        })
        return
      }
      
      // 否则创建会话或获取已有会话ID
      const targetUid = stranger.fromUid || stranger.otherUid
      
      if (!targetUid) {
        Taro.showToast({
          title: '无效的用户ID',
          icon: 'none'
        })
        return
      }
      
      const res = await Taro.request({
        url: 'https://api.eurostay.co/app/esmessages/createSession',
        method: 'POST',
        header: {
          token: token,
          'content-type': 'application/json'
        },
        data: {
          targetUid: targetUid  // 对方的用户ID
        }
      })
      
      console.log('创建会话响应:', res)
      
      if (res.statusCode === 200 && res.data.code === 0) {
        const sessionId = res.data.result
        
        // 导航到消息详情页
        Taro.navigateTo({
          url: `/packageMessage/message-detail/index?id=${sessionId}&name=${encodeURIComponent(stranger.name)}`
        })
      } else {
        Taro.showToast({
          title: '创建会话失败',
          icon: 'none'
        })
      }
    } catch (error) {
      console.error('创建会话失败:', error)
      Taro.showToast({
        title: '网络错误',
        icon: 'none'
      })
    }
  }

  return (
    <View className='strangers-page'>

      
      <ScrollView 
        className='strangers-list' 
        scrollY
      >
        {loading ? (
          <View className='loading'>加载中...</View>
        ) : strangers.length > 0 ? (
          strangers.map(stranger => (
            <View 
              key={stranger.id || stranger.otherUid} 
              className='stranger-item'
              onClick={() => handleStrangerClick(stranger)}
            >
              <Image className='avatar' src={stranger.otherUid === myUid ? stranger.otherAvatar : stranger.selfAvatar} />
              
              <View className='content'>
                <View className='header'>
                  <Text className='name'>{stranger.name}</Text>
                  <Text className='time'>{stranger.rawData.createTime}</Text>
                </View>
                
                <Text className='message'>{stranger.rawData.content}</Text>
              </View>
            </View>
          ))
        ) : (
          <View className='empty-list'>
            <Text className='empty-text'>暂无陌生人消息</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default observer(StrangersPage)