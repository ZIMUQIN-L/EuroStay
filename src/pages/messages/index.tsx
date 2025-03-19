import { View, Text, Image } from '@tarojs/components'
import { observer } from 'mobx-react'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import './index.scss' // 记得在这里引入自己的样式文件
import GlobalStore from '@store/GlobalStore'

const Index = () => {




  const specialMessages = [
    {
      id: 'stranger',
      avatar: 'https://example.com/avatar1.png',
      name: '陌生人打招呼',
      message: 'Anna: 你好啊！刚刚刷到你的房子感觉超级美...',
      time: '11:20 am',
      type: 'stranger', // 标记为陌生人类型
      unread: 1, // 未读数量
    },
    {
      id: 'system',
      avatar: 'https://example.com/avatar2.png',
      name: '系统消息',
      message: '你有一个待评价的订单，需要评价完成后才可以接下新的订单...',
      time: '11:20 am',
      type: 'system', // 标记为系统消息类型
      unread: 1, // 未读数量
    },
  ];
  
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


  useEffect(() => {
    // 1. 获取 token
    const token = GlobalStore.userInfo.token;
    const uid = GlobalStore.userInfo.uid;
    console.log('拿到的 token:', token, "uid", uid)
    fetchMessages();



  }, []) // 空数组确保只在组件初次挂载时执行


  const fetchMessages = async () => {
    const token = GlobalStore.userInfo.token || Taro.getStorageSync('token');
  
    if (!token) {
      console.error('缺少 token，无法获取消息列表');
      return;
    }
  
    try {
      // 发送请求
      const res = await Taro.request({
        url: 'https://api.eurostay.co/app/esmessages/sessionList',
        method: 'GET',
        header: {
          token: token, // 传递 token 进行身份验证
        },
        data: {
          pageNum: 1, // 分页参数
        },
      });
  
      console.log('sessionList 响应:', res);
  

      if (res.statusCode === 200 && res.data.code === 0) {
        const records = res.data.result.records || [];
  

        const formattedMessages = records.map((record) => ({
          id: record.id,
          avatar: 'https://example.com/avatar4.png',
          name: `User ${record.initUid}`,
          message: record.topMessage,
          time: formatTime(record.updateTime),
        }));
  
        // 更新 `messages` 状态
        setMessages(formattedMessages);
      } else {
        console.error('获取消息列表失败:', res.data.msg);
      }
    } catch (error) {
      console.error('网络请求失败:', error);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
  };

  const handleItemClick = (id, name) => {
    console.log("id from session list", id);
    // 这里把消息的 id 传给详情页
    Taro.navigateTo({
      url: `/packageMessage/message-detail/index?id=${id}&name=${encodeURIComponent(name)}`,
    })
  }

    // 处理特殊消息项点击
    const handleSpecialItemClick = (item) => {
      if (item.type === 'stranger') {
        // 陌生人打招呼，导航到陌生人列表页
        Taro.navigateTo({
          url: `/packageMessage/strangers/index`,
        })
      } else {
        // 系统消息，导航到消息详情页
        Taro.navigateTo({
          url: `/packageMessage/message-detail/index?id=${item.id}&name=${encodeURIComponent(item.name)}`,
        })
      }
    }

  return (
    <View className='home-messages'>
      {/* 头部标题或其它内容可以放这里 */}
      <View className='title'>消息</View>
      {specialMessages.map((item) => (
        <View
          className='message-item special-item'
          key={item.id}
          onClick={() => handleSpecialItemClick(item)}
        >
          <View className='avatar-container'>
            <Image className='avatar' src={item.avatar} />
            {/* {item.unread > 0 && (
              <View className='unread-badge'>{item.unread}</View>
            )} */}
          </View>
          <View className='message-content'>
            <View className='message-header'>
              <Text className='name'>{item.name}</Text>
              <Text className='time'>{item.time}</Text>
            </View>
            <Text className='message-text'>{item.message}</Text>
          </View>
        </View>
      ))}

      {/* 消息列表 */}
      {messages.map((item) => (
                <View
                className='message-item'
                key={item.id}
                onClick={() => handleItemClick(item.id, item.name)}
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
