import { View, Text, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import GlobalStore from '@store/GlobalStore';
import TabBar from '@components/TabBar';
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

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    if (!GlobalStore.userInfo?.uid || GlobalStore.userInfo?.uid == 0) {
      Taro.showModal({
        title: '您还未登录',
        content: '点击登录以使用更多功能',
        confirmText: '前往登录',
        confirmColor: '#8A70D6',
        success: function (res) {
          if (res.confirm) {
            Taro.navigateTo({
              url: '/pages/login/index'
            });
          }
        }
      });
    }
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
            isVip: false
          });
          Taro.reLaunch({
            url: '/pages/login/index'
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
      path: '/pages/user/index'
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

  return (
    <View className={`page-container ${isShowPostModal ? 'modal' : ''}`}>
      <View className='user-setting'>
        {/* 顶部用户信息 */}
        <View className='user-header'>
          {/* <Text className='page-title'>我的</Text> */}
          <View className='user-info'>
            <Image 
              className='avatar' 
              src={GlobalStore.userInfo.avatar || 'default-avatar-url'} 
              mode='aspectFill'
            />
            <View className='info-text'>
              <Text className='username'>{GlobalStore.userInfo.username || '未设置昵称'}</Text>
              <Text className='user-id'>ES code：{formatUid(GlobalStore.userInfo.uid || 0)}</Text>
            </View>
            <View className='edit-btn' onClick={() => Taro.navigateTo({ url: '/packageUser/user-editing/index' })}>
              <Image className='edit-icon' src={editIcon} mode='aspectFit' />
            </View>
          </View>
        </View>

        {/* VIP卡片 */}
        <View 
          className={`vip-card ${GlobalStore.userInfo.isVip ? 'not-vip' : ''}`} 
          onClick={() => Taro.navigateTo({ url: '/packageUser/user-vip/index' })}
        >
          <Image 
            className='vip-bg' 
            src={vipCard}
            mode='aspectFill' 
          />
          {!GlobalStore.userInfo.isVip && <View className='vip-mask' />}
          <View className='vip-content'>
            <View className='vip-info'>
              <Text className='vip-title'>
                {GlobalStore.userInfo.isVip ? 'Eurostay 包月会员' : '开通会员享专属权益'}
              </Text>
              <Text className='vip-level'>
                {GlobalStore.userInfo.isVip ? 'LV.1' : ''}
              </Text>
              <Text className='vip-link'>
                {GlobalStore.userInfo.isVip ? '会员中心 ›' : '立即开通 ›'}
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
              onClick={() => Taro.navigateTo({ url: item.path })}
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
          <View className='logout-btn' onClick={handleLogout}>
            <Text>退出登录</Text>
          </View>
        </View>
      </View>

      <TabBar 
        onWorldSelected={() => {}}
        setIsShowPostModal={setIsShowPostModal}
        isShowPostModal={isShowPostModal}
      />
    </View>
  );
};

export default observer(UserSetting);
