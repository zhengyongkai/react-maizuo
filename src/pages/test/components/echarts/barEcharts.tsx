/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: 柱状echarts图
 * @param { height }
 * @func { setData }
 */

import useEcharts from "@/hook/echarts";
import {
  BarEchartsImf,
  BaseBarOptionsImf,
  BaseBarSeries,
} from "@/pages/types/echarts";
import { forwardRef, useImperativeHandle } from "react";

export interface BaseBarChartImf {
  setData: (
    series: Array<BaseBarSeries>,
    xAxis: Array<number>,
    baseBarOptions?: BaseBarOptionsImf
  ) => void;
  baseBarOptions: BaseBarOptionsImf;
}

const BaseBarOptions: BaseBarOptionsImf = {
  color: ["#ff5f16"],
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
    data: [],
  },
  yAxis: {
    type: "category",
  },
  series: [],
};

const BarEcharts = forwardRef<BaseBarChartImf, BarEchartsImf>((props, ref) => {
  const { height } = props;
  const [echartsRef, setOptions] = useEcharts();

  useImperativeHandle(ref, () => ({
    setData,
    baseBarOptions: BaseBarOptions,
  }));

  /*
   * @name  设置 bar 的 options
   * @param {series,xAxis,baseBarOptions}
   * @author zhengyongkai
   */
  function setData(
    series: Array<BaseBarSeries>,
    xAxis: Array<number>,
    baseBarOptions: BaseBarOptionsImf = BaseBarOptions
  ) {
    baseBarOptions.xAxis.data = xAxis;
    setOptions({
      ...baseBarOptions,
      series,
    });
  }

  return <div ref={echartsRef} style={{ width: "100%", height }}></div>;
});

export default BarEcharts;
