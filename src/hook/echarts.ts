import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const useEcharts = function (): [
  any,
  (options: echarts.EChartsOption) => void,
] {
  const myChart = useRef<echarts.ECharts>();
  const echart = useRef<HTMLElement>();
  useEffect(() => {
    function resize() {
      myChart.current?.resize();
    }
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      myChart.current = echarts.init(echart.current);
    });
  }, []);

  function setOptions(options: echarts.EChartsOption) {
    setTimeout(() => {
      myChart.current?.setOption(options);
    }, 200);
  }

  return [echart, setOptions];
};

export default useEcharts;
