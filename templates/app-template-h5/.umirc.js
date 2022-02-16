const isProd = process.env.NODE_ENV === 'production';

// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  cssLoaderOptions: {
    localIdentName: '[local]',
  },
  hash: true,
  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
    // browsers: ['> 1%', 'last 2 versions', 'not ie <= 8', 'iOS >= 7', 'Android >= 4.1'],
  },
  targets: {
    ie: 10,
  },
  extraBabelIncludes: [/app\-common/, /\/common\//],
  base: `/`,
  publicPath: './',
  outputPath: `./dist/`,
  proxy: {
    '/api': {
      target: 'http://dev.yidian-inc.com:4000',
      changeOrigin: true,
    },
  },
  define: {
    APP_ENV: isProd ? 'production' : 'development',
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        dva: false,
        dynamicImport: {
          webpackChunkName: true,
        },
        // meta, headScript, title 等配置不在这里配，直接写在 pages/document.ejs 文件中
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};
