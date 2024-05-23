
/**
 * @description: 礼堂信息
 * @param {string} hallId 礼堂ID
 * @param {string} name 礼堂名称
 * @param {string} limit 限制信息
 * @return {*}
 */
export interface hallInf {
  hallId: string;
  name: string;
  limit?: string;
}
