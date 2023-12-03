import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useFetch<T>(
  api: () => Promise<AxiosResponse<T>>,

  initData: T,
  listener: Array<any>,
  callback?: (data: any) => void
) {
  const [responseData, setResponseData] = useState<T>(initData);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const { data } = (await api()) as { data: T };
      console.log(data);
      setResponseData(data);
      // console.log(data);
      setLoading(false);
      callback && callback(data);
    }
    fetch();
  }, listener);

  return [responseData, loading] as [T, boolean];
}
