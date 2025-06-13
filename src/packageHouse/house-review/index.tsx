import { View, Input, Textarea, Text, Image, Button } from '@tarojs/components'
import { observer } from 'mobx-react';
import { useState, useRef } from 'react'
import { useRouter } from '@tarojs/taro';
import Taro from '@tarojs/taro'
import './index.scss'
import GlobalStore from '@store/GlobalStore';
import { API } from '@utils/apiService';

const Index: React.FC = () => {
    const [images, setImages] = useState<string[]>([])
    const [content, setContent] = useState('')
    const MAX_IMAGES = 3
    const MAX_CONTENT_LENGTH = 500
    const [isSubmitting, setIsSubmitting] = useState(false)
    const submitTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const router = useRouter();
    const hostId = router?.params?.hostId;

    const experienceId = router?.params?.experienceId;

    const [complete, setComplete] = useState('') // useState<'yes' | 'no'>('yes')
    const [recommend, setRecommend] = useState('') // useState<'yes' | 'no'>('no')
    const [anonymous, setAnonymous] = useState('no')

    const handleReviewComplete = (c: 'yes' | 'no') => {
        setComplete(c)
    }

    const handleRecommend = (r: 'yes' | 'no') => {
        setRecommend(r === recommend ? '' : r)
    }

    const handleAnonymous = (a: 'yes' | 'no') => {
        setAnonymous(a)
    }

    const handleAddImage = async () => {
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
                API.common.upload(filePath, { prefix: 'test' })
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

    const validateForm = (): boolean => {
        // Validate pid (experienceId)
        if (!experienceId) {
            Taro.showToast({
                title: '缺少房源ID',
                icon: 'none',
                duration: 2000,
            });
            return false;
        }
        
        // Validate done (complete)
        if (complete !== 'yes' && complete !== 'no') {
            Taro.showToast({
                title: '请选择是否完成本次换宿',
                icon: 'none',
                duration: 2000,
            });
            return false;
        }
        
        // Validate content
        if (!content.trim()) {
            Taro.showToast({
                title: '请填写评价内容',
                icon: 'none',
                duration: 2000,
            });
            return false;
        }
        
        // Validate anonymous
        if (anonymous !== 'yes' && anonymous !== 'no') {
            Taro.showToast({
                title: '请选择是否匿名评价',
                icon: 'none',
                duration: 2000,
            });
            return false;
        }
        
        return true;
    }

    const handleSubmit = async () => {
        // Prevent multiple submissions
        if (isSubmitting) return;
        
        // Validate form fields
        if (!validateForm()) return;
        
        // Clear any existing timeout
        if (submitTimeoutRef.current) {
            clearTimeout(submitTimeoutRef.current);
            submitTimeoutRef.current = null;
        }
        
        setIsSubmitting(true);
        
        try {            
            const result = await API.property.postPropertyReview({
                pid: Number(experienceId),
                done: complete === 'yes',
                recommend: recommend === 'yes' ? true : null,
                content: content,
                images: images,
                anonymous: anonymous === 'yes'
            });
            
            Taro.showToast({
                title: '你已成功评价！',
                icon: 'none',
                duration: 2000,
            });
            
            // Use setTimeout for navigation and reset isSubmitting after navigation
            submitTimeoutRef.current = setTimeout(() => {
                Taro.navigateBack();
                setIsSubmitting(false);
            }, 2000);
        } catch (error) {
            console.error('Review submission failed:', error);
            setIsSubmitting(false);
        }
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

            <Text className='review-title'>是否匿名评价？</Text>
            <View className='review-buttons anonymous-section'>
                <View 
                className={`review-button ${anonymous === 'yes' ? 'active' : ''}`}
                onClick={() => handleAnonymous('yes')}
                >
                是
                </View>
                <View 
                className={`review-button ${anonymous === 'no' ? 'active' : ''}`}
                onClick={() => handleAnonymous('no')}
                >
                否
                </View>
            </View>

            <View 
                className={`yellow-fill-button ${isSubmitting ? 'disabled' : ''}`} 
                onClick={handleSubmit}
            >
                {isSubmitting ? '提交中...' : '发布评价'}
            </View>
        </>
    )
}

export default observer(Index)