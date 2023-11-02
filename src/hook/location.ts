import { useEffect } from "react";
import { useSelector } from "react-redux";

import type { cityStateImf } from "@/types/location";

const useLocation = () => {
  return (fn: (locale: cityStateImf) => {}) => {
    const location = useSelector(
      (state: cityStateImf) => state.location.locale
    );
    useEffect(() => {
      fn(location);
    }, [location]);
  };
};

export default useLocation;
