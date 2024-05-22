import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { cityStateInf, localeInf } from '@/types/location';

/**
 * @description: useLoaction 跟方便拿到 locale 相关信息
 * @return {*}
 */
const useLocation = () => {
  return (fn: (locale: localeInf) => void) => {
    const location = useSelector<cityStateInf, localeInf>((state) => state.location.locale);
    useEffect(() => {
      // console.log(location);
      fn(location);
    }, [location]);
  };
};

export default useLocation;
