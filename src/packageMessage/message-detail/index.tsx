import { View, Button, Input, ScrollView } from '@tarojs/components'
import { useState } from 'react'
// 假设你已经有以下两个组件
import SimpleMessageBox from '@components/MessageComponents/SimpleMessageBox'
import RequestMessageBox from '@components/MessageComponents/RequestMessageBox'
import RejectMessageFromHostBox from '@components/MessageComponents/RejectMessageFromHostBox'
import RejectMessageFromGuestBox from '@components/MessageComponents/RejectMessageFromGuestBox'
import OfferMessageBox from '@components/MessageComponents/OfferMessageBox'
import './index.scss'
import Avatar from '@assets/images/accommodation.svg'
import CustomNavBar from '@components/MessageComponents/message-detail-nav-bar'
import Taro from '@tarojs/taro'
import ContactMessageBox from '@components/MessageComponents/ContactMessageBox'


let direction = "left";
const MessageDetail = () => {
  const router = Taro.getCurrentInstance().router
  const { id, name } = router?.params || {}
  
  const [inputValue, setInputValue] = useState('')
  const [scrollTop, setScrollTop] = useState(0)
  // 模拟消息数据
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'request',
      data: {
        toUid: 68,
        subjectId: 5,
        name: 'xiaxia(applicant)',
        time: '09:10'
      },
      direction: "left"
    },
    {
      id: 1,
      type: 'request',
      data: {
        toUid: 68,
        subjectId: 5,
        name: 'xiaxia(applicant)',
        time: '09:10'
      },
      direction: "right"
    },
    {
      id: 2,
      type: 'simple',
      data: {
        toUid: 68,
        subjectId: 5,
        content: 'hello你可以直接在样式文件（例如 index.scss）中调大头像尺寸，并增加头像与消息气泡之间的 margin 间距。下面给你一个示例，可根据需要再做微调。',
        time: '09:10'
      },
      direction: "left"
    },
    {
      id: 3,
      type: 'simple',
      data: {
        toUid: 68,
        subjectId: 5,
        content: 'hello2你可以直接在样式文件（例如 index.scss）中调大头像尺寸，并增加头像与消息气泡之间的 margin 间距。下面给你一个示例，可根据需要再做微调。',
        time: '09:10'
      },
      direction: "right"
    },
    {
      id: 3,
      type: 'reject-fh',
      data: {
        toUid: 68,
        subjectId: 5,
        name: 'fish(host)',
        reason: '档期不合适',
        time: '09:10'
      },
      direction: "left"
    },
    {
      id: 3,
      type: 'reject-fh',
      data: {
        toUid: 68,
        subjectId: 5,
        name: 'fish(host)',
        reason: '档期不合适',
        time: '09:10'
      },
      direction: "right"
    },
    {
      id: 3,
      type: 'reject-fg',
      data: {
        toUid: 68,
        subjectId: 5,
        name: 'xiaxia(applicant)',
        reason: '对不起, 我只能取消预定',
        time: '09:10'
      },
      direction: "left"
    },
    {
      id: 3,
      type: 'reject-fg',
      data: {
        toUid: 68,
        subjectId: 5,
        name: 'xiaxia(applicant)',
        reason: '对不起, 我只能取消预定',
        time: '09:10'
      },
      direction: "right"
    },
    {
      id: 3,
      type: 'offer',
      data: {
        toUid: 68,
        subjectId: 5,
        hostname: 'fish(host)',
        applicantname: 'xiaxia(applicant)',
        price: '$456.22',
        time: '09:10'
      },
      direction: "left"
    },
    {
      id: 3,
      type: 'offer',
      data: {
        toUid: 68,
        subjectId: 5,
        hostname: 'fish(host)',
        applicantname: 'xiaxia(applicant)',
        price: '$456.22',
        time: '09:10'
      },
      direction: "right"
    }
  ])


  const handleInput = (e) => {
    // Taro / 小程序里通常是 e.detail.value
    setInputValue(e.detail.value)
  }

  // 点击发送
  const handleSend = () => {
    if (!inputValue.trim()) {
      return
    }

    // 创建一个新的消息对象
    const newMessage = {
      id: new Date().getTime(), // 用时间戳来模拟一个唯一id
      type: 'simple',
      data: {
        toUid: 68,
        subjectId: 5,
        content: inputValue,     // 这里就是你刚才输入的内容
        time: '09:10'           // 或者用格式化后的当前时间
      },
      direction: 'right'
    }

    // 将新消息追加到消息列表
    setMessages([...messages, newMessage])
    // 发送后清空输入框
    setInputValue('')

    setScrollTop(9999999)
  }



  const handlePaid = () => {
    // 在这里写你需要的逻辑
    console.log('用户点击了已付款');
    // 1. 构造一个新的消息对象
    const newMessage = {
      id: '1', // 用时间戳做简单ID，或根据实际需求生成
      type: 'contact',
      data: {
        time: '13:02', // 你可以放真实的时间字符串
        // 其它需要给 ContactMessageBox 的字段
      },
      direction: 'right' // 或者 'left'，看你业务场景
    };

    setMessages([...messages, newMessage])
    setScrollTop(9999999);

  }


  const handleRejectFromGuest = () => {
    const newMessage = {
      id: '1', // 用时间戳做简单ID，或根据实际需求生成
      type: 'reject-fg',
      data: {
        toUid: 68,
        subjectId: 5,
        name: 'xiaxia(applicant)',
        reason: '对不起, 我只能取消预定',
        time: '09:10'
      },
      direction: 'right' // 或者 'left'，看你业务场

    };

    setMessages([...messages, newMessage])
    setScrollTop(9999999);
  }
  
  const handleHostCheckSub = () => {
    console.log('handleHostCheckSub');
  }
  

  // 根据不同的 type 来渲染对应的组件
  const renderMessage = (msg) => {
    switch (msg.type) {
      case 'request':
        return (
          <RequestMessageBox
            // 这里把 data 内的字段作为 props 传给 RequestMessageBox
            avatar={Avatar}
            name={msg.data.name}
            time={msg.data.time}
            direction={msg.direction}
          />
        )
      case 'simple':
        return (
          <SimpleMessageBox
            avatar={Avatar}
            content={msg.data.content}
            time={msg.data.time}
            direction={msg.direction}
          />
        )
      case 'reject-fh':
        return (
          <RejectMessageFromHostBox
            avatar={Avatar}
            name={msg.data.name}
            time={msg.data.time}
            reason={msg.data.reason}
            direction={msg.direction}
          />
        )
      case 'reject-fg':
        return (
          <RejectMessageFromGuestBox
            avatar={Avatar}
            name={msg.data.name}
            time={msg.data.time}
            reason={msg.data.reason}
            direction={msg.direction}
          />
        )
      case 'offer':
        return (
          <OfferMessageBox
            avatar={Avatar}
            hostname={msg.data.hostname}
            applicantname={msg.data.applicantname}
            time={msg.data.time}
            price={msg.data.price}
            direction={msg.direction}
            onPaid={handlePaid}
            onReject={handleRejectFromGuest}
            onCheckSub = {handleHostCheckSub}
          />
        )
      case 'contact':
        return (
          <ContactMessageBox
            avatar={Avatar}
            time={msg.data.time}
            direction={msg.direction}
          />
        )       
      default:
        return (
          <SimpleMessageBox
            avatar={Avatar}
            content={msg.data.content}
            time={msg.data.time}
            direction="left"
          />
        )
    }
  }

  return (
    <View className='message-detail'>
      <CustomNavBar title={name} avatar='...' />
      {/* 消息列表区域 */}
      <ScrollView 
          className='message-list'  
          scrollY
          scrollTop={scrollTop}
          >
        {messages.map((msg, index) => (
          <View key={`${msg.id}-${index}`} className='message-wrapper'>
            {renderMessage(msg)}
          </View>
        ))}
      </ScrollView>

        {/* 底部输入框区域 */}
        <View className='input-box'>
        <Input
          className='input'
          value={inputValue}
          onInput={handleInput}
          placeholder='请输入...'
        />
        <View className='send-btn' onClick={handleSend}>
         ↑
        </View>
      </View>
    </View>
  )
}

export default MessageDetail
