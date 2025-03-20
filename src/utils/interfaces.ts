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

export interface UserShortInfo {
    uid: number;
    avatar: string;
    role: string;
    username: string;
    tags: Array<string>;
    buttonText: string;
    buttonFunc: () => void;
}

export interface OrderDetail {
    type: number
    orderStatus: string;
    orderId: number;
    houseName: string;
    houseId: string;
    price: number;
    days: number;
    time: string;
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
}