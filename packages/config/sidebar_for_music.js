const music = [
  'index',
  'basic_skill',
  'recommend',
  {
    type: 'category',
    label: '吉他练习',
    collapsed: false,
    items: ['guitar/index', 'guitar/lesson_1', 'guitar/lesson_2'],
  },
]

module.exports = {
  music: [...music],
}
