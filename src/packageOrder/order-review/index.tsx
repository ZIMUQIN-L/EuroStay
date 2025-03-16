import { View, Input, Textarea, Text, Image } from '@tarojs/components'
import { observer } from 'mobx-react';
import { useState } from 'react'
import { useRouter } from '@tarojs/taro';
import Taro from '@tarojs/taro'
import './index.scss'

const Index: React.FC = () => {
    const [images, setImages] = useState<string[]>([])
    const [content, setContent] = useState('')
    const MAX_IMAGES = 3
    const MAX_CONTENT_LENGTH = 500

    const router = useRouter();
    const role = router?.params?.role;

    const [complete, setComplete] = useState<'yes' | 'no'>('yes')

    const handleReviewComplete = (complete: 'yes' | 'no') => {
        setComplete(complete)
    }

    const [recommend, setRecommend] = useState<'yes' | 'no'>('no')

    const handleRecommend = (recommend: 'yes' | 'no') => {
        setRecommend(recommend)
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
        // 这里添加表单验证和提交逻辑
        Taro.showToast({
        title: '你已成功评价！正在等待审核，审核通过后，待对方也完成评价或7天后评价内容将会显示。',
        icon: 'success'
        })
        Taro.navigateBack()
    }

    return (
        <>
            <Text className='review-title'>是否完成本次换宿？</Text>
            <View className='review-options'>
                <View 
                className={`review-option ${complete === 'yes' ? 'active' : ''}`}
                onClick={() => handleReviewComplete('yes')}
                >
                是
                </View>
                <View 
                className={`review-option ${complete === 'no' ? 'active' : ''}`}
                onClick={() => handleReviewComplete('no')}
                >
                否
                </View>
            </View>
            
            {role === 'host' && <Text className='review-title'>是否推荐本次换宿房客？</Text>}
            {role === 'guest' && <Text className='review-title'>是否推荐本次换宿房源？</Text>}

            <View className='review-options'>
                <View 
                className={`review-option ${recommend === 'yes' ? 'active' : ''}`}
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