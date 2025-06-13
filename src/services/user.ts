// This file exports interfaces and re-exports API functions from apiService
// It is kept for backward compatibility

import { API } from '@utils/apiService';
import { 
  APIUserShortInfo as UserShortInfo, 
  PostedItem, 
  ReviewItem, 
  PropertyItem, 
  TravelItem,
  PaginatedResponse,
  ReviewerInfo
} from '@utils/interfaces';

// Re-export interfaces
export { 
  UserShortInfo, 
  PostedItem, 
  ReviewItem, 
  PropertyItem, 
  TravelItem 
};

// Response interfaces for backward compatibility
export interface UserShortInfoResponse {
  code: number;
  msg: string;
  result: UserShortInfo;
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

export { ReviewerInfo };

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

export interface PropertyListResult {
  last_page: number;
  per_page: number;
  total: number;
  current_page: number;
  data: PropertyItem[];
}

export interface PropertyListResponse {
  code: number;
  msg: string;
  result: PropertyListResult;
}

export interface TravelListResult {
  last_page: number;
  per_page: number;
  total: number;
  current_page: number;
  data: TravelItem[];
}

export interface TravelListResponse {
  code: number;
  msg: string;
  result: TravelListResult;
}

// Re-export API functions using the same function names for backward compatibility
export const getCurrentUserInfo = API.user.getCurrentUserInfo;
export const getUserShortInfo = API.user.getUserShortInfo;
export const getUserReviewList = API.user.getUserReviewList;
export const getUserPropertyList = API.user.getUserPropertyList;
export const getUserTravelList = API.user.getUserTravelList; 