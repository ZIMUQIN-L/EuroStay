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

export interface HouseItemProps {
  _id: string; // 微信自动生成的_id，无法修改其名称
  _openid: string;
  capacity: number;
  description: string;
  end_date: string; // 后期最好优化成日期格式
  start_date: string; // 当前数据库名称是start_date和end_date, 或许可以先保持？
  houseType: string;
  images: string[];
  location: string;
  ownerTarget: string;
  contact: string;
  xhsContact: string;
}

/**
 * 用户信息接口
 */
export interface UserItemProps {
  _id: string;
  _openid: string;
  avatarUrl: string;
  nickName: string;
  userDes: string;
  userOpenid: string;
  userLocation: string;
  token: string;
  uid: string;
}

// 房源详情信息接口
export interface HouseDetailItemProps {
  accommodationType: number;
  agreement: string;
  availableDate: string[];
  capacity: number;
  coinPerNight: number;
  description: string;
  desirableSeeker: string;
  genderRequirement: number;
  hostQuestion: string;
  location: string;
  media: string[];
  oneSentence: string;
  pid: number;
  precautious: string;
  propertyInterests: string[];
  propertyTags: string[];
  propertyType: number;
  recommendedTimes: number;
  title: string;
  uid: number;
  undesirableSeeker: string;
}

// 用户求宿数据接口
// both for message board and for accommodation page
export interface UserAccomMessageItemProps {
  // 必需参数
  _id: string; // 微信自动生成的_id，无法修改其名称
  _openid: string;
  end_date: string;
  start_date: string;
  capacity: number;
  gender: string;
  location: string;
  sourceUserOpenid: string;
  sourceUserNickName: string;
  sourceUserAvatarUrl: string;
  description: string;
  // 消息类型: withTargetHouse, withoutTargetHouse, both
  type: string;
  // 状态: unread, read, contactReceived, rejected, booked, checkedIn, ownerRated, guestRated, bothRated
  status: string;

  // optional params
  contact: string;
  answerToOwner: string;
  houseId: string;
  images?: string[];
  targetUserNickName: string;
  //   targetUserAvatarUrl: string;
  targetUserOpenid: string;
  targetUserAvatarUrl: string;
}

// 房主回复消息数据接口
// both for replying message board and for accommodation page
export interface HouseOwnerReplyMessageItemProps {
  // 必需参数
  _id: string; // 微信自动生成的_id，无法修改其名称
  _openid: string;
  sourceUserOpenid: string;
  sourceUserNickName: string;
  sourceUserAvatarUrl: string;
  contact: string;
  helloMessage: string;
  accomMessageId: string;
}

//活动详情页
export interface ActivityDetailProps {
  active: boolean;
  address: string;
  applyFormId: string;
  applyStatus: number;
  capacity: number;
  city: string;
  contact: string;
  createdAt: string;
  description: string;
  endTime: string;
  helloMessage: string;
  id: number;
  images: string[];
  official: boolean;
  point: number;
  price: number;
  startTime: string;
  tags: string[];
  title: string;
  uid: number;
  updatedAt: string;
  userShortInfoResponse: {
    avatar: string;
    cover: string;
    gender: number;
    tags: string[];
  };
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
