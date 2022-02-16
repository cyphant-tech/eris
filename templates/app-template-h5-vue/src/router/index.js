import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../pages/About'),
  },
];

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes,
});

export default router;
