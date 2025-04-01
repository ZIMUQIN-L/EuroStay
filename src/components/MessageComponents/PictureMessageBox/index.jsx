import { View, Image } from '@tarojs/components'
import './index.scss'
import GlobalStore from '@store/GlobalStore'
import Taro from '@tarojs/taro'

const PictureMessageBox = (props) => {
  const { avatar, time, direction = 'left', content } = props;

  const handlePreview = () => {

    if (!content || typeof content !== 'string') {
      console.warn('图片地址无效，无法预览：', content);
      return;
    }

    Taro.previewImage({
      current: content,
      urls: [content],
    })
  }

  return (
    <View className={`message-box ${direction}`}>
      {/* 头像 */}
      <Image
        className='avatar'
        src={direction === 'left' ? avatar : GlobalStore.userInfo.avatar}
      />

      {/* 气泡内容 */}
      <View className='bubble'>
        <Image
          className='message-img'
          src={content}
          mode='aspectFit'
          onClick={handlePreview}
        />
      </View>
    </View>
  )
}

export default PictureMessageBox
