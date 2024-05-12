/**
 * 验证照片Url是否有效
 * @param imageUrl
 * @returns 验证后的图片链接
 */
export function checkImageUrl(imageUrl: string | undefined | null): boolean {
  if (typeof imageUrl !== 'string') {
    return false;
  }
  // 目前的照片都是从云端获取的，所以只需要判断是否是以http开头即可
  const isHttp = imageUrl.startsWith('http', 0);
  return !isHttp;
}

/**
 * 验证房源图片链接们是否有效
 * @param imageUrls
 * @returns 验证后的的图片链接们
 */
export function filterValidImageUrls(imageUrls: string[]): string[] {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    return [];
  }
  return imageUrls.filter(checkImageUrl);
}
