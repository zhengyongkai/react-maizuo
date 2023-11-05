import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { cityStateImf, localeImf } from '@/types/location';

const useLocation = () => {
  return (fn: (locale: localeImf) => void) => {
    const location = useSelector<cityStateImf>(
      (state: cityStateImf) => state.location.locale
    ) as localeImf;
    useEffect(() => {
      fn(location);
    }, [location]);
  };
};

export default useLocation;
