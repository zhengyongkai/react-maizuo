import { Toast } from 'antd-mobile';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

/**
 * @description: useFetch 接口，可以更方便的拿到数据和loading
 * @param {function} api 具体的api的function
 * @param {any} params api 参数
 * @param {T} initData 默认值 主要是typescript
 * @param {Array} listener 监听某个值来执行apiFn
 * @param {function} callback 回调
 * @return {*}
 */
export default function useFetch<T>(
  api: (params: any) => Promise<{ data: T; msg: string }>,
  params: any,
  initData: T,
  listener: Array<unknown>,
  callback?: (data: T) => void
): [T, boolean] {
  const [responseData, setResponseData] = useState<T>(initData);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const { data, msg } = await api(params);
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
