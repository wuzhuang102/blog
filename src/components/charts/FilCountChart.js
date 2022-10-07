import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import * as echarts from 'echarts';

import { fil_count } from '../../constant/data';

function FilCountChart() {
  const chartDraw = () => {
    const ele = document.querySelector('#fil-count-chart');
    if (ele) {
      const fil_count_copy = fil_count.slice(0);
      if (!dayjs(new Date()).isSame(dayjs(fil_count_copy[fil_count_copy.length - 1][1]), 'date'))
        fil_count_copy.push([dayjs(new Date()).format('YYYY-MM-DD'), null]);

      const profit_down_everyday = 10;
      const profit_up_everyday = 0.1;
      const chart = echarts.init(ele);
      const data_date = [];
      const actual_fil_count = [];
      const expect_fil_down_count = [];
      const expect_fil_up_count = [];
      const base_money = fil_count_copy[0][1];
      fil_count_copy.forEach((item, index) => {
        data_date.push(item[0]);
        actual_fil_count.push(item[1]);
        expect_fil_up_count.push(
          index === 0 ? base_money : expect_fil_up_count[expect_fil_up_count.length - 1] * (1 + profit_up_everyday)
        );
        expect_fil_down_count.push(
          index === 0 ? base_money : expect_fil_down_count[expect_fil_down_count.length - 1] + profit_down_everyday
        );
      });
      chart.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['实际数量', '预期数量上限', '预期数量下限'] },
        grid: {
          left: '3%',
          right: '4%',
          bottom: 20,
        },
        xAxis: { data: data_date },
        yAxis: {},
        series: [
          {
            name: '实际数量',
            type: 'line',
            data: actual_fil_count,
          },
          {
            name: '预期数量上限',
            type: 'line',
            lineStyle: { type: 'dotted', color: '#ccc' },
            data: expect_fil_up_count,
          },
          {
            name: '预期数量下限',
            type: 'line',
            lineStyle: { type: 'dotted', color: '#ccc' },
            data: expect_fil_down_count,
          },
        ],
      });
    }
  };

  useEffect(() => {
    chartDraw();
  });

  return <div id="fil-count-chart" style={{ height: 400 }}></div>;
}

export default FilCountChart;
