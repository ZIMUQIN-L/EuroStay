/**
 * 房源信息接口
 */
export interface HouseItemProps {
  house: {
    id: string;
    capacity: number;
    description: string;
    endDate: string; // 后期最好优化成日期格式
    startDate: string;
    houseType: string;
    images: string[];
    location: string;
    ownerTarget: string;
    xhsContact: string;
  };
}
