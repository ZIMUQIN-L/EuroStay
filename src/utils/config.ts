import Taro from '@tarojs/taro';

// Environment configuration
export const ENV = {
  DEV: 'develop',
  TEST: 'trial',
  PROD: 'release'
};

// 获取当前小程序环境版本
export const env = Taro.getAccountInfoSync().miniProgram?.envVersion;

// 获取当前环境
// 小程序环境：develop（开发版）、trial（体验版）、release（正式版）
// process.env.NODE_ENV 判断开发/生产环境
const getCurrentEnv = (): string => {
  if (env === 'develop') {
    return ENV.DEV;
  } else if (env === 'trial') {
    return ENV.TEST;
  } else if (env === 'release') {
    return ENV.PROD;
  }
  
  // 非小程序环境根据 NODE_ENV 判断
  if (process.env.NODE_ENV === 'development') {
    return ENV.DEV;
  }
  
  // 默认使用生产环境
  return ENV.PROD;
};

// 获取当前使用的环境
export const CURRENT_ENV = getCurrentEnv();

// API base URLs
const API_URLS = {
  [ENV.DEV]: 'https://test.eurostay.co/',
  [ENV.TEST]: 'https://test.eurostay.co/',
  [ENV.PROD]: 'https://api.eurostay.co/'
};

// WebSocket base URLs
const WS_URLS = {
  [ENV.DEV]: 'wss://test.eurostay.co/app/essocket/',
  [ENV.TEST]: 'wss://test.eurostay.co/app/essocket/',
  [ENV.PROD]: 'wss://api.eurostay.co/app/essocket/'
};

// Export the current API URL based on environment
export const API_BASE_URL = API_URLS[CURRENT_ENV];
export const WS_BASE_URL = WS_URLS[CURRENT_ENV];

// Helper function to get full API URL
export const getApiUrl = (path: string): string => {
  return `${API_BASE_URL}${path}`;
};

// Helper function to get full WebSocket URL
export const getWsUrl = (token: string): string => {
  return `${WS_BASE_URL}${token}`;
};

// 输出当前环境信息，方便调试
console.log('MiniProgram Environment:', env);
console.log('Current Environment:', CURRENT_ENV);
console.log('API Base URL:', API_BASE_URL); 