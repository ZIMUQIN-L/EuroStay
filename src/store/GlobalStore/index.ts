import { makeAutoObservable } from 'mobx';
import { ESUserLoginInfoProps } from '@utils/interfaces';
import Taro from '@tarojs/taro';

class GlobalStore {
  _currentTab: string = 'home';
  _userInfo: ESUserLoginInfoProps;
  _socket: Taro.SocketTask | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this._currentTab = 'world';

    const stored = Taro.getStorageSync('userInfo');
    if (stored) {
      this._userInfo = stored;
    } else {
      // 2) 设置一个默认初始对象, 避免是undefined
      this._userInfo = {
        avatar: '',
        username: '',
        aboutMe: '',
        location: '',
        token: '',
        gender: 0,
        uid: 0,
        isVip: false,
        backgroundPic: '',
      };
    }
  }

  get userInfo() {
    const globalUserInfo: ESUserLoginInfoProps = {
      avatar: this._userInfo.avatar,
      username: this._userInfo.username,
      aboutMe: this._userInfo.aboutMe,
      location: this._userInfo.location,
      token: this._userInfo.token,
      gender: this._userInfo.gender,
      uid: this._userInfo.uid,
      isVip: this._userInfo.isVip,
      backgroundPic: this._userInfo.backgroundPic,
    };
    return globalUserInfo;
  }

  set userInfo(updateUserInfo: ESUserLoginInfoProps) {
    this._userInfo = { ...this._userInfo, ...updateUserInfo };
    Taro.setStorageSync('userInfo', this._userInfo); // 持久化
  }

  setAllInfo(userInfo: ESUserLoginInfoProps) {
    this._userInfo = userInfo;
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  setToken(newToken: string) {
    this._userInfo.token = newToken;
    Taro.setStorageSync('userInfo', this._userInfo); // 持久化
    this.connectWebSocket();
  }

  setAboutMe(newAboutMe: string) {
    this._userInfo.aboutMe = newAboutMe;
    Taro.setStorageSync('userInfo', this._userInfo); // 持久化
  }

  setUid(newUid: number) {
    if (!this._userInfo) {
      this._userInfo = {
        avatar: '',
        username: '',
        aboutMe: '',
        location: '',
        token: '',
        gender: 0,
        uid: newUid,
        isVip: false,
        backgroundPic: '',
      };
    } else {
      this._userInfo.uid = newUid;
    }
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  setAvatar(newAvatar: string) {
    this._userInfo.avatar = newAvatar;
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  setUsername(newUsername: string) {
    this._userInfo.username = newUsername;
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  setLocation(newLocation: string) {
    this._userInfo.location = newLocation;
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  setGender(newGender: number) {
    this._userInfo.gender = newGender;
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  setIsVip(newIsVip: boolean) {
    this._userInfo.isVip = newIsVip;
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  setBackgroundPic(newBackgroundPic: string) {
    this._userInfo.backgroundPic = newBackgroundPic;
    Taro.setStorageSync('userInfo', this._userInfo);
  }

  get currentTab() {
    return this._currentTab;
  }

  set currentTab(tab: string) {
    this._currentTab = tab;
  }


    /**
   * 连接 WebSocket
   */
    async connectWebSocket(token?: string) {
      const wsToken = token || this._userInfo.token;
      console.log(wsToken);
      if (!wsToken) {
        console.error('WebSocket 连接失败，缺少 token');
        return;
      }
    
      if (this._socket) {
        console.log('WebSocket 已经连接，无需重新连接');
        return;
      }
    
      const wsUrl = `wss://api.eurostay.co/app/essocket/${wsToken}`;
      console.log('正在连接 WebSocket:', wsUrl);
    
      try {
        this._socket = await Taro.connectSocket({
          url: wsUrl,
          header: { 'content-type': 'application/json' },
        });
    
        // 监听 WebSocket 事件
        this._socket.onOpen(() => {
          console.log('WebSocket 连接成功');
        });
    
        this._socket.onMessage((res) => {
          console.log('收到 WebSocket 新消息:', res.data);
          this.incrementWsMessageCounter();
          try {
            const msg = JSON.parse(res.data);
            // console.log(`共有 ${this._messageListeners.length} 个监听者将被通知：`);
            this._messageListeners.forEach((fn, index) => {
              // console.log(`通知第 ${index + 1} 个监听者`, fn.name || '(匿名函数)');
              fn(msg);
            });
          } catch (e) {
            console.error('解析消息失败:', e);
          }
        });
    
        this._socket.onClose(() => {
          console.log('WebSocket 连接关闭，3 秒后尝试重连...');
          this._socket = null;
          setTimeout(() => this.connectWebSocket(wsToken), 3000);
        });
    
        this._socket.onError((err) => {
          console.error('WebSocket 发生错误:', err);
        });
      } catch (error) {
        console.error('WebSocket 连接失败:', error);
      }
    }
    
  
    /**
     * 发送 WebSocket 消息
     */
    async sendWebSocketMessage(data: any) {
      if (!this._socket) {
        console.warn('WebSocket 未连接，尝试重新连接并发送消息...');
        await this.connectWebSocket(this._userInfo.token);
        return;
      }
    
      try {
        this._socket.send({
          data: JSON.stringify(data),
          success: () => console.log('消息发送成功:', data),
          fail: (err) => {
            console.error('WebSocket 发送消息失败:', err);
            // this.reconnectAndSend(data);
          },
        });
      } catch (error) {
        console.error('WebSocket 发送消息异常:', error);
        // await this.reconnectAndSend(data);
      }
    }


    _wsMessageCounter = 0;

    get wsMessageCounter() {
      return this._wsMessageCounter;
    }

    incrementWsMessageCounter() {
      this._wsMessageCounter++;
    }

    _messageListeners = [];

    addMessageListener(callback) {
      // console.log('添加 WebSocket 消息监听器:', callback.name || '(匿名函数)');
      this._messageListeners.push(callback);
    }
    
    removeMessageListener(callback) {
      // console.log('移除监听器:', callback.name || '(匿名函数)');
      this._messageListeners = this._messageListeners.filter(fn => fn !== callback);
    }

    
    
}
const globalStoreInstance = new GlobalStore();
export default globalStoreInstance;
export interface IGlobalStore extends GlobalStore {}
