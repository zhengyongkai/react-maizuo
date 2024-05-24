export type BarSeries = echarts.BarSeriesOption;
export type PieSeries = echarts.PieSeriesOption;
export type LineSeries = echarts.LineSeriesOption;
export type MapSeries = echarts.MapSeriesOption;

/**
 * @description: 图标标准配置
 * @param {echarts.XAXisComponentOption} xAxis x轴相关配置
 * @param {Array<T>} series 数据类型
 * @param {echarts.LegendComponentOption} legend legend相关配置
 * @param {echarts.YAXisComponentOption} yAxis y轴相关配置
 * @param {echarts.GridComponentOption} grid grid相关配置
 * @param {echarts.TooltipComponentOption} tooltip tooltip相关配置
 * @return {*}
 */
export interface EchartsOptionsInf<T> {
  xAxis: echarts.XAXisComponentOption;
  series: Array<T>;
  legend?: echarts.LegendComponentOption;
  yAxis?: echarts.YAXisComponentOption;
  grid?: echarts.GridComponentOption;
  tooltip?: echarts.TooltipComponentOption;
  calculable?: boolean;
}

/**
 * @description: 基础Bar状图标数据
 * @param {string} name 名字
 * @param {type = 'bar'} type 类型
 * @param {Array<number>} data 数据库
 * @return {*}
 */
export interface BaseBarSeries {
  name?: string;
  type: 'bar';
  data: Array<number>;
}

/**
 * @description: bar图标标准信息
 * @param {number} height 高度
 * @return {*}
 */
export interface BarEchartsInf {
  height: number;
}

/**
 * @description: bar状图表基本配置
 * @return {*}
 */
export type BaseBarOptionsInf = {
  yAxis: {
    type?: string;
    data: Array<number>;
  };
} & EchartsOptionsInf<BaseBarSeries>;
