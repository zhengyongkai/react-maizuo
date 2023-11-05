import { useEffect, useState } from 'react';

export default function useFetch(api: () => any) {
  // console.log(api);
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const { data } = await api();
      setResponseData(data);
      // console.log(data);
      setLoading(false);
    }
    fetch();
  }, []);

  return [responseData, loading];
}
