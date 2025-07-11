import Taro from '@tarojs/taro';
import { getApiUrl } from './config';
import GlobalStore from '@store/GlobalStore';
import { 
  LocationData, 
  HostDetail, 
  Order, 
  ReviewCardProps,
  PaginatedResponse,
  ApiResponse,
  RequestOptions,
  APIUserShortInfo as UserShortInfo,
  PostedItem,
  ReviewerInfo,
  ReviewItem,
  PropertyItem,
  TravelItem,
  OrderInfo,
  SessionItem,
  MessageItem,
  CollectionItem
} from './interfaces';

/**
 * Generic API request function
 * @param path API endpoint path
 * @param options Request options
 * @returns Promise with response data
 */
export const apiRequest = async <T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { 
    method = 'POST', 
    data = {}, 
    showError = true, 
    useToken = true,
  } = options;
  
  try {
      console.log(getApiUrl(path));
    const response = await Taro.request({
      url: getApiUrl(path),
      method,
      header: {
        token: useToken ? (GlobalStore.userInfo?.token || '') : '',
      },
      data,
    });
    
    if (response.statusCode !== 200 || response.data.code !== 0) {
      const errorMsg = response.data.msg || '请求失败';
      if (showError) {
        Taro.showToast({
          title: errorMsg,
          icon: 'none',
          duration: 2000,
        });
      }
      throw new Error(errorMsg);
    }
    console.log('Response Data:', response);
    return response.data.result ? response.data.result : response.data.data;
  } catch (error) {
    if (showError) {
      Taro.showToast({
        title: error.message || '网络请求失败，请重试',
        icon: 'none',
        duration: 2000,
      });
    }
    throw error;
  }
};

/**
 * API endpoints for different modules
 */
export const API = {
  user: {
    getUserList: (data = {}) => 
      apiRequest<PaginatedResponse<{
        user: any;
        property: any;
      }>>('app/esuser/getTravellerList', { data }),
    loginCheck: (code: string) =>
      apiRequest<{exist: boolean, userInfo: any, token: string}>(`app/esuser/loginCheck?code=${code}`, { 
        useToken: false 
      }),
    bindWxPhone: (data: {encryptedData: string, iv: string, sessionKey: string, code: string}) =>
      apiRequest<{userInfo: any, token: string}>('app/esuser/bindWxPhone', { data }),
    wxLogin: (code: string) =>
      apiRequest<{userInfo: any, token: string}>(`app/esuser/wxLogin?code=${code}`, { 
        useToken: false 
      }),
    tokenCheck: async () => {
      // Don't use apiRequest here since we need to handle token expiration in the component
      const response = await Taro.request({
        url: getApiUrl('app/esuser/tokenCheck'),
        method: 'POST',
        header: {
          token: GlobalStore.userInfo?.token || '',
        }
      });
      return response;
    },
    processInvitation: (id: string) =>
      apiRequest<any>('app/esuser/processInvitation', {
        data: { id }
      }),
    getUserCompleteInfo: () =>
      apiRequest<any>('app/esuser/getUserCompleteInfo'),
    userProfileModify: (profileData: any) =>
      apiRequest<any>('app/esuser/userProfileModify', {
        data: profileData
      }),
    sendEmailCode: (email: string) =>
      apiRequest<any>('app/esuser/sendEmailCode', {
        data: { email }
      }),
    emailVerify: (email: string, code: string) =>
      apiRequest<any>('app/esuser/emailVerify', {
        data: { email, code }
      }),
    // New API functions from user.ts
    getUserShortInfo: (id: number) =>
      apiRequest<UserShortInfo>(`app/esuser/getUserShortInfo?id=${id}`),
    getCurrentUserInfo: (uid?: number) =>
      apiRequest<UserShortInfo>(`app/esuser/getUserShortInfo?id=${uid || GlobalStore.userInfo.uid}`),
    getUserReviewList: (uid: number, page: number) =>
      apiRequest<PaginatedResponse<ReviewItem>>('app/esuser/getUserReceivedReviewList', {
        data: { uid, page, filter: 0 }
      }),
    getUserPropertyList: (uid: number, page: number) =>
      apiRequest<PaginatedResponse<PropertyItem>>('app/esuser/getUserPropertyList', {
        data: { uid, page }
      }),
    getUserTravelList: (uid: number, page: number) =>
      apiRequest<PaginatedResponse<TravelItem>>('app/esuser/getUserTravelList', {
        data: { uid, page }
      }),
    getUserCollectionList: (uid: number, page: number) =>
      apiRequest<PaginatedResponse<CollectionItem>>('app/esuser/getUserCollectionList', {
        data: { uid, page }
      }),
  },
  common: {
    upload: (filePath: string, formData = { prefix: 'test' }) => {
      return new Promise<string>((resolve, reject) => {
        Taro.uploadFile({
          url: getApiUrl('app/common/upload'),
          filePath,
          name: 'Image',
          formData,
          header: {
            token: GlobalStore.userInfo?.token || '',
          },
          success: (result) => {
            try {
              const responseData = JSON.parse(result.data);
              if (responseData.code === 0) {
                resolve(responseData.result);
              } else {
                reject(new Error(responseData.msg || '上传失败'));
              }
            } catch (error) {
              reject(error);
            }
          },
          fail: (error) => {
            reject(error);
          }
        });
      });
    },
  },
  property: {
    getPropertyList: (data = {}) => 
      apiRequest<PaginatedResponse<{
        user: any;
        property: any;
      }>>('app/property/getPropertyList', { data }),
    getPropertyDetail: (id: number) => 
      apiRequest<any>(`app/property/getPropertyDetail?pid=${id}`),
    addPropertyCollection: (id: number) => 
      apiRequest<any>(`app/property/addPropertyCollection?pid=${id}`),
    cancelPropertyCollection: (id: number) => 
      apiRequest<any>(`app/property/cancelPropertyCollection?pid=${id}`),
    showReviewList: (pid: number, page: number = 1) =>
      apiRequest<any>('app/property/showReviewList', {
        data: { pid, page }
      }),
    postPropertyReview: (data: {
      pid: number;
      done: boolean;
      recommend: boolean | null;
      content: string;
      images: string[];
      anonymous: boolean;
    }) =>
      apiRequest<any>('app/property/postPropertyReview', {
        data
      }),
    applyProperty: (data: {
      pid: number;
      maleNumber: number;
      femaleNumber: number;
      description: string;
      startDate: string;
      endDate: string;
      contact: string;
      selfIntro: string;
      skill: string;
    }) =>
      apiRequest<any>('app/property/applyProperty', {
        data
      }),
    uploadProperty: (data: {
      title: string;
      tags: string[];
      tagsJson: string;
      country: string;
      countryId: number;
      city: string;
      cityId: number;
      address: string;
      description: string;
      capacity: number;
      gender: number;
      images: string[];
      wxId: string;
      price: number;
      flexiblePrice: boolean;
      requirement: string;
      status: number;
      receptionTime: string[];
      availableDate: string[];
    }) =>
      apiRequest<any>('app/property/upload', { data }),
    modifyProperty: (data: {
      pid: number;
      title: string;
      tags: string[];
      tagsJson: string;
      country: string;
      countryId: number;
      city: string;
      cityId: number;
      address: string;
      description: string;
      capacity: number;
      gender: number;
      images: string[];
      wxId: string;
      price: number;
      flexiblePrice: boolean;
      requirement: string;
      status: number;
      receptionTime: string[];
      availableDate: string[];
    }) =>
      apiRequest<any>('app/property/modify', { data }),
  },
  messages: {
    // Get session list with pagination
    getSessionList: (pageNum: number = 1) =>
      apiRequest<PaginatedResponse<SessionItem>>(`app/esmessages/sessionList?pageNum=${pageNum}`, {
        method: 'GET',
      }),
    
    // Get chat history with another user
    getChatHistory: (requestId: number, pageNum: number = 1) =>
      apiRequest<PaginatedResponse<any>>('app/esmessages/getMessageList', {
        method: 'GET',
        data: { requestId, pageNum }
      }),
    
    // Get message list for a specific session/conversation
    getMessageList: (requestId: number, pageNum: number = 1) =>
      apiRequest<PaginatedResponse<MessageItem>>('app/esmessages/messageList', {
        method: 'GET',
        data: { requestId, pageNum }
      }),
    
    // Send like message to another user
    sendLikeMsg: (toUid: number, content: string) =>
      apiRequest<any>('app/esmessages/sendLikeMsg', {
        data: { toUid, content }
      }),
  },
  location: {
    getAvailableCountries: () =>
      apiRequest<LocationData[]>('app/eslocation/availableCountries', { 
        method: 'GET' 
      }),
    getAvailableCities: (countryId: number) =>
      apiRequest<LocationData[]>('app/eslocation/availableCities', {
        method: 'GET',
        data: { countryId }
      }),
    countryList: () =>
      apiRequest<any[]>('app/eslocation/countryList', { 
        method: 'GET' 
      }),
    cityList: (countryId: number) =>
      apiRequest<any[]>(`app/eslocation/cityList?countryId=${countryId}`, {
        method: 'GET',
      }),
  },
  vip: {
    getVipInfo: () =>
      apiRequest<{endDate: string}>('app/vip/vipInfo'),
    recharge: (month: number, price: number) =>
      apiRequest<any>('app/vip/recharge', {
        data: { month, price }
      }),
  },
  order: {
    getOrderList: (type: number, page: number = 1, status: number = 0) =>
      apiRequest<PaginatedResponse<OrderInfo>>('app/order/getOrderList', {
        data: { type, page, status }
      }),
    
    // Order detail API
    getOrderDetail: (id: number) => 
      apiRequest<any>(`app/order/getOrderDetail?id=${id}`),
    
    // Property order actions
    approveOrder: (id: number) => 
      apiRequest<any>(`app/property/approvePropertyApplication?id=${id}`),
    
    rejectOrder: (id: number, reason: string) => 
      apiRequest<any>('app/property/rejectPropertyApplication', { 
        data: { id, reason } 
      }),
    
    acceptOffer: (id: number) => 
      apiRequest<any>(`app/property/acceptOffer?id=${id}`),
    
    rejectOffer: (id: number, reason: string) => 
      apiRequest<any>('app/property/rejectOffer', { 
        data: { id, reason } 
      }),
      
    // Post order review
    postOrderReview: (data: {
      pid: number;
      orderId: number;
      done: boolean;
      recommend: boolean | null;
      content: string;
      images: string[];
      anonymous: boolean;
    }) =>
      apiRequest<any>('app/order/postOrderReview', {
        data
      }),
  }
}; 