import { View, Image, Text, Textarea } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import GlobalStore from '../../store/GlobalStore';
import HouseCard from '../../components/HouseCard';
import ReviewCard from '../../components/ReviewCard';
import { 
  API
} from '@utils/apiService';
import { 
  APIUserShortInfo as UserShortInfo,
  PropertyItem,
  TravelItem,
  ReviewItem
} from '@utils/interfaces';
import './index.scss';
import { settingIcon } from '@utils/cloudIcons';
import { observer } from 'mobx-react-lite';

const UserProfile = () => {
  const router = useRouter();
  const pageUid = router?.params?.uid;
  const [activeTab, setActiveTab] = useState('properties');
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserShortInfo | null>(null);
  const [propertyList, setPropertyList] = useState<PropertyItem[]>([]);
  const [travelList, setTravelList] = useState<TravelItem[]>([]);
  const [reviewList, setReviewList] = useState<ReviewItem[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [travelLoading, setTravelLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [propertyPage, setPropertyPage] = useState(1);
  const [travelPage, setTravelPage] = useState(1);
  const [reviewPage, setReviewPage] = useState(1);
  const [hasMoreProperties, setHasMoreProperties] = useState(true);
  const [hasMoreTravel, setHasMoreTravel] = useState(true);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [showHelloModal, setShowHelloModal] = useState(false);
  const [helloMessage, setHelloMessage] = useState('');
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [likeMessage, setLikeMessage] = useState('');
  const [currentItem, setCurrentItem] = useState<PropertyItem | TravelItem | null>(null);
  const [currentType, setCurrentType] = useState<'房源' | '出行'>('房源');

  useEffect(() => {
    fetchUserInfo();
  }, [pageUid]);

  useDidShow(() => {
    checkToken();
    fetchUserInfo();
  });

  useEffect(() => {
    if (activeTab === 'properties' && userInfo?.uid) {
      fetchPropertyList(1);
    } else if (activeTab === 'travel' && userInfo?.uid) {
      fetchTravelList(1);
    } else if (activeTab === 'reviews' && userInfo?.uid) {
      fetchReviewList(1);
    }
  }, [activeTab, userInfo]);

  const parseStartDate = (startDate: string | undefined): string => {
    if (!startDate) {
      return '暂无可入住时间';
    }
    const date = new Date(startDate.replace(/-/g, "/"));
    return `${date.getMonth() + 1}月${date.getDate()}日起可入住`;
  };

  const formatTravelDate = (dateString: string | undefined): string => {
    if (!dateString) {
      return '';
    }
    // Handle dates in format "2025-06-02 00:00:00"
    const date = new Date(dateString.replace(/-/g, "/"));
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };
  
  const formatUid = (uid: number) => {
    return uid.toString().padStart(16, '0');
  };

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const result = await API.user.getCurrentUserInfo(pageUid ? Number(pageUid) : undefined);
      setUserInfo(result);
      setIsCurrentUser(!pageUid || String(GlobalStore.userInfo?.uid) === pageUid);
    } catch (error) {
      console.error('获取用户信息错误:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPropertyList = async (page: number) => {
    if (!userInfo?.uid || propertiesLoading || (page > 1 && !hasMoreProperties)) {
      return;
    }

    try {
      setPropertiesLoading(true);
      const result = await API.user.getUserPropertyList(userInfo.uid, page);
      const { data, current_page, last_page } = result;
      setPropertyList(page === 1 ? data : [...propertyList, ...data]);
      setPropertyPage(current_page);
      setHasMoreProperties(current_page < last_page);
    } catch (error) {
      console.error('获取房源列表错误:', error);
    } finally {
      setPropertiesLoading(false);
    }
  };

  const fetchTravelList = async (page: number) => {
    if (!userInfo?.uid || travelLoading || (page > 1 && !hasMoreTravel)) {
      return;
    }

    try {
      setTravelLoading(true);
      const result = await API.user.getUserTravelList(userInfo.uid, page);
      const { data, current_page, last_page } = result;
      setTravelList(page === 1 ? data : [...travelList, ...data]);
      setTravelPage(current_page);
      setHasMoreTravel(current_page < last_page);
    } catch (error) {
      console.error('获取出行列表错误:', error);
    } finally {
      setTravelLoading(false);
    }
  };

  const fetchReviewList = async (page: number) => {
    if (!userInfo?.uid || reviewsLoading || (page > 1 && !hasMoreReviews)) {
      return;
    }

    try {
      setReviewsLoading(true);
      const result = await API.user.getUserReviewList(userInfo.uid, page);
      const { data, current_page, last_page } = result;
      setReviewList(prev => {
        const newList = page === 1 ? data : [...prev, ...data];
        return newList;
      });
      setReviewPage(current_page);
      setHasMoreReviews(current_page < last_page);
    } catch (error) {
      console.error('获取评价列表错误啦:', error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleSettingClick = (id: number) => {
    // 保留空函数，供后续实现
  };

  const loadMoreProperties = () => {
    if (hasMoreProperties && !propertiesLoading) {
      fetchPropertyList(propertyPage + 1);
    }
  };

  const loadMoreTravel = () => {
    if (hasMoreTravel && !travelLoading) {
      fetchTravelList(travelPage + 1);
    }
  };

  const loadMoreReviews = () => {
    if (hasMoreReviews && !reviewsLoading) {
      fetchReviewList(reviewPage + 1);
    }
  };

  const handleSayHello = () => {
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
    setShowHelloModal(true);
  };

  const handleSendHello = () => {
    if (!GlobalStore.userInfo.isVip) {
        Taro.showModal({
            title: '请先充值会员',
            content: '请先充值会员后，再打招呼~',
            success: function (res) {
              if (res.confirm) {
                Taro.navigateTo({
                  url: '/pages/user-setting/index',
                });
              }
            }
          });
    }
    API.messages.sendLikeMsg(
      Number(pageUid), 
      `${GlobalStore.userInfo.username}对你的主页很感兴趣并向您打了个招呼：${helloMessage}`
    ).then((result) => {
      Taro.showToast({
        title: '发送成功',
        icon: 'success'
      });
      Taro.navigateTo({
        url: `/packageMessage/message-detail/index?id=${result.sessionId}&name=${encodeURIComponent(userInfo?.username || '')}`,
      });
    }).catch((error) => {
      Taro.showToast({
        title: error.message || '发送失败，请重试',
        icon: 'none',
        duration: 2000,
      });
    });
    setShowHelloModal(false);
    setHelloMessage('');
  };

  const handleLike = (item: PropertyItem | TravelItem, type: '房源' | '出行') => {
    if (GlobalStore.userInfo?.uid === 0) {
        Taro.showModal({
          title: '转至登录页面',
          content: '请登录后发送Like消息~',
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
    setCurrentItem(item);
    setShowLikeModal(true);
    setCurrentType(type);
  };

  const handleSendLike = () => {
    if (!currentItem) return;
    if (!GlobalStore.userInfo.isVip) {
        Taro.showModal({
            title: '请先充值会员',
            content: '请先充值会员后，再打招呼~',
            success: function (res) {
              if (res.confirm) {
                Taro.navigateTo({
                  url: '/pages/user-setting/index',
                });
              }
            }
          });
    }

    API.messages.sendLikeMsg(
      Number(pageUid), 
      `${GlobalStore.userInfo.username}点赞了您的${currentType}"${currentItem.title}"，并发送了消息：${likeMessage}`
    ).then((result) => {
      Taro.showToast({
        title: '点赞成功',
        icon: 'success'
      });
    }).catch((error) => {
      Taro.showToast({
        title: error.message || '点赞失败，请重试',
        icon: 'none',
        duration: 2000,
      });
    });
    setShowLikeModal(false);
    setLikeMessage('');
    setCurrentItem(null);
  };

  const checkToken = async () => {
    if (!GlobalStore.userInfo?.token) return;
    
    try {
      const res = await API.user.tokenCheck();

      if (res.data.code === 401 || res.data.code === 403) {
        if (!pageUid || String(GlobalStore.userInfo?.uid) === pageUid) {
          Taro.showModal({
            title: '登录已过期',
            content: '请重新登录查看自己的主页',
            success: function (res) {
              if (res.confirm) {
                Taro.reLaunch({
                  url: '/pages/login/index',
                });
              } else {
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
                Taro.redirectTo({
                  url: `/pages/user/index?uid=${pageUid}`
                });
              }
            },
          });
        } else {
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
      }
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        if (!pageUid || String(GlobalStore.userInfo?.uid) === pageUid) {
          Taro.showModal({
            title: '登录已过期',
            content: '请重新登录查看自己的主页',
            success: function (res) {
              if (res.confirm) {
                Taro.reLaunch({
                  url: '/pages/login/index',
                });
              } else {
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
                Taro.redirectTo({
                  url: `/pages/user/index?uid=${pageUid}`
                });
              }
            },
          });
        } else {
          // 如果不是自己的主页，直接重置 GlobalStore 信息
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
      }
    }
  };

  if (loading) {
    return (
      <View className="user-profile">
        <View className="loading">加载中...</View>
      </View>
    );
  }

  return (
    <View className="user-profile">
      <Image
        className="background-image"
        src={userInfo?.backgroundPic || ''}
        mode="aspectFill"
        onClick={() => {
          if (userInfo?.backgroundPic) {
            Taro.previewImage({
              urls: [userInfo.backgroundPic],
              current: userInfo.backgroundPic
            });
          }
        }}
      />
      <View className="user-info">
        <View className="basic-info">
          <Image className="avatar" src={userInfo?.avatar || ''} mode="aspectFill" />
          <View className="user-meta">
            <View className="username-container">
              <Text className="username">{userInfo?.username}</Text>
              {userInfo?.isVip && <Text className="vip-badge">VIP</Text>}
            </View>
            <Text className="user-id">ES code: {userInfo?.uid? formatUid(userInfo?.uid): formatUid(0)}</Text>
            <Text className="location">地区: {userInfo?.location || '未知'}</Text>
          </View>
        </View>

        <View className="user-details">
          <Text className="about-me">{userInfo?.aboutMe || '大家好~'}</Text>
          <View className="details-bottom">
            <View className="tags">
              {userInfo?.tags && userInfo.tags.length > 0 && (
                userInfo.tags.map((tag, index) => (
                  <Text key={index} className="tag">
                    {tag}
                  </Text>
                ))
              )}
            </View>
            <View className="action-buttons">
              {isCurrentUser ? (
                <>
                  <View className="edit-profile" onClick={() => Taro.navigateTo({ url: '/packageUser/user-editing/index' })}>
                    编辑资料
                  </View>
                  <View className="setting-btn" onClick={() => {
                      GlobalStore.currentTab = 'user';
                      Taro.switchTab({ url: '/pages/user-setting/index' })
                  }}>
                    <Image className="setting-icon" src={settingIcon} />
                  </View>
                </>
              ) : (
                <View className="say-hello" onClick={handleSayHello}>
                  打个招呼
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
      
      <View className="tabs">
        <View 
          className={`tab-item ${activeTab === 'properties' ? 'active' : ''}`}
          onClick={() => setActiveTab('properties')}
        >
          <Text>{isCurrentUser ? '我的房源' : 'Ta的房源'}</Text>
          {activeTab === 'properties' && <View className="tab-line" />}
        </View>
        
        <View 
          className={`tab-item ${activeTab === 'travel' ? 'active' : ''}`}
          onClick={() => setActiveTab('travel')}
        >
          <Text>{isCurrentUser ? '我的出行' : 'Ta的出行'}</Text>
          {activeTab === 'travel' && <View className="tab-line" />}
        </View>
        <View 
          className={`tab-item ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          <Text>收到的评价</Text>
          {activeTab === 'reviews' && <View className="tab-line" />}
        </View>

      </View>
      
      <View className="tab-content">
        {activeTab === 'properties' && (
          <View className="properties-list">
            {propertyList.length > 0 ? (
              <>
                {propertyList.map(item => (
                  <HouseCard
                    key={item.id}
                    id={item.id}
                    uid={Number(pageUid)}
                    type={0}
                    images={item.images}
                    title={item.title}
                    availableDate={parseStartDate(item.startDate)}
                    price={item.price}
                    currency="€"
                    location={`${item.country}${item.city}`}
                    onSettingClick={() => {
                      Taro.navigateTo({
                        url: `/pages/house-publish/index?pid=${item.id}`
                      });
                    }}
                    onFavoriteClick={() => handleLike(item, '房源')}
                  />
                ))}
                {hasMoreProperties && !propertiesLoading && (
                  <View className="load-more" onClick={loadMoreProperties}>
                    加载更多
                  </View>
                )}
                {propertiesLoading && (
                  <View className="loading">加载中...</View>
                )}
              </>
            ) : (
              <View className="content-placeholder">
                {propertiesLoading ? '加载中...' : '暂无房源内容'}
              </View>
            )}
          </View>
        )}
        {activeTab === 'travel' && (
          <View className="travel-list">
            {travelList.length > 0 ? (
              <>
                {travelList.map(item => (
                  <HouseCard
                    key={item.id}
                    type={1}
                    id={item.id}
                    uid={Number(pageUid)}
                    images={item.images}
                    title={item.title}
                    availableDate={`${formatTravelDate(item.startDate)}-${formatTravelDate(item.endDate)}`}
                    price={0}
                    currency=""
                    location={`${item.country}${item.city}`}
                    maleCount={item.maleNumber}
                    femaleCount={item.femaleNumber}
                    onFavoriteClick={() => handleLike(item, '出行')}
                  />
                ))}
                {hasMoreTravel && !travelLoading && (
                  <View className="load-more" onClick={loadMoreTravel}>
                    加载更多
                  </View>
                )}
                {travelLoading && (
                  <View className="loading">加载中...</View>
                )}
              </>
            ) : (
              <View className="content-placeholder">
                {travelLoading ? '加载中...' : '暂无出行内容'}
              </View>
            )}
          </View>
        )}
        {activeTab === 'reviews' && (
          <View className="reviews-list">
            {reviewList.length > 0 ? (
              <>
                {reviewList.map(review => (
                  <ReviewCard
                    key={review.id}
                    userAvatar={review.anonymous ? 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/loading.png' : review.reviewerInfo?.avatar || 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/loading.png'}
                    userName={review.anonymous ? '匿名用户' : review.reviewerInfo?.username || '用户'}
                    userType={review.fromHost ? '房东' : '房客'}
                    isRecommended={review.recommend}
                    reviewContent={review.content}
                    images={review.images || []}
                    reviewDate={review.create_time}
                    location={review.anonymous ? '' : review.reviewerInfo?.location || '未知'}
                  />
                ))}
                {hasMoreReviews && !reviewsLoading && (
                  <View className="load-more" onClick={loadMoreReviews}>
                    加载更多
                  </View>
                )}
                {reviewsLoading && (
                  <View className="loading">加载中...</View>
                )}
              </>
            ) : (
              <View className="content-placeholder">
                {reviewsLoading ? '加载中...' : '暂无收到的评价内容哦~'}
              </View>
            )}
          </View>
        )}
      </View>

      {showHelloModal && (
        <View 
          className='hello-modal-mask'
          onClick={() => setShowHelloModal(false)}
        >
          <View 
            className='hello-modal'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <View className='modal-title'>您将给"{userInfo?.username}"发送打招呼消息</View>
            <Textarea
              className='message-input'
              placeholder='说点什么吧...'
              value={helloMessage}
              onInput={e => setHelloMessage(e.detail.value)}
              maxlength={200}
            />
            <View 
              className='confirm-button'
              onClick={handleSendHello}
            >
              发送
            </View>
          </View>
        </View>
      )}

      {showLikeModal && currentItem && (
        <View 
          className='like-modal-mask'
          onClick={() => {
            setShowLikeModal(false);
            setCurrentItem(null);
          }}
        >
          <View 
            className='like-modal'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <View className='modal-title'>您将给"{userInfo?.username}"发送点赞消息</View>
            <Textarea
              className='message-input'
              placeholder='说点什么吧...'
              value={likeMessage}
              onInput={e => setLikeMessage(e.detail.value)}
              maxlength={200}
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
  );
};

export default observer(UserProfile);

