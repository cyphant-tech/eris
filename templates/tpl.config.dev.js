module.exports = {
  name: 'app-template-admin',
  // baseUrl eg: ./app-template-admin
  baseUrl: './',
  // output eg: ./dist/app-template-admin
  output: './dist',
  // 模板参数
  params: {
    // appId, appName, template 模板基础参数，必须
    appId: 'simple-demo',
    appName: 'Simple Demo',

    tempalte: 'app-template-admin',
    // tempalte: 'app-template-h5-vue3',

    // layout, theme 模板自定义参数，根据模板情况自由定制
    // layout: topmenu or sidebar
    layout: 'sidebar',
    // theme: light or dark
    theme: 'dark',
  },
};
