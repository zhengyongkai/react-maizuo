/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: 柱状echarts图
 * @param { height }
 * @func { setData }
 */

import useEcharts from "@/hook/echarts";
import type {
  BarEchartsInf,
  BaseBarOptionsInf,
  BaseBarSeries,
} from "@/types/echarts";
import { forwardRef, useImperativeHandle } from "react";

export interface BaseBarChartInf {
  setData: (
    series: Array<BaseBarSeries>,
    xAxis: Array<number>,
    baseBarOptions?: BaseBarOptionsInf,
  ) => void;
  baseBarOptions: BaseBarOptionsInf;
}

const BaseBarOptions: BaseBarOptionsInf = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {},
  grid: {
    left: "8px",
    right: "8%",
    bottom: "1%",
    top: "0",
    containLabel: true,
  },
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "category",
    data: [],
  },
  series: [],
};

const BarEcharts = forwardRef<BaseBarChartInf, BarEchartsInf>((props, ref) => {
  const { height } = props;
  const [echartsRef, setOptions] = useEcharts();

  useImperativeHandle(ref, () => ({
    setData,
    baseBarOptions: BaseBarOptions,
  }));

  /**
   * @description: 将值设置到 echarts 中
   * @param {Array} series
   * @param {Array} xAxis
   * @param {BaseBarOptionsInf} baseBarOptions
   * @return {*}
   */
  function setData(
    series: Array<BaseBarSeries>,
    xAxis: Array<number>,
    baseBarOptions: BaseBarOptionsInf = BaseBarOptions,
  ) {
    baseBarOptions.yAxis.data = xAxis;
    setOptions({
      ...baseBarOptions,
      series,
    });
  }

  return <div ref={echartsRef} style={{ width: "100%", height }}></div>;
});

export default BarEcharts;
