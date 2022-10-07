module.exports = function (context, options) {
  console.log('******************');
  return {
    name: 'docusaurus-plugin',
    configurePostCss(postcssOptions) {
      // Appends new PostCSS plugin.
      postcssOptions.plugins.push(require('postcss-import'));
      return postcssOptions;
    },
  };
};
