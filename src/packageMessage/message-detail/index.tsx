import { View, Button, Input } from '@tarojs/components'
import { useState } from 'react'
// 假设你已经有以下两个组件
import SimpleMessageBox from '@components/MessageComponents/SimpleMessageBox'
import RequestMessageBox from '@components/MessageComponents/RequestMessageBox'
import RejectMessageBox from '@components/MessageComponents/RejectMessageBox'
import OfferMessageBox from '@components/MessageComponents/OfferMessageBox'
import './index.scss'
import Avatar from '@assets/images/accommodation.svg'


let direction = "left";
const MessageDetail = () => {
  const [inputValue, setInputValue] = useState('')
  // 模拟消息数据
  const [messages] = useState([
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
      type: 'reject',
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
      type: 'reject',
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
    setInputValue(e.detail.value)
  }

  const handleSend = () => {
    // 在这里处理发送逻辑
    console.log('Send message:', inputValue)
    setInputValue('')
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
      case 'reject':
        return (
          <RejectMessageBox
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
      {/* 消息列表区域 */}
      <View className='message-list'>
        {messages.map((msg, index) => (
          <View key={`${msg.id}-${index}`} className='message-wrapper'>
            {renderMessage(msg)}
          </View>
        ))}
      </View>

      {/* 底部输入框区域 */}
      <View className='input-box'>
        <Input
          className='input'
          value={inputValue}
          onInput={handleInput}
          placeholder='请输入...'
        />
        {/* <Button className='send-btn' onClick={handleSend}>
          
        </Button> */}
      </View>
    </View>
  )
}

export default MessageDetail
