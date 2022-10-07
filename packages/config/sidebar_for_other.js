const finance = [
  {
    type: 'category',
    label: '财务知识',
    items: [
      'finance/base',
      'finance/transaction-calendar',
      {
        type: 'category',
        label: 'Pope笔记',
        items: [
          'finance/pope/readme',
          'finance/pope/底层逻辑/底层逻辑（一）/博弈思想',
          'finance/pope/底层逻辑/底层逻辑（二）/底层逻辑之二',
          'finance/pope/底层逻辑/底层逻辑（三）/不确定性',
          'finance/pope/回撤控制/提高交易策略的容错率',
          'finance/pope/持仓量/持仓量（一）/position',
          'finance/pope/裸K判断支撑与压力/裸K判断支撑位与阻力位',
          'finance/pope/超短线交易系统/超短线交易系统（一）/超短线交易系统（一）',
          'finance/pope/预测力较高的K线形态/预测力较高的K线形态（一）/预测力较高的K线形态（一）',
          'finance/pope/预测力较高的K线形态/预测力较高的K线形态（二）/预测力较高的K线形态（二）',
          'finance/pope/预测力较高的K线形态/预测力较高的K线形态（三）/预测力较高的K线形态（三）',
          'finance/pope/交易策略/交易策略之一：顺势而为/顺势而为',
          'finance/pope/交易策略/交易策略之二：趋势和均线/均线',
          'finance/pope/交易策略/交易策略之三：趋势拐点/拐点',
          'finance/pope/空间、时间与操作级别/空间、时间与操作级别（一）/空间、时间与操作级别（一）',
          'finance/pope/空间、时间与操作级别/空间、时间与操作级别（二）/空间、时间与操作级别（二）',
          'finance/pope/空间、时间与操作级别/空间、时间与操作级别（三）/空间、时间与操作级别（三）',
          'finance/pope/诱多、诱空与插针/诱多、诱空与插针（一）/诱多、诱空与插针（一）',
          'finance/pope/诱多、诱空与插针/诱多、诱空与插针（二）/诱多、诱空与插针（二）',
          'finance/pope/诱多、诱空与插针/诱多、诱空与插针（三）/诱多、诱空与插针（三）',
          'finance/pope/分形结构/分形结构（一）/比特币市场中分形结构的应用之一',
          'finance/pope/分形结构/分形结构（二）/比特币市场中分形结构的应用之二',
        ],
      },
      {
        type: 'category',
        label: '技术分析经验',
        items: ['finance/tech/ma', 'finance/tech/k-trend'],
      },
      {
        type: 'category',
        label: '交易分析笔记',
        items: ['finance/diary/2021'],
      },
    ],
  },
]

module.exports = {
  other: [...finance],
}
