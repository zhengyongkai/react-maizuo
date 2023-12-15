export function dataFormatArray<T>(length: number, data: T) {
  return {
    msg: '获取成功',
    [`data|${length}`]: [data],
  };
}
