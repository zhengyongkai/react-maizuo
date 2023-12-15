/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */

import useEcharts from '@/hook/echarts';
import {
  BarEchartsImf,
  BaseBarOptionsImf,
  BaseBarSeries,
} from '@/pages/types/echarts';
import { forwardRef, useImperativeHandle } from 'react';

const BaseBarOptions: BaseBarOptionsImf = {
  color: ['#ff5f16'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {},
  grid: {
    left: '8px',
    right: '8%',
    bottom: '1%',
    top: '0',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    data: [],
  },
  yAxis: {
    type: 'category',
  },
  series: [],
};

const BarEcharts = forwardRef<
  {
    setData: (series: Array<BaseBarSeries>, xAxis: Array<number>) => void;
  },
  BarEchartsImf
>((props, ref) => {
  const { height } = props;
  const [echartsRef, setOptions] = useEcharts();

  useImperativeHandle(ref, () => ({
    setData,
  }));

  function setData(series: Array<BaseBarSeries>, xAxis: Array<number>) {
    BaseBarOptions.xAxis.data = xAxis;
    setOptions({
      ...BaseBarOptions,
      series,
    });
  }

  return <div ref={echartsRef} style={{ width: '100%', height }}></div>;
});

export default BarEcharts;
