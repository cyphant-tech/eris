const path = require('path');

module.exports = {
  outputDir: './dist',
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://dev.yidian-inc.com:5000',
          changeOrigin: true,
        },
      },
    },
  },
};
