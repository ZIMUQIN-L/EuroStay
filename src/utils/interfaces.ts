import { interceptor } from "@tarojs/taro/types";

/**
 * API response types
 */
export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiResponse<T> {
  code: number;
  msg: string;
  result: T;
}

/**
 * Request options for API calls
 */
export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  showError?: boolean;
  useToken?: boolean;
}

/**
 * User interfaces
 */
export interface APIUserShortInfo {
  uid: number;
  username: string;
  avatar: string;
  backgroundPic: string;
  tags: string[] | null;
  location: string | null;
  aboutMe: string | null;
  isVip: boolean;
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
  fromHost: boolean;
  reviewerInfo: ReviewerInfo;
  images: string[];
  anonymous?: boolean;
}

export interface PropertyItem {
  id: number;
  country: string;
  city: string;
  images: string[];
  price: number;
  flexiblePrice: boolean;
  startDate: string;
  endDate: string;
  title: string;
  capacity: number;
  status: number;
  isCollected: boolean;
}

export interface TravelItem {
  id: number;
  title: string;
  country: string;
  city: string;
  tags: string[];
  startDate: string;
  endDate: string;
  maleNumber: number;
  femaleNumber: number;
  skill: string[];
  images: string[];
  isCollected: boolean;
}

/**
 * Location data interface for country and city information
 */
export interface LocationData {
  id: number;
  name: string;
  cname: string;
  pinyin: string;
}

/**
 * Combined location data interface for both country and city
 */
export interface CombinedLocationData {
  countryId: number | null;
  cityId: number | null;
  displayName: string; 
  countryName: string;
  cityName: string;
}

/**
 * Travel data interface for traveler's journey
 */
export interface TravelData {
  id: number;
  title: string;
  country: string;
  countryId: number;
  city: string;
  cityId: number;
  startDate: string;
  endDate: string;
  femaleNumber: number;
  maleNumber: number;
  skill: string[];
  images: string[];
}

export interface ESUserLoginInfoProps {
    uid: number;
    avatar: string;
    aboutMe: string;
    username: string;
    isVip: Boolean;
    gender: number;
    location: string;
    token: string;
    backgroundPic: string;
}

export interface UserShortInfo {
    uid: number;
    avatar: string;
    role: string;
    username: string;
    tags: Array<string>;
    buttonText: string;
    buttonFunc: () => void;
}

/**
 * 房源信息接口
 */

export interface homeUserProps {
  aboutMe: string;
  avatar: string;
  backgroundPic: string;
  gender: number;
  isVip: boolean;
  location: string;
  tags: string[];
  uid: number;
  username: string;
}

export interface homeActivityProps {
  id: number;
  images: string[];
  location: string;
  price: number;
  startTime: string;
  tags: string[];
  title: string;
}

export interface homePropertyProps {
  id: number;
  images: string[];
  price: number;
  title: string;
  capacity: number;
  flexiblePrice: boolean;
  receptionTime: string[];
}

export interface ApplicantDetail {
    type: number,
    title: string;
    name: string;
    id: number;
    gender: string;
    identity: string;
    selfIntroduction: string;
    femaleNumber: number;
    maleNumber: number;
    reason: string;
    skill: string;
}

export interface HostDetail {
    uid: number;
    avatar: string;
    role: string;
    username: string;
    detail: string;
    tags: Array<string>;
    buttonText: string;
    buttonFunc: () => void;
}

export interface OrderInfo {
    id: number;
    pid: number;
    type: number;
    status: number;
    hasReview: boolean;
    title: string;
    country: string;
    city: string;
    startDate: string;
    endDate: string;
    price: number;
    capacity: number;
    maleNumber: number;
    femaleNumber: number;
    images: string[];
    create_time: string;
    update_time: string;
}

export interface Order {
    title: string;
    tags: Array<string>;
    description: string;
    price: number;
    address: string;
    images: Array<string>;
    pid: number;
    uid: number;
    availableDate: Array<string>;
    startTime: string;
    country?: string;
    countryId?: number;
    city?: string;
    cityId?: number;
    capacity?: number;
    flexiblePrice?: boolean;
}

export interface ReviewCardProps {
  userAvatar: string;
  userName: string;
  userType: string;
  isRecommended: boolean;
  reviewContent: string;
  images?: string[];
  reviewDate: string;
  location: string;
}

export interface OrderDetail {
    type: number;
    orderStatus: string;
    orderId: number;
    houseName: string;
    houseId: number;
    price: number;
    time: string;
    refuseReason: string;
    orderTime: string;
}

export interface SessionItem {
    esSession: {
        id: number;
        initUid: number;
        replyUid: number;
        initRead: boolean;
        replyRead: boolean;
        initStranger: boolean;
        replyStranger: boolean;
        initAvatar?: string;
        replyAvatar?: string;
        stype: number;
        topMessage: string;
        updateTime: string;
    };
    initName: string;
    initAvatar: string;
    replyName: string;
    replyAvatar: string;
}

export interface MessageItem {
    id: number;
    sessionId: number;
    fromUid: number;
    toUid: number;
    hostUid: number;
    isProperty: boolean;
    active: boolean;
    subjectId: number;
    content: string;
    createTime: string;
    mtype: number;
}

export interface CollectionItem {
  city: string;
  cityId: number;
  country: string;
  countryId: number;
  endDate: Date;
  femaleNumber: number;
  id: number;
  images: string[];
  maleNumber: number;
  price: number;
  startDate: Date;
  title: string;
  type: number;
  location?: string;
}