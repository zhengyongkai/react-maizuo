import { useEffect } from "react";
import { useSelector } from "react-redux";

import type { cityStateInf, localeInf } from "@/types/location";

const useLocation = () => {
  return (fn: (locale: localeInf) => void) => {
    const location = useSelector<cityStateInf>(
      (state) => state.location.locale
    ) as localeInf;
    useEffect(() => {
      // console.log(location);
      fn(location);
    }, [location]);
  };
};

export default useLocation;
