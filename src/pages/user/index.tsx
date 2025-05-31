import { View, Image, Text, Textarea } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import GlobalStore from '../../store/GlobalStore';
import HouseCard from '../../components/HouseCard';
import ReviewCard from '../../components/ReviewCard';
import { 
  getCurrentUserInfo, 
  getUserPostedList, 
  getUserParticipatedList, 
  getUserReviewList,
  UserShortInfo, 
  PostedItem,
  ReviewItem 
} from '../../services/user';
import './index.scss';
import { settingIcon } from '@utils/cloudIcons';
import { observer } from 'mobx-react-lite';

const UserProfile = () => {
  const router = useRouter();
  const pageUid = router?.params?.uid;
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserShortInfo | null>(null);
  const [postedList, setPostedList] = useState<PostedItem[]>([]);
  const [participatedList, setParticipatedList] = useState<PostedItem[]>([]);
  const [reviewList, setReviewList] = useState<ReviewItem[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [participatedLoading, setParticipatedLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [participatedPage, setParticipatedPage] = useState(1);
  const [reviewPage, setReviewPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hasMoreParticipated, setHasMoreParticipated] = useState(true);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [showHelloModal, setShowHelloModal] = useState(false);
  const [helloMessage, setHelloMessage] = useState('');
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [likeMessage, setLikeMessage] = useState('');
  const [currentItem, setCurrentItem] = useState<PostedItem | null>(null);
  const [currentType, setCurrentType] = useState<'发布的' | '参与的'>('发布的');

  useEffect(() => {
    fetchUserInfo();
  }, [pageUid]);

  useDidShow(() => {
    checkToken();
    fetchUserInfo();
  });

  useEffect(() => {
    if (activeTab === 'posts' && userInfo?.uid) {
      fetchPostedList(1);
    } else if (activeTab === 'participated' && userInfo?.uid) {
      fetchParticipatedList(1);
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

  
  const formatUid = (uid: number) => {
    return uid.toString().padStart(16, '0');
  };

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserInfo (pageUid ? Number(pageUid) : undefined);
      if (response.code === 0) {
        setUserInfo(response.result);
        setIsCurrentUser(!pageUid || String(GlobalStore.userInfo?.uid) === pageUid);
      }
    } catch (error) {
      console.error('获取用户信息错误:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostedList = async (page: number) => {
    if (!userInfo?.uid || postsLoading || (page > 1 && !hasMore)) {
      return;
    }

    try {
      setPostsLoading(true);
      const response = await getUserPostedList(userInfo.uid, page);
      if (response.code === 0) {
        const { data, current_page, last_page } = response.result;
        setPostedList(page === 1 ? data : [...postedList, ...data]);
        setCurrentPage(current_page);
        setHasMore(current_page < last_page);
      }
    } catch (error) {
      console.error('获取发布列表错误:', error);
    } finally {
      setPostsLoading(false);
    }
  };

  const fetchParticipatedList = async (page: number) => {
    if (!userInfo?.uid || participatedLoading || (page > 1 && !hasMoreParticipated)) {
      return;
    }

    try {
      setParticipatedLoading(true);
      const response = await getUserParticipatedList(userInfo.uid, page);
      if (response.code === 0) {
        const { data, current_page, last_page } = response.result;
        setParticipatedList(page === 1 ? data : [...participatedList, ...data]);
        setParticipatedPage(current_page);
        setHasMoreParticipated(current_page < last_page);
      }
    } catch (error) {
      console.error('获取参与列表错误:', error);
    } finally {
      setParticipatedLoading(false);
    }
  };

  const fetchReviewList = async (page: number) => {
    if (!userInfo?.uid || reviewsLoading || (page > 1 && !hasMoreReviews)) {
      return;
    }

    try {
      setReviewsLoading(true);
      const response = await getUserReviewList(userInfo.uid, page);
      if (response.code === 0) {
        const { data, current_page, last_page } = response.result;
        setReviewList(prev => {
          const newList = page === 1 ? data : [...prev, ...data];
          return newList;
        });
        setReviewPage(current_page);
        setHasMoreReviews(current_page < last_page);
      }
    } catch (error) {
      console.error('获取评价列表错误啦:', error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleSettingClick = (id: number) => {
    // 保留空函数，供后续实现
  };

  const loadMore = () => {
    if (hasMore && !postsLoading) {
      fetchPostedList(currentPage + 1);
    }
  };

  const loadMoreParticipated = () => {
    if (hasMoreParticipated && !participatedLoading) {
      fetchParticipatedList(participatedPage + 1);
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
    Taro.request({
      url: 'https://api.eurostay.co/app/esmessages/sendLikeMsg',
      method: 'POST',
      header: {
        token: GlobalStore.userInfo.token,
      },
      data: {
        toUid: Number(pageUid),
        content: `${GlobalStore.userInfo.username}对你的主页很感兴趣并向您打了个招呼：${helloMessage}`,
      },
      success: function (response) {
        if (response.statusCode === 200 && response.data.code === 0) {
          Taro.showToast({
            title: '发送成功',
            icon: 'success'
          });
          Taro.navigateTo({
            url: `/packageMessage/message-detail/index?id=${response.data.sessionId}&name=${encodeURIComponent(userInfo?.username || '')}`,
          });
        } else {
          Taro.showToast({
            title: response.data.msg + ' 发送失败，请重试',
            icon: 'none',
            duration: 2000,
          });
        }
      },
      fail: function (err) {
        Taro.showToast({
          title: '网络请求失败，请重试',
          icon: 'none',
          duration: 2000,
        });
      }
    });
    setShowHelloModal(false);
    setHelloMessage('');
  };

  const handleLike = (item: PostedItem, type: number) => {
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
    setCurrentType(type === 0 ? '发布的' : '参与的');
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

    Taro.request({
      url: 'https://api.eurostay.co/app/esmessages/sendLikeMsg',
      method: 'POST',
      header: {
        token: GlobalStore.userInfo.token,
      },
      data: {
        toUid: Number(pageUid),
        content: `${GlobalStore.userInfo.username}点赞了您${currentType}的${currentItem.type === 0 ? '房源' : '活动'}"${currentItem.title}"，并发送了消息：${likeMessage}`,
      },
      success: function (response) {
        if (response.statusCode === 200 && response.data.code === 0) {
          Taro.showToast({
            title: '点赞成功',
            icon: 'success'
          });
        } else {
          Taro.showToast({
            title: response.data.msg + ' 点赞失败，请重试',
            icon: 'none',
            duration: 2000,
          });
        }
      },
      fail: function (err) {
        Taro.showToast({
          title: '网络请求失败，请重试',
          icon: 'none',
          duration: 2000,
        });
      }
    });
    setShowLikeModal(false);
    setLikeMessage('');
    setCurrentItem(null);
  };

  const checkToken = async () => {
    if (!GlobalStore.userInfo?.token) return;
    
    try {
      const res = await Taro.request({
        url: 'https://api.eurostay.co/app/esuser/tokenCheck',
        method: 'POST',
        header: {
          token: GlobalStore.userInfo.token
        }
      });

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
          className={`tab-item ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <Text>{isCurrentUser ? '我发布的' : 'Ta发布的'}</Text>
          {activeTab === 'posts' && <View className="tab-line" />}
        </View>
        
        <View 
          className={`tab-item ${activeTab === 'participated' ? 'active' : ''}`}
          onClick={() => setActiveTab('participated')}
        >
          <Text>{isCurrentUser ? '我参与的' : 'Ta参与的'}</Text>
          {activeTab === 'participated' && <View className="tab-line" />}
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
        {activeTab === 'posts' && (
          <View className="posts-list">
            {postedList.length > 0 ? (
              <>
                {postedList.map(item => (
                  <HouseCard
                    key={item.id}
                    id={item.id}
                    uid={Number(pageUid)}
                    type={item.type}
                    images={item.images}
                    title={item.title}
                    availableDate={item.type === 0 ? parseStartDate(item.startDate) : (item.startTime || '暂无开始时间')}
                    price={item.price}
                    currency="€"
                    location={item.location}
                    mode="posted"
                    onSettingClick={() => {
                      console.log("yes");
                      if (item.type === 0) {
                        Taro.navigateTo({
                          url: `/pages/house-publish/index?pid=${item.id}`
                        });
                      } else {
                        Taro.navigateTo({
                          url: `/pages/activity-publish/index?aid=${item.id}`
                        });
                      }
                    }}
                    onFavoriteClick={() => handleLike(item, 0)}
                  />
                ))}
                {hasMore && !postsLoading && (
                  <View className="load-more" onClick={loadMore}>
                    加载更多
                  </View>
                )}
                {postsLoading && (
                  <View className="loading">加载中...</View>
                )}
              </>
            ) : (
              <View className="content-placeholder">
                {postsLoading ? '加载中...' : '暂无发布内容'}
              </View>
            )}
          </View>
        )}
        {activeTab === 'participated' && (
          <View className="participated-list">
            {participatedList.length > 0 ? (
              <>
                {participatedList.map(item => (
                  <HouseCard
                    key={item.id}
                    type={item.type}
                    id={item.id}
                    uid={Number(pageUid)}
                    images={item.images}
                    title={item.title}
                    availableDate={item.type === 0 ? parseStartDate(item.startDate) : (item.startTime || '暂无开始时间')}
                    price={item.price}
                    currency="€"
                    location={item.location}
                    mode="participated"
                    onFavoriteClick={() => handleLike(item, 1)}
                  />
                ))}
                {hasMoreParticipated && !participatedLoading && (
                  <View className="load-more" onClick={loadMoreParticipated}>
                    加载更多
                  </View>
                )}
                {participatedLoading && (
                  <View className="loading">加载中...</View>
                )}
              </>
            ) : (
              <View className="content-placeholder">
                {participatedLoading ? '加载中...' : '暂无参与内容'}
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
                    userAvatar={review.reviewerInfo?.avatar || 'https://eurostay-1330475057.cos.eu-frankfurt.myqcloud.com/sys/loading.png'} // 使用默认头像
                    userName={review.reviewerInfo?.username || '用户'} // 使用默认用户名
                    userType={review.fromHost ? '房东' : '房客'}
                    isRecommended={review.recommend}
                    reviewContent={review.content}
                    images={review.images || []}
                    reviewDate={review.create_time}
                    location={review.reviewerInfo?.location || '未知'}
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

