import { View, Text, Image } from '@tarojs/components'
import { observer } from 'mobx-react'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import './index.scss' // 记得在这里引入自己的样式文件
import GlobalStore from '@store/GlobalStore'
import TabBar from '@components/TabBar'

// 在文件开头添加接口定义
interface MessageItem {
  id: number;
  avatar: string;
  name: string;
  message: string;
  time: string;
  otherUid: number;
  type?: string;
  rawData?: {
    fromUid: number;
    toUid: number;
    content: string;
    createTime: string;
  };
}

interface SessionRecord {
  id: number;
  initUid: number;
  replyUid: number;
  topMessage: string;
  updateTime: string;
  stype: number;
  initStranger: boolean;
  replyStranger: boolean;
}

const Index = () => {
  // 修改 state 的类型定义
  const [systemMessages, setSystemMessages] = useState<MessageItem[]>([]);
  const [strangerMessages, setStrangerMessages] = useState<MessageItem[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  
  // Mock 数据 - 用于测试
  // const mockNormalMessages = [
  //   {
  //     id: 101,
  //     avatar: 'https://example.com/avatar3.png',
  //     name: '下单子想当一棵草',
  //     message: '谢谢你的喜欢',
  //     time: '11:20',
  //     otherUid: 101
  //   },
  //   {
  //     id: 102,
  //     avatar: 'https://example.com/avatar4.png',
  //     name: 'Andre Zeng',
  //     message: '这房子可以住几个人呀？',
  //     time: '11:30',
  //     otherUid: 102
  //   },
  //   {
  //     id: 103,
  //     avatar: 'https://example.com/avatar5.png',
  //     name: 'Jackie Li',
  //     message: '我们几点可以入住？',
  //     time: '11:40',
  //     otherUid: 103
  //   }
  // ];


  // 修改 TabBar 相关的 state
  const [isShowPostModal, setIsShowPostModal] = useState(false);

  useEffect(() => {
    // 获取 token
    const token = GlobalStore.userInfo.token;
    const uid = GlobalStore.userInfo.uid;
    console.log('拿到的 token:', token, "uid", uid);
    
    // 判断是否在开发环境中使用mock数据
    const useMockData = process.env.NODE_ENV === 'development' || !token;
    
    if (useMockData) {
      // 使用mock数据
      // setMessages(mockNormalMessages);
      // setSystemMessages(mockSystemMessages);
    }
    
    // 不管是否使用mock数据，都调用fetchMessages获取陌生人数据
    fetchMessages(useMockData);
  }, [GlobalStore.wsMessageCounter]); // 空数组确保只在组件初次挂载时执行


  const fetchMessages = async () => {
    const token = GlobalStore.userInfo.token || Taro.getStorageSync('token');
    const currentUid = GlobalStore.userInfo.uid || Taro.getStorageSync('uid');
  
    if (!token) {
      console.error('缺少 token，无法获取消息列表');
      return;
    }
  
    try {
      const res = await Taro.request({
        url: 'https://api.eurostay.co/app/esmessages/sessionList',
        method: 'GET',
        header: { token },
        data: { pageNum: 1 },
      });
  
      console.log('sessionList 响应:', res, res.statusCode, res.data.code);
  
      if (res.statusCode === 200 && res.data.code === 0) {
        const records = res.data.result.records || [];
  
        const normalMsgs = [];
        const systemMsgs = [];
        const strangerMsgs = [];
  
        records.forEach((record) => {
          const otherPersonUid =
            currentUid === record.esSession.initUid ? record.esSession.replyUid : record.esSession.initUid;
  
          const displayName = `User ${otherPersonUid}`;
  
          const isStranger =
            currentUid === record.initUid
              ? record.esSession.initStranger
              : record.esSession.replyStranger;

          const isCurrentInit = currentUid === record.initUid;
          const selfAvatar = isCurrentInit
            ? record.initAvatar
            : record.replyAvatar;
      
          const otherAvatar = isCurrentInit
            ? record.replyAvatar
            : record.initAvatar;

          const otherName = isCurrentInit
              ? record.replyName
              : record.initName;

          const messageObj = {
            id: record.esSession.id,
            selfAvatar: selfAvatar || 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/loading.png',
            otherAvatar: otherAvatar || 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/loading.png',
            name: otherName || `User ${otherPersonUid}`,
            message: record.topMessage || '无消息内容',
            time: formatTime(record.updateTime),
            otherUid: otherPersonUid,
            rawData: {
              fromUid: record.esSession.initUid,
              toUid: record.esSession.replyUid,
              content: record.esSession.topMessage || '无消息内容',
              createTime: record.esSession.updateTime,
            },
          };
          console.log("114", messageObj);
          if (record.esSession.stype === 0) {
            systemMsgs.push({ ...messageObj, type: 'system' });
          } else if (isStranger) {
            strangerMsgs.push({ ...messageObj, type: 'stranger' });
          } else {
            normalMsgs.push({ ...messageObj, type: 'normal' });
          }
        });
  
        setMessages(normalMsgs);
        setSystemMessages(systemMsgs);
        setStrangerMessages(strangerMsgs);
        console.log("143", systemMsgs);
        console.log("144messages", messages, normalMsgs);
        console.log("145", strangerMsgs);

        const sessionDict = {};

        // 把三种类型都合并进去，以 session.id 为 key 存储
        [...systemMsgs, ...strangerMsgs, ...normalMsgs].forEach((msg) => {
          sessionDict[msg.id] = msg
        })
        
        // 存入本地缓存
        Taro.setStorageSync('allSessionDict', sessionDict)

        if (strangerMsgs.length > 0) {
          Taro.setStorageSync('strangerMessages', JSON.stringify(strangerMsgs));
        }
      } else {
        console.error('获取消息列表失败:', res.data.msg);
      }
    } catch (error) {
      console.error('网络请求失败:', error);
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    } catch (error) {
      console.error('日期格式化错误:', error);
      return '';
    }
  };

  const handleItemClick = (id, name) => {
    console.log("id from session list", id);
    // 这里把消息的 id 传给详情页
    Taro.navigateTo({
      url: `/packageMessage/message-detail/index?id=${id}&name=${encodeURIComponent(name)}`,
    });
  };

  // 处理特殊消息项点击
  const handleSpecialItemClick = (item) => {
    if (item.type === 'stranger' || item.id === 'stranger-group') {
      // 所有陌生人消息（无论是单个陌生人消息或陌生人列表入口）都导航到陌生人列表页
      Taro.navigateTo({
        url: `/packageMessage/strangers/index`,
      });
    } else {
      console.log("188", item.id, item.name);
      // 系统消息，导航到消息详情页
      Taro.navigateTo({
        url: `/packageMessage/message-detail/index?id=${item.id}&name=${encodeURIComponent(item.name)}`,
      });
    }
  };

  // 创建陌生人入口项
  const strangerEntry = strangerMessages.length > 0 ? {
    id: 'stranger-group',
    avatar: 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/loading.png', 
    name: '陌生人打招呼',
    message: `${strangerMessages.length}个陌生人向你打招呼`,
    time: strangerMessages.length > 0 ? strangerMessages[0].time : '',
    type: 'stranger'
  } : null;
  console.log("susystemEntrys", systemMessages);
  // 创建系统消息入口
  const systemEntry = systemMessages.length > 0 ? {
    id: systemMessages[0].id, // 使用第一条系统消息的ID
    avatar: 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/loading.png',
    name: '系统消息',
    message: systemMessages[0].rawData.content,
    time: systemMessages[0].rawData.createTime,
    type: 'system'
  } : null;

  return (
    <View className='home-messages'>
      
      {/* 陌生人入口 */}
      {strangerEntry && (
        <View
          className='message-item special-item'
          key={strangerEntry.id}
          onClick={() => handleSpecialItemClick(strangerEntry)}
        >
          <View className='avatar-container'>
            <Image className='avatar' src={strangerEntry.avatar} />
          </View>
          <View className='message-content'>
            <View className='message-header'>
              <Text className='name'>{strangerEntry.name}</Text>
              <Text className='time'>{strangerEntry.time}</Text>
            </View>
            <Text className='message-text'>{strangerEntry.message}</Text>
          </View>
        </View>
      )}

      {/* 系统消息入口 */}
      {systemEntry && (
        <View
          className='message-item special-item'
          key={systemEntry.id}
          onClick={() => handleSpecialItemClick(systemEntry)}
        >
          <View className='avatar-container'>
            <Image className='avatar' src={systemEntry.avatar} />
          </View>
          <View className='message-content'>
            <View className='message-header'>
              <Text className='name'>{systemEntry.name}</Text>
              <Text className='time'>{systemEntry.time}</Text>
            </View>
            <Text className='message-text'>{systemEntry.message}</Text>
          </View>
        </View>
      )}

      {/* 普通消息列表 */}
      {messages.map((item) => (
        <View
          className='message-item'
          key={item.id}
          onClick={() => handleItemClick(item.id, item.name)}
        >
          <Image className='avatar' src={item.otherAvatar} />
          <View className='message-content'>
            <View className='message-header'>
              <Text className='name'>{item.name}</Text>
              <Text className='time'>{item.time}</Text>
            </View>
            <Text className='message-text'>{item.rawData.content}</Text>
          </View>
        </View>
      ))}

      {/* 添加 TabBar */}
      <TabBar 
        onWorldSelected={() => {}}
        isShowPostModal={isShowPostModal}
        setIsShowPostModal={setIsShowPostModal}
      />
    </View>
  );
};

export default observer(Index);