import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

export function getDateFormat(date: string, format = "YYYY-MM-DD HH:mm:ss") {
  // console.log(dayjs(date).format(format));
  return dayjs(date).format(format);
}

export function getDate(time: number) {
  return dayjs.unix(time).format("YYYY-MM-DD");
}

export function getTime(time: number) {
  return dayjs.unix(time).format("HH:mm");
}

export function isTodayFn(num: number) {
  return dayjs.unix(num).isToday();
}

export function isTomorrowFn(num: number) {
  return dayjs.unix(num).isTomorrow();
}

export function isAfter(num: number) {
  const after = dayjs.unix(num);
  const now = dayjs(new Date());
  return after.diff(now, "day") == 1;
}

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

// 判断电影是否过时间
export const isStopSelling = (stopAt: number, beforeStopMins: number) => {
  let v = +stopAt * 1000 - +dayjs().valueOf();
  let re = +beforeStopMins * 60 * 1000;
  return v < re;
};

// 秒转时分
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
