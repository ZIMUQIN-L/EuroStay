import { View, Button, Input, ScrollView } from '@tarojs/components'
import { useState, useEffect, useRef } from 'react'
// 假设你已经有以下两个组件
import SimpleMessageBox from '@components/MessageComponents/SimpleMessageBox'
import RequestMessageBox from '@components/MessageComponents/RequestMessageBox'
import RejectMessageFromHostBox from '@components/MessageComponents/RejectMessageFromHostBox'
import RejectMessageFromGuestBox from '@components/MessageComponents/RejectMessageFromGuestBox'
import OfferMessageBox from '@components/MessageComponents/OfferMessageBox'
import './index.scss'
import CustomNavBar from '@components/MessageComponents/message-detail-nav-bar'
import Taro from '@tarojs/taro'
import ContactMessageBox from '@components/MessageComponents/ContactMessageBox'
import GlobalStore from '../../store/GlobalStore'


const MessageDetail = () => {
  const router = Taro.getCurrentInstance().router
  const { id, name: encodedName } = router?.params || {}
  const name = encodedName ? decodeURIComponent(encodedName) : '消息详情'
  const isSystemMessage = name === '系统消息'
  const [otherUserId, setOtherUserId] = useState(null);
  const [subjectId, setSubjectId] = useState(null);
  
  const [inputValue, setInputValue] = useState('')
  const [scrollTop, setScrollTop] = useState(0)
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const scrollViewRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [shouldScrollBottom, setShouldScrollBottom] = useState(false);
  const sessionDict = Taro.getStorageSync('allSessionDict') || {}


  useEffect(() => {
    fetchMessageList();
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
      // 判断消息是否属于当前对话
      if (msg.data?.sessionId == id) {
        const currentUid = GlobalStore.userInfo.uid;
        const newMessage = createMessageObject({
          ...msg.data,
          fromUid: currentUid === msg.data.toUid ? msg.data.fromUid : currentUid,
          id: Date.now(), // 临时生成id
          mtype: msg.type,
          createTime: new Date().toISOString()
        }, currentUid);
  
        setMessages(prev => [...prev, newMessage]);
        setShouldScrollBottom(true);
      }
    };
  
    // 注册监听
    GlobalStore.addMessageListener(handleIncomingMessage);
  
    // 组件卸载时移除监听
    return () => {
      GlobalStore.removeMessageListener(handleIncomingMessage);
    };
  }, [id]);
  

  // 滚动到底部的函数
  const scrollToBottom = () => {
    Taro.nextTick(() => {
      setScrollTop(Date.now());
    });
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
      const time = formatTime(msg.createTime); // 抽离出安全的函数
      // 其他处理...
    } catch (e) {
      console.error('createMessageObject 内部报错：', e, msg);
    }
    
    // 根据 mtype 确定消息类型
    let messageType;
    
    switch(msg.mtype) {
      case 0: messageType = 'simple'; break;
      case 1: messageType = 'request'; break;
      case 2: messageType = 'request'; break;
      case 3: messageType = 'offer'; break;
      case 4: messageType = 'reject-fh'; break;
      case 5: messageType = 'contact'; break;
      case 6: messageType = 'reject-fg'; break;
      case 7: messageType = 'simple'; break;
      default: messageType = 'simple';
    }
    
    // 创建基本消息对象
    let messageObj = {
      id: msg.id,
      type: messageType,
      direction: direction,
      data: {
        time: time
      }
    };
    
    // 为不同类型的消息添加特定字段
    switch(messageType) {
      case 'simple':
        // 普通文本消息
        messageObj.data = {
          ...messageObj.data,
          toUid: msg.toUid,
          isProperty: msg.isProperty,
          subjectId: msg.subjectId,
          content: msg.content || ''
        };
        break;
        
      case 'request':
        // 申请请求消息
        messageObj.data = {
          ...messageObj.data,
          toUid: msg.toUid,
          isProperty: msg.isProperty,
          subjectId: msg.subjectId,
          name: msg.guestName || msg.fromName || '申请人'
        };
        break;
        
      case 'offer':
        // 房东批准消息
        messageObj.data = {
          ...messageObj.data,
          toUid: msg.toUid,
          subjectId: msg.subjectId,
          isProperty: msg.isProperty,
          hostname: msg.hostName || '房东',
          applicantname: msg.guestName || '申请人',
          price: msg.price || '$0'
        };
        break;
        
      case 'reject-fh':
        // 房东拒绝消息
        messageObj.data = {
          ...messageObj.data,
          toUid: msg.toUid,
          isProperty: msg.isProperty,
          subjectId: msg.subjectId,
          name: msg.hostName || '房东',
          reason: msg.reason || msg.content || '未提供原因'
        };
        break;
        
      case 'reject-fg':
        // 租客取消消息
        messageObj.data = {
          ...messageObj.data,
          toUid: msg.toUid,
          isProperty: msg.isProperty,
          subjectId: msg.subjectId,
          name: msg.guestName || '申请人',
          reason: msg.reason || msg.content || '申请人取消了预订'
        };
        break;
        
      case 'contact':
        // 联系信息消息
        messageObj.data = {
          ...messageObj.data,
          toUid: msg.toUid,
          isProperty: msg.isProperty,
          subjectId: msg.subjectId
          // 联系信息消息可能不需要其他特殊字段
        };
        break;
    }

    return messageObj;
  };
  
  // 使用方法
  const fetchMessageList = async (page = 1, appendToTop = false) => {
    console.log("fresh message, page: ", page);
    const token = GlobalStore.userInfo.token || Taro.getStorageSync('token');
    const currentUid = GlobalStore.userInfo.uid || Taro.getStorageSync('uid');
  
    if (!token) {
      console.error('缺少 token，无法获取消息列表');
      return;
    }
  
    try {
      const res = await Taro.request({
        url: 'https://api.eurostay.co/app/esmessages/messageList',
        method: 'GET',
        header: { token },
        data: {
          requestId: id,
          pageNum: page,
        },
      });
  
      if (res.statusCode === 200 && res.data.code === 0 && res.data.result.records) {
        const records = res.data.result.records;
        if (records.length === 0) {
          setHasMore(false); // 没有更多数据
          return;
        }
  
        if (records.length > 0 && page === 1) {
          const firstMsg = records[0];
          const otherUid = firstMsg.fromUid === currentUid ? firstMsg.toUid : firstMsg.fromUid;
          setOtherUserId(otherUid);
        }
  
        const formattedMessages = records.map(msg =>
          createMessageObject(msg, currentUid)
        );
  
        const sortedMessages = formattedMessages.sort((a, b) => a.id - b.id);
        console.log("sortedMessage", sortedMessages);
        setMessages(prev =>
          appendToTop ? [...sortedMessages, ...prev] : sortedMessages
        );
      } else {
        console.error('获取消息列表失败:', res.data.msg);
      }
    } catch (error) {
      console.error('网络请求失败:', error);
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
        const currentUid = GlobalStore.userInfo.uid;
        const messageObj = {
          id: now.getTime(), // 用时间戳来模拟一个唯一id
          type: getMessageTypeFromMtype(messageType),
          direction: 'right',
          data: {
            time: formattedTime,
            content: content,
            mtype: messageType,
            fromUid: currentUid,
            toUid: otherUserId,
            ...additionalData
          }
        };
        
        // 根据消息类型添加额外字段
        switch(messageType) {
          case 1: // 预订请求
          case 2: // 确认请求
            messageObj.data.name = '我';
            messageObj.data.requestType = messageType === 1 ? 'booking' : 'confirmation';
            break;
            
          case 3: // 房东批准
            messageObj.data.hostname = '我';
            messageObj.data.applicantname = `用户${otherUserId}`;
            messageObj.data.price = content;
            break;
            
          case 4: // 房东拒绝
            messageObj.data.name = '我';
            messageObj.data.reason = content;
            break;
            
          case 6: // 客人取消
            messageObj.data.name = '我';
            messageObj.data.reason = content;
            break;
        }
        
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
        default: return 'simple';
      }
    };

  const handlePaid = () => {
    // 在这里写你需要的逻辑
    console.log('用户点击了已付款');
    // 1. 构造一个新的消息对象
    const newMessage = {
      id: Date.now(), // 用时间戳做简单ID
      type: 'contact',
      data: {
        time: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`, 
        // 其它需要给 ContactMessageBox 的字段
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
    const sessionInfo = sessionDict[id];
    const avatar = sessionInfo
      ? (sessionInfo.otherUid == myUid ? sessionInfo.selfAvatar : sessionInfo.otherAvatar)
      : 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/loading.png'
    return avatar;
  }
  
  // 根据不同的 type 来渲染对应的组件
  const renderMessage = (msg) => {
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
          />
        )
      case 'simple':
        return (
          <SimpleMessageBox
            avatar={avatar}
            content={msg.data.content}
            time={msg.data.time}
            direction={msg.direction}
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
            />
          )
      case 'contact':
        return (
          <ContactMessageBox
            avatar={avatar}
            time={msg.data.time}
            direction={msg.direction}
          />
        )       
      default:
        return (
          <SimpleMessageBox
            avatar={avatar}
            content={msg.data.content || '未知消息类型'}
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
        scrollWithAnimation
        onScrollToUpper={() => {
          if (loadingMore || !hasMore) return;
      
          setLoadingMore(true);
          fetchMessageList(pageNum + 1, true).finally(() => {
            setPageNum(prev => prev + 1);
            setLoadingMore(false);
          });
        }}
      >
        {messages.map((msg, index) => (
          <View key={`${msg.id}-${index}`} className='message-wrapper'>
            {renderMessage(msg)}
          </View>
        ))}
      </ScrollView>

      {/* 底部输入框区域 */}
      {!isSystemMessage && (
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
      )}
    </View>
  )
}

export default MessageDetail