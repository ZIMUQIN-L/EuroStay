import { View, Image, Text, Swiper, SwiperItem, Input } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import HostCardSmall from '../../components/HostCardSmall';
import './index.scss'
import {LikeOutlined, StarOutlined, ShareOutlined, HomeOutlined} from '@taroify/icons';

const HouseDetail: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isStarred, setIsStarred] = useState(false)
  const [showLikeModal, setShowLikeModal] = useState(false)
  const [likeMessage, setLikeMessage] = useState('')

  // 示例图片数组
  const images = [
    'https://s3-alpha-sig.figma.com/img/3191/c481/cf0b3d551e37f559b5da29477799b98c?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=W~eMJbCv20hIfPPoWsWa3FNuKG~g37dMucmKae3K8yNGot~dhEFnE2lpNWS2rFyDZQ5xYwA-0j6IBpWS0iImNYJpBHivquxSbbWCTXiELFghXfBNLKsNqn0127U7wF6pwZ0zkMmQwKswUn5ejAv~A4jEbJ4FwysSVSbUoKDc18-I8afi9kka0Y8yy9-lmr9qAALeWhdJaei6evsa7pflGq-Xr2rThLyhvrfvjx8-zOpnUQSHOxm-2dMaRqSIKfhjGL8Vaaw1OLT3qwn3rNI~sso9VKJHPCYPyJBc0y-6VeIDgCrc6-goVsX4yLHh6IjLeEzl69kYI6ojwHuM5laTBg__',
    'https://s3-alpha-sig.figma.com/img/c58f/e07a/1ffc334e526cfaa24a1fcb114664e94f?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fHkm-5fa0cKgBf5SPsYNrMrUvyrBSga11twMSyIKDluM1w5GiTJIm67M9qN6qbWImmrxRz92UoiWDndUmdtDbccDgyWvlBEtr21RWpdrz37lj5KfwgtHrO3bpzuIyxsEHtNv0jpaYrbqqVAeP3s~Sp3nLPIPpeNf0WrPvu9tEvZeFXVxyfRsdWXBxus61p3jmZE8U3~iFDJtq~~Ep0nwC3R0Ii7QNMSKhOJZMQmfuFlHfA1P5gDFcKmSRpnvfMOqqTEonaGMOHk8RcCqqE0sPy-x7BzOHoeJboRj3xbWSRBzeH8XXCMVTr2sjwKiVokUTdlBc7EYedQNwdiciz~Nag__',
    'https://s3-alpha-sig.figma.com/img/dc9e/c290/345c473f613363ab345bf602d5cb8122?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XkE6Fh32IkDWhFdHiJttSwOTPFMPgFDge8~n46omSzQkXXBDMwxIdwkTw3NSG8ZOOw5g9dcGTKD~XVShmabfzqL4g6Zxah2mkZYGRwvBle20dZyUwfmlfURalKGBiAcRuCUgdu9PGVqOFcicBhPb1GCoYb6HnUkQ9JRCCWAhi-tnmgieeSo~gq-MwB80KZCUy5NzdYYCEZwj58W-FbAy8fBzOB3XLW3r0s3RyUdr5ACbFGgxEueGZLMeHCSwie~g6VJyix2eyTEl4fF6bhZkgJLdwgeMmGZaNMBykqbxGb2k65zUq~PJ4W31Z7ZaZELEmyds2p2e948uy-Gw245iVQ__',
  ]

  const mockDataApplicant = {
    avatar: 'https://s3-alpha-sig.figma.com/img/97db/b7df/347e0ff352700de47ef1413cb12e9dc3?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hv1Oof5~FOfwvqUi9urVpsE8OpkxmQq2QY5HLXMrgiexrrAyhEGjl4cFXwXt~qqxcxVb0k5V9Vts9-4TgyfGDSHEI6b7vh8zZcvQdsNP5TaahkuoyyObSQS8Zmgj5s5nlSOSAK6CsHEyZ9MK3FAcSUdboqlzvTcFUEV30DPF9NQtRHUWgmC6kfOvfBlekMkn8x-NHj91x8zcxjXipy1nbgxRMKDtfAx2d7LTOoHWmTXuoEeg76bww7cx0XtDwxlBoBmFEZQ~flhGq-Yq6jnPhDmfu8bsCTSY7vVf0ZzV4D4R6XfoHr6FvM1WfQkxG4hyFrZKMGzoKBPJ919~SVPa-Q__',
    role: 'Host',
    userName: '我是一条想飞的鱼',
    detail: '当host的第3年',
    tags: ['2025最佳Host'],
    buttonText: '打个招呼',
    buttonFunc: () => {}
    }

  const handleShare = () => {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  }

  const handleLike = () => {
    setShowLikeModal(true)
  }

  const handleStar = () => {
    setIsStarred(!isStarred)
    Taro.showToast({
      title: isStarred ? '取消收藏' : '收藏成功',
      icon: 'success'
    })
  }

  const handleSendLike = () => {
    // 这里添加发送点赞消息的逻辑
    Taro.showToast({
      title: '点赞成功',
      icon: 'success'
    })
    setShowLikeModal(false)
    setLikeMessage('')
  }

  const handleSwiperChange = (e) => {
    setCurrentImage(e.detail.current)
  }

  const handleSubmit = () => {
    Taro.navigateTo({
        'url': '/packageHouse/housing-apply/index'
    })
  }

  return (
    <View>
      <Swiper
        className='image-swiper'
        onChange={handleSwiperChange}
        circular
      >
        {images.map((image, index) => (
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
        {images.map((_, index) => (
          <View 
            key={index} 
            className={`indicator ${currentImage === index ? 'active' : ''}`} 
          />
        ))}
      </View>

      <View className='house-title'>柏林小木屋</View>
      
      <View className='fee'>免费</View>

      {/* <View className='back' onClick={() => {
        Taro.navigateBack()
      }}>{'<'}</View> */}

      <HomeOutlined className='back' onClick={() => {
        Taro.navigateTo({url: '/pages/home/index'})
      }}/>

      <View className='action-buttons'>
        <View className='action-button' onClick={handleShare}>
          <ShareOutlined className='icon'/>
        </View>
        <View className='action-button' onClick={handleLike}>
          <LikeOutlined className='icon'/>
        </View>
        <View className='action-button' onClick={handleStar}>
          <StarOutlined className={`icon ${isStarred ? 'active' : ''}`}/>
        </View>
      </View>

      <View className='title-section'>
        <View className='title'>柏林小木屋</View>
        <View className='house-tags'>
            <View className='house-tag'>独立屋</View>
            <View className='house-tag'>小狗</View>
            <View className='house-tag'>性价比</View>
        </View>
      </View>

      <View className='detail-text'>
      这个木屋在柏林的北边～周围比较安静，我们提供一个超舒服的沙发床！并且配有屏风，保证足够的隐私哦！我们期待找到2位女生租客～
      </View>

      <HostCardSmall {...mockDataApplicant}/>

      <View className='title-with-badge'>
        <View className='b-title'><View className='purple-badge'/>期待和Guest做什么？</View>
      </View>

      <View className='detail-text'>
      超级想要和你一起弹钢琴！我家还有一只超级可爱的小狗，我们可以一起撸狗～
      </View>

      <View className='title-with-badge'>
        <View className='b-title'><View className='purple-badge'/>
        房源评价
        <View className='check-detail'>查看全部评价＞</View>
        </View>
      </View>

      <View className='title-with-badge'>
        <View className='b-title'><View className='purple-badge'/>
        可选日期
        </View>
      </View>

      <View className='submit-button' onClick={handleSubmit}>
        填写申请
      </View>

      {/* 点赞弹窗 */}
      {showLikeModal && (
        <View className='like-modal-mask'>
          <View className='like-modal'>
            <View className='modal-title'>您将给"柏林小木屋"发送点赞消息</View>
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