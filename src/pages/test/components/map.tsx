
import { Button, Picker } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmapgl';

export default function Maps() {
  const mapRef = useRef<any>()
  const result = useRef<any>()
  const map = useRef<any>()
  const [visible, setVisible] = useState<boolean>(false)

  const basicColumns = [
    [
      { label: '推荐方案', value: 0 },
      { label: '最少时间', value: 1 },
      { label: '最少换乘', value: 2 },
      { label: '最少步行', value: 3 },
      { label: '不乘地铁', value: 4 },
      { label: '优先地铁', value: 5 },
    ],

  ]

  useEffect(() => {
    map.current = new BMapGL.Map(mapRef.current.el.current);
    map.current.centerAndZoom(new BMapGL.Point(116.404, 39.915), 14);
  }, [])

  function changeLocation(e) {
    var routePolicy = [0, 1, 2, 3, 4, 5];
    var start = new BMapGL.Point(116.302, 40.050)    //"百度大厦";
    var end = new BMapGL.Point(116.358, 39.961);               //"北京邮电大学西门";
    var transit = new BMapGL.TransitRoute(map.current, {
      renderOptions: { map: map.current, panel: result.current },
      policy: 0,
    });
    map.current.clearOverlays();
    search(start, end, e);
    function search(start, end, route) {
      transit.setPolicy(route);
      transit.search(start, end);
    }
  }
  return <>

    <div style={{ marginBottom: 60 }}>
      <Map center={{ lng: 116.402544, lat: 39.928216 }} zoom="11" ref={mapRef}>
        <Marker position={{ lng: 116.402544, lat: 39.928216 }} icon={undefined} map={undefined} />
        <NavigationControl map={undefined} />
      </Map>


      <Picker
        columns={basicColumns}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        onConfirm={v => {
          changeLocation(v)
        }}
      />
      <div ref={result}>

      </div>
    </div>

    <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, background: '#fff', textAlign: 'center', height: 60, lineHeight: "60px", fontSize: 20 }}>
      <div onClick={() => setVisible(true)}>选择路线</div>
    </div>
  </>
}