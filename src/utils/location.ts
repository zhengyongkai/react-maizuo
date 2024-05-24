const BMapGL = window.BMapGL;

const RADIUS = 6371;

const toRad = function (n: number) {
  return (n * Math.PI) / 180;
};

/**
 * @description: 计算两地距离
 * @param {number} lat 经度
 * @param {number} lot 纬度
 * @param {number} lats 经度
 * @param {number} lots 纬度
 * @return {*}
 */
export const getBetweenDistance = function (lat: number, lot: number, lats: number, lots: number) {
  let dLat = toRad(lats - lat);
  let dLon = toRad(lots - lot);
  let fromLat = toRad(lat);
  let toLat = toRad(lats);

  let a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(fromLat) * Math.cos(toLat);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return RADIUS * c;
};

export default BMapGL;
