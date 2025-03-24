import { View, Image, Text, Swiper, SwiperItem, Input, Textarea } from '@tarojs/components'
import { AtCalendar } from 'taro-ui';
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import HostCardSmall from '../../components/HostCardSmall';
import './index.scss'
import { HomeOutlined } from '@taroify/icons';
import { useRouter } from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';
import { HostDetail, Order, ReviewCardProps } from '@utils/interfaces';
import { formatToday } from '@utils/dateUtil';
import ReviewCard from '@components/ReviewCard';
import { get } from 'mobx';
import {heartPurpleIcon, starPurpleIcon, starYellowIcon, sharePurpleIcon} from '@utils/cloudIcons';

const HouseDetail: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isStarred, setIsStarred] = useState(false); 
  const [showLikeModal, setShowLikeModal] = useState(false)
  const [likeMessage, setLikeMessage] = useState('')
  const [username, setUsername] = useState('')
  const [isGotUser, setIsGotUser] = useState(false)
  const [hasReview, sethasReview] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isSelected, setIsSelected] = useState(false)
  const [gotValidDates, setGotValidDates] = useState(false)

  const today = formatToday();

  const router = useRouter();
  const id = router?.params?.id;
  const type = router?.params?.type;

  const [hostDetail, setHostDetail] = useState<HostDetail>({});
  const [order, setOrder] = useState<Order>({});
  const [topReview, setTopReview] = useState<ReviewCardProps>({});

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(null);
  const [valid, setValid] = useState([]);

  const [allReviews, setAllReviews] = useState([]);

  Taro.setNavigationBarTitle({ title: Number(type) === 0 ? '房源详情' : '活动详情' });

  const handelCollect = () => {
    if (!isStarred) { // 收藏
      Taro.request({
        url: Number(type) === 0 ? 'https://api.eurostay.co/app/property/addPropertyCollection' : 'https://api.eurostay.co/app/activity/addActivityCollection',
        method: 'POST',
        header: {
          token: GlobalStore.userInfo.token,
        },
        data: {
          id: id,
        },
        success: (res) => {
          if (res.data.code === 0 && res.statusCode === 200) {
            Taro.showToast({
              title: '收藏成功',
              icon: 'success'
            })
            setIsStarred(true)
          } else {
            Taro.showToast({
              title: res.data.msg + ' 收藏失败，请重试',
              icon: 'none',
              duration: 2000,
            })
          }
        },
        fail: function (err) {
          Taro.showToast({
            title: '网络请求失败，请重试',
            icon: 'none',
            duration: 2000,
          });
        }
      })
    } else { // 取消收藏
      Taro.request({
        url: Number(type) === 0 ? 'https://api.eurostay.co/app/property/cancelPropertyCollection' : 'https://api.eurostay.co/app/activity/cancelActivityCollection',
        method: 'POST',
        header: {
          token: GlobalStore.userInfo.token,
        },
        data: {
          id: id,
        },
        success: (res) => {
          if (res.data.code === 0 && res.statusCode === 200) {
            Taro.showToast({
              title: '取消收藏成功',
              icon: 'success'
            })
            setIsStarred(false)
          } else {
            Taro.showToast({
              title: res.data.msg + ' 取消收藏失败，请重试',
              icon: 'none',
              duration: 2000,
            })
          }
        },
        fail: function (err) {
          Taro.showToast({
            title: '网络请求失败，请重试',
            icon: 'none',
            duration: 2000,
          });
        }
      })
    }
  }

  const getValidDates = (dates: Array<string>) => {
    if (gotValidDates) return valid;
    else {
      for (let i = 0; i < dates.length; i+=2) {
        let start = new Date(dates[i].replace('-', '/').replace('-', '/'));
        let end = new Date(dates[i + 1].replace('-', '/').replace('-', '/'));
        start.setDate(start.getDate() + 1)
        end.setDate(end.getDate() + 1)
        // console.log('getValidDates', start, end)
        for (let j = start; j <= end; j.setDate(j.getDate() + 1)) {
          valid.push({value: j.toISOString().substring(0, 10).replace('-', '/').replace('-', '/')});
          // console.log('adding date to valid date: ', j.toISOString().substring(0, 10).replace('-', '/').replace('-', '/'))
        }
      }
      // setValid(dates.map(date => {
      //   return {value: date.substring(0, 10).replace('-', '/').replace('-', '/')};
      // }))
      // console.log('valid dates: ', valid)
      setGotValidDates(true)
      return valid;
    }
  }

  const getDate = (date: string): string => {
    return date.substring(0, 10);
  }

  const getOrderDetail = (id: number, type: number) => {
    if (isComplete) return
    // 这里添加获取房源详情的逻辑
    Taro.request({
      url: type === 0 ? 'https://api.eurostay.co/app/property/getPropertyDetail' : 'https://api.eurostay.co/app/activity/getActivityDetail',
      method: 'POST',
      header: {
        token: GlobalStore.userInfo.token,
      },
      data: {
        id: id,
      },
      success: function (res) {
        // console.log(res)
        setHostDetail({
          avatar: res.data.result.hostInfo.avatar,
          role: 'Host',
          username: res.data.result.hostInfo.username,
          detail: res.data.result.hostInfo.aboutMe,
          tags: res.data.result.hostInfo.tags,
          buttonText: '打个招呼',
        });
        setOrder({
          title: res.data.result.title,
          tags: res.data.result.tags,
          description: res.data.result.description,
          price: res.data.result.price,
          location: res.data.result.location,
          images: res.data.result.images,
          pid: res.data.result.pid,
          uid: res.data.result.uid,
          whyHost: res.data.result.whyHost,
          availableDate: type === 0 ? res.data.result.availableDate : [],
          startTime: type === 0 ? '' : res.data.result.startTime,
        });
        setIsStarred(res.data.result.isCollected);
        if (res.data.result.reviews !== undefined) { 
          const reviews = res.data.result.reviews.filter(review => review.fromHost === false);
          setAllReviews(reviews);
          // console.log('all reviews: ', allReviews)
          if (reviews.length === 0) {
            sethasReview(false);
          } else {
            const review = reviews[0];
            setTopReview({
              userAvatar: review.reviewerInfo.avatar,
              userName: review.reviewerInfo.username,
              userType: Number(type) === 0 ? '房客' : 'Guest',
              isRecommended: review.recommend,
              reviewContent: review.content,
              images: review.images,
              reviewDate: getDate(review.createTime),
              location: review.reviewerInfo.location,
            });
            sethasReview(true);
          }
        } else {
          sethasReview(false);
        }
      },
      fail: function (err) {
          Taro.showToast({
              title: '网络请求失败，请重试',
              icon: 'none',
              duration: 2000,
          });
      },
      complete: function () {
        setIsComplete(true)
      }
    })
  }

  useEffect(() => {
    getOrderDetail(Number(id), Number(type));
  }, []);

  const handleShare = () => {
    Taro.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        Taro.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000,
        });
      },
      fail: function (err) {
        Taro.showToast({
          title: '分享失败，请重试',
          icon: 'none',
          duration: 2000,
        });
      }
    })
  }

  const handleLike = () => {
    setShowLikeModal(true)
  }

  const handleSendLike = () => {
    if (!isGotUser) {
      // 获取用户自身信息
      Taro.request({
        url: 'https://api.eurostay.co/app/esuser/getUserCompleteInfo',
        method: 'POST',
        header: {
          token: GlobalStore.userInfo.token,
        },
        success: function (response) {
          if (response.statusCode === 200 && response.data.code === 0) {
            setUsername(response.data.result.username);
            setIsGotUser(true)
          } else {
            Taro.showToast({
              title: '获取用户信息失败，请重试',
              icon: 'none',
              duration: 2000,
            });
          }
        }
      })
    }
    // 这里添加发送点赞消息的逻辑
    Taro.request({
      url: 'https://api.eurostay.co/app/esmessages/sendLikeMsg',
      method: 'POST',
      header: {
        token: GlobalStore.userInfo.token,
      },
      data: {
        toUid: order.uid,
        content: `${username}点赞了您的房源"${order.title}"，并发送了消息：${likeMessage}`,
      },
      success: function (response) {
        if (response.statusCode === 200 && response.data.code === 0) {
          Taro.showToast({
            title: '点赞成功',
            icon: 'success'
          })
        } else {
          Taro.showToast({
            title: response.data.msg + ' 点赞失败，请重试',
            icon: 'none',
            duration: 2000,
          })
        }
      },
      fail: function (err) {
        Taro.showToast({
          title: '网络请求失败，请重试',
          icon: 'none',
          duration: 2000,
        });
      }
    })
    setShowLikeModal(false)
    setLikeMessage('')
  }

  const handleSwiperChange = (e) => {
    setCurrentImage(e.detail.current)
  }

  const checkDateValid = (start: string, end: string, valids: Array<{}>) => {
    if (valids.length === 0) return false
    const startDate = new Date(start.replace('-', '/').replace('-', '/'));
    const endDate = new Date(end.replace('-', '/').replace('-', '/'));
    startDate.setDate(startDate.getDate() + 1)
    endDate.setDate(endDate.getDate() + 1)
    const valid_dates = valids.map(date => date.value.replace('-', '/').replace('-', '/').substring(0, 10));
    // console.log('check date valid', start, end, valids, valid_dates)
    for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
      // console.log('checking date: ', i.toISOString().substring(0, 10).replace('-', '/').replace('-', '/'))
      if (!valid_dates.includes(i.toISOString().substring(0, 10).replace('-', '/').replace('-', '/'))) return false
    }
    return true
  }

  const handleSubmit = () => {
    // check if startDate and endDate are selected
    if (Number(type) === 0) {
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
            'url': `/packageHouse/housing-apply/index?id=${id}&type=${type}&startDate=${startDate}&endDate=${endDate}`
        })
      } else {
        Taro.showToast({
          title: '日期不在有效范围内',
          icon: 'none',
          duration: 2000,
        });
      }
    } else {
      Taro.navigateTo({
          'url': `/packageHouse/housing-apply/index?id=${id}&type=${type}`
      })
    }
  }

  return (
    <View style={{paddingBottom: '120px'}}>
      <Swiper
        className='image-swiper'
        onChange={handleSwiperChange}
        circular
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
      
      <View className='fee'>{Number(type) === 0 ? `€${order.price}/晚` : (order.price === 0 ? '免费' : `€${order.price}`)}</View>

      {/* <View className='back' onClick={() => {
        Taro.navigateBack()
      }}>{'<'}</View> */}

      <HomeOutlined className='back' onClick={() => {
        Taro.navigateBack({delta: 1})
      }}/>

      <View className='action-buttons'>
        <View className='action-button' onClick={handleShare}>
          <Image src={sharePurpleIcon} className='icon' />
        </View>
        <View className='action-button' onClick={handleLike}>
          <Image src={heartPurpleIcon} className='icon' />
        </View>
        {isComplete &&
        <View className='action-button' onClick={handelCollect}>
          <Image src={isStarred ? starYellowIcon : starPurpleIcon} className='icon' />
        </View>
        }
      </View>

      <View className='title-section'>
        <View className='title'>{order.title}</View>
        <View className='house-tags'>
          {
            isComplete && order.tags.map(tag => (
              <View className='house-tag'>{tag}</View>
            ))
          }
        </View>
      </View>

      <View className='detail-text'>{order.description}</View>

      {isComplete && <HostCardSmall {...hostDetail}/>}

      <View className='title-with-badge'>
        <View className='b-title'><View className='purple-badge'/>期待和Guest做什么？</View>
      </View>

      <View className='detail-text'>{order.whyHost}</View>

      {isComplete &&
      <View className='title-with-badge'>
        <View className='b-title'><View className='purple-badge'/>
        {Number(type) === 0 ? '房源' : '活动'}评价
          <View className='check-detail'
              onClick={() => {if (hasReview) setIsCollapsed(!isCollapsed)}}
          >
            {!hasReview ? '暂无评价' : isCollapsed ?  '查看全部评价＞' : '收起'}
          </View>
        </View>
        {hasReview &&
          <View className='review-line'>
            {isCollapsed && <ReviewCard {...topReview} />}
          </View>
        }
        {hasReview && !isCollapsed && (
          allReviews.map(review => (
            <View className='review-line'>
              <ReviewCard
                userAvatar={review.reviewerInfo.avatar}
                userName={review.reviewerInfo.username}
                userType={Number(type) === 0 ? '房客' : 'Guest'}
                isRecommended={review.recommend}
                reviewContent={review.content}
                images={review.images}
                reviewDate={getDate(review.createTime)}
                location={review.reviewerInfo.location}
              />
            </View>
          ))
        )}
      </View>
      }

      {Number(type) === 0 && 
        <View className='title-with-badge'>
          <View className='b-title'><View className='purple-badge'/>
          可选日期
          </View>
        </View>
      }

      {Number(type) === 1 && 
        <View className='title-with-badge'>
          <View className='b-title'><View className='purple-badge'/>
          活动日期
          </View>
        </View>
      }

      {Number(type) === 1 && isComplete && 
        <View className='detail-text'>{order.startTime}开始</View>
      }


      {Number(type) === 0 && isComplete &&  
        <View className='date-select'>
          <View className='calendar-container'>
            <AtCalendar
              isMultiSelect
              validDates={getValidDates(order.availableDate)}
              minDate={today}
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
              e.stopPropagation();
            }}
          >
            <View className='modal-title'>您将给"{order.title}"发送点赞消息</View>
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
  )
}

export default HouseDetail 