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
