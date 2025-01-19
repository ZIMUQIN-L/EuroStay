import { View, Text, Input, Button, Image } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';
import { Message, MessageType } from './MessageTypes';
import Avatar from '@assets/images/default-avatar.png';
import PopUpCardReplyQuestion from '../pop-up-card-reply-question';
import Taro from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';

const MessageDetail: React.FC = () => {
    const listingInfo = {
        dateRange: '12.23-12.25',
        location: '巴黎市中心公寓近地铁',
        price: '300旅行币',
        status: '等待host通过',
    };

    const listOffer = {
      dateRange: '12.23-12.25',
      location: '巴黎市中心公寓近地铁',
      price: '300旅行币',
    }

    const [isPopupVisible, setPopupVisible] = useState(false);
    const [replyingToMessageId, setReplyingToMessageId] = useState<string | null>(null);
    const handleReplyQuestionClick = (messageId: string) => {
      setReplyingToMessageId(messageId);
      setPopupVisible(true); // 显示弹窗
    };

  
    const handleClosePopup = () => {
      setPopupVisible(false); // 关闭弹窗
    };

    const handleAcceptOffer = (messageId: string) => {
      console.log(`Offer with ID ${messageId} accepted.`);
      // 在这里添加确认预定的逻辑
    };
    
    const handleDeclineOffer = (messageId: string) => {
      Taro.request({
        url: 'https://api.eurostay.co/app/discuss/addDis',
        method: 'POST',
        data: {
          introduce: 'as',
          title: 'asd',
          topicId: 1
        },
        header: {
          'Content-Type': 'application/json',
          'token': GlobalStore.userInfo.token
        }
      }).then(res => {
        console.log('后端返回数据:', res.data);
      }).catch(err => {
        console.error('请求失败:', err);
      });
      // 在这里添加拒绝预定的逻辑
    };

    const handleReplyQuestionSend = (replyContent: string, messageId: string) => {
        if (replyContent.trim() !== '') {
            const targetMessage = messages.find(msg => msg.id === messageId);
            if (targetMessage) {
                const newMessage: Message = {
                    id: `${messages.length + 1}`,
                    type: 'reply',
                    sender: 'user',
                    time: new Date().toLocaleString(),
                    direction: 'right',
                    content: replyContent,
                    data: {
                        toUid: targetMessage.data?.toUid || 68,
                        answerTo: targetMessage.id,
                        content: replyContent,
                    },
                };
                setMessages([...messages, newMessage]); // 添加新消息
            } else {
                console.warn('未找到对应的消息');
            }
        }
        setPopupVisible(false); // 关闭弹窗
        setReplyingToMessageId(null); // 重置被回复的消息 ID
    };
    

    const [messages, setMessages] = useState([
      {
        id: '1',
        type: 'request',
        sender: 'user',
        time: '2024-10-11 09:43',
        direction: 'right',
        content: '我发送了一个入住申请',
        dateRange: '12.23-12.25',
        data: {
          toUid: 68,
          subjectId: 5,
          content: '你好我叫XX,这次想来这边好好体验一下.',
          questions: [
            {
              type: 'qa', // 问答题类型
              question: '请描述您的住宿需求。',
              answer: '我需要一个安静的房间，可以提供稳定的 Wi-Fi。',
            },
            {
              type: 'mcq', // 多选题类型
              question: '您最看重的住宿特点是什么？',
              options: ['位置便利', '价格实惠', '设施齐全', '安静舒适'],
              answer: '安静舒适',
            },
          ],
        },
      },
      {
        id: '2',
        type: 'question',
        sender: 'host',
        time: '2024-10-11 09:50',
        direction: 'left',
        content: '请问入住日期是否确定？',
        data: {
          toUid: 67,
          content: '请问入住日期是否确定？',
        },
      },
      {
        id: '3',
        type: 'reply',
        sender: 'user',
        time: '2024-10-11 09:45',
        direction: 'left',
        content: '已通过您的入住申请，请确认预定。',
        data: {
          toUid: 68,
          answerTo: '2',
          content: 'answer to message 2',
        },
      },
      {
        id: '4',
        type: 'offer',
        sender: 'host',
        time: '2024-10-11 09:45',
        direction: 'left',
        content: '已通过您的入住申请，请确认预定。',
        data: {
          toUid: 68,
          answerTo: '1',
          content: 'answer to message content',
        },
      },
      {
        id: '5',
        type: 'notification',
        sender: 'host',
        time: '2024-10-11 09:45',
        direction: 'left',
        content: 'xxx has accepted your offe',
        data: {
          toUid: 68,
          answerTo: '1',
          content: 'answer to message 1',
        },
      },
      {
        id: '6',
        type: 'chat',
        sender: 'host',
        time: '2024-10-11 09:45',
        direction: 'left',
        content: 'hell0',
        data: {
          toUid: 68,
          answerTo: '1',
          content: 'answer to message 1',
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
            {/* 左侧消息框 */}
            <View className="message-box">
      
              {/* 标题部分 */}
              <View className="title-section">
                <Text className="request-title">发送了一个入住申请</Text>
                <View className="pills">
                  <Text className="pill">12.23-12.25</Text>
                </View>
              </View>
      
              {/* 描述部分 */}
              <View className="description-section">
                <Text className="description">{message.data.content}</Text>
              </View>
      
              {/* 问题部分 */}
              <View className="questions-section">
                {message.data.questions.map((question, index) => (
                  <View key={index} className="question-item">
                    <Text className="question">{`Q${index + 1}: ${question.question}`}</Text>
                    {question.type === 'qa' && <Text className="answer">{question.answer}</Text>}
                    {question.type === 'mcq' && (
                      <View className="answer-box">
                        <Text className="selected-option">{question.answer}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        );

      case 'question':
        return (
          <View className="question-message">
            <View className="message-box">
              {/* 头像 */}
              <View className="avatar">
                <Image src={message.avatar || 'path/to/default-avatar.png'} className="avatar-image" />
              </View>

              {/* 标题部分 */}
              <View className="title-section">
                <Text className="request-title">向你追问：</Text>
              </View>

              {/* 描述部分 */}
              <View className="description-section">
                <Text className="description">{message.data.content}</Text>
              </View>

              {/* 按钮部分 */}
              <View className="reply-button" onClick={() => handleReplyQuestionClick(message.id)}>
                <Text>答复追问</Text>
              </View>
              {isPopupVisible && replyingToMessageId && (
                <PopUpCardReplyQuestion
                  title="答复追问"
                  question={`Host向你追问：${messages.find(msg => msg.id === replyingToMessageId)?.content}`}
                  placeholder="请输入您的回答……"
                  onSend={(replyContent) => handleReplyQuestionSend(replyContent, replyingToMessageId)} // 确认按钮的操作
                  onCancel={handleClosePopup}
                />
              )}
            </View>
          </View>

        );
        
      case 'reply':
          // 找到被回复的消息
          let originalMessage = messages.find(msg => msg.id === message.data.answerTo);
          let originalContent = originalMessage?.content;
          return (
            <View className="reply-message">
                {/* 原始问题内容 */}
                <View className="original-question-section">
                  <View className="questions-section">
                    <Text className="question">{originalContent}</Text>
                  </View>
                </View>

                {/* 分割线 */}
                <View className="divider"></View>

                {/* 回复内容 */}
                <View className="reply-content-section">
                    <Text className="reply-content">{message.data.content}</Text>
                </View>
            </View>
        );
      

      case 'offer':
        return (
          <View className="offer-message">
            <View className="message-box">
              {/* 标题部分 */}
              <View className="title-section">
                <Text className="offer-title">邀请入住，为您提供6折优惠.</Text>
              </View>

              <View className="divider"></View>
              
              <View className="content-wrapper">
                {/* 头像部分 */}
                <View className="avatar">
                  <Image src={message.avatar || 'path/to/default-avatar.png'} className="avatar-image" />
                </View>

                {/* 描述部分 */}
                <View className="description-section">
                  <Text className="line date">{listOffer.dateRange} · 2女</Text>
                  <Text className="line location">{listOffer.location}</Text>
                  <Text className="line price">
                    <Text className="highlight">{listOffer.price}</Text>
                  </Text>
                </View>
              </View>


              <View className="divider"></View>
      
              {/* 按钮部分 */}
              <View className="offer-buttons">
                <View className="decline-button" onClick={() => handleDeclineOffer(message.id)}>
                  <Text>拒绝邀请</Text>
                </View>
                <View className="accept-button" onClick={() => handleAcceptOffer(message.id)}>
                  <Text>确认预定</Text>
                </View>
              </View>
            </View>
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
          {/* 时间 */}
          <Text className="message-time">{message.time}</Text>

          {/* 根据方向显示 Avatar 和消息内容 */}
          <View className="message-wrapper">
            {message.direction === 'left' && (
              <View className="avatar">
                <Image src={Avatar} className="avatar-image" />
              </View>
            )}

            <View className="message-content">
              {renderMessageContent(message)}
            </View>

            {message.direction === 'right' && (
              <View className="avatar">
                <Image src={Avatar} className="avatar-image" />
              </View>
            )}
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
