// @ts-nocheck
export const getAddress = function (latitude: number, longitude: number) {
  var myGeo = new BMapGL.Geocoder();
  // 根据坐标得到地址描述
  return new Promise((resolve) => {
    myGeo.getLocation(new BMapGL.Point(latitude, longitude), function (result) {
      if (result) {
        resolve(result);
      }
    });
  });
};

function Rad(d: number) {
  return (d * Math.PI) / 180.0;
}

export function getBetweenDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var b = Rad(lng1) - Rad(lng2);
  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; //输出为公里
  return s;
}
