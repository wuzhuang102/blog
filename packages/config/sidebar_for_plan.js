const tech = [
  {
    type: 'category',
    label: '技术学习',
    collapsed: false,
    items: ['tech/index', 'tech/article_list'],
  },
]



const exercise = [
  { type: 'category', label: '健身计划', collapsed: false, items: ['exercise/index', 'exercise/lose_weight'] },
]

const travel = [
  {
    type: 'category',
    label: '旅行计划',
    collapsed: false,
    items: ['travel/index', 'travel/library', 'travel/scenery'],
  },
]

const best_practice = [
  {
    type: 'category',
    label: '最佳实践',
    collapsed: false,
    items: ['best_practice/house'],
  },
]

module.exports = {
  plan: ['index', ...tech, ...travel, best_practice],
}
