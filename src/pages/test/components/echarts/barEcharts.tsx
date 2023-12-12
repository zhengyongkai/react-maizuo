/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */

import useEcharts from "@/hook/echarts";
import { BarEchartsImf, BaseBarSeries } from "@/pages/types/echarts";
import { forwardRef, useEffect, useImperativeHandle } from "react";

const BaseBarOptions = {
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
    boundaryGap: [0, 0.01],
  },
  yAxis: {
    type: "category",
    data: [] as Array<unknown>,
  },
};

const BarEcharts = forwardRef<
  { setData: (series: Array<BaseBarSeries>, yData: Array<unknown>) => void },
  BarEchartsImf
>((props, ref) => {
  const { height } = props;
  const [echartsRef, setOptions] = useEcharts();

  useImperativeHandle(ref, () => ({
    setData,
  }));

  function setData(series: Array<BaseBarSeries>, yData: Array<unknown>) {
    BaseBarOptions.yAxis.data = yData;
    setOptions({
      ...BaseBarOptions,
      series,
    });
  }

  return <div ref={echartsRef} style={{ width: "100%", height }}></div>;
});

export default BarEcharts;
