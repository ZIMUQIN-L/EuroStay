import { View, Text, Input, Button } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';

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
        sender: 'user', // 当前用户
        time: '2024-10-11 09:43',
        direction: 'right',
        content: '我发送了一个入住申请',
    },
    {
        id: '2',
        sender: 'host', // 对方
        time: '2024-10-11 09:45',
        direction: 'left',
        content: '已通过您的入住申请，请确认预定。',
    },
    {
        id: '3',
        sender: 'host', // 对方
        time: '2024-10-11 09:45',
        direction: 'left',
        content: '已通过您的入住申请，请确认预定。',
    },
    {
        id: '4',
        sender: 'host', // 对方
        time: '2024-10-11 09:45',
        direction: 'left',
        content: '已通过您的入住申请，请确认预定。',
    },
    {
        id: '2',
        sender: 'host', // 对方
        time: '2024-10-11 09:45',
        direction: 'left',
        content: '已通过您的入住申请，请确认预定。',
    },
    {
        id: '2',
        sender: 'host', // 对方
        time: '2024-10-11 09:45',
        direction: 'left',
        content: '已通过您的入住申请，请确认预定。',
    },
    {
        id: '2',
        sender: 'host', // 对方
        time: '2024-10-11 09:45',
        direction: 'left',
        content: '已通过您的入住申请，请确认预定。',
    },
    {
        id: '2',
        sender: 'host', // 对方
        time: '2024-10-11 09:45',
        direction: 'left',
        content: '已通过您的入住申请，请确认预定。',
    },
    {
        id: '2',
        sender: 'host', // 对方
        time: '2024-10-11 09:45',
        direction: 'left',
        content: '已通过您的入住申请，请确认预定。',
    },
    ]);

  const [inputValue, setInputValue] = useState(''); // 消息输入框内容


    // 处理发送消息
    const handleSend = () => {
        if (inputValue.trim()) {
            const newMessage = {
            id: `${messages.length + 1}`,
            sender: 'user',
            time: new Date().toLocaleString(),
            direction: 'right',
            content: inputValue,
            };
            setMessages([...messages, newMessage]); // 添加新消息
            setInputValue(''); // 清空输入框
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
      <View className="messages">
        {messages.map(message => (
          <View
            key={message.id}
            className={`message-item ${message.direction === 'right' ? 'right' : 'left'}`}
          >
            <View className="message-content">
              <Text className="sender">
                {message.sender === 'user' ? '我' : '对方'}
              </Text>
              <Text className="time">{message.time}</Text>
              <Text className="content">{message.content}</Text>
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
