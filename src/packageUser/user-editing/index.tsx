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
        birthday: userInfo?.birthday || '2001-01-01',
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
            GlobalStore.setAvatar(userInfo ? userInfo.avatar: GlobalStore._userInfo.avatar);
            GlobalStore.setUsername(userInfo ? userInfo.username: GlobalStore._userInfo.username);
            GlobalStore.setGender(userInfo ? userInfo.gender: GlobalStore._userInfo.gender);
            GlobalStore.setLocation(userInfo ? userInfo.location: GlobalStore._userInfo.location);
            GlobalStore.setAboutMe(userInfo ? userInfo.aboutMe: GlobalStore._userInfo.aboutMe);
            GlobalStore.setBackgroundPic(userInfo ? userInfo.backgroundPic: GlobalStore._userInfo.backgroundPic);
            Taro.navigateBack({
                delta:1
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

  const handleUpload = async (type: 'avatar' | 'background') => {
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
          name: 'Image',
          formData: {
            prefix: 'test'
          },
          header: {
            'token': GlobalStore.userInfo.token,
          },
          success: function(result) {
              const responseData = JSON.parse(result.data);
              const imageUrl = responseData["result"];
              // 根据类型更新不同的字段
              setUserInfo(prev => prev ? {
                ...prev,
                ...(type === 'avatar' ? { avatar: imageUrl } : { backgroundPic: imageUrl })
              } : null);
              return imageUrl;
          }
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      Taro.showToast({
        title: '上传失败',
        icon: 'none'
      });
    }
  };

  // 修改菜单项点击处理逻辑
  const handleNavigation = (path?: string, params?: Record<string, any>) => {
    if (!path) return;
    
    // 构建查询字符串，添加空值检查
    const queryString = params 
      ? Object.entries(params)
          .filter(([_, value]) => value !== undefined && value !== null) // 过滤掉 undefined 和 null
          .map(([key, value]) => `${key}=${encodeURIComponent(value?.toString() || '')}`)
          .join('&')
      : '';

    // 构建完整路径
    const fullPath = queryString ? `${path}?${queryString}` : path;

    // 导航到目标页面
    Taro.navigateTo({ 
      url: fullPath,
      events: {
        updateData: function(data) {
          setUserInfo(prev => prev ? { ...prev, ...data } : null);
        }
      }
    });
  };

  // 添加手机号格式化函数
  const formatPhoneNumber = (phone: string | null | undefined) => {
    if (!phone) return '';
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  };

  const accountItems = [
    {
      label: 'ES code',
      value: userInfo?.uid?.toString().padStart(16, '0') || '',
      readOnly: true
    },
    {
      label: '邮箱',
      value: userInfo?.email || '',
      placeholder: '大家怎么能联系到你呢？',
      path: '/packageUser/edit-email/index',
      params: { currentValue: userInfo?.email }
    },
    {
      label: '手机号',
      value: formatPhoneNumber(userInfo?.mobile),  // 使用格式化函数处理手机号
      placeholder: '写一下你的手机号嘛~',
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
      placeholder: '你目前居住在？',
      path: '/packageUser/edit-location/index',
      params: { currentValue: userInfo?.location }
    },
    {
      label: '自我介绍',
      value: userInfo?.aboutMe || '',
      placeholder: '你是谁？你有什么故事？',
      path: '/packageUser/edit-about/index',
      params: { currentValue: userInfo?.aboutMe }
    },
    {
      label: '个性标签',
      value: userInfo?.tags?.join('、') || '',
      placeholder: '选择个性标签',
      path: '/packageUser/edit-tags/index',
      params: { currentValue: JSON.stringify(userInfo?.tags) }
    },
    {
      label: '个性照片',
      subLabel: '（选一张你的人生高光瞬间吧，推荐本人照片哦，这将是你在【世界】的出场照，让Guest/Host更好地了解你~）',
      customContent: (
        <View className='photo-upload' onClick={() => handleUpload('background')}>
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
      <View className='avatar-section' onClick={() => handleUpload('avatar')}>
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
            className={`menu-item ${item.readOnly ? 'readonly' : ''}`}
            onClick={() => {
              if (item.path && !item.readOnly) {
                handleNavigation(item.path, item.params);
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
              {!item.readOnly && <Text className='arrow'>›</Text>}
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
                Taro.navigateTo({ 
                  url: `${item.path}?currentValue=${encodeURIComponent(item.value || '')}`,
                  events: {
                    updateData: function(data) {
                      setUserInfo(prev => prev ? { ...prev, ...data } : null);
                    }
                  },
                  success: function(res) {
                    res.eventChannel.on('updateData', function(data) {
                      setUserInfo(prev => prev ? { ...prev, ...data } : null);
                    });
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
