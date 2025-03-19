import { View, Button, Input, ScrollView } from '@tarojs/components'
import { useState, useEffect } from 'react'
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
import GlobalStore from '../../store/GlobalStore'


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
    },
  ])

  useEffect(() => {
    fetchMessageList();
  }, []); 



  const createMessageObject = (msg, currentUid) => {
    // 判断消息方向
    const direction = msg.fromUid === currentUid ? 'right' : 'left';
    
    // 格式化时间 (只保留小时:分钟)
    const time = msg.createTime ? msg.createTime.split(' ')[1].substring(0, 5) : '';
    
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
          subjectId: msg.subjectId,
          content: msg.content || ''
        };
        break;
        
      case 'request':
        // 申请请求消息
        messageObj.data = {
          ...messageObj.data,
          toUid: msg.toUid,
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
          subjectId: msg.subjectId
          // 联系信息消息可能不需要其他特殊字段
        };
        break;
    }
    
    return messageObj;
  };
  
  // 使用方法
  const fetchMessageList = async () => {
    const token = GlobalStore.userInfo.token || Taro.getStorageSync('token');
    // 获取当前用户的 UID
    const currentUid = GlobalStore.userInfo.uid || Taro.getStorageSync('uid');
  
    if (!token) {
      console.error('缺少 token，无法获取消息列表');
      return;
    }
  
    try {
      const res = await Taro.request({
        url: 'https://api.eurostay.co/app/esmessages/messageList',
        method: 'GET',
        header: {
          token: token, // 传递 token 进行身份验证
        },
        data: {
          requestId: id,
          pageNum: 1,
        }
      });
  
      console.log('messageList 响应:', res);
  
      if (res.statusCode === 200 && res.data.code === 0 && res.data.result.records) {
        console.log('成功获取消息列表:', res.data.result);
        
        // 使用新函数处理每条消息
        const formattedMessages = res.data.result.records.map(msg => 
          createMessageObject(msg, currentUid)
        );
        
        // 更新消息列表
        // setMessages(formattedMessages);
        
        // 滚动到底部
        Taro.nextTick(() => {
          setScrollTop(999999);
        });
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

  // 点击发送
  const handleSend = async () => {
    if (!inputValue.trim()) {
      return
    }
    
    // 格式化当前时间为时:分格式
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    
    // 创建一个新的消息对象
    const newMessage = {
      id: now.getTime(), // 用时间戳来模拟一个唯一id
      type: 'simple',
      data: {
        toUid: 68,
        subjectId: 5,
        content: inputValue,     // 这里就是你刚才输入的内容
        time: formattedTime     // 使用当前格式化的时间
      },
      direction: 'right'
    }
    
    try {
      // 创建要发送到WebSocket的消息对象
      const wsMessage = {
        fromUid: GlobalStore.userInfo.uid, // 发送者ID
        toUid: 68, // 接收者ID，应该从props或其他地方获取
        sessionId: id, // 会话ID
        content: inputValue,
        mtype: 0, // 普通文本消息
        subjectId: 5 // 应该从props或其他地方获取
      };
      
      // 发送WebSocket消息
      await GlobalStore.sendWebSocketMessage(wsMessage);
      
      // 更新本地消息列表
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, newMessage];
        
        // 使用nextTick确保在下一个渲染循环
        Taro.nextTick(() => {
          setScrollTop(999999);
        });
        
        return updatedMessages;
      });
      
      // 发送后清空输入框
      setInputValue('');
      
    } catch (error) {
      console.error('发送消息失败:', error);
      Taro.showToast({
        title: '发送失败，请重试',
        icon: 'none'
      });
    }
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
    Taro.nextTick(() => {
      setScrollTop(999999);
    });

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
