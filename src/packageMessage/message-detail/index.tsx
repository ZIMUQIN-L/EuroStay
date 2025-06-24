import { View, Button, Input, ScrollView, Textarea } from '@tarojs/components'
import { useState, useEffect, useRef } from 'react'
// 假设你已经有以下两个组件
import SimpleMessageBox from '@components/MessageComponents/SimpleMessageBox'
import RequestMessageBox from '@components/MessageComponents/RequestMessageBox'
import RejectMessageFromHostBox from '@components/MessageComponents/RejectMessageFromHostBox'
import RejectMessageFromGuestBox from '@components/MessageComponents/RejectMessageFromGuestBox'
import OfferMessageBox from '@components/MessageComponents/OfferMessageBox'
import PictureMessageBox from '@components/MessageComponents/PictureMessageBox'

import './index.scss'
import CustomNavBar from '@components/MessageComponents/message-detail-nav-bar'
import Taro from '@tarojs/taro'
import ContactMessageBox from '@components/MessageComponents/ContactMessageBox'
import GlobalStore from '../../store/GlobalStore'
import { Message } from 'src/types/message'
import dayjs from 'dayjs'
import { formatSmartTime } from '@utils/dateUtil'
import { API } from '@utils/apiService'


const MessageDetail = () => {
  const router = Taro.getCurrentInstance().router
  const { id, name: encodedName } = router?.params || {}
  const name = encodedName ? decodeURIComponent(encodedName) : '消息详情'
  const isSystemMessage = name === '系统消息'
  const [otherUserId, setOtherUserId] = useState<number | null>(null);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [hostUid, setHostUid] = useState<number | null>(null);
  
  const [inputValue, setInputValue] = useState('')
  const [scrollTop, setScrollTop] = useState(0)
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const scrollViewRef = useRef(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [shouldScrollBottom, setShouldScrollBottom] = useState(false);
  const sessionDict = Taro.getStorageSync('allSessionDict') || {}

  const [debugMsg, setDebugMsg] = useState(null);
  const [scrollAnchorId, setScrollAnchorId] = useState('');


  useEffect(() => {
    fetchMessageList(pageNum);
    setShouldScrollBottom(true);
  }, []); 

  // 在每次messages更新后，滚动到底部
  useEffect(() => {
    if (shouldScrollBottom) {
      scrollToBottom();
      setShouldScrollBottom(false); // 重置
    }
  }, [messages]);

  useEffect(() => {
    const handleIncomingMessage = (msg) => {
    //   console.log("handleIncomingMessage", msg);
      setDebugMsg(msg);
      console.log(msg)
      // 判断消息是否属于当前对话
      if (msg.data?.sessionId == id) {
        const currentUid = GlobalStore.userInfo.uid;
        const newMessage = createMessageObject({
          ...msg.data,
          fromUid: currentUid === msg.data.toUid ? msg.data.fromUid : currentUid,
          id: Date.now(), // 临时生成id
          mtype: msg.data.mType,
          createTime: new Date().toISOString()
        }, currentUid);

        setMessages(prev => [...prev, newMessage]);
        setShouldScrollBottom(true);
        
        // 收到新消息时发送已读回执
        sendReadReceipt();
      }
    };
  
    // 注册监听
    GlobalStore.addMessageListener(handleIncomingMessage);
  
    // 组件卸载时移除监听
    return () => {
      GlobalStore.removeMessageListener(handleIncomingMessage);
    };
  }, [id]);
  
  // 发送已读回执
  const sendReadReceipt = () => {
    if (!id) return;
    
    try {
      const readReceiptMessage = {
        type: "read-receipt",
        data: {
          sessionId: id
        }
      };
      
      GlobalStore.sendWebSocketMessage(readReceiptMessage);
    } catch (error) {
      console.error('发送已读回执失败:', error);
    }
  };

  // 滚动到底部的函数
  const scrollToBottom = () => {
    setScrollAnchorId(''); 
    setTimeout(() => {
      setScrollAnchorId('bottom-anchor');
    }, 50);
    // Taro.nextTick(() => {
    //   setScrollTop(Date.now());
    // });
  };
  

  const formatTime = (createTime) => {
    try {
      if (!createTime) return '';
      if (typeof createTime === 'number') {
        const date = new Date(createTime);
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      }
      if (typeof createTime === 'string') {
        const parts = createTime.split(' ');
        if (parts.length > 1 && parts[1]) {
          return parts[1].substring(0, 5);
        }
      }
    } catch (e) {
      console.warn('时间格式化失败:', createTime, e);
    }
    return '';
  };
  

  const createMessageObject = (msg, currentUid) => {
    // 判断消息方向
    const direction = msg.fromUid === currentUid ? 'right' : 'left';
    
    // 格式化时间 (只保留小时:分钟)
    let time = '';
    try {
      time = formatSmartTime(msg.createTime); // 抽离出安全的函数
      // 其他处理...
    } catch (e) {
      console.error('createMessageObject 内部报错：', e, msg);
    }
    
    // 根据 mtype 确定消息类型
    let messageType = 'simple';
    let messageContent = '';
    
    // 处理不同类型的消息内容
    if (msg.mtype === 0) {
      // 普通文本消息，直接使用content
      messageContent = msg.content || '';
    } else if (msg.mtype === 6) {
      // 系统消息，直接显示content
      messageContent = msg.content || '';
    } else if (msg.mtype === 7) {
      // 图片消息
      messageType = 'pic';
      messageContent = msg.content || '';
    } else {
      // 对于其他类型的消息，尝试解析JSON
      try {
        const contentObj = JSON.parse(msg.content || '{}');
        if (contentObj && contentObj.text) {
          messageContent = contentObj.text + "\n请前往APP查看消息详情";
        } else {
          messageContent = "请前往APP查看消息详情";
        }
      } catch (e) {
        // 如果解析失败，显示默认消息
        messageContent = "请前往APP查看消息详情";
        console.error('JSON解析失败：', e, msg.content);
      }
    }
    
    // 创建基本消息对象
    let messageObj: Message = {
      id: msg.id,
      type: messageType,
      direction: direction,
      createTime: msg.createTime,
      data: {
        time: time,
        content: messageContent,
        toUid: msg.toUid,
        subjectId: msg.subjectId,
        isProperty: msg.isProperty
      }
    };
    
    return messageObj;
  };
  
  // 使用方法
  const fetchMessageList = async (page = 1, appendToTop = false) => {
    // console.log("fresh message, page: ", page);
    const currentUid = GlobalStore.userInfo.uid;
  
    if (!currentUid) {
      console.error('用户未登录，无法获取消息列表');
      return;
    }

    if (!hasMore) {
      return;
    }
  
    try {
      const response = await API.messages.getMessageList(Number(id), page);
      
      // Check if response has data field
      const messageData = response.data || [];
      
      if (messageData.length === 0) {
        setHasMore(false); // 没有更多数据
        return;
      }

      if (messageData.length > 0 && page === 1) {
        const firstMsg = messageData[0];
        const otherUid = firstMsg.fromUid === currentUid ? firstMsg.toUid : firstMsg.fromUid;
        setOtherUserId(otherUid);
        
        // Set hostUid from the message data if available
        if (firstMsg.hostUid) {
          setHostUid(firstMsg.hostUid);
        }
        
        // Set subjectId from the message data if available
        if (firstMsg.subjectId) {
          setSubjectId(firstMsg.subjectId);
        }
      }
      
      const formattedMessages = messageData.map(msg =>
        createMessageObject(msg, currentUid)
      );

      const sortedMessages = formattedMessages.sort((a, b) => a.id - b.id);
      
      setPageNum(prev => prev + 1);
      setMessages(prev =>
        appendToTop ? [...sortedMessages, ...prev] : sortedMessages
      );
      
      // Check pagination using the appropriate fields
      if (response.current_page >= response.last_page) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('获取消息列表失败:', error);
    }
  };
  

  const handleInput = (e) => {
    // Taro / 小程序里通常是 e.detail.value
    setInputValue(e.detail.value)
  }

  // 点击发送普通消息 (mtype 0)
  const handleSend = async () => {
    if (!inputValue.trim()) {
      return
    }
    
    await sendMessage(0, inputValue);
  }


    // 点击发送预订请求 (mtype 1)
    const handleSendBookingRequest = async () => {
      if (!subjectId) {
        Taro.showToast({
          title: '缺少房源ID',
          icon: 'none'
        });
        return;
      }
      
      await sendMessage(1, "我想预订这个房源", {
        subjectId: subjectId,
        hostUid: hostUid || otherUserId,
        isProperty: true
      });
    }
  
    // 点击发送确认请求 (mtype 2)
    const handleSendConfirmationRequest = async () => {
      if (!subjectId) {
        Taro.showToast({
          title: '缺少房源ID',
          icon: 'none'
        });
        return;
      }
      
      await sendMessage(2, "请确认我的预订", {
        subjectId: subjectId,
        hostUid: hostUid || otherUserId,
        isProperty: true
      });
    }
  
    // 房东批准 (mtype 3)
    const handleApproveRequest = async (price) => {
      if (!subjectId) {
        Taro.showToast({
          title: '缺少房源ID',
          icon: 'none'
        });
        return;
      }
      
      await sendMessage(3, price || "500", {
        subjectId: subjectId,
        hostUid: GlobalStore.userInfo.uid,
        isProperty: true
      });
    }
  
    // 房东拒绝 (mtype 4)
    const handleRejectFromHost = async (reason) => {
      await sendMessage(4, reason || "对不起，档期不合适", {
        subjectId: subjectId,
        hostUid: GlobalStore.userInfo.uid,
        isProperty: true
      });
    }
  
    // 显示联系信息 (mtype 5)
    const handleShowContact = async () => {
      await sendMessage(5, "已付款，请查看联系信息", {
        subjectId: subjectId
      });
    }
  
    // 客人取消 (mtype 6)
    const handleRejectFromGuest = async (reason) => {
      await sendMessage(6, reason || "对不起，我只能取消预定", {
        subjectId: subjectId
      });
    }


    // 通用发送消息函数
    const sendMessage = async (messageType, content, additionalData = {}) => {
      // 格式化当前时间为时:分格式
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      
      try {
        // 创建要发送到WebSocket的消息对象
        const wsMessage = {
          type: messageType, // 消息类型
          data: {
            toUid: otherUserId, // 目标用户 ID
            content: content, // 发送的文本内容
            ...additionalData
          }
        };
        
        // 发送WebSocket消息
        await GlobalStore.sendWebSocketMessage(wsMessage);
        
        // 创建一个新的本地消息对象，供界面显示
        // const currentUid = GlobalStore.userInfo.uid;
        // const messageObj = {
        //   id: now.getTime(), // 用时间戳来模拟一个唯一id
        //   type: getMessageTypeFromMtype(messageType),
        //   direction: 'right',
        //   data: {
        //     time: formattedTime,
        //     content: content,
        //     mtype: messageType,
        //     fromUid: currentUid,
        //     toUid: otherUserId,
        //     ...additionalData
        //   }
        // };
        
        // // 根据消息类型添加额外字段
        // switch(messageType) {
        //   case 1: // 预订请求
        //   case 2: // 确认请求
        //     messageObj.data.name = '我';
        //     messageObj.data.requestType = messageType === 1 ? 'booking' : 'confirmation';
        //     break;
            
        //   case 3: // 房东批准
        //     messageObj.data.hostname = '我';
        //     messageObj.data.applicantname = `用户${otherUserId}`;
        //     messageObj.data.price = content;
        //     break;
            
        //   case 4: // 房东拒绝
        //     messageObj.data.name = '我';
        //     messageObj.data.reason = content;
        //     break;
            
        //   case 6: // 客人取消
        //     messageObj.data.name = '我';
        //     messageObj.data.reason = content;
        //     break;
        // }
        
        // 更新本地消息列表，添加到末尾（新消息在下方）
        // setMessages(prevMessages => [...prevMessages, messageObj]);
        scrollToBottom();
        
        // 如果是普通消息，发送后清空输入框
        if (messageType === 0) {
          setInputValue('');
        }
        
      } catch (error) {
        console.error('发送消息失败:', error);
        Taro.showToast({
          title: '发送失败，请重试',
          icon: 'none'
        });
      }
    }
  
    // 辅助函数，根据mtype获取消息类型
    const getMessageTypeFromMtype = (mtype) => {
      switch(mtype) {
        case 0: return 'simple';
        case 1: 
        case 2: return 'request';
        case 3: return 'offer';
        case 4: return 'reject-fh';
        case 5: return 'contact';
        case 6: return 'reject-fg';
        case 7: return 'simple';
        case 8: return 'pic';
        default: return 'simple';
      }
    };

  const handlePaid = () => {
    // 在这里写你需要的逻辑
    console.log('用户点击了已付款');
    // 1. 构造一个新的消息对象
    const newMessage: Message = {
      id: Date.now(), // 用时间戳做简单ID
      type: 'contact',
      createTime: new Date().toISOString(),
      data: {
        time: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`,
        toUid: otherUserId || 0,
        isProperty: Boolean(subjectId),
        subjectId: subjectId || 0,
        content: '已付款，请查看联系信息'
      },
      direction: 'right' // 或者 'left'，看你业务场景
    };

    // 添加消息到末尾
    setMessages(prevMessages => [...prevMessages, newMessage]);
    // 滚动到底部会在useEffect中处理
  }
  
  const handleHostCheckSub = () => {
    console.log('handleHostCheckSub');
  }

  const getAvatar = (msg) => {
    const myUid = GlobalStore.userInfo.uid || Taro.getStorageSync('uid')
    const sessionInfo = sessionDict[String(id)];
    const avatar = sessionInfo
      ? (sessionInfo.otherUid == myUid ? sessionInfo.selfAvatar : sessionInfo.otherAvatar)
      : 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/loading.png'
    return avatar;
  }
  
  // 根据不同的 type 来渲染对应的组件
  const renderMessage = (msg: Message, showTime: boolean) => {
    // console.log("renderMessage", msg.type);
    const avatar = getAvatar(msg)
    switch (msg.type) {
      case 'request':
        return (
          <RequestMessageBox
            // 这里把 data 内的字段作为 props 传给 RequestMessageBox
            isProperty={msg.data.isProperty}
            content={msg.data.content}
            avatar={avatar}
            name={msg.data.name}
            time={msg.data.time}
            direction={msg.direction}
            subjectId={msg.data.subjectId}
            toUid={otherUserId}
          />
        )
      case 'simple':
        return (
          <SimpleMessageBox
            avatar={avatar}
            content={msg.data.content}
            time={msg.data.time}
            direction={msg.direction}
            toUid={otherUserId}
            showTime={showTime}
          />
        )
      case 'reject-fh':
        return (
          <RejectMessageFromHostBox
            avatar={avatar}
            name={msg.data.name}
            time={msg.data.time}
            reason={msg.data.reason}
            direction={msg.direction}
            toUid={otherUserId}
          />
        )
      case 'reject-fg':
        return (
          <RejectMessageFromGuestBox
            avatar={avatar}
            name={msg.data.name}
            time={msg.data.time}
            reason={msg.data.reason}
            direction={msg.direction}
            toUid={otherUserId}
          />
        )
      case 'offer':
        return (
          <OfferMessageBox
            avatar={avatar}
            isProperty={msg.data.isProperty}
            content={msg.data.content}
            hostname={msg.data.hostname}
            applicantname={msg.data.applicantname}
            time={msg.data.time}
            price={msg.data.price}
            direction={msg.direction}
            subjectId={msg.data.subjectId}  // 传递 subjectId
            hostUid={msg.data.hostUid}      // 传递 hostUid
            active={msg.active}
            toUid={otherUserId}
          />
        )
      case 'contact':
        return (
          <ContactMessageBox
            avatar={avatar}
            time={msg.data.time}
            direction={msg.direction}
            toUid={otherUserId}
          />
        )
      case 'pic':
        return (
          <PictureMessageBox
            avatar={avatar}
            time={msg.data.time}
            direction={msg.direction}
            content={msg.data.content}
            toUid={otherUserId}
          />
        );
        
      default:
        return (
          <SimpleMessageBox
            avatar={avatar}
            content={msg.data.content || '未知消息类型'}
            time={msg.data.time}
            direction="left"
            showTime={showTime}
          />
        )
    }
  }

  const onLoadMore = async () => {
    let scrollId = messages[0].id;
    await fetchMessageList(pageNum, true);
    setScrollAnchorId(`message-${scrollId}`)
  }

  return (
    <View className='message-detail'>
      <CustomNavBar title={name} avatar='...' />
      {/* 消息列表区域 */}
      <ScrollView 
        className='message-list'  
        scrollY
        scrollTop={scrollTop}
        scrollIntoView={scrollAnchorId}
        enableBackToTop
        upperThreshold={50}
        lowerThreshold={0}
        onScrollToUpper={onLoadMore}
      >
        {messages.map((msg, index) => {
          let showTime = false;
          if (index === 0) {
            showTime = true;
          } else if (Math.abs(dayjs(msg.createTime).diff(dayjs(messages[index-1].createTime), 'minute')) > 5) {
            showTime = true;
          }
          return (
            <View key={`${msg.id}-${index}`} id={`message-${msg.id}`} className='message-wrapper'>
              {renderMessage(msg, showTime)}
            </View>
          )
        })}

        {/* 滚动锚点 */}
        <View id='bottom-anchor' style={{ height: '40px' }} />
      </ScrollView>

      {/* 底部输入框区域 */}
      {!isSystemMessage && (
        <View className='input-box'>
          <Textarea
            className='input'
            value={inputValue}
            autoHeight
            onInput={handleInput}
            placeholder='请输入...'
            confirmType='send'
            showConfirmBar={false}
            onConfirm={handleSend}
          />
          <View className='send-btn' onClick={handleSend}>
            ↑
          </View>
        </View>
      )}

    </View>
  )
}

export default MessageDetail