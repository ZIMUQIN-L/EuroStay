import { View, Text, Input, Button } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';
import { Message, MessageType } from './MessageTypes';

const MessageDetail: React.FC = () => {
    const listingInfo = {
        dateRange: '12.23-12.25',
        location: '巴黎市中心公寓近地铁',
        price: '300旅行币',
        status: '等待host通过',
    };

    const [messages, setMessages] = useState([
      {
        id: '1',
        type: 'request',
        sender: 'user',
        time: '2024-10-11 09:43',
        direction: 'right',
        content: '我发送了一个入住申请',
        data: {
          toUid: 68,
          subjectId: 5,
          content: 'example new request',
        },
      },
      {
        id: '2',
        type: 'reply',
        sender: 'host',
        time: '2024-10-11 09:45',
        direction: 'left',
        content: '已通过您的入住申请，请确认预定。',
        data: {
          toUid: 68,
          answerTo: '1',
          content: 'answer to message 1',
        },
      },
      {
        id: '3',
        type: 'question',
        sender: 'host',
        time: '2024-10-11 09:50',
        direction: 'left',
        content: '请问入住日期是否确定？',
        data: {
          toUid: 67,
          content: 'example question',
        },
      },
      // 其他示例消息...
    ]);
    const [selectedType, setSelectedType] = useState<MessageType>('user'); // 选择的消息类型
  const [inputValue, setInputValue] = useState(''); // 消息输入框内容


  // 处理发送消息
  const handleSend = () => {
    if (inputValue.trim()) {
      let newMessage: Message;

      switch (selectedType) {
        case 'request':
          newMessage = {
            id: `${messages.length + 1}`,
            type: 'request',
            sender: 'user',
            time: new Date().toLocaleString(),
            direction: 'right',
            content: inputValue,
            data: {
              toUid: 68,
              subjectId: 5,
              content: inputValue,
            },
          };
          break;
        case 'question':
          newMessage = {
            id: `${messages.length + 1}`,
            type: 'question',
            sender: 'user',
            time: new Date().toLocaleString(),
            direction: 'right',
            content: inputValue,
            data: {
              toUid: 67,
              content: inputValue,
            },
          };
          break;
        case 'reply':
          // 假设回复的目标消息 id 是最后一个问题消息的 id
          const lastQuestion = [...messages].reverse().find(msg => msg.type === 'question');
          newMessage = {
            id: `${messages.length + 1}`,
            type: 'reply',
            sender: 'user',
            time: new Date().toLocaleString(),
            direction: 'right',
            content: inputValue,
            data: {
              toUid: 68,
              answerTo: lastQuestion ? lastQuestion.id : '',
              content: inputValue,
            },
          };
          break;
        case 'user':
        case 'host':
        default:
          newMessage = {
            id: `${messages.length + 1}`,
            type: 'user',
            sender: 'user',
            time: new Date().toLocaleString(),
            direction: 'right',
            content: inputValue,
          };
      }

      setMessages([...messages, newMessage]); // 添加新消息
      setInputValue(''); // 清空输入框
    }
  };

  // 根据消息类型渲染不同内容
  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case 'request':
        return (
          <View className="request-message">
            <Text className="request-content">{message.data.content}</Text>
            <Text className="request-details">
              To UID: {message.data.toUid}, Subject ID: {message.data.subjectId}
            </Text>
          </View>
        );
      case 'question':
        return (
          <View className="question-message">
            <Text className="question-content">{message.data.content}</Text>
          </View>
        );
      case 'reply':
        return (
          <View className="reply-message">
            <Text className="reply-content">{message.data.content}</Text>
            <Text className="reply-to">Answer to message ID: {message.data.answerTo}</Text>
          </View>
        );
      case 'user':
      case 'host':
      default:
        return <Text className="content">{message.content}</Text>;
    }
  };

  return (
    <View className="message-detail">
    {/* 顶部房源提示栏 */}
      <View className="listing-bar">
        <View className="image-placeholder" />
        <View className="listing-info">
          <Text className="date-range">{listingInfo.dateRange} · {listingInfo.location}</Text>
          <Text className="price">
            <Text className="bold">挂牌?价 </Text>{listingInfo.price}
          </Text>
          <Text className="status">{listingInfo.status}</Text>
        </View>
      </View>
      {/* 消息列表 */}
      <View className="messages">
        {messages.map((message) => (
          <View
            key={message.id}
            className={`message-item ${message.direction === 'right' ? 'right' : 'left'}`}
          >
            <View className="message-content">
              <Text className="sender">{message.sender === 'user' ? '我' : '对方'}</Text>
              <Text className="time">{message.time}</Text>
              {renderMessageContent(message)}
            </View>
          </View>
        ))}
      </View>
    {/* 底部输入栏 */}
    <View className="message-bar">
        <Input
          className="input"
          placeholder="发送消息..."
          value={inputValue}
          onInput={e => setInputValue(e.detail.value)}
        />
        <Button className="send-button" onClick={handleSend}>
          发送
        </Button>
      </View>
    </View>
  );
};

export default MessageDetail;
