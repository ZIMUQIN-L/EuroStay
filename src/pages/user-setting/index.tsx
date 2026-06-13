import { View, Text, Image, Input } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import GlobalStore from '@store/GlobalStore';
import TabBar from '@components/TabBar';
import { API } from '@utils/apiService';
import { 
  vipCard, 
  starIcon,
  infoIcon,
  contactIcon,
  editIcon,
  mineUser,
} from '@utils/cloudIcons';
import './index.scss';

const UserSetting = () => {
  const [isShowPostModal, setIsShowPostModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  useEffect(() => {
    checkToken();
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const loggedIn = Boolean(GlobalStore.userInfo?.uid && GlobalStore.userInfo?.uid !== 0);
    setIsLoggedIn(loggedIn);
  };

  const checkToken = async () => {
    if (!GlobalStore.userInfo?.token) return;
    
    try {
      const res = await API.user.tokenCheck();

      if (res.data.code === 401 || res.data.code === 403) {
        // Token 过期或无效
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
                url: '/pages/user-setting/index'
              });
            }
          },
        });
      }
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        // Token 过期或无效
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
                url: '/pages/user-setting/index'
              });
            }
          },
        });
      }
    }
  };

  const handleLogin = () => {
    Taro.navigateTo({
      url: '/pages/login/index'
    });
  };

  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: function (res) {
        if (res.confirm) {
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
          Taro.reLaunch({
            url: '/pages/user-setting/index'
          });
        }
      }
    });
  };

  const formatUid = (uid: number) => {
    return uid.toString().padStart(16, '0');
  };

  const menuItems = [
    {
      icon: mineUser,
      text: '我的主页',
      path: `/pages/user/index?uid=${GlobalStore.userInfo.uid}`
    },
    {
        icon: starIcon,
        text: '我的收藏',
        path: '/packageUser/user-collection/index'
      },
    {
      icon: infoIcon,
      text: '关于ES',
      path: '/packageUser/about-es/index'
    },
    {
      icon: contactIcon,
      text: '联系我们',
      path: '/packageUser/user-contact/index'
    }
  ];

  const handleMenuClick = (path: string) => {
    if (!isLoggedIn) {
      Taro.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 500
      });
      return;
    }
    Taro.navigateTo({ url: path });
  };

  return (
    <View className={`page-container ${isShowPostModal ? 'modal' : ''}`}>
      <View className='user-setting'>
        {/* 顶部用户信息 */}
        <View className='user-header'>
          {/* <Text className='page-title'>我的</Text> */}
          <View className='user-info'>
            <Image 
              className='avatar' 
              src={isLoggedIn ? GlobalStore.userInfo.avatar : 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/loading.png'} 
              mode='aspectFill'
            />
            <View className='info-text'>
              <Text className='username'>{isLoggedIn ? GlobalStore.userInfo.username : 'ES游客'}</Text>
              <Text className='user-id'>ES code：{isLoggedIn ? formatUid(GlobalStore.userInfo.uid) : '未登录'}</Text>
            </View>
            {isLoggedIn && (
            <View className='edit-btn' onClick={() => Taro.navigateTo({ url: '/packageUser/user-editing/index' })}>
              <Image className='edit-icon' src={editIcon} mode='aspectFit' />
            </View>
            )}
          </View>
        </View>

        {/* 填写邀请码按钮
        <View className='invite-btn-row'>
          <View
            className='invite-btn left'
            onClick={() => {
              const code = isLoggedIn ? formatUid(GlobalStore.userInfo.uid) : '';
              if (code) {
                Taro.setClipboardData({ data: code });
                Taro.showToast({ title: '已复制到剪贴板', icon: 'none' });
              } else {
                Taro.showToast({ title: '请先登录', icon: 'none' });
              }
            }}
          >
            复制我的邀请码
          </View>
          <View
            className='invite-btn right'
            onClick={() => setShowInviteModal(true)}
          >
            填写邀请码获取会员
          </View>
        </View> */}

        {/* VIP卡片 */}
        <View 
          className={`vip-card ${!isLoggedIn || !GlobalStore.userInfo.isVip ? 'not-vip' : ''}`} 
          onClick={() => isLoggedIn && Taro.navigateTo({ url: '/packageUser/user-vip/index' })}
        >
          <Image 
            className='vip-bg' 
            src={vipCard}
            mode='aspectFill' 
          />
          {(!isLoggedIn || !GlobalStore.userInfo.isVip) && <View className='vip-mask' />}
          <View className='vip-content'>
            <View className='vip-info'>
              <Text className='vip-title'>
                {isLoggedIn && GlobalStore.userInfo.isVip ? 'Eurostay 包年会员' : '开通会员享专属权益'}
              </Text>
              <Text className='vip-level'>
                {isLoggedIn && GlobalStore.userInfo.isVip ? 'LV.1' : ''}
              </Text>
              <Text className='vip-link'>
                {isLoggedIn && GlobalStore.userInfo.isVip ? '会员中心 ›' : '立即开通 ›'}
              </Text>
            </View>
          </View>
        </View>

        {/* 功能菜单 */}
        <View className='menu-list'>
          {menuItems.map(item => (
            <View 
              key={item.text}
              className='menu-item'
              onClick={() => handleMenuClick(item.path)}
            >
              <View className='menu-left'>
                <Image className='menu-icon' src={item.icon} mode='aspectFit' />
                <Text className='menu-text'>{item.text}</Text>
              </View>
              <Text className='arrow'>›</Text>
            </View>
          ))}
        </View>

        {/* 退出登录按钮容器 */}
        <View className='logout-container'>
          <View className='logout-btn' onClick={isLoggedIn ? handleLogout : handleLogin}>
            <Text>{isLoggedIn ? '退出登录' : '点击登录'}</Text>
          </View>
        </View>
      </View>

      {/* 邀请码弹窗 */}
      {showInviteModal && (
        <View className='invite-modal-mask' onClick={() => setShowInviteModal(false)}>
          <View className='invite-modal' onClick={e => e.stopPropagation()}>
            <View className='invite-tip'>每个用户只有一次机会哦</View>
            <View className='invite-input-wrapper'>
              <Input
                className='invite-input'
                type='text'
                placeholder='请输入邀请码'
                value={inviteCode}
                onInput={e => setInviteCode(e.detail.value)}
              />
            </View>
            <View className='invite-btn-yellow' onClick={async () => {
              if (!inviteCode) {
                Taro.showToast({ title: '请输入邀请码', icon: 'none' });
                return;
              }
              try {
                await API.user.processInvitation(inviteCode);
                Taro.showToast({ title: '邀请成功，双方各获得一个月会员', icon: 'none' });
                setShowInviteModal(false);
              } catch (e) {
                setShowInviteModal(false);
              }
            }}>
              跟朋友平分14天会员
            </View>
            <View className='invite-later' onClick={() => setShowInviteModal(false)}>稍后再领</View>
          </View>
        </View>
      )}

      <TabBar 
        onWorldSelected={() => {}}
        setIsShowPostModal={setIsShowPostModal}
        isShowPostModal={isShowPostModal}
      />
    </View>
  );
};

export default observer(UserSetting);
