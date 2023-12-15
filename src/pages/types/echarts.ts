import { EChartsOption } from 'echarts';

export interface BaseBarSeries {
  name?: string;
  type: 'bar';
  data: Array<number>;
}

export interface BarEchartsImf {
  height: number;
}

export type BaseBarOptionsImf = {
  xAxis: {
    type: string;
    data: Array<string>;
  };
} & EChartsOption;
