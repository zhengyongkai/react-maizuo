import BMap from '@/pages/utils/location'
import { initialStateImf, localeState, tudeImf } from '@/types/location';
import { Button, Picker } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmapgl';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';



export default function Maps() {
  const mapRef = useRef<any>()
  const result = useRef<any>()
  const map = useRef<any>()

  const [visible, setVisible] = useState<boolean>(false)
  const { lat = 0, lng = 0 } = useParams()

  const locale = useSelector<localeState, tudeImf>((state) => state.location.tude)

  const start = useRef()

  const end = useRef(new BMap.Point(lng, lat));


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
    if (locale) {
      start.current = new BMap.Point(locale.longitude, locale.latitude)
    }

  }, [locale])

  useEffect(() => {
    if (start.current) {
      console.log(start.current);
      map.current = new BMap.Map(mapRef.current.el.current);
      map.current.centerAndZoom(start.current, 14);
    }
  }, [start.current])

  function onBusLine(e: any) {

    const transit = new BMap.TransitRoute(map.current, {
      renderOptions: { map: map.current, panel: result.current },
      policy: 0,
    });
    map.current.clearOverlays();
    search(start.current, end.current, e);
    function search(start: any, end: any, route: any) {
      console.log(route);
      transit.setPolicy(route);
      transit.search(start, end);
    }
  }

  function onCarLine() {
    
    const driving = BMap.DrivingRoute(map.current, { renderOptions: { map: map.current, autoViewport: true } });
    driving.search(start.current, end.current);
  }

  return <>

    <div style={{ marginBottom: 60 }}>
      <Map center={{ lng: 114.1693611, lat: 22.3193039 }} zoom="11" ref={mapRef}>
        <Marker position={{ lng: 114.1693611, lat: 22.3193039 }} icon={undefined} map={undefined} />
        <NavigationControl map={undefined} />
      </Map>

      <Picker
        columns={basicColumns}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        onConfirm={v => {
          onBusLine(v)
        }}
      />
      <div ref={result}>

      </div>
    </div>

    <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, display: 'flex', background: '#fff', textAlign: 'center', height: 60, lineHeight: "60px", fontSize: 20 }}>
      <div style={{ flex: 1 }} onClick={() => setVisible(true)}>公交路线</div>
      <div style={{ flex: 1 }} onClick={() => onCarLine()}>行车路线</div>
    </div>
  </>
}