interface AddressComponents {
  country: string;
  city: string;
  detail: string;
}

// 定义分隔符常量
const SEPARATOR = '⊙';

/**
 * 将地址组件合并成字符串
 * @param country 国家名称
 * @param city 城市名称
 * @param detail 详细地址
 * @returns 格式化的地址字符串 "国家⊙城市⊙详细地址"
 */
export const combineAddress = (country: string, city: string, detail: string): string => {
  return `${country}${SEPARATOR}${city}${SEPARATOR}${detail}`;
};

/**
 * 解析地址字符串为地址组件
 * @param address 格式化的地址字符串 "国家⊙城市⊙详细地址"
 * @returns 包含国家、城市和详细地址的对象
 */
export const parseAddress = (address: string): AddressComponents => {
  const parts = address.split(SEPARATOR);
  
  // 如果不包含分隔符或格式不正确，返回空值
  if (parts.length !== 3) {
    return {
      country: '',
      city: '',
      detail: address // 将整个字符串作为详细地址
    };
  }

  return {
    country: parts[0],
    city: parts[1],
    detail: parts[2]
  };
};

/**
 * 解析地址字符串，只返回地区信息（国家+城市）
 * @param location 格式化的地址字符串 "国家⊙城市⊙详细地址"
 * @returns 地区信息 "国家城市"
 */
export const parseLocation = (location: string): string => {
  if (!location) return '';
  
  const parts = location.split(SEPARATOR);
  if (parts.length >= 2) {
    return `${parts[0]}${parts[1]}`; // 返回国家+城市
  }
  
  return location; // 如果格式不正确，返回原始字符串
};

/**
 * 解析地址字符串，返回格式化的完整地址
 * @param location 格式化的地址字符串 "国家⊙城市⊙详细地址"
 * @returns 格式化的地址 "国家，城市，详细地址"
 */
export const parseFullAddress = (location: string): string => {
  if (!location) return '';
  
  const parts = location.split(SEPARATOR);
  if (parts.length === 3) {
    return `${parts[0]}${parts[1]}${parts[2]}`; // 返回格式化的完整地址
  }
  
  return location; // 如果格式不正确，返回原始字符串
}; 