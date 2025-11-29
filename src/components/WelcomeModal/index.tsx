import { View, Text, Image, WebView } from '@tarojs/components';
import './index.scss';
import Taro, {
  } from '@tarojs/taro';
import { LoginLoadingIcon, loginIp, logoIp } from '@utils/cloudIcons';


interface WelcomeModalProps {
  visible: boolean;
  onClose: () => void;
  onDownload: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ visible, onClose, onDownload }) => {
  if (!visible) return null;

  // 检测当前环境并跳转相应链接
  const handleDownloadApp = () => {
    // 检测当前环境
    // const systemInfo = Taro.getSystemInfoSync();
    // const platform = systemInfo.platform;
    
    // let downloadUrl = 'https://eurostay.co';
    
    // Taro.setClipboardData({
    // data: downloadUrl,
    // success: () => {
    //     Taro.showModal({
    //     title: '链接已复制',
    //     content: `已复制${platform === 'ios' ? 'App Store' : '官网'}链接到剪贴板，请手动打开`,
    //     showCancel: false
    //     });
    // }
    // });

    const targetUrl = 'https://www.eurostay.co';
    
    // 对 URL 进行编码，防止参数丢失
    const encodedUrl = encodeURIComponent(targetUrl);
    
    // 跳转到 WebView 页面，并传递 URL 参数
    Taro.navigateTo({
      url: `/pages/webview/index?url=${encodedUrl}`
    });
    // 关闭弹窗
    onClose();
  };

  return (
    <View className="welcome-modal-overlay">
      <View className="welcome-modal">
        {/* 标题区域 - 有白边包裹，部分重叠在弹窗上 */}
        <View className="modal-title-section">
          <Text className="modal-title">下载APP</Text>
        </View>
        
        {/* 副标题 - 黄字紫边包裹，在框内 */}
        <View className="modal-subtitle-section">
          <Text className="modal-subtitle">体验全部功能</Text>
        </View>
        
        {/* 右上角图片区域 - 直接显示图片，不需要包裹 */}
        <View className="modal-top-image">
            <Image src={loginIp}/>
        </View>
        
        {/* 下载按钮 */}
        <View className="modal-button" onClick={handleDownloadApp}>
          点击下载APP
        </View>
        
        {/* 底部邀请码信息 */}
        <View className="modal-footer">
          <View className="modal-offer">
            <Text className="offer-text">填写邀请码00000000006赠送</Text>
            <Text className="offer-text">一个月会员哦~</Text>
          </View>
        </View>
        
        {/* 关闭按钮 */}
        <View className="modal-close" onClick={onClose}>
          ✕
        </View>
      </View>
    </View>
  );
};

export default WelcomeModal;
