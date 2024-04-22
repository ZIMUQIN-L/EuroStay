/**
 * 返回格式化补0后的时间
 * @param second 时间戳
 * @returns
 */
export function changeTimeBySecond(second: number) {
  let hourTime = 0;
  let minuteTime = 0;
  let secondTime = 0;
  if (second > 60) {
    //如果秒数大于60
    minuteTime = Math.floor(second / 60);
    secondTime = Math.floor(second % 60);
    if (minuteTime >= 60) {
      //如果分钟大于60
      hourTime = Math.floor(minuteTime / 60);
      minuteTime = Math.floor(minuteTime % 60);
    } else {
      hourTime = 0;
    }
  } else {
    hourTime = 0;
    minuteTime = 0;
    if (second == 60) {
      //如果秒数等于60
      minuteTime = 1;
      secondTime = 0;
    } else {
      secondTime = second;
    }
  }
  const timeResult =
    (hourTime > 0 ? addZero(hourTime) + '' + ':' : '') +
    addZero(minuteTime) +
    ':' +
    addZero(secondTime);
  return timeResult;
}
function addZero(time: number) {
  let str = time + '';
  if (time < 10) {
    str = '0' + time;
  }
  return str;
}

/**
 * 返回多少时间以前的格式
 * @param time
 * @returns
 */
export function timeAgo(time: number) {
  if (!time) return '';
  const newDate = new Date();
  const thisDate = new Date(time);
  const newTime = Math.floor(newDate.getTime() / 1000);
  const thisTime = Math.floor(thisDate.getTime() / 1000);
  const diff = newTime - thisTime;
  const year = thisDate.getFullYear();
  let month: any = thisDate.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;
  let day: any = thisDate.getDate();
  day = day > 9 ? day : `0${day}`;
  if (diff > 24 * 60 * 60) {
    if (newDate.getFullYear() === year) {
      return `${month}-${day}`;
    }
    return `${year}-${month}-${day}`;
  } else {
    const hour = Math.floor(diff / 60 / 60);
    if (hour > 0) {
      return `${hour} 小时前`;
    }
    const minute = Math.floor(diff / 60);
    if (minute > 0) {
      return `${minute} 分钟前`;
    }
    if (diff > 0) {
      return `${diff} 秒前`;
    }
  }
}

/**
 * 获取本年的最后一天
 * @returns
 */
export function lastDay() {
  let date = new Date();
  date.setFullYear(date.getFullYear() + 1); // 设置到明年
  date.setMonth(0); // 明年的0月，也就是对应到1月，是存在的哦，不是不存在的0
  date.setDate(0);
  return date;
}

/**
 * 将时间戳转换为日期格式
 * @param timestamp
 * @returns 2021-01-01 12:00:00
 */
export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

/**
 * 获得今日日期，以yyyy-mm-dd格式返回
 * @returns 2024-04-22
 */
export function formatToday(format = 'YYYY-MM-DD') {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  if (format === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`; // 返回 YYYY-MM-DD 格式
  }

  // 如果需要其他格式，可以在这里添加更多逻辑
  return `{month}/${day}/${year}`; // 其他可能的格式
}

/**
 * 将日期转换为yyyy-mm-dd格式
 * @returns 2024-04-22
 */
export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * 计算两个日期之间的天数
 * @param date 日期
 * @return int days
 */
export function calculateDaysBetweenDates(
  start: Date | string,
  end: Date | string,
) {
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();

  const diffInMillis = endDate - startDate;
  const millisInDay = 1000 * 60 * 60 * 24;

  const daysBetween = Math.ceil(diffInMillis / millisInDay);

  return daysBetween;
}
