import cookie from '@/utils/cookie';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

/**
 * @description: 倒计时hook
 * @param {number} second 描述
 * @param {string} cookieName 存入COOKIE
 * @param {function} endCallback 回调函数
 * @return {*}
 */
export default function useCountDown(
  second: number,
  cookieName?: string,
  endCallback?: () => void
) {
  let seconds: MutableRefObject<number>;
  if (cookieName) {
    seconds = useRef(cookie.getCookie(cookieName) || second);
  } else {
    seconds = useRef(second);
  }
  const time = useRef<NodeJS.Timeout>();
  const [remainder, setRemainder] = useState(seconds.current);
  useEffect(() => {
    time.current = setInterval(() => {
      if (seconds.current === 0) {
        clearInterval(time.current);
        endCallback && endCallback();
        return;
      }
      seconds.current--;
      setRemainder(seconds.current);
      cookieName && cookie.setCookie(cookieName, seconds.current);
    }, 1000);
    return () => {
      clearInterval(time.current);
    };
  }, []);

  return [remainder];
}
