import { View, Text, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import GlobalStore from '@store/GlobalStore';
import './index.scss';

interface UserInfo {
  uid: number;
  aboutMe: string;
  avatar: string;
  backgroundPic: string;
  location: string;
  tags: string[];
  username: string;
  gender: number;
  email: string;
  mobile: string;
  idVerified: boolean;
  studentVerified: boolean;
  isVip: boolean;
}

const UserEditing = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await Taro.request({
        url: 'https://api.eurostay.co/app/esuser/getUserCompleteInfo',
        method: 'POST',
        header: {
          'Authorization': `Bearer ${GlobalStore.userInfo.token}`
        }
      });

      if (response.statusCode === 200 && response.data.code === 0) {
        setUserInfo(response.data.result);
      } else {
        Taro.showToast({
          title: response.data.msg || '获取用户信息失败',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('Fetch user info failed:', error);
      Taro.showToast({
        title: '网络请求失败',
        icon: 'none'
      });
    }
  };

  const menuItems = [
    {
      label: '昵称',
      value: userInfo?.username || '',
      placeholder: '我是一条想飞的鱼',
      path: '/packageUser/edit-nickname/index'
    },
    {
      label: '账号',
      value: userInfo?.uid?.toString() || '',
      readonly: true
    },
    {
      label: '手机号',
      value: userInfo?.mobile || '',
      placeholder: '输入你的手机号',
      path: '/packageUser/edit-phone/index'
    },
    {
      label: '邮箱',
      value: userInfo?.email || '',
      placeholder: '输入你的邮箱',
      path: '/packageUser/edit-email/index'
    },
    {
      label: '性别',
      value: userInfo?.gender === 1 ? '男' : userInfo?.gender === 2 ? '女' : '',
      placeholder: '选择你的性别',
      path: '/packageUser/edit-gender/index'
    },
    {
      label: '地区',
      value: userInfo?.location || '',
      placeholder: '输入你的地区',
      path: '/packageUser/edit-location/index'
    },
    {
      label: '自我介绍',
      value: userInfo?.aboutMe || '',
      placeholder: '简单介绍一下你自己',
      path: '/packageUser/edit-about/index'
    },
    {
      label: '个人标签',
      value: userInfo?.tags?.join(', ') || '',
      placeholder: '选择个人标签',
      path: '/packageUser/edit-tags/index'
    },
    {
      label: '个人照片（将展示在世界板块）',
      value: '',
      placeholder: '上传个人照片',
      path: '/packageUser/edit-photos/index'
    }
  ];

  const handleAvatarClick = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // TODO: 实现头像上传逻辑
        console.log(res.tempFilePaths[0]);
      }
    });
  };

  return (
    <View className='user-editing'>
      <View className='page-header'>
        <Text className='title'>编辑资料</Text>
      </View>

      <View className='avatar-section'>
        <Image 
          className='avatar'
          src={userInfo?.avatar || ''}
          mode='aspectFill'
          onClick={handleAvatarClick}
        />
        <View className='edit-icon'>✎</View>
      </View>

      <View className='menu-list'>
        {menuItems.map((item, index) => (
          <View 
            key={index}
            className='menu-item'
            onClick={() => {
              if (item.path && !item.readonly) {
                Taro.navigateTo({ url: item.path });
              }
            }}
          >
            <Text className='label'>{item.label}</Text>
            <View className='value-container'>
              <Text className={`value ${!item.value ? 'placeholder' : ''}`}>
                {item.value || item.placeholder}
              </Text>
              {!item.readonly && <Text className='arrow'>›</Text>}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default observer(UserEditing);
