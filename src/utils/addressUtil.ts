export const parseLocation = (location: string): string => {
  if (!location) return '';
  
  // 如果包含 ||，返回 || 前面的部分
  if (location.includes('||')) {
    return location.split('||')[0];
  }
  
  // 如果不包含 ||，返回原始字符串
  return location;
}; 