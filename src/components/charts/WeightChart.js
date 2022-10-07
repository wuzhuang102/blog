import React, { useEffect } from 'react';
import * as echarts from 'echarts';

import { weight_data } from '../../constant/data';

function WeightChart() {
  const chartDraw = () => {
    const ele = document.querySelector('#weight-chart');
    if (ele) {
      const chart = echarts.init(ele);
      const data = weight_data;
      const data_date = weight_data.map(item => item[0]);
      chart.setOption({
        tooltip: {},
        xAxis: {
          data: data_date,
        },
        yAxis: {},
        series: [
          {
            name: '体重(kg)',
            type: 'line',
            data: data,
          },
        ],
      });
    }
  };

  useEffect(() => {
    chartDraw();
  });

  return <div id="weight-chart" style={{ height: 400 }}></div>;
}

export default WeightChart;
