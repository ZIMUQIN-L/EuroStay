import request from '../utils/request';
import GlobalStore from '@store/GlobalStore'

export interface UserShortInfo {
  uid: number;
  username: string;
  avatar: string;
  backgroundPic: string;
  tags: string[] | null;
  location: string | null;
  aboutMe: string | null;
  isVip: boolean;
}

export interface UserShortInfoResponse {
  code: number;
  msg: string;
  result: UserShortInfo;
}

export interface PostedItem {
  type: number;
  id: number;
  title: string;
  images: string[];
  tags: string[];
  location: string;
  price: number;
  startDate: string;
  startTime: string;
}

export interface PostedListResult {
  last_page: number;
  per_page: number;
  total: number;
  current_page: number;
  data: PostedItem[];
}

export interface PostedListResponse {
  code: number;
  msg: string;
  result: PostedListResult;
}

// 由于参与列表的数据结构与发布列表相同，我们可以复用 PostedItem 接口
export interface ParticipatedListResult {
  last_page: number;
  per_page: number;
  total: number;
  current_page: number;
  data: PostedItem[];
}

export interface ParticipatedListResponse {
  code: number;
  msg: string;
  result: ParticipatedListResult;
}

export interface ReviewerInfo {
  uid: number;
  username: string;
  avatar: string;
  backgroundPic: string;
  tags: string[];
  location: string;
  aboutMe: string;
  isVip: boolean;
}

export interface ReviewItem {
  id: number;
  type: number;
  experience_id: number;
  done: boolean;
  content: string;
  recommend: boolean;
  create_time: string;
  from_host: boolean;
  reviewer_info: ReviewerInfo;
  images: string[];
}

export interface ReviewListResult {
  last_page: number;
  per_page: number;
  total: number;
  current_page: number;
  data: ReviewItem[];
}

export interface ReviewListResponse {
  code: number;
  msg: string;
  result: ReviewListResult;
}

// 获取当前登录用户的信息（通过 token 识别用户）
export async function getCurrentUserInfo() {
  return request<UserShortInfoResponse>({
    url: '/app/esuser/getUserShortInfo',
    method: 'POST',
    data: { id: GlobalStore.userInfo.uid },
  });
}

// 获取指定用户的信息
export async function getUserShortInfo(id: number) {
  return request<UserShortInfoResponse>({
    url: '/app/esuser/getUserShortInfo',
    method: 'POST',
    data: { id },
  });
}

// 获取用户发布的列表
export async function getUserPostedList(uid: number, page: number) {
  return request<PostedListResponse>({
    url: '/app/esuser/getUserPostedList',
    method: 'POST',
    data: { uid, page },
  });
}

// 获取用户参与的列表
export async function getUserParticipatedList(uid: number, page: number) {
  return request<ParticipatedListResponse>({
    url: '/app/esuser/getUserParticipatedList',
    method: 'POST',
    data: { uid, page },
  });
}

// 获取用户收到的评价列表
export async function getUserReviewList(uid: number, page: number) {
  return request<ReviewListResponse>({
    url: '/app/esuser/getUserReviewList',
    method: 'POST',
    data: { uid, page },
  });
} 