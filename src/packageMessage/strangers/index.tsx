import { View, Text, Image, ScrollView } from '@tarojs/components'
import { observer } from 'mobx-react'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import './index.scss'
import GlobalStore from '@store/GlobalStore'

const StrangersPage = () => {
  const [strangers, setStrangers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '陌生人打招呼'
    })
    
    fetchStrangers()
  }, [])

  // 获取陌生人打招呼列表
  const fetchStrangers = async () => {
    setLoading(true)
    
    const token = GlobalStore.userInfo.token || Taro.getStorageSync('token')
    
    if (!token) {
      console.error('缺少 token，无法获取陌生人列表')
      setLoading(false)
      return
    }
    
    try {
      // 发送请求获取陌生人列表
      const res = await Taro.request({
        url: 'https://api.eurostay.co/app/esmessages/strangerList',
        method: 'GET',
        header: {
          token: token,
        },
        data: {
          pageNum: 1,
        },
      })
      
      console.log('陌生人列表响应:', res)
      
      if (res.statusCode === 200 && res.data.code === 0) {
        const records = res.data.result.records || []
        
        // 格式化数据
        const formattedStrangers = records.map(record => ({
          id: record.id,
          avatar: record.avatar || 'https://example.com/default-avatar.png',
          name: record.username || `用户${record.fromUid}`,
          message: record.content || '你好，可以聊聊吗？',
          time: formatTime(record.createTime),
          fromUid: record.fromUid,
        }))
        
        setStrangers(formattedStrangers)
      } else {
        console.error('获取陌生人列表失败:', res.data.msg)
        Taro.showToast({
          title: '获取列表失败',
          icon: 'none',
        })
      }
    } catch (error) {
      console.error('网络请求失败:', error)
      Taro.showToast({
        title: '网络请求失败',
        icon: 'none',
      })
    } finally {
      setLoading(false)
    }
  }

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
      
      // 创建会话或获取已有会话ID
      const res = await Taro.request({
        url: 'https://api.eurostay.co/app/esmessages/createSession',
        method: 'POST',
        header: {
          token: token,
          'content-type': 'application/json'
        },
        data: {
          targetUid: stranger.fromUid  // 对方的用户ID
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
        enableFlex
      >
        {loading ? (
          <View className='loading'>加载中...</View>
        ) : strangers.length > 0 ? (
          strangers.map(stranger => (
            <View 
              key={stranger.id} 
              className='stranger-item'
              onClick={() => handleStrangerClick(stranger)}
            >
              <Image className='avatar' src={stranger.avatar} />
              
              <View className='content'>
                <View className='header'>
                  <Text className='name'>{stranger.name}</Text>
                  <Text className='time'>{stranger.time}</Text>
                </View>
                
                <Text className='message'>{stranger.message}</Text>
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