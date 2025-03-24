import { View, Input, Textarea, Text, Image, Button } from '@tarojs/components'
import { observer } from 'mobx-react';
import { useState } from 'react'
import { useRouter } from '@tarojs/taro';
import Taro from '@tarojs/taro'
import './index.scss'
import GlobalStore from '@store/GlobalStore';

const Index: React.FC = () => {
    const [images, setImages] = useState<string[]>([])
    const [content, setContent] = useState('')
    const MAX_IMAGES = 3
    const MAX_CONTENT_LENGTH = 500

    const router = useRouter();
    const role = router?.params?.role;
    const type = router?.params?.type;
    const id = router?.params?.id;
    const experienceId = router?.params?.experienceId;
    const title = router?.params?.title;

    const [complete, setComplete] = useState('') // useState<'yes' | 'no'>('yes')
    const [recommend, setRecommend] = useState('') // useState<'yes' | 'no'>('no')
    const [finish, setFinish] = useState(false)

    const handleReviewComplete = (c: 'yes' | 'no') => {
        setComplete(c)
    }

    const [guestId, setGuestId] = useState('')

    const [hostId, setHostId] = useState('')

    const handleRecommend = (r: 'yes' | 'no') => {
        setRecommend(r)
    }

    const handleAddImage = () => {
        if (images.length >= MAX_IMAGES) {
          Taro.showToast({
            title: `最多只能上传${MAX_IMAGES}张图片`,
            icon: 'none'
          })
          return
        }
    
        Taro.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: (res) => {
            setImages([...images, res.tempFilePaths[0]])
          }
        })
      }
    
      const handleRemoveImage = (index: number) => {
        const newImages = [...images]
        newImages.splice(index, 1)
        setImages(newImages)
      }

    const handleSubmit = () => {
        Taro.request({
            url: Number(type) === 0 ? `https://api.eurostay.co/app/property/showApplicationInfo` : 'https://api.eurostay.co/app/activity/showApplicationInfo',
            method: 'POST',
            header: {
                token: GlobalStore.userInfo.token,
            },
            data: {
                id: Number(id),
            },
            success: function (response) {
                setGuestId(response.data.result.guestInfo.uid);
                setHostId(response.data.result.hostInfo.uid);
                Taro.request({
                    url: Number(type) === 0 ? 'https://api.eurostay.co/app/property/postPropertyReview' : 'https://api.eurostay.co/app/activity/postActivityReview',
                    method: 'POST',
                    header: {
                        token: GlobalStore.userInfo.token,
                    },
                    data: {
                        experienceId: Number(experienceId),
                        applicationId: Number(id),
                        targetUid: role === 'host' ? Number(response.data.result.guestInfo.uid) : Number(response.data.result.hostInfo.uid),
                        done: complete === 'yes' ? true : false,
                        recommend: recommend === 'yes' ? true : false,
                        content: content,
                        images: images,
                    },
                    success: function (res) {
                        if (response.statusCode === 200 && response.data.code === 0) {
                            Taro.showToast({
                                title: '你已成功评价！正在等待审核，审核通过后，待对方也完成评价或7天后评价内容将会显示。',
                                icon: 'none',
                                duration: 2000,
                            })
                            setTimeout(() => {
                                Taro.navigateBack();
                              }, 2000);
                        } else {
                            Taro.showToast({
                                title: response.data.msg + ' 评价失败，请稍后再试',
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
            },
            fail: function (err) {
                Taro.showToast({
                    title: '网络请求失败，请重试',
                    icon: 'none',
                    duration: 2000,
                });
            },
            complete: function () {
                setFinish(true)
            }
        });
    }

    return (
        <>
            <Text className='review-title'>是否完成本次{Number(type) === 0 ? '换宿' : '活动'}？</Text>
            <View className='review-buttons'>
                <View 
                className={`review-button ${complete === 'yes' ? 'active' : ''}`}
                onClick={() => handleReviewComplete('yes')}
                >
                是
                </View>
                <View 
                className={`review-button ${complete === 'no' ? 'active' : ''}`}
                onClick={() => handleReviewComplete('no')}
                >
                否
                </View>
            </View>
            
            {role === 'host' && <Text className='review-title'>是否推荐本次Guest？</Text>}
            {role === 'guest' && <Text className='review-title'>是否推荐本次Host？</Text>}

            <View className='review-buttons'>
                <View 
                className={`review-button ${recommend === 'yes' ? 'active' : ''}`}
                onClick={() => handleRecommend('yes')}
                >
                推荐
                </View>
            </View>
            <Text className='review-title'>详细评价此次体验</Text>
            <View className='review-section'>
                <Textarea
                    className='review-text'
                    placeholder='请详细描述您的体验，帮助更多朋友了解~'
                    value={content}
                    onInput={e => setContent(e.detail.value.slice(0, MAX_CONTENT_LENGTH))}
                    maxlength={MAX_CONTENT_LENGTH}
                    autoHeight
                    showConfirmBar={false}
                />
                <View className='review-image'>
                    {images.map((image, index) => (
                        <View key={index} className='image-item'>
                        <Image 
                            src={image} 
                            className='uploaded-image' 
                            mode='aspectFill'
                        >
                        <View 
                            className='remove-icon'
                            onClick={() => handleRemoveImage(index)}
                        >
                            ×
                        </View>
                        </Image>
                        </View>
                    ))}
                    {images.length < MAX_IMAGES && (
                        <View className='upload-button' onClick={handleAddImage}>+
                        </View>
                    )}
                </View>
            </View>

            {role === 'host' && <View className='purple-fill-button' onClick={handleSubmit}>
            发布评价
            </View>}
            {role === 'guest' && <View className='yellow-fill-button' onClick={handleSubmit}>
            发布评价
            </View>}
        </>
    )
}

export default observer(Index)