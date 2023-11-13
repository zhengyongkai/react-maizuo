import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useFetch<T>(
  api: () => Promise<AxiosResponse<T>>,
  listener = [],
  callback?: (data: any) => void
): [T, boolean] {
  // console.log(api);
  const [responseData, setResponseData] = useState<T>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const { data } = (await api()) as { data: T };
      setResponseData(data);
      // console.log(data);
      setLoading(false);
      callback && callback(data);
    }
    fetch();
  }, listener);

  return [responseData, loading] as [T, boolean];
}
