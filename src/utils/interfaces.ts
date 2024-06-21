/**
 * 房源信息接口
 */
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
 * 求宿信息接口
 */
export interface SeekingItemProps {
  _id: string;
  _openid: string;
  user: string; // 用户的名称
  avatar: string; // 用户头像的url
  title: string;
  gender: string;
  destination: string;
  start_date: string;
  end_date: string;
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
}

// 房源详情信息接口
export interface HouseDetailItemProps {
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
  houseSetting: { [key: string]: any };
  houseSurrounding: { [key: string]: any };
  preference: { [key: string]: any };
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
  //   sourceUserAvatarUrl: string;
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

// contact info structure
export interface ContactInfo {
  phone?: string;
  email?: string;
  wechat?: string;
}

/**
 * 消息卡片--房源接口
 */
export interface AccomMssageHouseItemProps {
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

export interface UserRatingInfoItemProps {
  _id: string; // 微信自动生成的_id，无法修改其名称
  _openid: string;
  accomInfoId: string; // 用户发出的求宿信息id
  sourceUserOpenid: string; // 发送评价的用户
  sourceUserNickname: string; //发送评价用户的nickname
  sourceUserAvatarUrl: string; //发送评价用户的avatarUrl
  targetUserOpenid: string; // 接收评价的用户
  targetUserNickname: string; //接收评价用户的nickname
  targetUserAvatarUrl: string; //接收评价用户的avatarUrl
  houseId: string; // 房源的id

  // evaluation info
  // tohost
  //     "desMatch": //number,
  //     "locationEval": //number,
  //     "cleanEval": //number,
  //     "serviceEval": //number
  //     "pricePerformance": //number
  // toseeker
  //     "rating": //number
  evaluation: { [key: string]: any };
  comment: string; // 评价信息
  type: string; // 评价类别 tohost, toseeker
  toPublic: boolean; //是否公开展示
}
