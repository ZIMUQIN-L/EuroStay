import { View, WebView } from '@tarojs/components';
import Taro from '@tarojs/taro';

const WebviewPage = () => {
  // 获取路由参数并解码
  const { url } = Taro.getCurrentInstance().router?.params || {};
  const decodedUrl = decodeURIComponent(url || 'https://www.eurostay.co');

  return (
    <View style={{ height: '100vh', width: '100vw' }}>
      {/* 使用 WebView 组件加载 H5 */}
      <WebView src={decodedUrl} />
    </View>
  );
};

export default WebviewPage;