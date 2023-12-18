/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 *
 */
export type ResponseDetails<T> = Promise<{ data: T; msg: string }>;

export type ResponsePageSize<T> = Promise<{
  pageSize: number;
  pageNo: number;
  data: T;
  msg: string;
}>;

export type Response<T> = ResponseDetails<T> & ResponsePageSize<T>;
