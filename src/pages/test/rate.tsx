import * as echarts from 'echarts';
import { useEffect, useLayoutEffect, useRef } from 'react';

const RatePage = () => {
  const echart = useRef(null);
  useEffect(() => {
    const myChart = echarts.init(echart.current);
    myChart.setOption({
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  }, []);
  return <div ref={echart} style={{ width: '100%', height: 300 }}></div>;
};

export default RatePage;
