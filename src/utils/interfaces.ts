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
  xhsContact: string;
}

/**
 * 用户信息接口
 */
export interface UserItemProps {
  _id: string;
  openId: string;
  avatarUrl: string;
  nickName: string;
  userDes: string;
  userOpenid: string;
}
