import { View, Image, Text, Swiper, SwiperItem, Input } from '@tarojs/components'
import { AtCalendar } from 'taro-ui';
import { useState, useEffect } from 'react'
import Taro, { getCurrentPages } from '@tarojs/taro'
import HostCardSmall from '../../components/HostCardSmall';
import './index.scss'
import { HomeOutlined } from '@taroify/icons';
import { useRouter } from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';
import { HostDetail, Order, ReviewCardProps } from '@utils/interfaces';
import { formatToday } from '@utils/dateUtil';
import ReviewCard from '@components/ReviewCard';
import { API } from '@utils/apiService';
import {heartPurpleIcon, starPurpleIcon, starYellowIcon} from '@utils/cloudIcons';
import WelcomeModal from '@components/WelcomeModal';

// Define the review interface to match the API response
interface ReviewData {
  reviewerInfo: {
    avatar: string;
    username: string;
    location: string;
  };
  recommend: boolean;
  content: string;
  images: string[];
  createTime: string;
  fromHost: boolean;
  anonymous: boolean;
}

const HouseDetail: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isStarred, setIsStarred] = useState(false); 
  const [showLikeModal, setShowLikeModal] = useState(false)
  const [likeMessage, setLikeMessage] = useState('')
  const [hasReview, setHasReview] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isSelected, setIsSelected] = useState(false)
  const [gotValidDates, setGotValidDates] = useState(false)

  const today = formatToday();

  const router = useRouter();
  const id = router?.params?.id;

  const [hostDetail, setHostDetail] = useState<HostDetail>({
    uid: 0,
    avatar: '',
    role: 'Host',
    username: '',
    detail: '',
    tags: [],
    buttonText: '打个招呼',
    buttonFunc: () => {
    //   setShowLikeModal(true);
      setShowWelcomeModal(true);
    }
  });
  
  const [order, setOrder] = useState<Order>({
    title: '',
    tags: [],
    description: '',
    address: '',
    images: [],
    pid: 0,
    uid: 0,
    availableDate: [],
    startTime: '',
    country: '',
    countryId: 0,
    city: '',
    cityId: 0,
    capacity: 0,
    requirement: '',
    receptionTime: [],
    gender: 2,
  });
  
  const [topReview, setTopReview] = useState<ReviewCardProps>({
    userAvatar: '',
    userName: '',
    userType: '',
    isRecommended: false,
    reviewContent: '',
    images: [],
    reviewDate: '',
    location: ''
  });

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [valid, setValid] = useState<Array<{value: string | null}>>([]);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const [allReviews, setAllReviews] = useState<ReviewData[]>([]);

  Taro.setNavigationBarTitle({ title: '房源详情' });

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
  };

  const handelCollect = () => {
    if (GlobalStore.userInfo?.uid === 0) {
        Taro.showModal({
          title: '转至登录页面',
          content: '请登录后收藏~',
          success: function (res) {
            if (res.confirm) {
              Taro.reLaunch({
                url: `/pages/login/index`,
              });
            }
          },
        });
        return;
      }
    if (!isStarred) { // 收藏
      API.property.addPropertyCollection(Number(id))
        .then(() => {
          Taro.showToast({
            title: '收藏成功',
            icon: 'success'
          });
          setIsStarred(true);
        })
        .catch(error => {
          // Error is already handled in apiRequest
        });
    } else { // 取消收藏
      API.property.cancelPropertyCollection(Number(id))
        .then(() => {
          Taro.showToast({
            title: '取消收藏成功',
            icon: 'success'
          });
          setIsStarred(false);
        })
        .catch(error => {
          // Error is already handled in apiRequest
        });
    }
  }

  const getValidDates = (dates: Array<string>) => {
    if (gotValidDates) return valid.length > 0 ? valid : [{value: null}];
    else {
      const newValid: Array<{value: string | null}> = [];
      for (let i = 0; i < dates.length; i+=2) {
        let start = new Date(dates[i].replace('-', '/').replace('-', '/'));
        let end = new Date(dates[i + 1].replace('-', '/').replace('-', '/'));
        start.setDate(start.getDate() + 1)
        end.setDate(end.getDate() + 1)
        console.log('today: ', today)
        let today_date = new Date(today.replace('-', '/').replace('-', '/'))
        for (let j = new Date(start); j <= end; j.setDate(j.getDate() + 1)) {
          if (j < today_date) {
            continue;
          } else {
            newValid.push({value: j.toISOString().substring(0, 10).replace('-', '/').replace('-', '/')});
          }
        }
      }
      setValid(newValid);
      setGotValidDates(true)
      return newValid.length > 0 ? newValid : [{value: null}];
    }
  }

  const getDate = (date: string): string => {
    return date.substring(0, 10);
  }

  const getReviews = (pid: number) => {
    API.property.showReviewList(pid)
      .then(result => {
        if (result && result.data && result.data.length > 0) {
          setAllReviews(result.data);
          const review = result.data[0];
          setTopReview({
            userAvatar: review.anonymous ? 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/loading.png' : review.reviewerInfo.avatar,
            userName: review.anonymous ? '匿名用户' : review.reviewerInfo.username,
            userType: '房客',
            isRecommended: review.recommend,
            reviewContent: review.content,
            images: review.images || [],
            reviewDate: getDate(review.createTime),
            location: review.anonymous ? '' : review.reviewerInfo.location,
          });
          setHasReview(true);
        } else {
          setHasReview(false);
        }
      })
      .catch(error => {
        console.error('Failed to fetch reviews:', error);
        setHasReview(false);
      });
  };

  const getOrderDetail = (id: number) => {
    if (isComplete) return;
    
    API.property.getPropertyDetail(id)
      .then(result => {
        setHostDetail({
          uid: result.hostInfo.uid,
          avatar: result.hostInfo.avatar,
          role: 'Host',
          username: result.hostInfo.username,
          detail: result.hostInfo.aboutMe,
          tags: result.hostInfo.tags || [],
          buttonText: '打个招呼',
          buttonFunc: () => {
            if (GlobalStore.userInfo?.uid === 0) {
              Taro.showModal({
                title: '转至登录页面',
                content: '请登录后联系别人~',
                success: function (res) {
                  if (res.confirm) {
                    Taro.reLaunch({
                      url: `/pages/login/index`,
                    });
                  }
                },
              });
              return;
            }
            setShowLikeModal(true);
          }
        });
        let tags: string[] = [];
        if (result.tags && Array.isArray(result.tags) && result.tags.length > 0) {
          tags = result.tags;
        } else if (result.tagsJson) {
          try {
            const parsed = JSON.parse(result.tagsJson);
            tags = (Object.values(parsed) as string[][]).flat();
          } catch { tags = []; }
        }

        setOrder({
          title: result.title,
          tags,
          description: result.description,
          address: result.address || '',
          images: result.images,
          pid: result.pid,
          uid: result.uid,
          availableDate: result.availableDate || [],
          startTime: '',
          country: result.country || '',
          countryId: result.countryId || 0,
          city: result.city || '',
          cityId: result.cityId || 0,
          capacity: result.capacity || 0,
          requirement: result.requirement || '',
          receptionTime: result.receptionTime || [],
          gender: result.gender ?? 2,
        });
        setIsStarred(result.isCollected);
      })
      .catch(error => {
        // Check for auth errors and handle accordingly
        if (error.message?.includes('401') || error.message?.includes('403')) {
          // Token expired or invalid
          const currentPage = getCurrentPages();
          const currentRoute = currentPage[currentPage.length - 1].route;
          const returnUrl = encodeURIComponent(`/${currentRoute}?id=${id}`);
          
          Taro.showModal({
            title: '登录已过期',
            content: '请重新登录',
            success: function (res) {
              if (res.confirm) {
                Taro.reLaunch({
                  url: `/pages/login/index`,
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
              }
            },
          });
        }
      })
      .finally(() => {
        setIsComplete(true);
      });
  }

  useEffect(() => {
    getOrderDetail(Number(id));
    getReviews(Number(id));
  }, []);

  const handleLike = () => {
    if (GlobalStore.userInfo?.uid === 0) {
        Taro.showModal({
          title: '转至登录页面',
          content: '请登录后发送点赞消息~',
          success: function (res) {
            if (res.confirm) {
              Taro.reLaunch({
                url: `/pages/login/index`,
              });
            }
          },
        });
        return;
      }
    setShowLikeModal(true);
  }

  const handleSendLike = () => {
    // 这里添加发送点赞消息的逻辑
    if (!GlobalStore.userInfo.isVip) {
        Taro.showModal({
            title: '请先充值会员',
            content: '请先充值会员后，再打招呼~',
            success: function (res) {
              if (res.confirm) {
                Taro.navigateTo({
                  url: '/packageUser/user-vip/index',
                });
              }
            }
          });
          return;
    }
    
    const content = `${GlobalStore.userInfo.username}点赞了您的房源${order.title}，并发送了消息：${likeMessage}`;
    
    API.messages.sendLikeMsg(hostDetail.uid, content)
      .then(result => {
        Taro.showToast({
          title: '点赞成功',
          icon: 'success'
        });
        Taro.navigateTo({
          url: `/packageMessage/message-detail/index?id=${result.sessionId}&name=${encodeURIComponent(hostDetail.username || '')}`,
        });
      })
      .catch(error => {
        // Error is already handled in apiRequest
      });
    
    setShowLikeModal(false);
    setLikeMessage('');
  }

  const handleSwiperChange = (e) => {
    setCurrentImage(e.detail.current)
  }

  const handleImagePreview = () => {
    if (isComplete && order.images && order.images.length > 0) {
      Taro.previewImage({
        current: order.images[currentImage],
        urls: order.images
      });
    }
  }

  const checkDateValid = (start: string, end: string, valids: Array<{value: string | null}>) => {
    const startDate = new Date(start.replace('-', '/').replace('-', '/'));
    const endDate = new Date(end.replace('-', '/').replace('-', '/'));
    if (startDate >= endDate) return false
    startDate.setDate(startDate.getDate() + 1)
    endDate.setDate(endDate.getDate() + 1)
    const todayDate = new Date(today.replace('-', '/').replace('-', '/'));
    if (startDate < todayDate) return false
    return true
  }

  const handleSubmit = () => {
    if (GlobalStore.userInfo?.uid === 0) {
        Taro.showModal({
          title: '转至登录页面',
          content: '请登录后提交申请~',
          success: function (res) {
            if (res.confirm) {
              Taro.reLaunch({
                url: `/pages/login/index`,
              });
            }
          },
        });
        return;
      }
    // check if startDate and endDate are selected
    if (GlobalStore.userInfo?.aboutMe === '' || GlobalStore.userInfo?.backgroundPic === '') {
      Taro.showModal({
        title: '请先完善个人资料',
        content: '请先完善个人介绍，你的封面和邮箱后，再进行申请~',
        success: function (res) {
          if (res.confirm) {
            Taro.navigateTo({
              url: '/packageUser/user-editing/index',
            });
          }
        }
      });
      return;
    }
    if (!GlobalStore.userInfo.isVip) {
        Taro.showModal({
            title: '请先充值会员',
            content: '请先充值会员后，再进行申请~',
            success: function (res) {
              if (res.confirm) {
                Taro.navigateTo({
                  url: '/packageUser/user-vip/index',
                });
              }
            }
          });
          return;
    }
    if (startDate === null || endDate === null) {
      Taro.showToast({
        title: '请选择日期',
        icon: 'none',
        duration: 2000,
      });
    } 
    // check if startDate to endDate are in the valid range (order.availableDate)
    else if (checkDateValid(startDate, endDate, getValidDates(order.availableDate))) {
      Taro.navigateTo({
          'url': `/packageHouse/housing-apply/index?id=${id}&startDate=${startDate}&endDate=${endDate}`
      })
    } else {
      Taro.showToast({
        title: '日期不在有效范围内',
        icon: 'none',
        duration: 2000,
      });
    }
  }

    // 处理下载APP
    const handleDownloadApp = () => {
        // 这里可以添加下载APP的逻辑
        Taro.showToast({
          title: '跳转下载页面',
          icon: 'success'
        });
        setShowWelcomeModal(false);
      };

  const handleViewAllReviews = () => {
    Taro.showModal({
      title: '更多评价',
      content: '请前往APP查看更多评价',
      showCancel: false,
      success: function (res) {}
    })
    // Taro.showToast({
    //   title: '请前往APP查看更多评价',
    //   icon: 'none',
    //   duration: 2000
    // });
  };

  return (
    <View style={{paddingBottom: '120px'}}>
              {/* 欢迎弹窗组件 */}
      <WelcomeModal
        visible={showWelcomeModal}
        onClose={handleCloseModal}
        onDownload={handleDownloadApp}
      />
      <Swiper
        className='image-swiper'
        onChange={handleSwiperChange}
        circular
        onClick={handleImagePreview}
      >
        {isComplete && order.images.map((image, index) => (
          <SwiperItem key={index}>
            <Image 
              src={image} 
              className='house-image' 
              mode='aspectFill'
            />
          </SwiperItem>
        ))}
      </Swiper>

      <View className='image-indicators'>
        {isComplete && order.images.map((_, index) => (
          <View 
            key={index} 
            className={`indicator ${currentImage === index ? 'active' : ''}`} 
          />
        ))}
      </View>

      <View className='house-title'>{order.title}</View>
      
      <HomeOutlined className='back' onClick={() => {
        const pages = Taro.getCurrentPages()
        if (pages.length > 1) {
            Taro.navigateBack({ delta: 1 })
        } else {
            Taro.switchTab({
                url: `/pages/home-world/index`,
              });
        }
      }}/>

      <View className='action-buttons'>
        <View className='action-button' onClick={handleLike}>
          <Image src={heartPurpleIcon} className='icon' />
        </View>
        {isComplete &&
        <View className='action-button' onClick={handelCollect}>
          <Image src={isStarred ? starYellowIcon : starPurpleIcon} className='icon' />
        </View>
        }
      </View>

      {/* Host Card - 放在最上方 */}
      {isComplete && <HostCardSmall {...hostDetail}/>}

      {/* 房源信息 */}
      <View className='title-section'>
        <View className='title-info-section'>
          <View className='title'>{order.title}</View>
          <View className='location-info'>{order.country}{order.city}</View>
        </View>
        <View className='title-capacity-section'>
          <View className='capacity-info'>可住{order.capacity}人</View>
        </View>
      </View>

      <View className='house-tags'>
          {
            isComplete && order.tags.map(tag => (
              <View className='house-tag'>{tag}</View>
            ))
          }
      </View>

      {isComplete && order.receptionTime && order.receptionTime.length > 0 && (
        <View className='house-tags'>
          {order.receptionTime.map((time, i) => (
            <View key={i} className='house-tag' style={{ backgroundColor: '#f3f0fb', color: '#7A63C7' }}>{time}</View>
          ))}
        </View>
      )}

      <View className='detail-text'>{order.description}</View>

      {/* 期待遇见的guest - 添加间距 */}
      <View className='title-with-badge guest-expectation'>
        <View className='b-title'><View className='purple-badge'/>期待遇见的guest</View>
      </View>

      <View className='detail-text'>{order.requirement}</View>

      {/* 房源评价 */}
      {isComplete &&
      <View className='title-with-badge'>
        <View className='b-title'><View className='purple-badge'/>
        房源评价
          <View className='check-detail'
              onClick={() => {if (hasReview) handleViewAllReviews()}}
          >
            {!hasReview ? '暂无评价' : '查看全部评价＞'}
          </View>
        </View>
        {hasReview &&
          <View className='review-line'>
            <ReviewCard {...topReview} />
          </View>
        }
      </View>
      }

      {/* 前往评价按钮 */}
      <View className='review-button' onClick={() => {
        if (GlobalStore.userInfo?.uid === 0) {
          Taro.showModal({
            title: '转至登录页面',
            content: '请登录后评价~',
            success: function (res) {
              if (res.confirm) {
                Taro.reLaunch({
                  url: `/pages/login/index`,
                });
              }
            },
          });
          return;
        }
        Taro.navigateTo({ url: `/packageHouse/house-review/index?experienceId=${order.pid}&hostId=${order.uid}` });
      }}>
        前往评价
      </View>

      {/* 推荐入住日期 */}
      <View className='title-with-badge'>
        <View className='b-title'><View className='purple-badge'/>
        推荐入住日期（用 • 标记）
        </View>
      </View>

      {isComplete &&  
        <View className='date-select'>
          <View className='calendar-container'>
            <AtCalendar
              isMultiSelect
              marks={getValidDates(order.availableDate)}
              currentDate={{ start: startDate, end: endDate }}
              onDayClick={date => {
                const selectedDate = date.value;
                if (isSelected) {
                  if (selectedDate < startDate) {
                    setStartDate(selectedDate);
                    setEndDate(null);
                    setIsSelected(true);
                  } else {
                    setEndDate(selectedDate);
                    setIsSelected(false);
                  }
                } else {
                  setStartDate(selectedDate);
                  setEndDate(null);
                  setIsSelected(true);
                }
              }}
            />
          </View>
        </View>
      }

      <View className='submit-button' onClick={handleSubmit}>
        填写申请
      </View>

      {/* 点赞弹窗 */}
      {showLikeModal && (
        <View 
          className='like-modal-mask'
          onClick={() => setShowLikeModal(false)}
        >
          <View 
            className='like-modal'
            onClick={(e) => {
              e.stopPropagation(); // 阻止事件冒泡，防止点击modal内部时关闭
            }}
          >
            <View className='modal-title'>您将给{hostDetail.username}的"{order.title}"发送点赞消息</View>
            <Input
              className='message-input'
              placeholder='说点什么吧...'
              value={likeMessage}
              onInput={e => setLikeMessage(e.detail.value)}
            />
            <View 
              className='confirm-button'
              onClick={handleSendLike}
            >
              发送
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default HouseDetail 