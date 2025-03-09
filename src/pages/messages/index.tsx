import { View, Text, Image } from '@tarojs/components'
import { observer } from 'mobx-react'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import './index.scss' // 记得在这里引入自己的样式文件

const Index = () => {
  // 模拟一些消息数据
  const [messages, setMessages] = useState([
    {
      id: 1,
      avatar: 'https://example.com/avatar1.png',
      name: 'Anna',
      message: '你好啊！刚刚刷到你的房子感觉超级美...',
      time: '11:20 am',
    },
    {
      id: 2,
      avatar: 'https://example.com/avatar2.png',
      name: '系统消息',
      message: '你有一个待评价的订单，需要评价完成后才可以接下新的订单...',
      time: '11:20 am',
    },
    {
      id: 3,
      avatar: 'https://example.com/avatar3.png',
      name: '下单子想当一棵草',
      message: '谢谢你的喜欢',
      time: '11:20 am',
    },
    {
      id: 4,
      avatar: 'https://example.com/avatar4.png',
      name: 'Andre Zeng',
      message: '这房子可以住几个人呀？',
      time: '11:20 am',
    },
    {
      id: 5,
      avatar: 'https://example.com/avatar5.png',
      name: 'Jackie Li',
      message: '我们几点可以入住？',
      time: '11:20 am',
    },
  ])


  const handleItemClick = (id) => {
    console.log("id from session list", id);
    // 这里把消息的 id 传给详情页
    Taro.navigateTo({
      url: `/packageMessage/message-detail/index?id=${id}`,
    })
  }

  return (
    <View className='home-messages'>
      {/* 头部标题或其它内容可以放这里 */}
      <View className='title'>消息</View>

      {/* 消息列表 */}
      {messages.map((item) => (
                <View
                className='message-item'
                key={item.id}
                onClick={() => handleItemClick(item.id)}
              >
          <Image className='avatar' src={item.avatar} />
          <View className='message-content'>
            <View className='message-header'>
              <Text className='name'>{item.name}</Text>
              <Text className='time'>{item.time}</Text>
            </View>
            <Text className='message-text'>{item.message}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

export default observer(Index)
