import Vue from 'vue';
import App from './App.vue';
import 'normalize.css';
import 'ant-design-vue/dist/antd.css';
import VueRouter from 'vue-router';
import { getRoutesFromConfig } from '@/config/app.utils';
import './init-components';

Vue.config.productionTip = false;

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: getRoutesFromConfig(),
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
