const book = [
  'index',
  {
    type: 'category',
    label: '读书笔记',
    collapsed: false,
    items: [
      {
        type: 'category',
        label: '2022',
        collapsed: false,
        items: ['note/2022/index', 'note/2022/reading'],
      },
      {
        type: 'category',
        label: '2021',
        items: ['note/2021/index', 'note/2021/reading'],
      },
    ],
  },
];

module.exports = {
  book: [...book],
};
