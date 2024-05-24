// @ts-nocheck
import BMap from '@/utils/location';
import type { localeState, tudeInf } from '@/types/location';

import { Picker, Toast } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';
import { Map, Marker, NavigationControl } from 'react-bmapgl';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavTitle from '@/components/Layout/NavTitle';
import Styles from '@/assets/css/map.module.scss';

export default function Maps() {
  const mapRef = useRef<any>();
  const result = useRef<any>();
  const map = useRef<any>();

  const [visible, setVisible] = useState<boolean>(false);
  const { lat = 0, lng = 0 } = useParams();

  const locale = useSelector<localeState, tudeInf>((state) => state.location.tude);

  const start = useRef();

  const end = useRef(new BMap.Point(lng, lat));

  const basicColumns = [
    [
      { label: '推荐方案', value: 0 },
      { label: '最少时间', value: 1 },
      { label: '最少换乘', value: 2 },
      { label: '最少步行', value: 3 },
      { label: '不乘地铁', value: 4 },
      { label: '优先地铁', value: 5 }
    ]
  ];

  useEffect(() => {
    if (locale) {
      start.current = new BMap.Point(lng, lat);
    }
  }, [lng]);

  useEffect(() => {
    if (start.current) {
      map.current = new BMap.Map(mapRef.current.el.current);
      map.current.centerAndZoom(start.current, 14);
    }
  }, [start.current]);


  /**
   * @description: 获取公交路线
   * @param {any} e
   * @return {*}
   */  
  function onBusLine(e: any) {
    const transit = new BMap.TransitRoute(map.current, {
      renderOptions: { map: map.current, panel: result.current },
      policy: 0
    });
    map.current.clearOverlays();
    search(start.current, end.current, e);
    function search(start: any, end: any, route: any) {
      // console.log(route);
      if (route === e) {
        Toast.show('未找到合适的公交路线~');
        return false;
      }
      transit.setPolicy(route);
      transit.search(start, end);
    }
  }

  /**
   * @description: 获取汽车路线
   * @return {*}
   */  
  function onCarLine() {
    const driving = new BMap.DrivingRoute(map.current, {
      renderOptions: { map: map.current, autoViewport: true }
    });
    if (driving) {
      driving.search(start.current, end.current);
    }
  }

  return (
    <>
      <NavTitle back title="路线查看"></NavTitle>
      <div style={{ marginBottom: 60, paddingTop: 48 }}>
        <Map center={{ lng: 0, lat: 0 }} zoom="11" ref={mapRef}>
          <Marker position={{ lng: 0, lat: 0 }} icon={undefined} map={undefined} />
          <NavigationControl map={undefined} />
        </Map>

        <Picker
          columns={basicColumns}
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          onConfirm={(v) => {
            onBusLine(v);
          }}
        />
        <div ref={result}></div>
      </div>

      <div className={Styles['button-wrapper']}>
        <div onClick={() => setVisible(true)}>公交路线</div>
        <div onClick={() => onCarLine()}>行车路线</div>
      </div>
    </>
  );
}
