import { interceptor } from "@tarojs/taro/types";

export interface ESUserLoginInfoProps {
    uid: number;
    avatar: string;
    aboutMe: string;
    username: string;
    isVip: Boolean;
    gender: number;
    location: string;
    token: string;
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
  location: string;
  price: number;
  startTime: string;
  tags: string[];
  title: string;
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
}

export interface ApplicantDetail {
    type: number,
    title: string;
    name: string;
    id: number;
    gener: string;
    identity: string;
    selfIntroduction: string;
    numberOfGuests: number;
    reason: string;
}

export interface HostDetail {
    avatar: string;
    role: string;
    username: string;
    detail: string;
    tags: Array<string>;
    buttonText: string;
    buttonFunc: () => void;
}

export interface OrderInfo {
    type: number;
    id: number;
    experienceId: number;
    status: number;
    update_time: string;
    title: string;
    price: number;
    date: string;
    location: string;
    image: string;
}

export interface Order {
    title: string;
    tags: Array<string>;
    description: string;
    price: number;
    location: string;
    images: Array<string>;
    pid: number;
    uid: number;
    whyHost: string;
    availableDate: Array<string>;
    startTime: string;
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