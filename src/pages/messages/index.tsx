import { View, Text, Image } from '@tarojs/components'
import { observer } from 'mobx-react'
import Taro, { useReachBottom } from '@tarojs/taro'
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  
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
    checkLoginStatus();
  }, [GlobalStore.wsMessageCounter]);

  const checkLoginStatus = () => {
    const loggedIn = Boolean(GlobalStore.userInfo?.uid && GlobalStore.userInfo?.uid !== 0);
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      console.log(123)
      GlobalStore.connectWebSocket(GlobalStore.userInfo.token);
      fetchMessages();
    }
  };

  const handleLogin = () => {
    Taro.navigateTo({
      url: '/pages/login/index'
    });
  };

  const fetchMessages = async () => {
    if (loading || !hasMore) return;

    const token = GlobalStore.userInfo.token;
    const currentUid = GlobalStore.userInfo.uid;
  
    if (!token) {
      console.error('缺少 token，无法获取消息列表');
      return;
    }
  
    setLoading(true);
    try {
      const res = await Taro.request({
        url: 'https://api.eurostay.co/app/esmessages/sessionList',
        method: 'GET',
        header: { token },
        data: { pageNum: page },
      });
  
  
      if (res.statusCode === 200 && res.data.code === 0) {
        const records = res.data.result.records || [];
  
        const normalMsgs = [];
        const systemMsgs = [];
        const strangerMsgs = [];
  
        records.forEach((record) => {
          const otherPersonUid =
            currentUid === record.esSession.initUid ? record.esSession.replyUid : record.esSession.initUid;
  
          const displayName = `User ${otherPersonUid}`;
  
          let isStranger = false;
          if (currentUid === record.esSession.initUid) {
            isStranger = record.esSession.initStranger;
          } else if (currentUid === record.esSession.replyUid) {
            isStranger = record.esSession.replyStranger;
          }

          const isCurrentInit = Number(currentUid) === Number(record.esSession.initUid);// I am init
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
            message: record.esSession.topMessage || '无消息内容',
            // time: formatTime(record.esSession.updateTime),
            time: record.esSession.updateTime,
            otherUid: otherPersonUid,
            rawData: {
              fromUid: record.esSession.initUid,
              toUid: record.esSession.replyUid,
              content: record.esSession.topMessage || '无消息内容',
              createTime: record.esSession.updateTime,
            },
          };
          if (record.esSession.stype === 0) {
            systemMsgs.push({ ...messageObj, type: 'system' });
          } else if (isStranger) {
            strangerMsgs.push({ ...messageObj, type: 'stranger' });
          } else {
            normalMsgs.push({ ...messageObj, type: 'normal' });
          }
        });

        console.log(res.data.result);
        if (res.data.result.current * res.data.result.size >= res.data.result.total) {
          setHasMore(false);
        } else {
          setPage(prev => prev + 1);
        }
  
        setMessages(normalMsgs);
        setSystemMessages(systemMsgs);
        setStrangerMessages(strangerMsgs);

        // 对消息按时间排序，越新的越靠前
        const sortedMessages = [...normalMsgs].sort((a, b) => {
          const timeA = new Date(a.rawData.createTime).getTime();
          const timeB = new Date(b.rawData.createTime).getTime();
          return timeB - timeA; // 降序排序，新的在前
        });
        setMessages(sortedMessages);

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
      } else if (res.data.code === 401 || res.data.code === 403) {
        // Token expired or invalid
        Taro.showModal({
          title: '登录已过期',
          content: '请重新登录',
          success: function (res) {
            if (res.confirm) {
              Taro.reLaunch({
                url: '/pages/login/index',
              });
            } else {
              // 如果用户不登录，重置 GlobalStore 信息
              GlobalStore.setAllInfo({
                token: '',
                uid: 0,
                username: '',
                avatar: '',
                aboutMe: '',
                location: '',
                gender: 0,
                isVip: false,
                backgroundPic: '',
              });
              // 重新加载当前页面
              Taro.reLaunch({
                url: '/pages/messages/index'
              });
            }
          },
        });
        return;
      } else {
        console.error('获取消息列表失败:', res.data.msg);
      }
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        // Token expired or invalid
        Taro.showModal({
          title: '登录已过期',
          content: '请重新登录',
          success: function (res) {
            if (res.confirm) {
              Taro.reLaunch({
                url: '/pages/login/index',
              });
            } else {
              // 如果用户不登录，重置 GlobalStore 信息
              GlobalStore.setAllInfo({
                token: '',
                uid: 0,
                username: '',
                avatar: '',
                aboutMe: '',
                location: '',
                gender: 0,
                isVip: false,
                backgroundPic: '',
              });
              // 重新加载当前页面
              Taro.reLaunch({
                url: '/pages/messages/index'
              });
            }
          },
        });
        return;
      }
      console.error('网络请求失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useReachBottom(() => {
      fetchMessages();
  });

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
  // 创建系统消息入口
  const systemEntry = systemMessages.length > 0 ? {
    id: systemMessages[0].id, // 使用第一条系统消息的ID
    avatar: 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/loading.png',
    name: '系统消息',
    message: systemMessages[0].rawData.content,
    time: systemMessages[0].rawData.createTime,
    type: 'system'
  } : null;

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <View className='message-list'>
          <View className='empty-container'>
            <Text className='empty-text'>暂无消息</Text>
          </View>
        </View>
      );
    }

    return (
      <View className='message-list'>
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
              <Text className='message-text'>
                {item.rawData.content.length > 20
                  ? `${item.rawData.content.slice(0, 20)}...`
                  : item.rawData.content}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View className='home-messages'>
      {renderContent()}
      
      {!isLoggedIn && (
        <View className='login-container'>
          <View className='login-btn' onClick={handleLogin}>
            <Text>登录查看</Text>
          </View>
        </View>
      )}

      <TabBar 
        onWorldSelected={() => {}}
        isShowPostModal={isShowPostModal}
        setIsShowPostModal={setIsShowPostModal}
      />
    </View>
  );
};

export default observer(Index);