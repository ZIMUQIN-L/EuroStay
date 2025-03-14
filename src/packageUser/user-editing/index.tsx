import { View, Text, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import GlobalStore from '@store/GlobalStore';
import { editIcon } from '@utils/cloudIcons';
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
  birthday: string;
}

const UserEditing = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const response = await Taro.request({
        url: 'https://api.eurostay.co/app/esuser/getUserCompleteInfo',
        method: 'POST',
        header: {
          'token': GlobalStore.userInfo.token,
          'Content-Type': 'application/json'
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
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
      // 收集需要提交的数据
      const profileData = {
        aboutMe: userInfo?.aboutMe,
        avatar: userInfo?.avatar,
        backgroundPic: userInfo?.backgroundPic,
        birthday: userInfo?.birthday || '',
        gender: userInfo?.gender,
        location: userInfo?.location,
        tags: userInfo?.tags || [],
        username: userInfo?.username
      };

      // 发送更新请求
      Taro.request({
        url: 'https://api.eurostay.co/app/esuser/userProfileModify',
        method: 'POST',
        data: profileData,
        header: {
          'token': GlobalStore.userInfo.token,
          'Content-Type': 'application/json'
        },
        success: (res) => {
          if (res.data.code === 0) {
            Taro.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            });
            // 更新成功后刷新用户信息
            fetchUserInfo();
          } else {
            Taro.showToast({
              title: res.data.msg || '保存失败',
              icon: 'none',
              duration: 2000
            });
          }
        },
        fail: () => {
          Taro.showToast({
            title: '网络请求失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    }

  const handleUpload = async () => {
    try {
      const res = await Taro.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      });

      if (res.tempFilePaths && res.tempFilePaths[0]) {
        const uploadRes = await Taro.uploadFile({
          url: 'https://api.eurostay.co/app/common/upload',
          filePath: res.tempFilePaths[0],
          name: 'image',
          formData: {
            prefix: 'test' // 额外的字符串参数
          },
          header: {
            'token': GlobalStore.userInfo.token,
            'Content-Type': 'application/json'
          }
        });
        console.log(uploadRes);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      Taro.showToast({
        title: '上传失败',
        icon: 'none'
      });
    }
  };


  const accountItems = [
    {
      label: '账号',
      value: userInfo?.uid?.toString().padStart(16, '0') || '',
      readonly: true
    },
    {
      label: '邮箱',
      value: userInfo?.email || '',
      placeholder: '输入你的邮箱',
      path: '/packageUser/edit-email/index',
      params: { currentValue: userInfo?.email }
    },
    {
      label: '手机号',
      value: userInfo?.mobile || '',
      placeholder: '输入你的手机号',
      path: '/packageUser/edit-phone/index',
      params: { currentValue: userInfo?.mobile }
    }
  ];

  const profileItems = [
    {
      label: '昵称',
      value: userInfo?.username || '',
      placeholder: '还没有名称哦~',
      path: '/packageUser/edit-nickname/index',
      params: { currentValue: userInfo?.username }
    },
    {
      label: '性别',
      customContent: (
        <View className='gender-options'>
          <View 
            className={`gender-option ${userInfo?.gender === 0 ? 'selected' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setUserInfo(prev => prev ? { ...prev, gender: 0 } : null);
            }}
          >
            女
          </View>
          <View 
            className={`gender-option ${userInfo?.gender === 1 ? 'selected' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setUserInfo(prev => prev ? { ...prev, gender: 1 } : null);
            }}
          >
            男
          </View>
          <View 
            className={`gender-option ${userInfo?.gender === 2 ? 'selected' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setUserInfo(prev => prev ? { ...prev, gender: 2 } : null);
            }}
          >
            其他
          </View>
        </View>
      )
    },
    {
      label: '地区',
      value: userInfo?.location || '',
      placeholder: '输入你的地区',
      path: '/packageUser/edit-location/index',
      params: { currentValue: userInfo?.location }
    },
    {
      label: '自我介绍',
      value: userInfo?.aboutMe || '',
      placeholder: '简单介绍一下你自己',
      path: '/packageUser/edit-about/index',
      params: { currentValue: userInfo?.aboutMe }
    },
    {
      label: '个人标签',
      value: userInfo?.tags?.join('、') || '',
      placeholder: '选择个人标签',
      path: '/packageUser/edit-tags/index',
      params: { currentValue: JSON.stringify(userInfo?.tags) }
    },
    {
      label: '个人照片',
      subLabel: '（将展示在世界板块）',
      customContent: (
        <View className='photo-upload' onClick={() => handleUpload()}>
          {userInfo?.backgroundPic ? (
            <Image className='uploaded-photo' src={userInfo.backgroundPic} mode='aspectFill' />
          ) : (
            <View className='upload-placeholder'>
              <Text className='plus'>+</Text>
            </View>
          )}
        </View>
      )
    }
  ];

  if (loading) {
    return (
      <View className='user-editing loading'>
        <View className='loading-spinner' />
      </View>
    );
  }

  return (
    <View className='user-editing'>
      <View className='avatar-section' onClick={() => handleUpload()}>
        <Image 
          className='avatar'
          src={userInfo?.avatar || ''}
          mode='aspectFill'
        />
        <View className='edit-icon'>
          <Image src={editIcon} className='icon' mode='aspectFit' />
        </View>
      </View>

      <View className='menu-list account-section'>
        {accountItems.map((item, index) => (
          <View 
            key={index}
            className={`menu-item ${item.readonly ? 'readonly' : ''}`}
            onClick={() => {
              if (item.path && !item.readonly) {
                const url = new URL(item.path, window.location.href);
                if (item.params) {
                  Object.entries(item.params).forEach(([key, value]) => {
                    if (value !== undefined) {
                      url.searchParams.append(key, value.toString());
                    }
                  });
                }
                Taro.navigateTo({ 
                  url: url.pathname + url.search,
                  events: {
                    updateData: function(data) {
                      setUserInfo(prev => prev ? { ...prev, ...data } : null);
                    }
                  }
                });
              }
            }}
          >
            <View className='label-container'>
              <Text className='label'>{item.label}</Text>
            </View>
            <View className='value-container'>
              <Text className={`value ${!item.value ? 'placeholder' : ''}`}>
                {item.value || item.placeholder}
              </Text>
              {!item.readonly && <Text className='arrow'>›</Text>}
            </View>
          </View>
        ))}
      </View>

      <View className='menu-list profile-section'>
        {profileItems.map((item, index) => (
          <View 
            key={index}
            className={`menu-item ${item.customContent ? 'with-custom-content' : ''}`}
            onClick={() => {
              if (item.path) {
                const url = new URL(item.path, window.location.href);
                if (item.params) {
                  Object.entries(item.params).forEach(([key, value]) => {
                    if (value !== undefined) {
                      url.searchParams.append(key, value.toString());
                    }
                  });
                }
                Taro.navigateTo({ 
                  url: url.pathname + url.search,
                  events: {
                    updateData: function(data) {
                      setUserInfo(prev => prev ? { ...prev, ...data } : null);
                    }
                  }
                });
              }
            }}
          >
            <View className='label-container'>
              <Text className='label'>{item.label}</Text>
              {item.subLabel && <Text className='sub-label'>{item.subLabel}</Text>}
            </View>
            {item.customContent ? (
              item.customContent
            ) : (
              <View className='value-container'>
                <Text className={`value ${!item.value ? 'placeholder' : ''}`}>
                  {item.value || item.placeholder}
                </Text>
                <Text className='arrow'>›</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <View className='save-button' onClick={() => handleUpdate()}>
        保存修改
      </View>
    </View>
  );
};

export default observer(UserEditing);
