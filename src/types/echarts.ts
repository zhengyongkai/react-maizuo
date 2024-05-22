

export type BarSeries = echarts.BarSeriesOption;
export type PieSeries = echarts.PieSeriesOption;
export type LineSeries = echarts.LineSeriesOption;
export type MapSeries = echarts.MapSeriesOption;

export interface LineOptionsInf<T> {
  xAxis: echarts.XAXisComponentOption;
  series: Array<T>;
  legend?: echarts.LegendComponentOption;
  yAxis?: echarts.YAXisComponentOption;
  grid?: echarts.GridComponentOption;
  tooltip?: echarts.TooltipComponentOption;
  calculable?: boolean;
}




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
} & LineOptionsInf<BaseBarSeries>;
