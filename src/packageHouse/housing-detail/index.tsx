import { View, Image, Text, Swiper, SwiperItem, Input } from '@tarojs/components'
import { AtCalendar } from 'taro-ui';
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import HostCardSmall from '../../components/HostCardSmall';
import './index.scss'
import {LikeOutlined, StarOutlined, ShareOutlined, HomeOutlined} from '@taroify/icons';
import { useRouter } from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';
import { HostDetail, Order } from '@utils/interfaces';
import { formatToday } from '@utils/dateUtil';

const HouseDetail: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isStarred, setIsStarred] = useState(false); 
  const [showLikeModal, setShowLikeModal] = useState(false)
  const [likeMessage, setLikeMessage] = useState('')
  const [username, setUsername] = useState('')
  const [isGotUser, setIsGotUser] = useState(false)

  const today = formatToday();

  const router = useRouter();
  const id = router?.params?.id;
  const type = router?.params?.type;

  const [hostDetail, setHostDetail] = useState<HostDetail>({});
  const [order, setOrder] = useState<Order>({});

  const [isComplete, setIsComplete] = useState(false)

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
          Taro.showToast({
            title: '收藏成功',
            icon: 'success'
          })
          setIsStarred(true)
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
          Taro.showToast({
            title: '取消收藏成功',
            icon: 'success'
          })
          setIsStarred(false)
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
          availableDate: res.data.result.availableDate,
        });
        setIsStarred(res.data.result.isCollected);
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
      withShareTicket: true
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
          setUsername(response.data.result.username);
        },
        complete: function () {
          setIsGotUser(true)
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
        Taro.showToast({
          title: '点赞成功',
          icon: 'success'
        })
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

  const handleSubmit = () => {
    Taro.navigateTo({
        'url': `/packageHouse/housing-apply/index?id=${id}&type=${type}`
    })
  }

  return (
    <View>
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
          <ShareOutlined className='icon'/>
        </View>
        <View className='action-button' onClick={handleLike}>
          <LikeOutlined className='icon'/>
        </View>
        {isComplete &&
        <View className='action-button' onClick={handelCollect}>
         <StarOutlined className={`icon ${isStarred ? 'active' : ''}`}/>
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

      <View className='title-with-badge'>
        <View className='b-title'><View className='purple-badge'/>
        {Number(type) === 0 ? '房源' : '活动'}评价
        <View className='check-detail'>查看全部评价＞</View>
        </View>
      </View>

      {Number(type) === 0 && 
        <View className='title-with-badge'>
          <View className='b-title'><View className='purple-badge'/>
          可选日期
          </View>
        </View>
      }

      {Number(type) === 0 && isComplete &&  
        <View className='date-select'>
          <View className='calendar-container'></View>
          <AtCalendar
            isMultiSelect
            validDates={order.availableDate}
            minDate={today}
            style={{ width: '100%' }}
          />
        </View>
      }

      <View className='submit-button' onClick={handleSubmit}>
        填写申请
      </View>

      {/* 点赞弹窗 */}
      {showLikeModal && (
        <View className='like-modal-mask'>
          <View className='like-modal'>
            <View className='modal-title'>您将给"{order.title}"发送点赞消息</View>
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