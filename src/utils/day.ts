import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

export function getDateFormat(date: string, format = "YYYY-MM-DD HH:mm:ss") {
  // console.log(dayjs(date).format(format));
  return dayjs(date).format(format);
}

/**
 * @description: 根据 unix 返回 YYYY-MM-DD
 * @param {number} time
 * @return {*}
 */
export function getDate(time: number) {
  return dayjs.unix(time).format("YYYY-MM-DD");
}

/**
 * @description: 根据 unix 返回 HH:mm
 * @param {number} time
 * @return {*}
 */
export function getTime(time: number) {
  return dayjs.unix(time).format("HH:mm");
}

/**
 * @description: 根据 unix 返回是不是当天
 * @param {number} num
 * @return {*} true = 是 false = 否
 */
export function isTodayFn(num: number) {
  return dayjs.unix(num).isToday();
}

/**
 * @description: 根据 unix 返回是不是明天
 * @param {number} num
 * @return {*} true = 是 false = 否
 */
export function isTomorrowFn(num: number) {
  return dayjs.unix(num).isTomorrow();
}

/**
 * @description: 根据 unix 返回是不是明天
 * @param {number} num
 * @return {*} true = 是 false = 否
 */
export function isAfter(num: number) {
  const after = dayjs.unix(num);
  const now = dayjs(new Date());
  return after.diff(now, "day") == 1;
}

/**
 * @description: 根据 unix 输出星期几
 * @param {number} num
 * @return {*}
 */
export function getDay(num: number) {
  const day = dayjs.unix(num).day();
  switch (day) {
    case 0:
      return "周日";
    case 1:
      return "周一";
    case 2:
      return "周二";
    case 3:
      return "周三";
    case 4:
      return "周四";
    case 5:
      return "周五";
    case 6:
      return "周六";
    default:
      return "";
  }
}

/**
 * @description: 根据unix返回是否时间差
 * @param {number} num
 * @param {boolean} showTime
 * @return {*}
 */
export function getDaysNameFn(num: number, showTime: boolean = false): string {
  let day = null;
  if (!showTime) {
    day = dayjs.unix(num).format("MM月D日");
  } else {
    day = dayjs.unix(num).format("MM月D日 HH:mm");
  }
  let pre = "";
  if (isTodayFn(num)) {
    pre = "今日";
  } else if (isTomorrowFn(num)) {
    pre = "明天";
  } else if (isAfter(num)) {
    pre = "后天";
  } else {
    pre = getDay(num);
  }
  return pre + day;
}

/**
 * @description: 判断电影是否过时间
 * @param {number} stopAt
 * @param {number} beforeStopMins
 * @return {*}
 */
export const isStopSelling = (stopAt: number, beforeStopMins: number) => {
  let v = +stopAt * 1000 - +dayjs().valueOf();
  let re = +beforeStopMins * 60 * 1000;
  return v < re;
};

/**
 * @description: 秒转化为时分 定时器所用
 * @param {number} seconds
 * @return {*}
 */
export const secondToMMSS = (seconds: number) => {
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;

  return (
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (remainingSeconds < 10 ? "0" : "") +
    remainingSeconds
  );
};
