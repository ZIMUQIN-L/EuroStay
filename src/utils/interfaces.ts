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
  rating: number; //房源当前评分
  ratingNumber: number; //房源当前评分数量
  evaluationNumbers: { [key: string]: number }; // 房源的各项评分
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
  sourceUserLocation: string; // 发送评价用户的位置
  targetUserOpenid: string; // 接收评价的用户
  targetUserNickname: string; //接收评价用户的nickname
  targetUserAvatarUrl: string; //接收评价用户的avatarUrl
  houseId: string; // 房源的id
  end_date: string; // 房源结束时间
  start_date: string; // 房源开始时间

  // evaluation info
  // tohost
  //     "desMatch": //number,
  //     "locationEval": //number,
  //     "cleanEval": //number,
  //     "serviceEval": //number
  //     "pricePerformance": //number
  // toseeker
  //     "rating": //number
  evaluation: { [key: string]: number };
  comment: string; // 评价信息
  type: string; // 评价类别 tohost, toseeker
  toPublic: boolean; //是否公开展示
}

export interface UserDetailInfoItemProps {
  _id: string; // 该条信息的id
  _openid: string; // 该条信息用户的openid
  userOpenid: string; // 该条信息用户的openid
  nickName: string; //用户名称 string
  userDes: string; //用户简介 string
  birthday: string;
  avatarUrl: string; //用户头像 string
  userLocation: string; //用户位置 string
  guestRating: number; //作为房客时的rating, default -1, float
  guestRatingNumber: number; //作为房客时的rating的数量 default 0, int
  hostRating: number; //作为房东时的rating, default -1, float
  hostRatingNumber: number; //作为房东时的rating的数量 default 0, int
  gender: string; //用户性别 male, female, non-binary, str
  tags: string[]; //用户个性化tag list

  // verified: { //用户认证信息
  //     student: // bool
  //     gov: // bool, gov issued id
  // }
  verified: { [key: string]: any };

  // aboutMe: { // 关于TA。。。//可以和UIUX对接看看需要保留的必须部分
  //     interests: // str，兴趣爱好
  //     major: // str，专业领域
  //     languages: // str, 我会的语言
  //     skills: // str， 我会的技能
  //     funFact: // str， fun facts about me
  //     visitedCountries: // str, 我游览过的国家
  //     serviceProvided: // str, 我可以向求宿者提供什么
  // }
  aboutMe: { [key: string]: any };
}

export interface ActivityInfoItemProps {
  _id: string; // 该条信息的id
  _openid: string; // 该条信息用户的openid
  title: string; //活动标题 str
  images: string[]; // 活动照片
  description: string; //活动描述 str
  tags: string[]; //活动tags list
  location: string; //活动地点 str
  startTime: string; //开始时间 date
  endTime: string; //结束时间 date
  capacity: number; //活动人数上限 number
  contact: string; // 活动发起人联系方式 str
  price: number; //用户花销 number
  point: number;
  active: boolean; //活动是否还能报名 bool
  helloMessage: string; //活动主办发打招呼消息 str
  banner: boolean; // 活动是否展示在banner上
  official: boolean; // 是否是官方活动
  applyPage: string; // 未来的报名页面，对于eurostay活动
}

export interface ActivityApplicationItemProps {
  _id: string; // 该条信息的id
  _openid: string; // 该条信息用户的openid
  activityId: string; // 对应的活动id
  hostOpenid: string; // 活动host的openid
  userDescription: string; // 对主办方的话
  userContact: string; //用户联系方式
  userNickName: string;
  userAvatarUrl: string;
  approval: boolean; // 主办方是否允许该用户参加，默认true
}

export interface ActivityParticipantCombinedItemProps {
  _id: string; // 该条信息的id
  _openid: string; // 该条信息用户的openid
  activityId: string; // 对应的活动id
  hostOpenid: string; // 活动host的openid
  userDescription: string; // 对主办方的话
  userContact: string; //用户联系方式
  userNickName: string;
  userAvatarUrl: string;
  approval: boolean; // 主办方是否允许该用户参加，默认true
  actInfo: ActivityInfoItemProps[];
  userInfo: UserDetailInfoItemProps[];
}
