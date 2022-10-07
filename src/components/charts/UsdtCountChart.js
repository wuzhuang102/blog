import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import * as echarts from 'echarts';

import { usdt_count } from '../../constant/data';

function FilCountChart() {
  const chartDraw = () => {
    const ele = document.querySelector('#usdt-count-chart');
    if (ele) {
      const usdt_count_copy = usdt_count.slice(0);
      if (!dayjs(new Date()).isSame(dayjs(usdt_count_copy[usdt_count_copy.length - 1][1]), 'date'))
        usdt_count_copy.push([dayjs(new Date()).format('YYYY-MM-DD'), null]);

      const profit_down_everyday = 10;
      const profit_up_everyday = 0.1;
      const chart = echarts.init(ele);
      const data_date = [];
      const actual_usdt_count = [];
      const expect_fil_down_count = [];
      const expect_fil_up_count = [];
      const base_money = usdt_count_copy[0][1];
      usdt_count_copy.forEach((item, index) => {
        data_date.push(item[0]);
        actual_usdt_count.push(item[1]);
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
          left: '6%',
          right: '4%',
          bottom: 20,
        },
        xAxis: { data: data_date },
        yAxis: {},
        series: [
          {
            name: '实际数量',
            type: 'line',
            data: actual_usdt_count,
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

  return <div id="usdt-count-chart" style={{ height: 400 }}></div>;
}

export default FilCountChart;
