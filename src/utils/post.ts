import GlobalStore from '@store/GlobalStore';
import Taro from '@tarojs/taro';

export const POST = async (url, body) => {
  console.log('token', GlobalStore.userInfo.token);
  Taro.request({
    url: 'https://prod.eurostay.co' + url,
    method: 'POST',
    data: {
      ...body,
    },
    header: {
      'Content-Type': 'application/json',
      token: GlobalStore.userInfo.token,
    },
  })
    .then(res => {
      console.log('Response:', res);
      return res.data;
    })
    .catch(err => {
      console.error('Request failed');
      return 1;
    });
};
