import GlobalStore from '@store/GlobalStore';
import Taro from '@tarojs/taro';

interface RequestOptions {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
}

const BASE_URL = 'https://api.eurostay.co';

async function request<T>(options: RequestOptions): Promise<T> {
  const token = GlobalStore.userInfo.token;
  console.log('🔍 Request Token:', token);
  console.log('🔍 Request URL:', `${BASE_URL}${options.url}`);
  console.log('🔍 Request Data:', options.data);
  
  try {
    const response = await Taro.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method,
      data: options.data,
      header: {
        'Content-Type': 'application/json',
        ...(token ? { token } : {}),
      },
    });

    console.log('Response:', {
      statusCode: response.statusCode,
      data: response.data,
    });

    if (response.statusCode === 401) {
      console.warn('⚠️ Unauthorized: Token may be invalid');
      // token 失效，跳转到登录页
      Taro.navigateTo({ url: '/pages/login/index' });
      throw new Error('Unauthorized');
    }

    if (response.statusCode !== 200) {
      console.error('HTTP Error:', response.statusCode);
      throw new Error(`HTTP error! status: ${response.statusCode}`);
    }

    return response.data;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}

export default request; 