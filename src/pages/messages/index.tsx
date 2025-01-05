import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import MessageCard from '@components/MessageCard';
import './index.scss';
import Taro from '@tarojs/taro';
import CustomTabBar from '@components/CustomTabBar';

const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('全部');
  const tags = ['全部消息', '私信', '系统'];
  useEffect(() => {
    const fetchMessages = async () => {
      const data = [
        {
          id: '1',
          title: '佳雪',
          status: '等待host通过',
          timestamp: '17:09',
          description: '我：发送了一个入住申请',
          dateAndLocation: '12.23-12.25·巴黎市中心公寓近地铁',
        },
        {
          id: '2',
          title: '速食主义',
          status: 'host已通过',
          timestamp: '17:01',
          description: '已通过您的入住申请，请确认预定',
          dateAndLocation: '12.05-12.08·那不勒斯老城区公寓',
        },
        {
          id: '3',
          title: '年糕',
          status: '已关闭',
          timestamp: '10-17',
          description: 'host未通过，交易已关闭',
          dateAndLocation: '12.23-12.25·巴黎市中心公寓近地铁',
        },
      ];
      setMessages(data);
    };
    setSelectedTag('全部消息');
    fetchMessages();
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    // 可在此处添加过滤逻辑，根据选中的标签过滤消息
  };

  const handleCardClick = (id: string) => {
    Taro.navigateTo({
      url: `/packageUser/message-detail/index?id=${id}`, // 跳转到详情页面
    });
  };

  return (
    <View className="travel-page">
      {/* 标签列表 */}
      <View className="tag-list">
        {tags.map(tag => (
          <View
            key={tag}
            className={`tag ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </View>
        ))}
      </View>
      <View className="message-list">
        {messages.map(message => (
          <MessageCard
            key={message.id}
            title={message.title}
            status={message.status}
            timestamp={message.timestamp}
            description={message.description}
            dateAndLocation={message.dateAndLocation}
            onClick={() => handleCardClick(message.id)}
            imageSrc="test"
          />
        ))}
      </View>
      <CustomTabBar />
    </View>
  );
};

export default MessagesPage;