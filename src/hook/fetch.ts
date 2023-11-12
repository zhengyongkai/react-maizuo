import { useEffect, useState } from 'react';

export default function useFetch<T>(
  api: () => T,
  listener = [],
  callback?: (data: any) => void
) {
  // console.log(api);
  const [responseData, setResponseData] = useState<Array<T>>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const { data } = (await api()) as { data: Array<T> };
      setResponseData(data);
      // console.log(data);
      setLoading(false);
      callback && callback(data);
    }
    fetch();
  }, listener);

  return [responseData, loading];
}
