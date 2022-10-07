const docsPluginTemplate = key => [
  '@docusaurus/plugin-content-docs',
  {
    id: key,
    path: `./packages/${key}`,
    routeBasePath: key,
    sidebarPath: require.resolve(`./packages/config/sidebar_for_${key}.js`),
  },
]

const blogPluginTemplate = key => [
  '@docusaurus/plugin-content-blog',
  { id: key, path: `./packages/${key}`, routeBasePath: key },
]

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'wuzhuang102',
  tagline: 'wuzhuang102',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/blog/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'wuzhuang102',
  projectName: 'wuzhuang102',
  themeConfig: {
    navbar: {
      title: 'wuzhuang102',
      logo: { alt: 'My Site Logo', src: 'img/logo.svg' },
      items: [
        { to: '/docs', label: '文档', position: 'left' },
        { to: '/book', label: '阅读', position: 'left' },
        { to: '/music', label: '音乐', position: 'left' },
        { to: '/photo', label: '摄影', position: 'left' },
        { to: '/plan', label: '生活', position: 'left' },
        { href: 'https://github.com/wuzhuang102', label: 'GitHub', position: 'right' },
      ],
    },
    prism: {
      theme: require('./packages/config/simple_dark.js'),
      darkTheme: require('./packages/config/simple_dark.js'),
    },
  },
  plugins: ['music', 'plan', 'book', 'photo', 'other'].map(item => docsPluginTemplate(item)),
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: './packages/docs',
          sidebarPath: require.resolve('./packages/config/sidebar_for_docs.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
