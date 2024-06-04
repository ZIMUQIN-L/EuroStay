/**
 * 格式化数字
 * 千分位分割，保留两位小数
 * @param s number
 */
export function formatNumber(s: number | string) {
  if (!s) {
    return '0.00';
  }
  Number.prototype.toFixed = function (n: number) {
    if (n > 20 || n < 0) {
      throw new RangeError(
        'toFixed() digits argument must be between 0 and 20',
      );
    }
    const number = this as number;
    if (isNaN(number) || number >= Math.pow(10, 21)) {
      return number.toString();
    }
    if (typeof n == 'undefined' || n == 0) {
      return Math.round(number).toString();
    }
    let result: string | number = number.toString();
    const arr = result.split('.');
    // 整数的情况
    if (arr.length < 2) {
      result += '.';
      for (let i = 0; i < n; i += 1) {
        result += '0';
      }
      return result;
    }
    const integer = arr[0];
    const decimal = arr[1];
    if (decimal.length == n) {
      return result;
    }
    if (decimal.length < n) {
      for (let i = 0; i < n - decimal.length; i += 1) {
        result += '0';
      }
      return result;
    }
    result = integer + '.' + decimal.substr(0, n);
    const last = decimal.substr(n, 1);
    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
    if (parseInt(last, 10) >= 5) {
      const adjust = number >= 0 ? 1 : -1;
      const x = Math.pow(10, n);
      result = (Math.round(parseFloat(result) * x) + adjust) / x;
      result = result.toFixed(n);
    }
    return result;
  };
  const str = `${parseFloat(`${s}`.replace(/[^\d\.-]/g, '')).toFixed(2)}`;
  const len = str.split('.')[0].split('').reverse();
  const point = str.split('.')[1];
  const point2 = point == null ? '' : `.${point}`;
  let t = '';
  for (let i = 0; i < len.length; i += 1) {
    t +=
      len[i] +
      ((i + 1) % 3 === 0 && i + 1 !== len.length && len[i + 1] !== '-'
        ? ','
        : '');
  }
  return `${t.split('').reverse().join('')}${point2}`;
}
