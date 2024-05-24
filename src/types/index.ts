/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: 一些基础的ts类型
 *
 */
// export type ResponseDetails<T> = Promise<{ data: T; msg: string }>;

/**
 * @description: 分页类型
 * @return {*}
 */
export type ResponsePageSize<T> = Promise<{
  data: { pageSize: number; pageNo: number; list: Array<T> };
  msg: string;
}>;

/**
 * @description: 相应类型 譬如直接返回数据等
 * @return {*}
 */
export type Response<T> = Promise<{ data: T; msg: string }>;

/**
 * @description: 操作类型 返回的是 ID 或者 其他
 * @return {*}
 */
export type OReseponse = Response<number>;

// export type Params<T> = AxiosRequestConfig<T>;

// export type Data<T> = Promise<ResponsePageSize<T> | Response<T> | OReseponse>;
