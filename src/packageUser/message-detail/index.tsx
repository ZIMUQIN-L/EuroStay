import { View, Text, Input, Button, Image } from '@tarojs/components';
import './index.scss';
import { useState } from 'react';
import { Message, MessageType } from './MessageTypes';
import Avatar from '@assets/images/default-avatar.png';
import PopUpCardReplyQuestion from '../pop-up-card-reply-question';
import PopUpCardReplyOffer from '../pop-up-card-reply-offer';
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
    const [isAcceptPopupVisible, setIsAcceptPopupVisible] = useState(false); // 控制 Accept 弹窗
    const [isDeclinePopupVisible, setIsDeclinePopupVisible] = useState(false); // 控制 Decline 弹窗    
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [replyingToMessageId, setReplyingToMessageId] = useState<string | null>(null);
    const [isResultPopupVisible, setIsResultPopupVisible] = useState(false); // 控制结果弹窗
    const [resultPopupContent, setResultPopupContent] = useState({ title: '', description: '' }); // 弹窗内容
    const [isResidentCardVisible, setIsResidentCardVisible] = useState(false);
    const [isTermsPopupVisible, setIsTermsPopupVisible] = useState(false);

    const handleViewTerms = () => {
      console.log("handleViewTerms");
      setIsTermsPopupVisible(true); // 显示弹窗
    };
    
    const handleCloseTermsPopup = () => {
      setIsTermsPopupVisible(false); // 关闭弹窗
    };

    
    const handleReplyQuestionClick = (messageId: string) => {
      setReplyingToMessageId(messageId);
      setPopupVisible(true); // 显示弹窗
    };

    const ResultPopup = ({ title, description, onClose }) => (
      <View className="result-popup">
        <View className="result-popup-content">
          {/* 图标部分 */}
          <View className="result-icon">
            <Text>✔️</Text> {/* 绿色勾选符号 */}
          </View>
          {/* 标题部分 */}
          <Text className="result-title">{title}</Text>
          {/* 描述部分 */}
          {description && <Text className="result-description">{description}</Text>}
          {/* 按钮 */}
          <Button className="result-button" onClick={onClose}>
            知道了
          </Button>
        </View>
      </View>
    );


    const ResidentCard = ({ name, date, location, onViewTerms }) => (
      <View className="resident-card">
        <Image src="/path/to/background-image.jpg" className="card-background" />
        <View className="card-content">
          <Text className="title">现邀请</Text>
          <Text className="name">{name}</Text>
          <Text className="details">于 {date} 入住</Text>
          <Text className="details">{location}</Text>
          <Button className="view-terms-button" onClick={onViewTerms}>
            查看入住公约
          </Button>
        </View>
      </View>
    );

    const TermsPopup = ({ isVisible, onClose }) => (
      <View className={`terms-popup ${isVisible ? 'visible' : ''}`}>
        {/* 弹窗头部 */}
        <View className="popup-header">
          <Text className="popup-title">入住公约</Text>
        </View>
    
        {/* 弹窗主体 */}
        <View className="popup-body">
          <Text className="section-title">基本规则</Text>
          <Text className="section-content">
            夜间保持安静，按预定时间和人数入住，保持房间整洁；公共物品使用后请清洁归位，尊重隐私勿动私人物品；房屋内禁烟，妥善使用设施并及时报告损坏。
          </Text>
          <Text className="section-title">时间要求</Text>
          <Text className="section-content">
            入住时间：14:00 - 20:00；退房时间：11:00 前；请于晚 22:00 之前回家。
          </Text>
          <Text className="section-title">设施使用</Text>
          <Text className="section-content">
            厨房、客厅等可使用，需提前告知房东使用时间；公共日用品（如洗手液、调料）可使用，请自备毛巾和牙刷；空调暖气可使用，但请勿长时间开启无人房间内的设备。
          </Text>
          <Text className="section-title">其他要求</Text>
          <Text className="section-content">请勿带宠物进入。</Text>
        </View>
    
        {/* 确认按钮 */}
        <Button className="confirm-button" onClick={onClose}>
          确认
        </Button>
      </View>
    );
    
    

  
    const handleClosePopup = () => {
      setPopupVisible(false); // 关闭弹窗
    };

    const handleAcceptOffer = (messageId: string) => {
      console.log(`Offer with ID ${messageId} accepted.`);
      setIsAcceptPopupVisible(true); // 显示 Accept 弹窗
      setIsResidentCardVisible(true);
    };
    
    const handleDeclineOffer = (messageId: string) => {
      console.log(`Offer with ID ${messageId} declined.`);
      setIsDeclinePopupVisible(true); // 显示 Decline 弹窗
    };

    const handleCloseAcceptPopup = () => {
      setIsAcceptPopupVisible(false);
    };
    
    const handleCloseDeclinePopup = () => {
      setIsDeclinePopupVisible(false);
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
      // {
      //   id: '5',
      //   type: 'notification',
      //   sender: 'host',
      //   time: '2024-10-11 09:45',
      //   direction: 'left',
      //   content: 'xxx has accepted your offe',
      //   data: {
      //     toUid: 68,
      //     answerTo: '1',
      //     content: 'answer to message 1',
      //   },
      // },
      // {
      //   id: '6',
      //   type: 'chat',
      //   sender: 'host',
      //   time: '2024-10-11 09:45',
      //   direction: 'left',
      //   content: 'hell0',
      //   data: {
      //     toUid: 68,
      //     answerTo: '1',
      //     content: 'answer to message 1',
      //   },
      // },

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

              {isAcceptPopupVisible && (
                <PopUpCardReplyOffer
                  title="确认预定"
                  question="是否确认入住并扣除旅行币? 扣除旅行币后可以获得房东微信确认旅行细节哦~"
                  buttonOptions={['我再想想','确认并扣除旅行币']}
                  onOptionSelect={(selectedOption) => {
                    if (selectedOption === '确认并扣除旅行币') {
                      console.log('确认内容:', selectedOption);
                      setIsAcceptPopupVisible(false); // 关闭当前弹窗


                      const newMessage = {
                        id: `${messages.length + 1}`,
                        type: 'notification',   
                        sender: 'host',         // 可以是 host 或 user，视具体情况而定
                        time: new Date().toLocaleString(),
                        direction: 'left',
                        content: '',            // 这里暂时不需要用 content
                        data: {
                          invitation: {
                            name: '沁心',
                            date: '12月23日',
                            location: '巴黎市中心公寓近地铁',
                          }
                        }
                      };
                      setMessages([...messages, newMessage]);

                      setResultPopupContent({ title: '预定成功!', description: '旅行币 - xxxx' }); // 设置结果弹窗内容
                      setIsResultPopupVisible(true); // 显示结果弹窗
                      
                    } else {
                      console.log('取消了确认操作');
                      setIsAcceptPopupVisible(false); // 关闭弹窗
                    }
                  }}
                  onCancel={handleCloseAcceptPopup}
                />
              )}

              {isDeclinePopupVisible && (
                <PopUpCardReplyOffer
                  title="拒绝邀请"
                  question="是否拒绝房东的邀请, 暂不入住该房源?"
                  buttonOptions={['我再想想', '确认拒绝']}
                  onOptionSelect={(selectedOption) => {
                    if (selectedOption === '确认拒绝') {
                      console.log('拒绝理由:', selectedOption);
                      setIsDeclinePopupVisible(false); // 关闭当前弹窗
                      setResultPopupContent({ title: '已拒绝host的入住邀请', description: '' }); // 设置结果弹窗内容
                      setIsResultPopupVisible(true); // 显示结果弹窗
                    } else {
                      console.log('取消了拒绝操作');
                      setIsDeclinePopupVisible(false); // 关闭弹窗
                    }
                  }}
                  onCancel={handleCloseDeclinePopup}
                />
              )}


              {isResultPopupVisible && (
                <ResultPopup
                  title={resultPopupContent.title}
                  description={resultPopupContent.description}
                  onClose={() => {
                    setIsResultPopupVisible(false); // 关闭结果弹窗
                  }}
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
      
        case 'notification':
          if (message.data && message.data.invitation) {
            const { name, date, location } = message.data.invitation;
            return (
              <View className="resident-card">
                {/* 灰色背景图片 */}
                <Image 
                  src="/path/to/background-image.jpg" 
                  className="card-background" 
                  mode="aspectFill"
                />
                
                <View className="card-content">
                  <Text className="title">现邀请</Text>
                  <Text className="name">{name}</Text>
                  <Text className="details">于 {date} 入住</Text>
                  <Text className="details">{location}</Text>
                  
                  {/* 按钮组 */}
                  <View className="button-group">
                    <Button 
                      className="view-terms-button" 
                      onClick={handleViewTerms}
                    >
                      查看入住公约
                    </Button>
                    <Button 
                      className="view-terms-button"
                      onClick={() => console.log('其他操作')}
                    >
                      评价
                    </Button>
                  </View>
                </View>
              </View>
            );
          } else {
            // 如果不满足条件，就以普通文本通知形式渲染
            return <Text className="notification-text">{message.content}</Text>;
          }
        
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


    {isTermsPopupVisible && (
      <View>
          <TermsPopup 
            isVisible={isTermsPopupVisible} 
            onClose={handleCloseTermsPopup} 
          />
      </View>
    )}

    {/* {isTermsPopupVisible && <TermsPopup onClose={handleCloseTermsPopup} />} */}



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
