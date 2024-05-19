/**
 * 房源信息接口
 */
export interface HouseItemProps {
  _id: string; // 微信自动生成的_id，无法修改其名称
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
  description: string;
  // 消息类型: withTargetHouse, withoutTargetHouse, both
  type: string;
  // 状态: unread, read, contactReceived, rejected, booked, checkedIn, rated
  status: string;

  // optional params
  contact: string;
  answerToOwner: string;
  houseId: string;
  images: string[];
  targetUserNickName: string;
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
