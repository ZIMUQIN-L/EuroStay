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
