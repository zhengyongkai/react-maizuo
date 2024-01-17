import { EChartsOption } from "echarts";

export interface BaseBarSeries {
  name?: string;
  type: "bar";
  data: Array<number>;
}

export interface BarEchartsInf {
  height: number;
}

export type BaseBarOptionsInf = {
  yAxis: {
    type?: string;
    data: Array<number>;
  };
} & EChartsOption;
