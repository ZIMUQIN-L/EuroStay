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
    const hostId = router?.params?.hostId;

    const experienceId = router?.params?.experienceId;

    const [complete, setComplete] = useState('') // useState<'yes' | 'no'>('yes')
    const [recommend, setRecommend] = useState('') // useState<'yes' | 'no'>('no')

    const handleReviewComplete = (c: 'yes' | 'no') => {
        setComplete(c)
    }

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
          count: MAX_IMAGES - images.length,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: async (res) => {
            try {
              const uploadPromises = res.tempFilePaths.map(filePath => 
                new Promise<string>((resolve, reject) => {
                  const uploadTask = Taro.uploadFile({
                    url: 'https://api.eurostay.co/app/common/upload',
                    filePath: filePath,
                    name: 'Image',
                    formData: {
                      prefix: 'test',
                    },
                    header: {
                      token: GlobalStore.userInfo.token,
                    },
                    success: (response) => {
                      if (response.statusCode === 200) {
                        const responseData = JSON.parse(response.data);
                        const imageUrl = responseData['result'];
                        resolve(imageUrl);
                      } else {
                        reject(new Error('Upload failed'));
                      }
                    },
                    fail: reject
                  });
                })
              );

              const uploadedUrls = await Promise.all(uploadPromises);
              setImages([...images, ...uploadedUrls]);
            } catch (error) {
              console.error('Upload failed:', error);
              Taro.showToast({
                title: '图片上传失败',
                icon: 'none'
              });
            }
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
            url: 'https://api.eurostay.co/app/property/postRawPropertyReview',
            method: 'POST',
            header: {
                token: GlobalStore.userInfo.token,
            },
            data: {
                experienceId: Number(experienceId),
                applicationId: 0,
                targetUid: Number(hostId),
                done: complete === 'yes' ? true : false,
                recommend: recommend === 'yes' ? true : false,
                content: content,
                images: images,
            },
            success: function (res) {
                if (res.statusCode === 200 && res.data.code === 0) {
                    Taro.showToast({
                        title: '你已成功评价！',
                        icon: 'none',
                        duration: 2000,
                    })
                    setTimeout(() => {
                        Taro.navigateBack();
                        }, 2000);
                } else {
                    Taro.showToast({
                        title: res.data.msg + ' 评价失败，请稍后再试',
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
        });
    }

    return (
        <>
            <Text className='review-title'>是否完成本次换宿？</Text>
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
            
            <Text className='review-title'>是否推荐本次Host？</Text>

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

            <View className='yellow-fill-button' onClick={handleSubmit}>
            发布评价
            </View>
        </>
    )
}

export default observer(Index)