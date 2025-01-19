import { observer } from 'mobx-react';
import { View, Image, Text, Button, Input, Picker } from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';
import dayjs from 'dayjs';
import GlobalStore from '@store/GlobalStore';

const Index = () => {
  const [userData, setUserData] = useState(null);
  
  Taro.request({
    url: 'https://api.eurostay.co/app/esuser/showProfile',
    method: 'POST',
    data: {
      uid: 2 // change later
    },
    header: {
      'Content-Type': 'application/json', 
      'token': GlobalStore.userInfo.token
    }
  })
    .then((res) => {
      // console.log('Response:', res.data);
      const result = res.data.result;
        setUserData({
          ...result,
          backgroundPic: result.backgroundPic || [], // Default to empty array if null
        });
    })
    .catch((err) => {
      console.error('Request failed:', err);
    });

  const [activeModal, setActiveModal] = useState<string | null>(null); // Track which modal is open
  const [userName, setUserName] = useState('速食主义');
  const [userLocation, setUserLocation] = useState('西班牙 Valencia');
  const [userSex, setUserSex] = useState('女性');
  const [selectedMBTI, setSelectedMBTI] = useState('');
  const [userEmail, setUserEmail] = useState('')
  const [userWeChat, setUserWeChat] = useState('')
  const [userBirthday, setUserBirthday] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [enrollmentYear, setEnrollmentYear] = useState('');
  const [userLRB, setUserLRB] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  
  const [searchInput, setSearchInput] = useState('');

  const closeModal = () => setActiveModal(null);

  // Open specific modals
  const openNameModal = () => setActiveModal("name");
  const openLocationModal = () => setActiveModal("location");
  const openSexModal = () => setActiveModal("sex");
  const openMBTIModal = () => setActiveModal("mbti")
  const openEmailModal = () => setActiveModal("email")
  const openWeChatModal = () => setActiveModal("wechat")
  const openBirthdayModal = () => setActiveModal("birthday")
  const openJobModal = () => setActiveModal("job")
  const openSchoolModal = () => setActiveModal("school")
  const openLRBModal = () => setActiveModal("LRB")

  const openYouModal = () => setActiveModal("youTag")
  const openGreenModal = () => setActiveModal("green")
  const openRedModal = () => setActiveModal("red")
  const openInterestModal = () => setActiveModal("interest")
  const openVisitedModal = () => setActiveModal("visited")

  

  const handleSelect = (gender) => {
    setUserSex(gender);
  };
  const groups = [
    { label: '绿人组', types: ['ENFJ', 'ENFP', 'INFJ', 'INFP'] },
    { label: '黄人组', types: ['ESTJ', 'ESTP', 'ISTJ', 'ISTP'] },
    { label: '紫人组', types: ['ENTJ', 'ENTP', 'INTJ', 'INTP'] },
    { label: '蓝人组', types: ['ESFJ', 'ESFP', 'ISFJ', 'ISFP'] },
  ];

  const [error, setError] = useState('');

  // For name
  const handleInputChange = (e) => {
    const value = e.detail.value;
    setUserName(value);
    if (value.length >= 2) {
      setError(''); // Clear error when valid
    }
  };

  const handleEmailChange = (e) => {
    const value = e.detail.value;
    setUserEmail(value);
  }

  const handleWeChatChange = (e) => {
    const value = e.detail.value;
    setUserWeChat(value);
  }

  const handleBirthdayChange = (e) => {
    const value = e.detail.value;
    setUserBirthday(value);
  };

  const handleYearChange = (e) => {
    setEnrollmentYear(e.detail.value);
  };

  const handleLRBChange = (e) => {
    const value = e.detail.value;
    setUserLRB(value);
  }

  const handleSubmit = () => {
    if (userName.length < 2) {
      setError('名字至少需要2个字符');
    } else {
      setError('');
      console.log('Valid input:', userName);
    }
  };

  // job tags
  const [selectedJob, setSelectedJob] = useState(['来选择吧！']);
  const [customJobTag, setCustomJobTag] = useState('');

  const handleRemoveJob = (tag) => {
    setSelectedJob(selectedJob.filter((item) => item !== tag));
  };

  const handleAddJob = (tag) => {
    if (selectedJob.length < maxSelection) {
      setSelectedJob([...selectedJob, tag]);
    }
  };

  const handleCustomAddJob = () => {
    if (customJobTag && selectedJob.length < maxSelection) {
      setSelectedJob([...selectedJob, customJobTag]);
      setCustomJobTag('');
    }
  };


  // you tags
  const [selectedYou, setSelectedYou] = useState(['来选择吧！']);
  const [customYouTag, setCustomYouTag] = useState('');

  const handleRemoveYou = (tag) => {
    setSelectedYou(selectedYou.filter((item) => item !== tag));
  };

  const handleAddYou = (tag) => {
    if (selectedYou.length < maxSelection) {
      setSelectedYou([...selectedYou, tag]);
    }
  };

  const handleCustomAddYou = () => {
    if (customYouTag && selectedYou.length < maxSelection) {
      setSelectedYou([...selectedYou, customYouTag]);
      setCustomYouTag('');
    }
  };

  // green tags
  const [selectedGreen, setSelectedGreen] = useState(['来选择吧！']);
  const [customTag, setCustomTag] = useState('');

  const maxSelection = 3;

  const handleRemoveGreen = (tag) => {
    setSelectedGreen(selectedGreen.filter((item) => item !== tag));
  };

  const handleAddGreen = (tag) => {
    if (selectedGreen.length < maxSelection) {
      setSelectedGreen([...selectedGreen, tag]);
    }
  };

  const handleCustomAddGreen = () => {
    if (customTag && selectedGreen.length < maxSelection) {
      setSelectedGreen([...selectedGreen, customTag]);
      setCustomTag('');
    }
  };

  const recommendedCategories = {
    兴趣爱好型: ['爱聊天', '爱吃饭', '爱看书', '爱旅行'],
    技能认证型: ['会摄影', '会开车', '会做饭'],
  };

  // red tags
  const [selectedRed, setSelectedRed] = useState(['来选择吧！']);
  const [customRedTag, setCustomRedTag] = useState('');

  const handleRemoveRed = (tag) => {
    setSelectedRed(selectedRed.filter((item) => item !== tag));
  };

  const handleAddRed = (tag) => {
    if (selectedRed.length < maxSelection) {
      setSelectedRed([...selectedRed, tag]);
    }
  };

  const handleCustomAddRed = () => {
    if (customRedTag && selectedRed.length < maxSelection) {
      setSelectedRed([...selectedRed, customRedTag]);
      setCustomRedTag('');
    }
  };

  const nonRecommendedCategories = {
    XXXX: ['邋遢鬼', '不成熟', '吃得少'],
    XXX: ['邋遢鬼', '不成熟', '吃得少'],
  };

  // interest tags
  const [selectedInterest, setSelectedInterest] = useState(['来选择吧！']);
  const [customInterestTag, setCustomInterestTag] = useState('');

  const handleRemoveInterest = (tag) => {
    setSelectedInterest(selectedInterest.filter((item) => item !== tag));
  };

  const handleAddInterest = (tag) => {
    if (selectedInterest.length < maxSelection) {
      setSelectedInterest([...selectedInterest, tag]);
    }
  };

  const handleCustomAddInterest = () => {
    if (customInterestTag && selectedInterest.length < maxSelection) {
      setSelectedInterest([...selectedInterest, customInterestTag]);
      setCustomInterestTag('');
    }
  };

  // Visited countries
  const [selectedVisited, setSelectedVisited] = useState(['来选择吧！']);
  const [customVisitedTag, setCustomVisitedTag] = useState('');

  const handleRemoveVisited = (tag) => {
    setSelectedVisited(selectedVisited.filter((item) => item !== tag));
  };

  const handleAddVisited = (tag) => {
    setSelectedVisited([...selectedVisited, tag]);
  };

  const handleCustomAddVisited = () => {
    setSelectedVisited([...selectedVisited, customVisitedTag]);
    setCustomVisitedTag('');
  };

  // for profile photo
  const uploadPhoto = () => {
    Taro.chooseImage({
      count: 1, // Allow selecting only one image
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        console.log("Selected file path:", tempFilePath);
  
        // Send the URL or identifier to the backend
        Taro.request({
          url: "https://api.eurostay.co/app/esuser/userProfileModify", // API endpoint
          method: "POST",
          data: {
            avatar: tempFilePath, // Send the image URL or identifier
          },
          header: {
            "Content-Type": "application/json",
            token: GlobalStore.userInfo.token, // Authentication token
          },
        })
          .then((response) => {
            if (response.data.code === 0) {
              console.log("Avatar updated successfully:", response.data);
              setUserData((prev) => ({
                ...prev,
              }));
            } else {
              console.error("Failed to update avatar:", response.data.msg);
              Taro.showToast({
                title: response.data.msg || "Failed to update avatar",
                icon: "none",
              });
            }
          })
          .catch((err) => {
            console.error("Request failed:", err);
            Taro.showToast({
              title: "Network error, please try again later",
              icon: "none",
            });
          });
      },
      fail: (err) => {
        console.error("Image selection failed:", err);
      },
    });
  };
  
  
  const uploadBackgroundPhoto = () => {
    Taro.chooseImage({
      count: 1, // Allow selecting only one image at a time
      sizeType: ["original", "compressed"], // Allow both original and compressed images
      sourceType: ["album", "camera"], // Allow selecting from album or camera
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]; // Get the selected image path
        console.log("Selected file path for background:", tempFilePath);
  
        // Send the updated backgroundPic array to the backend
        Taro.request({
          url: "https://api.eurostay.co/app/esuser/userProfileModify", // API endpoint
          method: "POST",
          data: {
            backgroundPic: [...userData.backgroundPic, tempFilePath], // Append the new image
          },
          header: {
            "Content-Type": "application/json",
            token: GlobalStore.userInfo.token, // Authentication token
          },
        })
          .then((response) => {
            if (response.data.code === 0) {
              console.log("Background picture updated successfully:", response.data);
              setUserData((prev) => ({
                ...prev,
                backgroundPic: [...prev.backgroundPic, tempFilePath], // Update the backgroundPic array locally
              }));
            } else {
              console.error("Failed to update background picture:", response.data.msg);
              Taro.showToast({
                title: response.data.msg || "Failed to update background picture",
                icon: "none",
              });
            }
          })
          .catch((err) => {
            console.error("Request failed:", err);
            Taro.showToast({
              title: "Network error, please try again later",
              icon: "none",
            });
          });
      },
      fail: (err) => {
        console.error("Image selection failed:", err);
      },
    });
  };
  console.log(userData)
  
  const deletePhoto = (indexToRemove) => {
    const updatedPhotos = userData.backgroundPic.filter((_, index) => index !== indexToRemove);
  
    Taro.request({
      url: "https://api.eurostay.co/app/esuser/userProfileModify",
      method: "POST",
      data: { backgroundPic: updatedPhotos },
      header: {
        "Content-Type": "application/json",
        token: GlobalStore.userInfo.token,
      },
    })
      .then((response) => {
        if (response.data.code === 0) {
          console.log("Photo deleted successfully:", response.data);
          setUserData((prev) => ({
            ...prev,
            backgroundPic: updatedPhotos,
          }));
        } else {
          console.error("Failed to delete photo:", response.data.msg);
          Taro.showToast({
            title: response.data.msg || "Failed to delete photo",
            icon: "none",
          });
        }
      })
      .catch((err) => {
        console.error("Request failed:", err);
        Taro.showToast({
          title: "Network error, please try again later",
          icon: "none",
        });
      });
  };
  
  


  return (
    <View className="profile-container">
      <View className="header">
        <View className="profile-avatar-container">
          <Image
            className={`profile-avatar ${!userData?.avatar ? 'placeholder' : ''}`}
            src={userData?.avatar}
            mode="aspectFill"
            onClick={uploadPhoto}
          />
          {!userData?.avatar && (
            <View className="placeholder-icon">
              <Text>+</Text>
            </View>
          )}
        </View>
      </View>
      <View className="content">
        <Text className="section-title">照片与视频</Text>
        <Text className="section-subtitle">
          展示你的多彩人生（第一张将作为封图展示）
        </Text>
        <View className="photo-grid">
        {userData?.backgroundPic && userData.backgroundPic.length > 0 && (
          userData.backgroundPic.map((item, index) => (
            <View className="photo-item" key={index}>
              <Image className="photo" src={item} mode="aspectFill" />
              <Button
                className="delete-btn"
                onClick={() => deletePhoto(index)} // Use index if `item.id` is not available
              >
                X
              </Button>
              <Text className="photo-index">
                {index === 0 ? '首图' : index + 1}
              </Text>
            </View>
          ))
        )}
          <View className="photo-item add-photo-btn" onClick={uploadBackgroundPhoto}>
            <Text>+</Text>
          </View>
        </View>
        <View className="verification-section">
          <Text className="section-title">认证你的真实身份</Text>
          <Text className="verification-status">未认证</Text>
        </View>

        <View className="user-info-section">
          <View className="info-item" onClick={openNameModal}>
            <Text className="info-label">用户名</Text>
            <Text className="info-value">速食主义</Text>
          </View>
          <View className="info-item" onClick={openLocationModal}>
            <Text className="info-label">地点</Text>
            <Text className="info-value">西班牙, Valencia</Text>
          </View>
          <View className="info-item" onClick={openSexModal}>
            <Text className="info-label">性别</Text>
            <Text className="info-value">女性</Text>
          </View>
          <View className="info-item" onClick={openMBTIModal}>
            <Text className="info-label">MBTI</Text>
            <Text className="info-value">INTP</Text>
          </View>
          {/* <View className="info-item" onClick={openEmailModal}>
            <Text className="info-label">邮箱 (仅供收集)</Text>
            <Text className="info-value">添加</Text>
          </View>
          <View className="info-item" onClick={openWeChatModal}>
            <Text className="info-label">微信 (仅供收集)</Text>
            <Text className="info-value">添加</Text>
          </View> */}
          <View className="info-item" onClick={openBirthdayModal}>
            <Text className="info-label">出生日期</Text>
            <Text className="info-value">添加</Text>
          </View>
          <View className="info-item" onClick={openJobModal}>
            <Text className="info-label">工作</Text>
            <Text className="info-value">添加</Text>
          </View>
          <View className="info-item" onClick={openSchoolModal}>
            <Text className="info-label">学校</Text>
            <Text className="info-value">添加</Text>
          </View>
          <View className="info-item" onClick={openLRBModal}>
            <Text className="info-label">小红书账号</Text>
            <Text className="info-value">添加</Text>
          </View>
          <View className="interest-section">
            <View className="info-item about-me">
              <Text className="info-label">关于我</Text>
              <Text className="section-subtitle">你是怎样的一个人</Text>
              <Input
                className="about-me-input"
                placeholder="请输入内容"
              />
            </View>

            <View className="info-item why-exchange">
              <Text className="info-label">为什么选择借换宿</Text>
              <Text className="section-subtitle">借宿对你来说意味着什么</Text>
              <Input
                className="about-me-input"
                placeholder="请输入内容"
              />
            </View>

            <View className="info-item tag" onClick={openYouModal}>
              <Text className="info-label">你的Tag</Text>
              <Text className="section-subtitle">你是什么样的人</Text>
              <View className="info-value-box">
                添加你的Tag
              </View>
            </View>

            <View className="info-item green-flag" onClick={openGreenModal}>
              <Text className="info-label">Green Flag</Text>
              <Text className="section-subtitle">你喜欢什么样的人</Text>
              <View className="info-value-box">
                添加你喜欢的人的类型
              </View>
            </View>

            <View className="info-item red-flag" onClick={openRedModal}>
              <Text className="info-label">Red Flag</Text>
              <Text className="section-subtitle">你讨厌什么样的人</Text>
              <View className="info-value-box">
                添加你讨厌的人的类型
              </View>
            </View>


            <View className="info-item interests" onClick={openInterestModal}>
              <Text className="info-label">兴趣爱好</Text>
              <Text className="section-subtitle">选择你特别钟爱的兴趣爱好</Text>
              <View className="info-value-box">
                <View className="interest-options">
                
                  <Text className="option">🎬 电影</Text>
                  <Text className="option">📷 摄影</Text>
                  <Text className="option">🎭 话剧</Text>
                  <Text className="option">🎤 音乐</Text>
                </View>
              </View>
            </View>

            <View className="info-item countries" onClick={openVisitedModal}>
              <Text className="info-label">去过的国家</Text>
              <Text className="section-subtitle">你去过哪些地方</Text>
              <View className="info-value-box">
                添加你的旅行足迹
              </View>
            </View>

            <View className="info-item memories">
              <Text className="info-label">最难忘的换宿回忆</Text>
              <Text className="section-subtitle">你在借换宿过程中遇到的有趣事情</Text>
              <Input
                className="about-me-input"
                placeholder="请输入内容"
              />
            </View>
          </View>


        </View>
      </View>
      {activeModal === 'name' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
              <Text className="modal-title">编辑名字</Text>
              <Text className="modal-confirm-button"
                  onClick={() => {
                    handleSubmit();
                    closeModal();
                  }}>
                确认
              </Text>
            </View>
            <View className="modal-body">
            <View className="input-container">
              <Input
                className="modal-input"
                value={userName}
                placeholder="请输入名字"
                maxlength={8}
                onInput={handleInputChange}
              />
              {/* <Text className="modal-counter">{userName.length}/24</Text> */}
            </View>
            {/* {error && <Text className="error-message">{error}</Text>} */}
              <Text className="modal-instruction">
                请设置1-8个字符，不包括 @&lt;&gt;/ 等无效字符
              </Text>
            </View>
          </View>
        </View>
      )}
      {activeModal === 'location' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
              <Text className="modal-title">选择你的地区</Text>
              <Text className="modal-confirm-button" onClick={closeModal}>
                确认
              </Text>
            </View>
            <View className="modal-body">
              <Text className="modal-subtitle">定位到的位置</Text>
              <Input
                className="modal-input"
                value={userLocation}
                placeholder="请输入位置"
                onInput={(e) => setUserLocation(e.detail.value)}
              />
              <Text className="modal-subtitle">快速输入/查找</Text>
              <Input
                className="modal-input"
                value={searchInput}
                placeholder="搜索地区"
                onInput={(e) => setSearchInput(e.detail.value)}
              />
              <Text className="modal-subtitle">全部</Text>
              <View className="location-list">
                {['西班牙', '安道尔', '奥地利', '澳大利亚', '阿尔巴尼亚', '阿尔及利亚', '爱尔兰', '安哥拉', '阿根廷'].map((location, index) => (
                  <View
                    key={index}
                    className="location-item"
                    onClick={() => {
                      setUserLocation(location);
                      closeModal();
                    }}
                  >
                    {location}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      )}
      {activeModal === 'sex' && (
        <View className="modal-overlay">
        <View className="modal-content">
          <View className="modal-header">
            <Text className="modal-close" onClick={closeModal}>
              ✕
            </Text>
            <Text className="modal-title">选择你的生理性别</Text>
            <Text className="modal-confirm-button" onClick={closeModal}>
              确认
            </Text>
          </View>
          <View className="modal-body">
            <View className="gender-selector">
              <View
                className={`gender-option ${userSex === '男性' ? 'selected' : ''}`}
                onClick={() => handleSelect('男性')}
              >
                <Text>男</Text>
                {userSex === '男性' && <Text className="checkmark">✔</Text>}
              </View>
              <View
                className={`gender-option ${userSex === '女性' ? 'selected' : ''}`}
                onClick={() => handleSelect('女性')}
              >
                <Text>女</Text>
                {userSex === '女性' && <Text className="checkmark">✔</Text>}
              </View>
            </View>
          </View>
        </View>
      </View>
      )}
      {activeModal === 'mbti' && (
        <View className="modal-overlay">
        <View className="modal-content">
          <View className="modal-header">
            <Text className="modal-close" onClick={closeModal}>
              ✕
            </Text>
            <Text className="modal-title">编辑你的MBTI</Text>
            <Text className="modal-confirm-button" onClick={closeModal}>
              确认
            </Text>
          </View>
          <View className="modal-body">
            <View className="mbti-container">
              <Text className="mbti-header">
                MBTI有助于帮你匹配性格更合适的旅伴哦
              </Text>
              {groups.map((group, index) => (
                <View key={index} className="mbti-group">
                  <Text className="group-label">{group.label}</Text>
                  <View className="group-types">
                    {group.types.map((type) => (
                      <View
                        key={type}
                        className={`mbti-type ${
                          selectedMBTI === type ? 'selected' : ''
                        }`}
                        onClick={() => setSelectedMBTI(type)}
                      >
                        {type}
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
      )}
      {activeModal === 'email' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
              <Text className="modal-title">编辑邮箱</Text>
              <Text className="modal-confirm-button"
                  onClick={() => {
                    closeModal();
                  }}>
                确认
              </Text>
            </View>
            <View className="modal-body">
            <View className="input-container">
              <Input
                className="modal-input"
                value={userEmail}
                placeholder="请输入微信"
                onInput={handleEmailChange}
              />
            </View>
              <Text className="modal-instruction">
                我们将用邮箱向您发送消息提醒和联系邮件，请注意查收~
              </Text>
            </View>
          </View>
        </View>
      )}
      {activeModal === 'wechat' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
              <Text className="modal-title">编辑微信</Text>
              <Text className="modal-confirm-button"
                  onClick={() => {
                    closeModal();
                  }}>
                确认
              </Text>
            </View>
            <View className="modal-body">
            <View className="input-container">
              <Input
                className="modal-input"
                value={userWeChat}
                placeholder="请输入邮箱"
                onInput={handleWeChatChange}
              />
            </View>
              <Text className="modal-instruction">
                我们将用微信向您发送消息提醒和联系邮件，请注意查收~
              </Text>
            </View>
          </View>
        </View>
      )}
      {activeModal === 'birthday' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
              <Text className="modal-title">编辑生日</Text>
              <Text className="modal-confirm-button"
                  onClick={() => {
                    closeModal();
                  }}>
                确认
              </Text>
            </View>
            <View className="modal-body">
              <View className="birthday-info">
                <View className="info-row">
                  <Text className="info-label">生日信息</Text>
                  <Picker mode="date" 
                    onChange={handleBirthdayChange} 
                    value={userBirthday}
                    end={dayjs().format('YYYY-MM-DD')}
                  >
                    <View className="info-value">
                      {userBirthday ? userBirthday : '请选择'}
                      <Text className="arrow">{'>'}</Text>
                    </View>
                  </Picker>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {activeModal === 'job' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
              <Text className="modal-title">编辑职业</Text>
              <Text className="modal-confirm-button"
                  onClick={() => {
                    closeModal();
                  }}>
                确认
              </Text>
            </View>
            <View className="modal-body">
              <View className="preference-selector">
                {/* Title */}
                <Text className="section-title">请选择您的职业</Text>

                {/* Selected Tags */}
                <View className="selected-tags">
                  <View className="selection-container">
                    <Text className="selection-text">已选择</Text>
                    <Text className="selection-count">{selectedJob.length}/{maxSelection}</Text>
                  </View>
                  <View className="tags">
                    {selectedJob.map((tag, index) => (
                      <View
                        key={index}
                        className="tag selected"
                        onClick={() => handleRemoveJob(tag)}
                      >
                        {tag} <Text className="remove">X</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Custom Tag Input */}
                <Text className="subtitle">自定义</Text>
                <View className="custom-input">
                  <Input
                    className="custom-input-field"
                    value={customJobTag}
                    placeholder="请输入标签"
                    onInput={(e) => setCustomJobTag(e.detail.value)}
                    onConfirm={handleCustomAddJob}
                  />
                  <View
                    className="add-button"
                    onClick={handleCustomAddJob} // Handles button click
                  >
                    添加
                  </View>
                </View>

                {/* Recommendations */}
                <View className="recommendations">
                  <Text className="subtitle">推荐</Text>
                  {Object.keys(recommendedCategories).map((category, index) => (
                    <View key={index} className="category">
                      <Text className="category-title">{category}</Text>
                      <View className="tags">
                        {recommendedCategories[category].map((tag, idx) => (
                          <View
                            key={idx}
                            className={`tag ${selectedJob.includes(tag) ? 'disabled' : ''}`}
                            onClick={() => !selectedJob.includes(tag) && handleAddJob(tag)}
                          >
                            {tag}
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {activeModal === 'school' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
              <Text className="modal-title">编辑学校</Text>
              <Text className="modal-confirm-button"
                  onClick={() => {
                    closeModal();
                  }}>
                确认
              </Text>
            </View>
            <View className="modal-body">
              <View className="school-enrollment">
                {/* School Input */}
                <View className="info-row">
                  <Text className="info-label">学校</Text>
                  <View className="info-value">
                    <Input
                      type="text"
                      placeholder="请输入学校名称"
                      value={schoolName}
                      onInput={(e) => setSchoolName(e.detail.value)}
                      className="input-field"
                    />
                  </View>
                </View>

                {/* Enrollment Year Picker */}
                <View className="info-row">
                  <Text className="info-label">入学时间</Text>
                  <Picker
                    mode="date"
                    fields="year"
                    onChange={handleYearChange}
                    value={enrollmentYear}
                  >
                    <View className="info-value">
                      {enrollmentYear || '请选择年份'}
                      <Text className="arrow">{'>'}</Text>
                    </View>
                  </Picker>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {activeModal === 'LRB' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
              <Text className="modal-title">编辑小红书账号</Text>
              <Text className="modal-confirm-button"
                  onClick={() => {
                    closeModal();
                  }}>
                确认
              </Text>
            </View>
            <View className="modal-body">
            <View className="input-container">
              <Input
                className="modal-input"
                value={userLRB}
                placeholder="请输入小红书账号"
                onInput={handleLRBChange}
              />
            </View>
              <Text className="modal-instruction">
                请添加您的小红书账号~
              </Text>
            </View>
          </View>
        </View>
      )}
      {activeModal === 'youTag' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
              <Text className="modal-title">编辑你的Tag</Text>
              <Text className="modal-confirm-button"
                  onClick={() => {
                    closeModal();
                  }}>
                确认
              </Text>
            </View>
            <View className="modal-body">
              <View className="preference-selector">
                {/* Title */}
                <Text className="section-title">用三个词来定义你吧！（最好五个字以内）</Text>

                {/* Selected Tags */}
                <View className="selected-tags">
                  <View className="selection-container">
                    <Text className="selection-text">已选择</Text>
                    <Text className="selection-count">{selectedYou.length}/{maxSelection}</Text>
                  </View>
                  <View className="tags">
                    {selectedYou.map((tag, index) => (
                      <View
                        key={index}
                        className="tag selected"
                        onClick={() => handleRemoveYou(tag)}
                      >
                        {tag} <Text className="remove">X</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Custom Tag Input */}
                <Text className="subtitle">自定义</Text>
                <View className="custom-input">
                  <Input
                    className="custom-input-field"
                    value={customYouTag}
                    placeholder="请输入标签"
                    onInput={(e) => setCustomYouTag(e.detail.value)}
                    onConfirm={handleCustomAddYou}
                  />
                  <View
                    className="add-button"
                    onClick={handleCustomAddYou} // Handles button click
                  >
                    添加
                  </View>
                </View>

                {/* Recommendations */}
                <View className="recommendations">
                  <Text className="subtitle">推荐</Text>
                  {Object.keys(recommendedCategories).map((category, index) => (
                    <View key={index} className="category">
                      <Text className="category-title">{category}</Text>
                      <View className="tags">
                        {recommendedCategories[category].map((tag, idx) => (
                          <View
                            key={idx}
                            className={`tag ${selectedYou.includes(tag) ? 'disabled' : ''}`}
                            onClick={() => !selectedYou.includes(tag) && handleAddYou(tag)}
                          >
                            {tag}
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {activeModal === 'green' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
              <Text className="modal-title">编辑Green Tag</Text>
              <Text className="modal-confirm-button"
                  onClick={() => {
                    closeModal();
                  }}>
                确认
              </Text>
            </View>
            <View className="modal-body">
              <View className="preference-selector">
                {/* Title */}
                <Text className="section-title">你喜欢什么样的人</Text>

                {/* Selected Tags */}
                <View className="selected-tags">
                  <View className="selection-container">
                    <Text className="selection-text">已选择</Text>
                    <Text className="selection-count">{selectedGreen.length}/{maxSelection}</Text>
                  </View>
                  <View className="tags">
                    {selectedGreen.map((tag, index) => (
                      <View
                        key={index}
                        className="tag selected"
                        onClick={() => handleRemoveGreen(tag)}
                      >
                        {tag} <Text className="remove">X</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Custom Tag Input */}
                <Text className="subtitle">自定义</Text>
                <View className="custom-input">
                  <Input
                    className="custom-input-field"
                    value={customTag}
                    placeholder="请输入标签"
                    onInput={(e) => setCustomTag(e.detail.value)}
                    onConfirm={handleCustomAddGreen}
                  />
                  <View
                    className="add-button"
                    onClick={handleCustomAddGreen}
                  >
                    添加
                  </View>
                </View>

                {/* Recommendations */}
                <View className="recommendations">
                  <Text className="subtitle">推荐</Text>
                  {Object.keys(recommendedCategories).map((category, index) => (
                    <View key={index} className="category">
                      <Text className="category-title">{category}</Text>
                      <View className="tags">
                        {recommendedCategories[category].map((tag, idx) => (
                          <View
                            key={idx}
                            className={`tag ${selectedGreen.includes(tag) ? 'disabled' : ''}`}
                            onClick={() => !selectedGreen.includes(tag) && handleAddGreen(tag)}
                          >
                            {tag}
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {activeModal === 'red' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
              <Text className="modal-title">编辑Red Tag</Text>
              <Text className="modal-confirm-button"
                  onClick={() => {
                    closeModal();
                  }}>
                确认
              </Text>
            </View>
            <View className="modal-body">
              <View className="preference-selector">
                {/* Title */}
                <Text className="section-title">你讨厌什么样的人</Text>

                {/* Selected Tags */}
                <View className="selected-tags">
                  <View className="selection-container">
                    <Text className="selection-text">已选择</Text>
                    <Text className="selection-count">{selectedRed.length}/{maxSelection}</Text>
                  </View>
                  <View className="tags">
                    {selectedRed.map((tag, index) => (
                      <View
                        key={index}
                        className="tag selected"
                        onClick={() => handleRemoveRed(tag)}
                      >
                        {tag} <Text className="remove">X</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Custom Tag Input */}
                <Text className="subtitle">自定义</Text>
                <View className="custom-input">
                  <Input
                    className="custom-input-field"
                    value={customRedTag}
                    placeholder="请输入标签"
                    onInput={(e) => setCustomRedTag(e.detail.value)}
                    onConfirm={handleCustomAddRed}
                  />
                  <View
                    className="add-button"
                    onClick={handleCustomAddRed}
                  >
                    添加
                  </View>
                </View>

                {/* Recommendations */}
                <View className="recommendations">
                  <Text className="subtitle">推荐</Text>
                  {Object.keys(nonRecommendedCategories).map((category, index) => (
                    <View key={index} className="category">
                      <Text className="category-title">{category}</Text>
                      <View className="tags">
                        {nonRecommendedCategories[category].map((tag, idx) => (
                          <View
                            key={idx}
                            className={`tag ${selectedRed.includes(tag) ? 'disabled' : ''}`}
                            onClick={() => !selectedRed.includes(tag) && handleAddRed(tag)}
                          >
                            {tag}
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {activeModal === 'interest' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
              <Text className="modal-title">编辑兴趣爱好</Text>
              <Text
                className="modal-confirm-button"
                onClick={() => {
                  closeModal();
                }}
              >
                确认
              </Text>
            </View>
            <View className="modal-body">
              <View className="preference-selector">
                {/* Title */}
                <Text className="section-title">请选择你特别钟爱的兴趣爱好</Text>

                {/* Selected Tags */}
                <View className="selected-tags">
                  <View className="selection-container">
                    <Text className="selection-text">已选择</Text>
                    <Text className="selection-count">
                      {selectedInterest.length}/{maxSelection}
                    </Text>
                  </View>
                  <View className="tags">
                    {selectedInterest.map((tag, index) => (
                      <View
                        key={index}
                        className="tag selected"
                        onClick={() => handleRemoveInterest(tag)}
                      >
                        {tag} <Text className="remove">X</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Custom Tag Input */}
                <Text className="subtitle">自定义</Text>
                <View className="custom-input">
                  <Input
                    className="custom-input-field"
                    value={customInterestTag}
                    placeholder="请输入你钟爱的兴趣爱好"
                    onInput={(e) => setCustomInterestTag(e.detail.value)}
                    onConfirm={handleCustomAddInterest}
                  />
                  <View
                    className="add-button"
                    onClick={handleCustomAddInterest} // Handles button click
                  >
                    添加
                  </View>
                </View>

                {/* Recommendations */}
                <View className="recommendations">
                  <Text className="subtitle">推荐</Text>
                  {Object.keys(recommendedCategories).map((category, index) => (
                    <View key={index} className="category">
                      <Text className="category-title">{category}</Text>
                      <View className="tags">
                        {recommendedCategories[category].map((tag, idx) => (
                          <View
                            key={idx}
                            className={`tag ${
                              selectedInterest.includes(tag) ? 'disabled' : ''
                            }`}
                            onClick={() =>
                              !selectedInterest.includes(tag) && handleAddInterest(tag)
                            }
                          >
                            {tag}
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {activeModal === 'visited' && (
        <View className="modal-overlay">
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-close" onClick={closeModal}>
                ✕
              </Text>
              <Text className="modal-title">编辑你去过的地方</Text>
              <Text className="modal-confirm-button"
                  onClick={() => {
                    closeModal();
                  }}>
                确认
              </Text>
            </View>
            <View className="modal-body">
              <View className="preference-selector">
                {/* Title */}
                <Text className="section-title">你去过哪些国家/地区</Text>

                {/* Selected Tags */}
                <View className="selected-tags">
                  <View className="selection-container">
                    <Text className="selection-text">已选择</Text>
                  </View>
                  <View className="tags">
                    {selectedVisited.map((tag, index) => (
                      <View
                        key={index}
                        className="tag selected"
                        onClick={() => handleRemoveVisited(tag)}
                      >
                        {tag} <Text className="remove">X</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Custom Tag Input */}
                <Text className="subtitle">自定义</Text>
                <View className="custom-input">
                  <Input
                    className="custom-input-field"
                    value={customVisitedTag}
                    placeholder="请输入地点"
                    onInput={(e) => setCustomVisitedTag(e.detail.value)}
                    onConfirm={handleCustomAddVisited}
                  />
                  <View
                    className="add-button"
                    onClick={handleCustomAddVisited} // Handles button click
                  >
                    添加
                  </View>
                </View>

                {/* Recommendations */}
                <View className="recommendations">
                  <Text className="subtitle">推荐</Text>
                  {Object.keys(recommendedCategories).map((category, index) => (
                    <View key={index} className="category">
                      <Text className="category-title">{category}</Text>
                      <View className="tags">
                        {recommendedCategories[category].map((tag, idx) => (
                          <View
                            key={idx}
                            className={`tag ${selectedVisited.includes(tag) ? 'disabled' : ''}`}
                            onClick={() => !selectedVisited.includes(tag) && handleAddVisited(tag)}
                          >
                            {tag}
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};




// const Index = () => {
//   const router = useRouter();
//   const userOpenid = router?.params?.id;
//   const [userInfo, setUserInfo] = useState<UserDetailInfoItemProps>();

//   useEffect(() => {
//     userInfoSearch(userOpenid).then((ownerInfo: UserDetailInfoItemProps[]) => {
//       setUserInfo(ownerInfo[0]);
//       setUserAvatarUrl(ownerInfo[0].avatarUrl);
//       setUserDescription(ownerInfo[0].userDes);
//       setUserLocation(
//         ownerInfo[0].userLocation ? ownerInfo[0].userLocation : '',
//       );
//       setUserTags(ownerInfo[0].tags ? ownerInfo[0].tags : []);
//       setBirthInput(ownerInfo[0].birthday ? ownerInfo[0].birthday : '');
//       setUserBirthday(ownerInfo[0].birthday ? ownerInfo[0].birthday : '');
//       setUserGender(ownerInfo[0].gender ? ownerInfo[0].gender : '');
//       setUserNickname(ownerInfo[0].nickName);
//       if (ownerInfo[0].aboutMe) {
//         setAboutMe(ownerInfo[0].aboutMe);
//       }
//     });
//   }, []);

//   const [userAvatarUrl, setUserAvatarUrl] = useState<string>();
//   const [userDescription, setUserDescription] = useState<string>();
//   const [userLocation, setUserLocation] = useState<string>();
//   const [userBirthday, setUserBirthday] = useState<string>('');
//   const [userNickname, setUserNickname] = useState<string>('');
//   const [aboutMe, setAboutMe] = useState<{ [key: string]: any }>({
//     interests: '',
//     major: '',
//     languages: '',
//     skills: '',
//     funFact: '',
//     visitedCountries: '',
//     serviceProvided: '',
//   });

//   const [birthInput, setBirthInput] = useState<string>(userBirthday);
//   // TODO: 其他信息从数据库中获取

//   const genderOptions = ['男', '女', '非二元'];
//   const [userGender, setUserGender] = useState<string>('');
//   const [genderIndex, setGenderIndex] = useState<number>(
//     genderOptions.indexOf(''),
//   );

//   const [userTags, setUserTags] = useState<string[]>([]);

//   const handleAddTag = newTag => {
//     userTags.push(newTag);
//   };

//   const handleDeleteTag = deletedTag => {
//     const updatedTags = userTags.filter(tag => tag != deletedTag);
//     setUserTags(updatedTags);
//   };

//   const [isTagEdit, setIsTagEdit] = useState(false);

//   const handleOpenTagEdit = () => {
//     setIsTagEdit(true);
//   };

//   const handleCloseAllWindows = () => {
//     setIsTagEdit(false);
//   };

//   const handleBirthdayChange = e => {
//     setBirthInput(e.target.value);
//   };

//   const isValidDate = dateString => {
//     const regEx = /^\d{4}-\d{2}-\d{2}$/;
//     if (!dateString.match(regEx)) return false;

//     const date = new Date(dateString);
//     const timestamp = date.getTime();
//     if (typeof timestamp !== 'number' || isNaN(timestamp)) return false;

//     return dateString === date.toISOString().split('T')[0];
//   };

//   const getAge = dateString => {
//     const today = new Date();
//     const birthDate = new Date(dateString);
//     const age = today.getFullYear() - birthDate.getFullYear();
//     const monthDifference = today.getMonth() - birthDate.getMonth();
//     if (
//       monthDifference < 0 ||
//       (monthDifference === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       return age - 1;
//     }
//     return age;
//   };

//   const handleBirthdayBlur = (): void => {
//     // 使用正则表达式验证输入格式是否为 yyyy-mm-dd
//     const regex = /^\d{4}-\d{2}-\d{2}$/;
//     if (!regex.test(birthInput)) {
//       Taro.showToast({
//         title: '生日格式错误',
//         icon: 'error',
//         duration: 1000,
//       });
//     } else if (!isValidDate(birthInput)) {
//       Taro.showToast({
//         title: '生日日期无效',
//         icon: 'error',
//         duration: 1000,
//       });
//     } else {
//       const age = getAge(birthInput);
//       if (age < 16 || age > 80) {
//         Taro.showToast({
//           title: '请输入一个合理的年龄范围(16-80)',
//           icon: 'error',
//           duration: 1000,
//         });
//       } else {
//         setUserBirthday(birthInput);
//       }
//     }
//   };

//   Taro.useShareAppMessage(res => {
//     return {
//       title: 'EuroStay欧洲换宿',
//       path: '/pages/login/index',
//     };
//   });

//   const handleUserImageEdit = () => {
//     Taro.chooseImage({
//       count: 1,
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album', 'camera'],
//       success: function (res) {
//         const tempFilePaths = res.tempFilePaths;
//         Taro.showLoading({
//           title: '上传中',
//           mask: true,
//         });
//         cloudAvatarUpload(tempFilePaths[0]).then(
//           (uploadedImagePath: string) => {
//             setUserAvatarUrl(uploadedImagePath);
//             Taro.hideLoading();
//           },
//         );
//       },
//       fail: function (err) {
//         Taro.showToast({
//           title: '图片上传失败',
//           icon: 'error',
//           duration: 2000,
//         });
//       },
//     });
//   };

//   const handleGenderChange = e => {
//     const index = e.detail.value;
//     setGenderIndex(index);
//     setUserGender(genderOptions[index]);
//   };

//   const handleUserDescriptionEdit = e => {
//     const inputDescription = e.detail.value;
//     setUserDescription(inputDescription);
//   };

//   const handleUserLocationEdit = e => {
//     const inputLocation = e.detail.value;
//     setUserLocation(inputLocation);
//   };

//   const handleUserNickNameEdit = e => {
//     setUserNickname(e.detail.value);
//   };

//   const handleUserInterestsEdit = e => {
//     setAboutMe(prevAboutMe => ({
//       ...prevAboutMe,
//       interests: e.detail.value,
//     }));
//   };

//   const handleUserMajorEdit = e => {
//     setAboutMe(prevAboutMe => ({
//       ...prevAboutMe,
//       major: e.detail.value,
//     }));
//   };

//   const handleUserLanguageEdit = e => {
//     setAboutMe(prevAboutMe => ({
//       ...prevAboutMe,
//       languages: e.detail.value,
//     }));
//   };

//   const handleUserFunFactEdit = e => {
//     setAboutMe(prevAboutMe => ({
//       ...prevAboutMe,
//       funFact: e.detail.value,
//     }));
//   };

//   const handleUserVisitedCountriesEdit = e => {
//     setAboutMe(prevAboutMe => ({
//       ...prevAboutMe,
//       visitedCountries: e.detail.value,
//     }));
//   };

//   const handleUserServiceProvidedEdit = e => {
//     setAboutMe(prevAboutMe => ({
//       ...prevAboutMe,
//       serviceProvided: e.detail.value,
//     }));
//   };

//   const handleUserSkillsEdit = e => {
//     setAboutMe(prevAboutMe => ({
//       ...prevAboutMe,
//       skills: e.detail.value,
//     }));
//   };

//   // 用户信息修改
//   const handleUserInfoChange = () => {
//     Taro.showLoading({
//       title: '上传中',
//       mask: true,
//     });
//     var pointAdd = 0;
//     if (
//       (userInfo?.gender == '' && userGender != '') ||
//       (userInfo?.nickName == '微信用户' && userNickname != '微信用户') ||
//       (userInfo?.userLocation == '' && userLocation != '') ||
//       (userInfo?.birthday == '' && userBirthday != '')
//     ) {
//       pointAdd += 5;
//     }
//     if ((!userInfo?.tags && userTags.length != 0) || (userInfo?.tags && userInfo?.tags.length == 0 && userTags.length != 0)) {
//       pointAdd += 5;
//     }
//     if ((!userInfo?.aboutMe && (aboutMe.interests != '' || aboutMe.major != '' || aboutMe.languages != '' || aboutMe.skills != '' || aboutMe.funFact != '' || aboutMe.visitedCountries != '' || aboutMe.serviceProvided != '')) ||
//       (userInfo?.aboutMe && userInfo?.aboutMe.interests == '' && aboutMe.interests != '') ||
//       (userInfo?.aboutMe && userInfo?.aboutMe.major == '' && aboutMe.major != '') ||
//       (userInfo?.aboutMe && userInfo?.aboutMe.languages == '' && aboutMe.languages != '') ||
//       (userInfo?.aboutMe && userInfo?.aboutMe.skills == '' && aboutMe.skills != '') ||
//       (userInfo?.aboutMe && userInfo?.aboutMe.funFact == '' && aboutMe.funFact != '') ||
//       (userInfo?.aboutMe && userInfo?.aboutMe.visitedCountries == '' &&
//         aboutMe.visitedCountries != '') ||
//       (userInfo?.aboutMe && userInfo?.aboutMe.serviceProvided == '' && aboutMe.serviceProvided != '')
//     ) {
//       pointAdd += 5;
//     }
//     userDetailUpdate(
//       userInfo?._id,
//       userAvatarUrl,
//       userDescription,
//       userNickname,
//       userLocation,
//       userGender,
//       userBirthday,
//       userTags,
//       aboutMe,
//     ).then(res => {
//       pointIncrease(userInfo?._id, pointAdd);
//       const timestamp = formatTimestamp(new Date().valueOf());
//       pointDetailInfoAdd(
//         userInfo?._openid,
//         timestamp,
//         1,
//         '完善个人信息',
//         pointAdd,
//         (userInfo ? userInfo?.point : 0) + pointAdd,
//       ).then(res1 => {
//         Taro.hideLoading();
//         Taro.redirectTo({
//           url: `/packageUser/user-detail/index?id=${userOpenid}`,
//         });
//       });
//     });
//   };

//   return (
//     <View className='edit-profile-page'>
//       <View className='profile-background' />
//       <View className='profile-avatar'>
//         <Image
//           src={userAvatarUrl ? userAvatarUrl : DefaultAvatar}
//           className='avatar-image'
//           onClick={handleUserImageEdit}
//         />
//       </View>

//       <View className='section'>
//         <Text className='section-title'>我的简介</Text>
//         <View className='description-container'>
//           <View className='description-text'>
//             <Input
//               type='text'
//               value={userDescription}
//               placeholder={
//                 userDescription ? `${userDescription}` : `简单介绍一下自己吧`
//               }
//               className='description-text'
//               onInput={handleUserDescriptionEdit}
//             />
//           </View>
//         </View>
//       </View>
//       <View className='section'>
//         <Text className='section-title'>基本信息</Text>
//         <View className='info-container'>
//           <View className='info-item'>
//             <Text className='info-label'>昵称</Text>
//             <Input
//               type='text'
//               value={userNickname}
//               placeholder={`写下你的昵称吧`}
//               className='info-value'
//               onInput={handleUserNickNameEdit}
//             />
//           </View>
//           <View className='info-item'>
//             <Text className='info-label'>性别</Text>
//             <Picker
//               mode='selector'
//               range={genderOptions}
//               value={genderIndex}
//               onChange={handleGenderChange}
//             >
//               <View className='info-value'>{userGender || '请选择性别'}</View>
//             </Picker>
//           </View>
//           <View className='info-item'>
//             <Text className='info-label'>个人居住地</Text>
//             <View className='info-value'>
//               <Input
//                 type='text'
//                 value={userLocation}
//                 placeholder={
//                   userLocation !== '' && userLocation != undefined
//                     ? `${userLocation}`
//                     : `请填写个人所在地`
//                 }
//                 className='info-value'
//                 onInput={handleUserLocationEdit}
//               />
//             </View>
//           </View>
//           <View className='info-item'>
//             <Text className='info-label'>生日</Text>
//             <View className='info-value'>
//               <Input
//                 type='text'
//                 value={birthInput}
//                 placeholder={
//                   birthInput !== '' && birthInput != undefined
//                     ? `${birthInput}`
//                     : `请输入生日yyyy-mm-dd`
//                 }
//                 onInput={handleBirthdayChange}
//                 onBlur={handleBirthdayBlur}
//                 className='info-value'
//               />
//             </View>
//           </View>
//           {/* <View className='info-item'>
//             <Text className='info-label'>身份</Text>
//             <Input
//               type='text'
//               value='学生'
//               placeholder={`写下你的身份吧`}
//               className='info-value'
//               // onInput={handleUserDescriptionEdit}
//             />
//           </View> */}
//         </View>
//       </View>

//       <View className='section'>
//         <Text className='section-title'>关于我</Text>
//         <View className='info-container'>
//           <View className='info-item'>
//             <Text className='info-label'>个性标签</Text>
//             {!userTags || userTags.length === 0 ? (
//               <Text className='info-value' onClick={handleOpenTagEdit}>
//                 添加个性标签 +
//               </Text>
//             ) : (
//               <View className='info-value'>
//                 {userTags.map((tag, index) => (
//                   <Text key={index} onClick={() => handleDeleteTag(tag)}>
//                     {tag + '   '}
//                   </Text>
//                 ))}
//                 <Text onClick={handleOpenTagEdit}>+</Text>
//               </View>
//             )}
//           </View>

//           <View className='info-item'>
//             <Text className='info-label'>fun facts about me</Text>
//             <Input
//               type='text'
//               value={aboutMe['funFact']}
//               placeholder={`介绍你fun facts~`}
//               className='info-value'
//               onInput={handleUserFunFactEdit}
//             />
//           </View>

//           <View className='info-item'>
//             <Text className='info-label'>兴趣爱好</Text>
//             <Input
//               type='text'
//               value={aboutMe['interests']}
//               placeholder={`介绍你的兴趣爱好~`}
//               className='info-value'
//               onInput={handleUserInterestsEdit}
//             />
//           </View>

//           <View className='info-item'>
//             <Text className='info-label'>语言技能</Text>
//             <Input
//               type='text'
//               value={aboutMe['languages']}
//               placeholder={`介绍你能使用的语言~`}
//               className='info-value'
//               onInput={handleUserLanguageEdit}
//             />
//           </View>

//           <View className='info-item'>
//             <Text className='info-label'>专业领域</Text>
//             <Input
//               type='text'
//               value={aboutMe['major']}
//               placeholder={`介绍你专业领域~`}
//               className='info-value'
//               onInput={handleUserMajorEdit}
//             />
//           </View>

//           <View className='info-item'>
//             <Text className='info-label'>我可以向求宿者提供什么</Text>
//             <Input
//               type='text'
//               value={aboutMe['serviceProvided']}
//               placeholder={`介绍你可以向求宿者/host提供什么~`}
//               className='info-value'
//               onInput={handleUserServiceProvidedEdit}
//             />
//           </View>

//           <View className='info-item'>
//             <Text className='info-label'>我的技能</Text>
//             <Input
//               type='text'
//               value={aboutMe['skills']}
//               placeholder={`介绍一下你的有用小技能吧~`}
//               className='info-value'
//               onInput={handleUserSkillsEdit}
//             />
//           </View>

//           <View className='info-item'>
//             <Text className='info-label'>我游览过的国家</Text>
//             <Input
//               type='text'
//               value={aboutMe['visitedCountries']}
//               placeholder={`介绍你游览过的国家~`}
//               className='info-value'
//               onInput={handleUserVisitedCountriesEdit}
//             />
//           </View>
//         </View>
//       </View>
//       <View className='save-button-container'>
//         <View className='save-button' onClick={handleUserInfoChange}>
//           <Text>保存修改</Text>
//         </View>
//       </View>
//       {isTagEdit && (
//         <TagAdd
//           onClose={handleCloseAllWindows}
//           onTagAdded={handleAddTag}
//         ></TagAdd>
//       )}
//     </View>
//   );
// };

export default observer(Index);