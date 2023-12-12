import { Toast } from "antd-mobile";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useFetch<T>(
  api: () => Promise<{ data: T; msg: string }>,
  initData: T,
  listener: Array<unknown>,
  callback?: (data: T) => void
): [T, boolean] {
  const [responseData, setResponseData] = useState<T>(initData);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const { data, msg } = await api();
      if (data) {
        setResponseData(data);
        callback && callback(data);
      } else {
        setResponseData(initData);
        Toast.show(msg);
      }
      // console.log(data);
      setLoading(false);
    }
    fetch();
  }, listener);

  return [responseData, loading];
}
