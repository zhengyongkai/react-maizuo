import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { cityStateImf } from '@/types/location';

const useLocation = () => {
  return (fn: (locale: cityStateImf) => {}) => {
    const location = useSelector<cityStateImf>(
      (state: cityStateImf) => state.location.locale
    ) as cityStateImf;
    useEffect(() => {
      fn(location);
    }, [location]);
  };
};

export default useLocation;
