import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home';

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

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
