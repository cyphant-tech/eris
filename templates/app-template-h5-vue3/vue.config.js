const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  outputDir: './dist',
  publicPath: './',
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://dev.yidian-inc.com:4000',
          changeOrigin: true,
        },
      },
    },
  },
  chainWebpack: config => {
    // 默认不开启 prefetch
    config.plugins.delete('prefetch');

    // 默认不开启 preload
    config.plugins.delete('preload');

    // 修改页面 title
    config.plugin('html').tap(args => {
      args[0].title = '<%= appName %>';
      return args;
    });
  },
};
