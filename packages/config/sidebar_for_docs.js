const html_css = [
  {
    type: 'category',
    label: 'HTML | CSS',
    collapsed: false,
    items: ['html_css/html'],
  },
]

const js = [
  {
    type: 'category',
    label: 'JavaScript',
    collapsed: false,
    items: [
      'javascript/proxy',
      'javascript/typescript',
      {
        type: 'category',
        label: '前端框架',
        items: [
          'javascript/framework/vue2',
          'javascript/framework/vue3',
          'javascript/framework/react',
          'javascript/framework/react-router',
        ],
      },
    ],
  },
]

const node = [
  {
    type: 'category',
    label: 'NodeJS',
    collapsed: false,
    items: [
      'node/modularization',
      { type: 'category', label: '包管理工具', items: ['node/npm/index', 'node/npm/lerna'] },
      'node/node-package',
    ],
  },
]

const tool = [
  {
    type: 'category',
    collapsed: false,
    label: '工具',
    items: ['tool/npm', 'tool/vscode', 'tool/linux', 'tool/git', 'tool/docker', 'tool/other'],
  },
]

const best_practice = [
  {
    type: 'category',
    label: '最佳实践',
    items: ['best_practice/watermark'],
  },
]

module.exports = {
  docs: ['index', ...html_css, ...js, ...node, ...tool, ...best_practice],
}
